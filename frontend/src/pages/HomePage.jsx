import { Link } from "react-router-dom";
import { Clock, MapPin, Phone, ShieldCheck, Star } from "lucide-react";
import IssuePicker from "../components/IssuePicker";
import TrustPanel from "../components/TrustPanel";
import { brand, reviews } from "../data/brand";

export default function HomePage() {
  return (
    <>
      <section className="assistant-home" aria-labelledby="home-title">
        <div className="home-copy">
          <span className="eyebrow">Braintree plumbing and heating assistant</span>
          <h1 id="home-title">What do you need help with today?</h1>
          <p>{brand.trustLine}</p>
          <div className="home-actions">
            <a className="call-action" href={`tel:${brand.phoneTel}`}>
              <Phone size={18} aria-hidden="true" />
              Call now
            </a>
            <Link className="primary-button" to="/assistant/emergency">I need urgent help</Link>
          </div>
          <div className="trust-strip" aria-label="Trust signals">
            <span><Clock size={16} aria-hidden="true" /> 24/7 emergency service</span>
            <span><Star size={16} aria-hidden="true" /> {brand.rating} from {brand.reviewCount} reviews</span>
            <span><ShieldCheck size={16} aria-hidden="true" /> Gas Safe registered messaging</span>
          </div>
        </div>

        <figure className="home-visual">
          <img src={brand.assets.heroEngineer} alt="Gas Safe engineer in a kitchen" />
          <figcaption>
            <strong>{brand.name}</strong>
            <span>{brand.locationLine}</span>
          </figcaption>
        </figure>
      </section>

      <section className="location-prompt">
        <div>
          <MapPin aria-hidden="true" />
          <span>
            <strong>Are you in or near Braintree?</strong>
            <small>We cover Braintree and nearby Essex communities.</small>
          </span>
        </div>
        <Link className="secondary-button" to="/areas/braintree">Check areas</Link>
      </section>

      <IssuePicker />
      <TrustPanel />

      <section className="content-band reviews-band" aria-labelledby="review-heading">
        <div>
          <span className="eyebrow">Old-site review content preserved</span>
          <h2 id="review-heading">Real trust, shown early</h2>
          <p>Reviews are included as reassurance, but they do not block the service assistant.</p>
        </div>
        <div className="review-list">
          {reviews.slice(0, 3).map((review) => (
            <article key={review.id} className="review-mini">
              <div aria-label={`${review.rating} star rating`}>{"★".repeat(review.rating)}</div>
              <p>"{review.text}"</p>
              <strong>{review.name}</strong>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
