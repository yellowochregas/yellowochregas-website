import { Link, useLocation, useParams } from "react-router-dom";
import { AlertTriangle, CheckCircle, Phone } from "lucide-react";
import { brand } from "../data/brand";
import BookingSummary from "../components/BookingSummary";

function fallbackBooking(publicId) {
  const bookings = JSON.parse(localStorage.getItem("yellow-ochre-bookings") || "[]");
  return bookings.find((booking) => booking.publicId === publicId);
}

export default function ConfirmationPage() {
  const { publicId } = useParams();
  const location = useLocation();
  const booking = location.state?.booking || fallbackBooking(publicId);
  const offline = location.state?.offline;

  return (
    <section className="confirmation-page">
      <span className="eyebrow">Request received</span>
      <h1>Help request {publicId} is ready</h1>
      <p>Yellow Ochre Gas will check urgency, call you back, and book the right engineer.</p>

      {offline && (
        <div className="next-panel warning">
          <AlertTriangle size={22} aria-hidden="true" />
          <div>
            <strong>Saved on this device</strong>
            <p>The API was unavailable, so this MVP saved your request locally. If this is urgent, call now.</p>
          </div>
        </div>
      )}

      {booking && <BookingSummary booking={booking} />}

      <div className="next-panel">
        <CheckCircle size={22} aria-hidden="true" />
        <div>
          <strong>Still worried?</strong>
          <p>Call <a href={`tel:${brand.phoneTel}`}>{brand.phoneDisplay}</a>. If you smell gas or suspect carbon monoxide, leave the property and call <a href={`tel:${brand.gasEmergencyTel}`}>{brand.gasEmergencyDisplay}</a>.</p>
        </div>
      </div>

      <div className="button-row">
        <Link className="primary-button" to="/">Back to help</Link>
        <a className="secondary-button" href={`tel:${brand.phoneTel}`}>
          <Phone size={18} aria-hidden="true" />
          Call now
        </a>
      </div>
    </section>
  );
}
