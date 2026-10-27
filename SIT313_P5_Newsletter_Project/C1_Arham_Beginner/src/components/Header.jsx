import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, profile, logout, loading } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <nav className="flex flex-wrap items-center gap-3 border-b bg-white px-4 py-3 md:px-8">
      <Link to="/" className="mr-auto text-lg font-bold text-teal-800">DEV@Deakin</Link>
      <input type="text" placeholder="Search..." aria-label="Search" className="w-32 rounded border px-3 py-2 md:w-52" />
      <Link to="/pricing" className="rounded px-3 py-2 hover:bg-teal-50">Pricing</Link>
      <Link to="/post" className="rounded bg-gray-100 px-4 py-2 hover:bg-gray-200">Post</Link>
      {!loading && (user ? (
        <>
          <span className="hidden text-sm text-slate-600 sm:inline">{profile?.plan || "Free"} plan</span>
          <button type="button" onClick={handleLogout} className="rounded bg-slate-800 px-4 py-2 text-white hover:bg-slate-700">Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" className="rounded bg-gray-100 px-4 py-2 hover:bg-gray-200">Login</Link>
          <Link to="/signup" className="rounded bg-teal-700 px-4 py-2 text-white hover:bg-teal-800">Sign up</Link>
        </>
      ))}
    </nav>
  );
}

export default Header;
