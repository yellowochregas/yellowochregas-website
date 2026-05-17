import { Clock, ShieldCheck, Star, UserRoundCheck } from "lucide-react";
import { brand, reviews } from "../data/brand";

export default function TrustPanel() {
  return (
    <section className="trust-grid" aria-label="Trust and reassurance">
      <article className="trust-card">
        <ShieldCheck aria-hidden="true" />
        <h2>Gas Safe messaging</h2>
        <p>Gas and boiler work must be handled by qualified Gas Safe registered engineers.</p>
      </article>
      <article className="trust-card">
        <Clock aria-hidden="true" />
        <h2>What happens next</h2>
        <p>We check urgency first, call you back, confirm the visit, then assign the right engineer.</p>
      </article>
      <article className="trust-card">
        <Star aria-hidden="true" />
        <h2>{brand.rating} from {brand.reviewCount} reviews</h2>
        <p>"{reviews[1].text}"</p>
      </article>
      <article className="trust-card">
        <UserRoundCheck aria-hidden="true" />
        <h2>Human fallback</h2>
        <p>Prefer to speak to someone? The call button stays visible across the app.</p>
      </article>
    </section>
  );
}
