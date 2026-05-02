
'use client'
import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, MailCheck,Command } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-[#e8836a]/30">

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#e8836a_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-[440px] relative z-10"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6 group">
            <div className="w-11 h-11 bg-zinc-950 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <Command className="text-[#e8836a] w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-950">NexusFlow</span>
          </Link>
          <h1 className="text-2xl font-bold text-zinc-950">Reset your password</h1>
          <p className="text-zinc-500 mt-2">Enter your email for a recovery link</p>
        </div>

        <div className="bg-white border border-zinc-200 p-8 md:p-10 rounded-3xl shadow-sm">
          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-700 ml-1">Work Email</label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#e8836a]/20 focus:border-[#e8836a] transition-all font-medium"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#e8836a] text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-[#d8735a] transition-all flex items-center justify-center gap-2 group shadow-lg shadow-[#e8836a]/10 disabled:opacity-70"
              >
                {loading ? "Sending..." : "Send link"}
                {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <div className="w-16 h-16 bg-[#e8836a]/10 text-[#e8836a] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MailCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-zinc-950 mb-2">Check your email</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                We've sent a recovery link to <br/>
                <span className="text-zinc-950 font-semibold">{email}</span>.
              </p>
              <button 
                onClick={() => setSent(false)}
                className="text-sm font-semibold text-[#e8836a] hover:underline underline-offset-4"
              >
                Try a different email
              </button>
            </motion.div>
          )}
        </div>

        <p className="text-center mt-8 text-sm text-zinc-500">
          Remembered your password?{" "}
          <Link href="/login" className="text-[#e8836a] font-semibold hover:underline underline-offset-4 ml-1">Sign in</Link>
        </p>
      </motion.div>

      <div className="fixed bottom-6 text-center w-full text-[11px] text-zinc-400">
        Need help? Contact our support team.
      </div>
    </div>
  );
};

export default ForgotPassword;
