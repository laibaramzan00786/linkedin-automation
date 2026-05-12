
'use client'
import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Command } from "lucide-react";
import { LinkedinLogo, GoogleLogoIcon } from "@phosphor-icons/react";
import { setCurrentUser } from "../../hooks/useCurrentUser";
import { signIn } from "next-auth/react";
const Signup = () => {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [email,    setEmail]    = useState("");
    const [password, setPassword] = useState("");
    const [loading,  setLoading]  = useState(false);
    const [liLoading, setLiLoading] = useState(false);
    const [error,    setError]    = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    
    setCurrentUser({
      id:                Math.random().toString(36).substring(2, 10),
      firstName:         firstName.trim(),
      lastName:          lastName.trim(),
      email:             email.trim(),
      avatar:            undefined,
      linkedinConnected: false,
    });

    localStorage.setItem("token",      "user");
    localStorage.setItem("user_name",  `${firstName.trim()} ${lastName.trim()}`);
    localStorage.setItem("user_email", email.trim());

    setTimeout(() => {
      setLoading(false);
      router.push("/connect-linkedin");
    }, 900);
  };
    const handleLinkedinLogin = async () => {
      setLiLoading(true);
      try {
        await signIn("linkedin", { callbackUrl: "/connect-linkedin" });
      } catch {
        setError("LinkedIn sign-in failed. Please try again.");
        setLiLoading(false);
      }
    };
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
      style={{
        background:  "#fafafa",
        fontFamily:  "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
     
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(#e8836a 1px, transparent 1px)", backgroundSize: "28px 28px" }}/>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-[440px] relative z-10"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "#111" }}>
              <Command className="w-5 h-5" style={{ color: "#e8836a" }} />
            </div>
            <span className="text-xl font-bold tracking-tight" style={{ color: "#111", fontFamily: "'Outfit', sans-serif" }}>
              NexusFlow
            </span>
          </Link>
          <h1 className="text-2xl font-bold" style={{ color: "#111", fontFamily: "'Outfit', sans-serif" }}>
            Create your account
          </h1>
          <p className="mt-1.5 text-sm" style={{ color: "#888" }}>
            Start your 7-day free trial today
          </p>
        </div>

        <div className="bg-white border rounded-3xl p-8 shadow-sm" style={{ borderColor: "#e5e5e5" }}>
          <form onSubmit={handleSignup} className="space-y-4">
        
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "First Name", value: firstName, setter: setFirstName, placeholder: "John" },
                { label: "Last Name",  value: lastName,  setter: setLastName,  placeholder: "Doe"  },
              ].map(f => (
                <div key={f.label} className="space-y-1.5">
                  <label className="text-xs font-semibold" style={{ color: "#555" }}>{f.label}</label>
                  <input
                    type="text"
                    placeholder={f.placeholder}
                    value={f.value}
                    onChange={e => f.setter(e.target.value)}
                    required
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                    style={{ background: "#f8f8f8", border: "1px solid #e5e5e5", color: "#111" }}
                    onFocus={e  => { e.target.style.borderColor = "#e8836a"; e.target.style.background = "#fff"; }}
                    onBlur={e   => { e.target.style.borderColor = "#e5e5e5"; e.target.style.background = "#f8f8f8"; }}
                  />
                </div>
              ))}
            </div>

         
            <div className="space-y-1.5">
              <label className="text-xs font-semibold" style={{ color: "#555" }}>Email Address</label>
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                style={{ background: "#f8f8f8", border: "1px solid #e5e5e5", color: "#111" }}
                onFocus={e  => { e.target.style.borderColor = "#e8836a"; e.target.style.background = "#fff"; }}
                onBlur={e   => { e.target.style.borderColor = "#e5e5e5"; e.target.style.background = "#f8f8f8"; }}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold" style={{ color: "#555" }}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                style={{ background: "#f8f8f8", border: "1px solid #e5e5e5", color: "#111" }}
                onFocus={e  => { e.target.style.borderColor = "#e8836a"; e.target.style.background = "#fff"; }}
                onBlur={e   => { e.target.style.borderColor = "#e5e5e5"; e.target.style.background = "#f8f8f8"; }}
              />
              <p className="text-[11px]" style={{ color: "#aaa" }}>At least 8 characters</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 group transition-all"
              style={{
                background:  loading ? "#f5c5b5" : "#e8836a",
                cursor:      loading ? "not-allowed" : "pointer",
                boxShadow:   "0 4px 14px rgba(232,131,106,0.25)",
              }}
            >
              {loading ? "Creating account…" : "Get started"}
              {!loading && <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" style={{ borderColor: "#f0f0f0" }} />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-[11px] font-medium" style={{ color: "#aaa" }}>
                Or continue with
              </span>
            </div>
          </div>

           <div className="space-y-3 mb-6">
                      <button
                        type="button"
                        onClick={handleLinkedinLogin}
                        disabled={liLoading}
                        className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-semibold transition-all border"
                        style={{
                          background:   liLoading ? "#e8f0fb" : "#fff",
                          borderColor:  "#0077B5",
                          color:        "#0077B5",
                          opacity:      liLoading ? 0.7 : 1,
                          cursor:       liLoading ? "not-allowed" : "pointer",
                        }}
                        onMouseEnter={e => { if (!liLoading) (e.currentTarget as HTMLElement).style.background = "#e8f0fb"; }}
                        onMouseLeave={e => { if (!liLoading) (e.currentTarget as HTMLElement).style.background = "#fff"; }}
                      >
                        <LinkedinLogo size={20} weight="fill" style={{ color: "#0077B5" }} />
                        {liLoading ? "Redirecting to LinkedIn…" : "Continue with LinkedIn"}
                      </button>
          
                      {/* <button
                        type="button"
                        className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-medium transition-all border"
                        style={{ background: "#fff", borderColor: "#e5e5e5", color: "#333" }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#f8f8f8"}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#fff"}
                      >
                        <GoogleLogoIcon size={18} weight="bold" />
                        Continue with Google
                      </button> */}
                    </div>
        </div>

        <p className="text-center mt-6 text-sm" style={{ color: "#888" }}>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold hover:underline underline-offset-4" style={{ color: "#e8836a" }}>
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;