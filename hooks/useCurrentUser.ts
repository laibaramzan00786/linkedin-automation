
// Ye hook localStorage se current user padhta hai.
// Jab backend aaye to sirf is file mein change karna hai — baaki sab same rahega.
//
// BACKEND INTEGRATION (future):
//   Replace localStorage.getItem("current_user") with your API call, e.g.:
//   const { data } = useQuery('/api/me')  OR  useSession() from next-auth
// 

import { useState, useEffect } from "react";

export interface CurrentUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;          
  linkedinConnected: boolean;
  linkedinName?: string;    
  linkedinAvatar?: string;
}

/** Default / guest user — shown before any login */
const GUEST: CurrentUser = {
  id: "guest",
  firstName: "Guest",
  lastName: "",
  email: "",
  avatar: undefined,
  linkedinConnected: false,
};

// ── Read / Write helpers ──────────────────────────────────────────────────────

export const getCurrentUser = (): CurrentUser => {
  try {
    const raw = localStorage.getItem("current_user");
    if (!raw) return GUEST;
    return JSON.parse(raw) as CurrentUser;
  } catch {
    return GUEST;
  }
};

export const setCurrentUser = (user: CurrentUser) => {
  localStorage.setItem("current_user", JSON.stringify(user));
};

export const clearCurrentUser = () => {
  localStorage.removeItem("current_user");
  localStorage.removeItem("token");
};

// ── Hook ──────────────────────────────────────────────────────────────────────

export const useCurrentUser = () => {
  const [user, setUser] = useState<CurrentUser>(GUEST);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const update = (partial: Partial<CurrentUser>) => {
    const updated = { ...user, ...partial };
    setCurrentUser(updated);
    setUser(updated);
  };

  const logout = () => {
    clearCurrentUser();
    setUser(GUEST);
  };

  /** Full display name */
    const displayName =
  (user.linkedinName ?? `${user.firstName} ${user.lastName}`.trim()) || "Guest";

  /** Initials for avatar fallback */
  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return { user, displayName, initials, update, logout };
};