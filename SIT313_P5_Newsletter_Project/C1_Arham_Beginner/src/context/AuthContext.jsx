import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return undefined;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser && db) {
        try {
          const snapshot = await getDoc(doc(db, "users", currentUser.uid));
          setProfile(snapshot.exists() ? snapshot.data() : {
            name: currentUser.displayName || "DEV@Deakin member",
            email: currentUser.email,
            plan: "Free",
          });
        } catch (error) {
          console.error("Could not load user profile:", error);
          setProfile({ name: currentUser.displayName || "Member", email: currentUser.email, plan: "Free" });
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function logout() {
    if (auth) await signOut(auth);
  }

  async function refreshProfile() {
    if (!user || !db) return;
    const snapshot = await getDoc(doc(db, "users", user.uid));
    if (snapshot.exists()) setProfile(snapshot.data());
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
