import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, ArrowLeft, ArrowRight, CheckCircle, Phone } from "lucide-react";
import { getAssistantFlow } from "../data/assistantFlows";
import { brand } from "../data/brand";
import { createBooking } from "../services/api";
import BookingSummary from "./BookingSummary";

const fallbackKey = "yellow-ochre-bookings";

function saveFallbackBooking(booking) {
  const existing = JSON.parse(localStorage.getItem(fallbackKey) || "[]");
  localStorage.setItem(fallbackKey, JSON.stringify([booking, ...existing].slice(0, 10)));
}

function shouldShowSafety(step, value) {
  return step.safety && (value === "Yes" || value === "Not sure");
}

export default function AssistantFlow({ issueId }) {
  const navigate = useNavigate();
  const flow = useMemo(() => getAssistantFlow(issueId), [issueId]);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const step = flow[stepIndex];
  const progress = Math.round(((stepIndex + 1) / flow.length) * 100);

  const updateAnswer = (key, value) => {
    const next = { ...answers, [key]: value };
    if (key === "gasSmell" && (value === "Yes" || value === "Not sure")) {
      next.urgency = "Emergency";
    }
    setAnswers(next);
    setError("");
  };

  const nextStep = () => {
    if (step.required && !answers[step.key]) {
      setError("Please add this detail before continuing.");
      return;
    }
    if (step.type === "contact" && (!answers.name || !answers.phone)) {
      setError("Please add a name and phone number so we can reply.");
      return;
    }
    setStepIndex((current) => Math.min(current + 1, flow.length - 1));
    window.scrollTo(0, 0);
  };

  const backStep = () => {
    setStepIndex((current) => Math.max(current - 1, 0));
    window.scrollTo(0, 0);
  };

  const confirmBooking = async () => {
    const localId = `YOG-${Math.floor(1000 + Math.random() * 9000)}`;
    const payload = {
      issueType: issueId,
      answers,
      postcode: answers.postcode,
      urgency: answers.urgency || (issueId === "emergency" ? "Emergency" : "Flexible"),
      preference: answers.preference || "Call-back",
      mediaNote: answers.mediaNote || "",
      customer: {
        name: answers.name,
        phone: answers.phone
      }
    };

    setSaving(true);
    setError("");

    try {
      const response = await createBooking(payload);
      saveFallbackBooking({ ...payload, publicId: response.publicId || response.booking?.publicId || localId, status: response.booking?.status || "Request received" });
      navigate(`/confirmation/${response.publicId || response.booking?.publicId || localId}`, { state: { booking: response.booking || payload } });
    } catch (apiError) {
      const fallback = { ...payload, publicId: localId, status: payload.urgency === "Emergency" ? "Emergency review" : "Request received", createdAt: new Date().toISOString() };
      saveFallbackBooking(fallback);
      navigate(`/confirmation/${localId}`, { state: { booking: fallback, offline: true } });
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="assistant-flow" aria-labelledby="assistant-title">
      <div className="step-panel">
        <div className="step-meta">
          <span>Step {stepIndex + 1} of {flow.length}</span>
          <div className="progress-track" aria-label={`${progress}% complete`}>
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>

        {step.type === "review" ? (
          <ReviewStep
            step={step}
            issueId={issueId}
            answers={answers}
            saving={saving}
            onBack={backStep}
            onConfirm={confirmBooking}
          />
        ) : (
          <>
            <h1 id="assistant-title">{step.title}</h1>
            <p className="step-help">{step.help}</p>
            {shouldShowSafety(step, answers[step.key]) && <GasSafetyNotice />}
            {error && <p className="form-error" role="alert">{error}</p>}
            <StepInput step={step} answers={answers} onChange={updateAnswer} onNext={nextStep} />
            <div className="step-actions">
              <button className="secondary-button" type="button" onClick={backStep} disabled={stepIndex === 0}>
                <ArrowLeft size={18} aria-hidden="true" />
                Back
              </button>
            {(step.type !== "choice" || shouldShowSafety(step, answers[step.key])) && (
                <button className="primary-button" type="button" onClick={nextStep}>
                  Next
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              )}
            </div>
          </>
        )}
      </div>

      <aside className="support-panel">
        <h2>Can I call someone now?</h2>
        <p>Yes. Call Yellow Ochre Gas on <strong>{brand.phoneDisplay}</strong>. If you smell gas or suspect carbon monoxide, leave the property and call <strong>{brand.gasEmergencyDisplay}</strong>.</p>
        <a className="call-action wide" href={`tel:${brand.phoneTel}`}>
          <Phone size={18} aria-hidden="true" />
          Call now
        </a>
        <p className="small-note">No forced account. We only ask what helps the engineer respond properly.</p>
      </aside>
    </section>
  );
}

function StepInput({ step, answers, onChange, onNext }) {
  const value = answers[step.key] || "";

  if (step.type === "choice") {
    return (
      <div className="choice-list">
        {step.choices.map((choice) => (
          <button
            key={choice}
            className={value === choice ? "choice-button selected" : "choice-button"}
            type="button"
            onClick={() => {
              onChange(step.key, choice);
              if (!(step.safety && (choice === "Yes" || choice === "Not sure"))) {
                setTimeout(onNext, 80);
              }
            }}
          >
            {choice}
          </button>
        ))}
      </div>
    );
  }

  if (step.type === "textarea") {
    return (
      <label className="field-block">
        <span>{step.label}</span>
        <textarea value={value} placeholder={step.placeholder} onChange={(event) => onChange(step.key, event.target.value)} />
      </label>
    );
  }

  if (step.type === "contact") {
    return (
      <div className="form-grid">
        <label className="field-block">
          <span>Name</span>
          <input autoComplete="name" value={answers.name || ""} onChange={(event) => onChange("name", event.target.value)} placeholder="Your name" />
        </label>
        <label className="field-block">
          <span>Phone number</span>
          <input autoComplete="tel" inputMode="tel" value={answers.phone || ""} onChange={(event) => onChange("phone", event.target.value)} placeholder="Best number to call" />
        </label>
        <label className="field-block">
          <span>What would you prefer?</span>
          <select value={answers.preference || "Call-back"} onChange={(event) => onChange("preference", event.target.value)}>
            <option>Call-back</option>
            <option>Book engineer</option>
            <option>Text first</option>
          </select>
        </label>
        <p className="privacy-note">We use this only to reply about this request.</p>
      </div>
    );
  }

  return (
    <label className="field-block">
      <span>{step.label}</span>
      <input
        autoComplete={step.autoComplete}
        value={value}
        placeholder={step.placeholder}
        onChange={(event) => onChange(step.key, event.target.value)}
      />
    </label>
  );
}

function GasSafetyNotice() {
  return (
    <div className="safety-notice" role="alert">
      <AlertTriangle size={22} aria-hidden="true" />
      <div>
        <strong>Gas safety guidance</strong>
        <p>Leave the property, avoid flames and electrical switches, and call the National Gas Emergency Service on <a href={`tel:${brand.gasEmergencyTel}`}>{brand.gasEmergencyDisplay}</a>. Do not try to repair a boiler or gas appliance yourself.</p>
      </div>
    </div>
  );
}

function ReviewStep({ step, issueId, answers, saving, onBack, onConfirm }) {
  return (
    <>
      <h1>{step.title}</h1>
      <p className="step-help">{step.help}</p>
      <BookingSummary booking={{ issueId, answers }} />
      <div className="next-panel">
        <CheckCircle size={22} aria-hidden="true" />
        <div>
          <strong>What happens next</strong>
          <p>A person checks urgency first, calls you back, confirms any visit details, and assigns a Gas Safe registered engineer where boiler or gas work is involved.</p>
        </div>
      </div>
      <div className="step-actions">
        <button className="secondary-button" type="button" onClick={onBack}>Back</button>
        <button className="primary-button" type="button" onClick={onConfirm} disabled={saving}>
          {saving ? "Sending..." : "Confirm request"}
        </button>
      </div>
    </>
  );
}
