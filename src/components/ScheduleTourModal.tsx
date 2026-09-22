"use client";

import { useState } from "react";
import { Property } from "@/data/properties";

interface ScheduleTourModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

export function ScheduleTourModal({ property, isOpen, onClose }: ScheduleTourModalProps) {
  const [tourType, setTourType] = useState<"in-person" | "video">("in-person");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("11:00 AM - 12:30 PM");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (name && phone) {
      setSubmitted(true);
    }
  }

  function handleReset() {
    setSubmitted(false);
    onClose();
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        {submitted ? (
          <div className="modal-success-state">
            <div className="success-icon-wrap">✦</div>
            <h3>Viewing Request Confirmed!</h3>
            <p className="success-text">
              Thank you, <strong>{name}</strong>. Your {tourType === "in-person" ? "in-person visit" : "video walkthrough"} for{" "}
              <strong>{property.title}</strong> has been scheduled.
            </p>
            <div className="appointment-card">
              <div>
                <span>Date & Time:</span>
                <strong>{date || "Tomorrow"}, {timeSlot}</strong>
              </div>
              <div>
                <span>Assigned Advisor:</span>
                <strong>{property.agent.name} ({property.agent.phone})</strong>
              </div>
            </div>
            <p className="advisor-note">
              Our agent will send a WhatsApp confirmation with gate pass / location pin 2 hours prior to your visit.
            </p>
            <button className="primary-button full-width" onClick={handleReset}>
              Done
            </button>
          </div>
        ) : (
          <div className="modal-form-state">
            <div className="modal-header">
              <span className="eyebrow">
                <span className="eyebrow-line" /> PRIVATE VIEWING
              </span>
              <h2>Schedule a Tour</h2>
              <p className="modal-sub">
                {property.title} · <strong>{property.price}</strong>
              </p>
            </div>

            {/* Tour Type Switcher */}
            <div className="tour-type-selector">
              <button
                type="button"
                className={`tour-type-btn ${tourType === "in-person" ? "active" : ""}`}
                onClick={() => setTourType("in-person")}
              >
                <span>🏛️ In-Person Visit</span>
                <small>Walkthrough with our advisor</small>
              </button>
              <button
                type="button"
                className={`tour-type-btn ${tourType === "video" ? "active" : ""}`}
                onClick={() => setTourType("video")}
              >
                <span>📹 Live Video Tour</span>
                <small>WhatsApp / Zoom live stream</small>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="tour-form">
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="tour-date">Preferred Date</label>
                  <input
                    id="tour-date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="tour-time">Time Slot</label>
                  <select
                    id="tour-time"
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                  >
                    <option value="10:00 AM - 11:30 AM">Morning (10:00 AM - 11:30 AM)</option>
                    <option value="11:30 AM - 01:00 PM">Morning (11:30 AM - 01:00 PM)</option>
                    <option value="03:00 PM - 04:30 PM">Afternoon (03:00 PM - 04:30 PM)</option>
                    <option value="05:00 PM - 06:30 PM">Evening (05:00 PM - 06:30 PM)</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="tour-name">Your Full Name</label>
                <input
                  id="tour-name"
                  type="text"
                  placeholder="e.g. Asad Siddiqui"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="tour-phone">WhatsApp / Phone Number</label>
                  <input
                    id="tour-phone"
                    type="tel"
                    placeholder="+92 300 1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="tour-email">Email Address</label>
                  <input
                    id="tour-email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="primary-button full-width">
                Confirm Tour Booking <span>→</span>
              </button>

              <p className="modal-disclaimer">
                No fee or obligation. Free cancellation up to 1 hour before scheduled time.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
