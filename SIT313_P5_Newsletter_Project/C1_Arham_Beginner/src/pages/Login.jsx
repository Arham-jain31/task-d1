import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    setMessage("");

    if (email === "" || password === "") {
      setMessage("Please enter your email and password.");
      return;
    }

    if (!auth) {
      setMessage("Firebase is not configured. Add your Firebase settings to the .env file.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setMessage("Incorrect email or password. Please try again.");
    }
  }

  return (
    <main className="min-h-[70vh] px-5 py-10">
      <div className="mx-auto max-w-md rounded-lg border p-6 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-bold">Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="mb-1 block">Your email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              className="w-full rounded border px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block">Your password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
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
            Login
          </button>
        </form>

        <p className="mt-5 text-center">
          New user?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
