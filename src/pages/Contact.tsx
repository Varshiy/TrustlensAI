import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

function Contact() {
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_28kaltk",
        "template_ftgdtgp",
        e.currentTarget,
        "t9VdK2-RQvA-NJXwN"
      )
      .then(() => {
        setSent(true);
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to send message!");
      });
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>

      {!sent ? (
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="from_name"
            placeholder="Your Name"
            required
          />

          <input
            type="email"
            name="from_email"
            placeholder="Your Email"
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            required
          ></textarea>

          <button type="submit">
            Send Message
          </button>
        </form>
      ) : (
        <div className="success-message">
          <h2>✅ Message Sent Successfully!</h2>

          <p>Thank you for your valuable time.</p>

          <p>
            We appreciate your feedback and support for TrustLens AI.
          </p>

          <button
            className="home-btn"
            onClick={() => navigate("/")}
          >
            Return Home
          </button>
        </div>
      )}
    </div>
  );
}

export default Contact;