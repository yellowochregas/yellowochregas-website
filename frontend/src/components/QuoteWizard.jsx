import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, ArrowLeft, ArrowRight, Bath, Check, Flame, Phone, ShieldCheck, Star, UploadCloud } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "./ui/button";
import { brand } from "../data/brand";
import { defaultQuoteValues, fieldConfig, quoteSteps, quoteTypes } from "../data/quoteWizard";
import { createQuote } from "../services/api";

const draftKey = "yellow-ochre-quote-draft";

const quoteSchema = z.object({
  quoteType: z.enum(["boiler", "bathroom"], { required_error: "Choose a quote type" }),
  fullName: z.string().min(2, "Add your full name"),
  email: z.string().email("Add a valid email address"),
  phone: z.string().min(7, "Add a phone number"),
  postcode: z.string().min(3, "Add your postcode"),
  address: z.string().min(3, "Add your address"),
  gdprConsent: z.literal(true, { errorMap: () => ({ message: "Please confirm consent before submitting" }) })
}).passthrough();

const requiredByStep = {
  personal: ["fullName", "email", "phone", "postcode", "address"],
  property: ["propertyType", "bedrooms", "existingBoilerLocation", "currentHeatingSystem"],
  currentBoiler: ["boilerType", "boilerAge", "fuelType", "radiators"],
  preferences: ["preferredBoilerType", "preferredBrand", "budgetRange"],
  installation: ["timeframe", "parkingAvailability", "occupancyDuringWork"],
  bathroomDetails: ["bathroomLocation", "bathroomType", "bathroomSize", "existingBathroomStatus", "bathroomCount"],
  design: ["preferredStyle", "preferredColours", "budgetRange"],
  fixtures: ["fixtures"],
  planning: ["startTimeframe", "projectDuration", "structuralWork", "plumbingChanges", "electricalWork"],
  review: ["gdprConsent"]
};

function needsEmergency(values) {
  const text = [values.existingIssues, values.specialRequirements, values.optionalNotes, values.otherRequests]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return values.timeframe === "Emergency" || ["no heating", "gas leak", "water leak"].some((term) => text.includes(term));
}

function smartSuggestion(values) {
  if (values.quoteType === "boiler") {
    if (values.preferredBoilerType === "Combi boiler" || values.boilerType === "Combi") {
      return "A combi boiler survey should focus on hot-water demand, water pressure, flue route, and radiator count.";
    }
    if (values.bedrooms && Number(values.bedrooms) >= 4) {
      return "For larger homes, our engineer may compare system and regular boiler options before quoting.";
    }
    return "Most boiler installation quotes can be scoped faster with photos of the current boiler, flue, and airing cupboard.";
  }

  if (values.bathroomType === "Full renovation") {
    return "A full renovation quote should include strip-out, plumbing changes, electrics, tiling, fixtures, and finishing.";
  }
  if (values.fixtures?.includes("Walk-in shower")) {
    return "Walk-in shower projects benefit from early checks on drainage fall, waterproofing, and screen sizes.";
  }
  return "Bathroom quotes are faster when you share current-room photos and one or two inspiration references.";
}

