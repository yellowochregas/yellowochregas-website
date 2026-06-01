import { useEffect } from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import QuoteWizard from "../components/QuoteWizard";

export default function QuotePage() {
  useEffect(() => {
    document.title = "Get a Quote | Yellow Ochre Gas";

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Yellow Ochre Gas",
      areaServed: ["Braintree", "Essex", "London"],
      serviceType: ["Boiler Installation London", "Bathroom Installation London", "Emergency Plumbing London", "Gas Safe Engineers London"]
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  return (
    <ErrorBoundary fallback={<QuoteFallback />}>
      <QuoteWizard />
    </ErrorBoundary>
  );
}

function QuoteFallback() {
  return (
    <section className="quote-experience">
      <div className="quote-shell">
        <div className="quote-card">
          <span className="eyebrow">Quote assistant</span>
          <h1>We could not load the quote form</h1>
          <p className="quote-muted">Please refresh the page, or call now if you need urgent help.</p>
          <a className="primary-button" href="tel:+447593217699">Call now</a>
        </div>
      </div>
    </section>
  );
}
