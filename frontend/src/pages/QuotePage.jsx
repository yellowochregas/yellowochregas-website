import { useEffect } from "react";
import QuoteWizard from "../components/QuoteWizard";

export default function QuotePage() {
  useEffect(() => {
    document.title = "Get a Quote | Yellow Ochre Gas";
  }, []);

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Yellow Ochre Gas",
          areaServed: ["Braintree", "Essex", "London"],
          serviceType: ["Boiler Installation London", "Bathroom Installation London", "Emergency Plumbing London", "Gas Safe Engineers London"]
        })}
      </script>
      <QuoteWizard />
    </>
  );
}
