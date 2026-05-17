import { Link, useParams } from "react-router-dom";
import { MapPin, Phone, ShieldCheck } from "lucide-react";
import { brand, locationPages, services } from "../data/brand";

function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function displayArea(areaSlug) {
  return locationPages.find((area) => slug(area) === areaSlug) || "Braintree";
}

export default function AreaPage() {
  const { slug: areaSlug = "braintree" } = useParams();
  const area = displayArea(areaSlug);

  return (
    <div className="area-page">
      <section className="page-heading">
        <span className="eyebrow">Local service page</span>
        <h1>Plumbing, boiler and heating help in {area}</h1>
        <p>Plain English help for {area} homes, landlords and businesses, with urgent call support always visible.</p>
      </section>

      <section className="panel-grid two">
        <article className="info-panel">
          <MapPin aria-hidden="true" />
          <h2>Start with the assistant</h2>
          <p>Tell us what is happening and we will guide you through the next safe step. No account needed.</p>
          <Link className="primary-button" to="/assistant/not-sure">Start assistant</Link>
        </article>
        <article className="info-panel dark">
          <Phone aria-hidden="true" />
          <h2>Emergency in {area}</h2>
          <p>For leaks, no heating in a vulnerable household, boiler worries, or commercial disruption, call now.</p>
          <a className="call-action wide" href={`tel:${brand.phoneTel}`}>Call {brand.phoneDisplay}</a>
        </article>
      </section>

      <section className="content-band">
        <h2>Local services in {area}</h2>
        <div className="service-chip-grid">
          {services.map((service) => <span key={service}>{service}</span>)}
        </div>
      </section>

      <section className="panel-grid two">
        <article className="info-panel">
          <ShieldCheck aria-hidden="true" />
          <h2>Trust signals</h2>
          <ul>
            <li>Local Braintree positioning</li>
            <li>Gas Safe registered engineer messaging</li>
            <li>Clear what-happens-next explanations</li>
            <li>Visible phone and WhatsApp options</li>
          </ul>
        </article>
        <article className="info-panel">
          <h2>Nearby Essex areas</h2>
          <div className="area-link-grid">
            {locationPages.map((name) => <Link key={name} to={`/areas/${slug(name)}`}>{name}</Link>)}
          </div>
        </article>
      </section>

      <section className="content-band">
        <h2>FAQs for {area}</h2>
        <div className="faq-list">
          <details open>
            <summary>Can I call instead of using the assistant?</summary>
            <p>Yes. The phone number stays visible because many people prefer to speak to a person.</p>
          </details>
          <details>
            <summary>Do I need an account?</summary>
            <p>No. You can request help without creating an account.</p>
          </details>
          <details>
            <summary>Can you help with boilers?</summary>
            <p>Yes. Boiler and gas work must be handled by a qualified Gas Safe registered engineer.</p>
          </details>
        </div>
      </section>
    </div>
  );
}