export default function QuoteWizard() {
  const savedDraft = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem(draftKey) || "null");
    } catch {
      return null;
    }
  }, []);
  const [selectedType, setSelectedType] = useState(savedDraft?.quoteType || "");
  const [stepIndex, setStepIndex] = useState(savedDraft?.stepIndex || 0);
  const [submitState, setSubmitState] = useState({ status: "idle", message: "" });

  const form = useForm({
    resolver: zodResolver(quoteSchema),
    defaultValues: { ...defaultQuoteValues, ...(savedDraft?.values || {}) },
    mode: "onChange"
  });

  const values = form.watch();
  const steps = selectedType ? quoteSteps[selectedType] : [];
  const currentStep = steps[stepIndex];
  const progress = selectedType ? Math.round(((stepIndex + 1) / steps.length) * 100) : 0;
  const emergency = needsEmergency(values);

  useEffect(() => {
    const subscription = form.watch((currentValues) => {
      localStorage.setItem(draftKey, JSON.stringify({ quoteType: selectedType, stepIndex, values: currentValues }));
    });
    return () => subscription.unsubscribe();
  }, [form, selectedType, stepIndex]);

  useEffect(() => {
    localStorage.setItem(draftKey, JSON.stringify({ quoteType: selectedType, stepIndex, values }));
  }, [selectedType, stepIndex, values]);

  const selectType = (type) => {
    setSelectedType(type);
    form.setValue("quoteType", type, { shouldValidate: true });
    setStepIndex(0);
  };

  const validateStep = async () => {
    if (!currentStep) return false;
    const fields = requiredByStep[currentStep.id] || currentStep.fields;
    const valid = await form.trigger(fields);
    if (currentStep.id === "fixtures" && !form.getValues("fixtures")?.length) {
      form.setError("fixtures", { type: "manual", message: "Choose at least one fixture or fitting" });
      return false;
    }
    return valid;
  };

  const goNext = async () => {
    const valid = await validateStep();
    if (!valid) return;
    setStepIndex((current) => Math.min(current + 1, steps.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    if (!selectedType) return;
    setStepIndex((current) => Math.max(current - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submitQuote = async (data) => {
    setSubmitState({ status: "saving", message: "Submitting quote request..." });
    const payload = {
      quoteType: data.quoteType,
      customer: {
        name: data.fullName,
        email: data.email,
        phone: data.phone
      },
      postcode: data.postcode,
      address: data.address,
      details: data,
      emergencyFlag: needsEmergency(data),
      consent: data.gdprConsent
    };

    try {
      const response = await createQuote(payload);
      localStorage.removeItem(draftKey);
      setSubmitState({ status: "success", message: `Quote request ${response.publicId || "received"} is ready. We will respond as soon as possible.` });
    } catch {
      localStorage.setItem(draftKey, JSON.stringify({ quoteType: selectedType, stepIndex, values: data, pendingSubmit: true }));
      setSubmitState({ status: "offline", message: "Saved offline on this device. Please call now if this is urgent." });
    }
  };

  return (
    <section className="quote-experience" aria-labelledby="quote-title">
      <QuoteHero />

      {emergency && (
        <div className="quote-emergency" role="alert">
          <AlertTriangle aria-hidden="true" />
          <div>
            <strong>Emergency detected</strong>
            <p>If you have no heating, a gas leak, or a water leak, call now for priority help.</p>
          </div>
          <a href={`tel:${brand.phoneTel}`}>Call {brand.phoneDisplay}</a>
        </div>
      )}

      <div className="quote-shell">
        <div className="quote-card">
          {!selectedType ? (
            <QuoteTypeSelection selectedType={selectedType} onSelect={selectType} />
          ) : (
            <form onSubmit={form.handleSubmit(submitQuote)}>
              <QuoteStepper steps={steps} stepIndex={stepIndex} progress={progress} />
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22 }}
                >
                  {currentStep.id === "review" ? (
                    <ReviewStep values={values} form={form} submitState={submitState} />
                  ) : (
                    <StepFields step={currentStep} form={form} values={values} />
                  )}
                </motion.div>
              </AnimatePresence>
              <div className="quote-mobile-actions">
                <Button type="button" variant="outline" onClick={goBack} disabled={stepIndex === 0}>
                  <ArrowLeft size={18} aria-hidden="true" /> Previous
                </Button>
                {currentStep.id === "review" ? (
                  <Button type="submit" disabled={submitState.status === "saving"} className="quote-submit-button">
                    Submit quote
                  </Button>
                ) : (
                  <Button type="button" onClick={goNext} className="quote-submit-button">
                    Next <ArrowRight size={18} aria-hidden="true" />
                  </Button>
                )}
              </div>
            </form>
          )}
        </div>
        <QuoteSidebar values={values} selectedType={selectedType} />
      </div>
    </section>
  );
}

function QuoteHero() {
  return (
    <header
      className="quote-hero"
      id="quote-title"
      style={{ "--quote-hero-image": "url('/images/Gas-engineer-at-work-in-kitchen.png')" }}
    >
      <div>
        <span className="eyebrow">Premium installation quotes</span>
        <h1>Get a Fast & Professional Installation Quote</h1>
        <p>Answer a few quick questions and receive a tailored quote from our experienced engineers.</p>
        <div className="quote-hero-badges">
          <span><ShieldCheck size={16} aria-hidden="true" /> Gas Safe branding</span>
          <span><Star size={16} aria-hidden="true" /> 5-star Google reviews</span>
          <span>Transparent pricing</span>
        </div>
      </div>
    </header>
  );
}

function QuoteTypeSelection({ selectedType, onSelect }) {
  return (
    <div>
      <span className="eyebrow">Step 1</span>
      <h2>What do you need help with?</h2>
      <p className="quote-muted">Choose one installation route. Your progress will auto-save on this device.</p>
      <div className="quote-type-grid">
        {quoteTypes.map((type) => {
          const Icon = type.id === "boiler" ? Flame : Bath;
          return (
            <motion.button
              type="button"
              key={type.id}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className={selectedType === type.id ? "quote-type-card selected" : "quote-type-card"}
              onClick={() => onSelect(type.id)}
            >
              <img src={type.image} alt="" loading="lazy" />
              <span className="quote-type-icon"><Icon size={24} aria-hidden="true" /></span>
              <strong>{type.title}</strong>
              <small>{type.eyebrow}</small>
              <p>{type.summary}</p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function QuoteStepper({ steps, stepIndex, progress }) {
  return (
    <div className="quote-stepper" aria-label="Quote progress">
      <div className="quote-progress"><span style={{ width: `${progress}%` }} /></div>
      <div className="quote-step-list">
        {steps.map((step, index) => (
          <span key={step.id} className={index < stepIndex ? "done" : index === stepIndex ? "active" : ""}>
            {index < stepIndex ? <Check size={14} aria-hidden="true" /> : index + 1}
            <small>{step.title}</small>
          </span>
        ))}
      </div>
    </div>
  );
}

function StepFields({ step, form, values }) {
  return (
    <div className="quote-step-content">
      <h2>{step.title}</h2>
      <p className="quote-muted">{smartSuggestion(values)}</p>
      <div className="quote-field-grid">
        {step.fields.map((fieldName) => (
          <QuoteField key={fieldName} name={fieldName} config={fieldConfig[fieldName]} form={form} />
        ))}
      </div>
      {(step.id === "additional" || step.id === "design") && (
        <div className="quote-upload-note">
          <UploadCloud aria-hidden="true" />
          <span>Photo and inspiration uploads are scaffolded for the backend. Add notes here for the MVP.</span>
        </div>
      )}
    </div>
  );
}

function QuoteField({ name, config, form }) {
  const error = form.formState.errors[name]?.message;

  if (!config) return null;

  if (config.type === "select") {
    return (
      <label className="quote-field">
        <span>{config.label}</span>
        <select {...form.register(name)}>
          <option value="">Choose an option</option>
          {config.options.map((option) => <option key={option}>{option}</option>)}
        </select>
        {error && <small role="alert">{error}</small>}
      </label>
    );
  }

  if (config.type === "textarea") {
    return (
      <label className="quote-field full">
        <span>{config.label}</span>
        <textarea placeholder={config.placeholder} {...form.register(name)} />
        {error && <small role="alert">{error}</small>}
      </label>
    );
  }

  if (config.type === "checkboxes") {
    return (
      <fieldset className="quote-field full">
        <legend>{config.label}</legend>
        <div className="fixture-grid">
          {config.options.map((option) => (
            <label key={option}>
              <input type="checkbox" value={option} {...form.register(name)} />
              <span>{option}</span>
            </label>
          ))}
        </div>
        {error && <small role="alert">{error}</small>}
      </fieldset>
    );
  }

  return (
    <label className="quote-field">
      <span>{config.label}</span>
      <input type={config.type} placeholder={config.placeholder} autoComplete={config.autoComplete} {...form.register(name)} />
      {error && <small role="alert">{error}</small>}
    </label>
  );
}

function ReviewStep({ values, form, submitState }) {
  const visibleEntries = Object.entries(values).filter(([key, value]) => {
    if (key === "gdprConsent") return false;
    if (Array.isArray(value)) return value.length;
    return Boolean(value);
  });

  return (
    <div className="quote-step-content">
      <h2>Review and submit</h2>
      <p className="quote-muted">Estimated response time: usually within 1 working day. Emergency requests should call now.</p>
      <div className="quote-summary-grid">
        {visibleEntries.map(([key, value]) => (
          <div key={key}>
            <strong>{fieldConfig[key]?.label || key}</strong>
            <span>{Array.isArray(value) ? value.join(", ") : String(value)}</span>
          </div>
        ))}
      </div>
      <label className="quote-consent">
        <input type="checkbox" {...form.register("gdprConsent")} />
        <span>I consent to Yellow Ochre Gas using these details to contact me about this quote request.</span>
      </label>
      {form.formState.errors.gdprConsent && <p className="form-error">{form.formState.errors.gdprConsent.message}</p>}
      {submitState.message && <p className={`quote-submit-state ${submitState.status}`}>{submitState.message}</p>}
    </div>
  );
}

function QuoteSidebar({ values, selectedType }) {
  return (
    <aside className="quote-sidebar">
      <section>
        <h2>Quote includes</h2>
        <ul>
          <li>Free quote</li>
          <li>Transparent pricing</li>
          <li>Gas Safe engineers</li>
          <li>Warranty support</li>
          <li>Quality workmanship</li>
        </ul>
      </section>
      <section>
        <h2>Why choose Yellow Ochre Gas</h2>
        <ul>
          <li>Local trusted engineers</li>
          <li>24/7 support</li>
          <li>Fast response</li>
          <li>Professional installation</li>
          <li>Excellent reviews</li>
        </ul>
      </section>
      <section className="quote-review-badge">
        <strong>Google Reviews</strong>
        <span>5-star rating</span>
        <small>{brand.reviewCount} customer reviews</small>
        <small>Checkatrade-ready trust area</small>
      </section>
      {selectedType && (
        <section className="quote-suggestion">
          <h2>Smart suggestion</h2>
          <p>{smartSuggestion(values)}</p>
        </section>
      )}
    </aside>
  );
}
