
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";

function Pricing() {
  const { user, profile, refreshProfile } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const plan = profile?.plan || "Free";

  const plans = [
    {
      name: "Free",
      price: "$0",
      features: [
        "Read community posts",
        "Create questions",
        "Up to 3 posts each month",
        "Standard image uploads",
      ],
    },
    {
      name: "Paid",
      price: "$6",
      features: [
        "Everything in Free",
        "More posts each month",
        "Larger image uploads",
        "Priority community features",
      ],
    },
  ];

  async function upgrade(event) {
    event.preventDefault();
    setMessage("");

    const number = cardNumber.replace(/\s/g, "");

    if (!cardName.trim()) {
      setMessage("Please enter your name.");
      return;
    }

    if (!/^\d{16}$/.test(number)) {
      setMessage("Enter a 16-digit card number.");
      return;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      setMessage("Enter expiry in MM/YY format.");
      return;
    }

    if (!/^\d{3,4}$/.test(cvv)) {
      setMessage("Enter a 3 or 4 digit CVV.");
      return;
    }

    if (!user) {
      setMessage("Please log in first.");
      return;
    }

    if (!db) {
      setMessage("Please configure Firebase first.");
      return;
    }

    setSaving(true);

    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          name: profile?.name || user.displayName || "Member",
          email: user.email,
          plan: "Paid",
          planUpdatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      await refreshProfile();

      setShowModal(false);
      setCardName("");
      setCardNumber("");
      setExpiry("");
      setCvv("");

      setMessage("Your account is now on the Paid plan!");
    } catch (error) {
      console.error(error);
      setMessage("Could not upgrade. Please check Firestore.");
    }

    setSaving(false);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-12">
      <div className="mx-auto max-w-5xl">

        <h1 className="text-center text-4xl font-bold">
          Choose Your Plan
        </h1>

        <p className="mt-3 text-center text-slate-600">
          Choose the plan that works best for you.
        </p>

        {user && (
          <p className="mt-4 text-center">
            Current Plan: <b>{plan}</b>
          </p>
        )}

        {message && (
          <p role="status" className="mt-4 text-center text-teal-700">
            {message}
          </p>
        )}

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {plans.map((item) => (
            <div
              key={item.name}
              className="rounded-xl border bg-white p-6 shadow"
            >
              <h2 className="text-2xl font-bold">{item.name}</h2>

              <p className="mt-3 text-3xl font-bold">{item.price}</p>

              <ul className="my-6 space-y-3">
                {item.features.map((feature) => (
                  <li key={feature}>✓ {feature}</li>
                ))}
              </ul>

              {item.name === "Free" ? (
                <p className="rounded bg-slate-100 p-3 text-center">
                  {plan === "Free"
                    ? "Your current plan"
                    : "Free plan available"}
                </p>
              ) : (
                <button
                  type="button"
                  disabled={plan === "Paid"}
                  onClick={() => {
                    if (!user) {
                      setMessage("Please log in first.");
                    } else if (plan === "Paid") {
                      setMessage("You already have the Paid plan.");
                    } else {
                      setMessage("");
                      setShowModal(true);
                    }
                  }}
                  className="w-full rounded-lg bg-teal-700 p-3 text-white disabled:bg-gray-400"
                >
                  {plan === "Paid" ? "Already Paid" : "Upgrade Plan"}
                </button>
              )}
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          No real payment is processed.
          Do not enter real card details.
        </p>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6">

            <h2 className="text-2xl font-bold">
              Upgrade to Paid
            </h2>

            <form onSubmit={upgrade} className="mt-5 space-y-4">

              <input
                required
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="Name on card"
                className="w-full rounded border p-3"
              />

              <input
                required
                value={cardNumber}
                onChange={(e) =>
                  setCardNumber(
                    e.target.value.replace(/[^\d ]/g, "").slice(0, 19)
                  )
                }
                placeholder="1234 5678 9012 3456"
                className="w-full rounded border p-3"
              />

              <input
                required
                value={expiry}
                onChange={(e) => setExpiry(e.target.value.slice(0, 5))}
                placeholder="MM/YY"
                className="w-full rounded border p-3"
              />

              <input
                required
                type="password"
                value={cvv}
                onChange={(e) =>
                  setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                }
                placeholder="CVV"
                className="w-full rounded border p-3"
              />

              <p className="text-sm text-slate-500">
                 No payment will be taken.
                Card details will not be saved.
              </p>

              <button
                type="submit"
                disabled={saving}
                className="w-full rounded bg-teal-700 p-3 text-white"
              >
                {saving ? "Saving..." : "Confirm Upgrade"}
              </button>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-full rounded border p-3"
              >
                Cancel
              </button>

            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default Pricing;

