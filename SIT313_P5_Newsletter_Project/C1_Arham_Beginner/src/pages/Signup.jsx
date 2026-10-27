import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleSignup(event) {
    event.preventDefault();
    setMessage("");

    if (name.trim() === "") {
      setMessage("Please enter your full name.");
      return;
    }

    if (!name.trim().includes(" ")) {
      setMessage("Please enter your first and last name.");
      return;
    }

    if (!email.includes("@")) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (!auth || !db) {
      setMessage("Firebase is not configured. Add your Firebase settings to the .env file.");
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(result.user, {
        displayName: name.trim()
      });

      await setDoc(doc(db, "users", result.user.uid), {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        plan: "Free",
        createdAt: new Date().toISOString()
      });

      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setMessage("This email is already registered.");
      } else if (error.code === "auth/invalid-email") {
        setMessage("Please enter a valid email address.");
      } else {
        setMessage("Could not create the account. Please try again.");
      }
    }
  }

  return (
    <main className="min-h-[70vh] px-5 py-10">
      <div className="mx-auto max-w-xl rounded-lg border p-6 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Create a DEV@Deakin Account
        </h1>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="mb-1 block">Name</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="First and last name"
              className="w-full rounded border px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              className="w-full rounded border px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className="w-full rounded border px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block">Confirm password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirm your password"
              className="w-full rounded border px-3 py-2"
            />
          </div>

          {message && (
            <p className="rounded bg-red-100 px-3 py-2 text-red-700">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Create
          </button>
        </form>

        <p className="mt-5 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Signup;
