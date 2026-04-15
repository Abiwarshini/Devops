import React from "react";
import { Calendar, Ticket, LayoutDashboard } from "lucide-react"; // icons (install lucide-react)

export default function Features() {
  return (
    <section id="features" className="features">
      <div className="container">
        <h2 className="section-title">Posh Features for Modern Events</h2>
        <p className="section-sub">
          Luxury design meets smart technology — elegant event pages, seamless ticketing, and effortless venue booking.
        </p>

        <div className="feature-grid">
          <article className="feature-card">
            <div className="feature-icon">
              <LayoutDashboard size={40} />
            </div>
            <h3>Elegant Event Pages</h3>
            <p>
              Stunning, responsive event pages crafted to mirror poster
              aesthetics — ensuring first impressions feel premium.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon">
              <Ticket size={40} />
            </div>
            <h3>Seamless Ticketing</h3>
            <p>
              Flexible ticket tiers, QR check-in, and secure payments — smooth
              for hosts and attendees alike.
            </p>
          </article>

          <article className="feature-card accent-card">
            <div className="feature-icon">
              <Calendar size={40} />
            </div>
            <h3>Venue & Resource</h3>
            <p>
              Smart booking calendar with conflict-free scheduling and resource
              allocation for a stress-free experience.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
