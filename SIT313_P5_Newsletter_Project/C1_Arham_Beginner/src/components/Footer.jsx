import { Facebook, Twitter, Instagram } from "lucide-react";
import { useState } from "react";

function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function subscribe(event) {
    event.preventDefault();
    setMessage("");
    setMessageType("");

    const cleanEmail = email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!cleanEmail) {
      setMessage("Please enter your email address.");
      setMessageType("error");
      return;
    }

    if (!emailPattern.test(cleanEmail)) {
      setMessage("Please enter a valid email address.");
      setMessageType("error");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: cleanEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Subscription failed. Please try again.");
      }

      setMessage(data.message || "Thank you for subscribing!");
      setMessageType("success");
      setEmail("");
    } catch (error) {
      setMessage(
        error.message === "Failed to fetch"
          ? "Could not connect to the server. Please check that the backend is running."
          : error.message || "Something went wrong. Please try again."
      );
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <footer id="subscribe" className="mt-10">
      <div className="flex flex-col gap-3 bg-gray-200 px-5 py-5 md:flex-row md:items-center md:justify-center">
        <h2 className="font-bold">SIGN UP FOR OUR DAILY INSIDER</h2>

        <form onSubmit={subscribe} className="flex flex-col gap-2 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
            className="min-w-0 rounded border border-gray-400 px-3 py-2"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="rounded bg-gray-700 px-5 py-2 text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        {message && (
          <p
            role="status"
            aria-live="polite"
            className={`text-sm font-medium ${
              messageType === "success" ? "text-green-800" : "text-red-700"
            }`}
          >
            {message}
          </p>
        )}
      </div>

      <div className="bg-teal-600 px-8 py-10 text-white">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-3 text-xl font-bold">Explore</h3>
            <p>Home</p>
            <p>Questions</p>
            <p>Articles</p>
            <p>Tutorials</p>
          </div>

          <div>
            <h3 className="mb-3 text-xl font-bold">Support</h3>
            <p>FAQs</p>
            <p>Help</p>
            <p>Contact Us</p>
          </div>

          <div>
            <h3 className="mb-3 text-xl font-bold">Stay connected</h3>
            <div className="flex gap-3">
              <Facebook aria-label="Facebook" />
              <Twitter aria-label="Twitter" />
              <Instagram aria-label="Instagram" />
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <h3 className="font-bold">DEV@Deakin 2022</h3>
          <p className="mt-2">Privacy Policy &nbsp;&nbsp; Terms &nbsp;&nbsp; Code of Conduct</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
