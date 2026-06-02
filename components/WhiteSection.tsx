
"use client";
import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

const WhiteSection = () => {
  const points = [
    "Personalized messages using {first_name}, {company}, and {job_title} variables — automatically",
    "Smart send timing based on when your prospects are most active on LinkedIn",
    "Multi-step follow-up sequences that read naturally — never pushy, never repetitive",
    "Reply detection that pauses campaigns the moment a prospect responds — no awkward double messages",
  ];

  return (
    <section
      id="about"
      className="py-28 relative overflow-hidden"
      style={{
        background: "#fff",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
    
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div
              className="absolute -inset-3 rounded-3xl -rotate-2"
              style={{ background: "#fdf8f7" }}
            />
            
            <img
              src="/image.png"
              alt="NexusFlow LinkedIn automation campaign builder interface"
              className="relative rounded-3xl w-full h-[300px] object-cover"
              referrerPolicy="no-referrer"
            />
            <div
              className="absolute -bottom-6 -right-6 bg-white border rounded-2xl px-5 py-2 shadow-xl hidden md:block"
              style={{ borderColor: "#e5e5e5" }}
            >
              <p
                className="text-base font-bold"
                style={{ color: "#10b981", fontFamily: "'Outfit', sans-serif" }}
              >
                Account
              </p>
              <p
                className="text-base font-bold"
                style={{ color: "#10b981", fontFamily: "'Outfit', sans-serif" }}
              >
                Always Safe
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="text-[11px] font-semibold uppercase tracking-widest"
              style={{ color: "#e8836a" }}
            >
              Why It Works
            </span>

       
            <h2
              className="text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-5 leading-tight"
              style={{ color: "#111", fontFamily: "'Outfit', sans-serif" }}
            >
              Your Prospects Won't Know
              <br />
              It's{" "}
              <span style={{ color: "#e8836a", fontStyle: "italic" }}>
                Automated.
              </span>
              <br />
              <span className="text-3xl md:text-4xl" style={{ color: "#888" }}>
                And That's Exactly the Point.
              </span>
            </h2>

          
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "#888" }}
            >
              Most LinkedIn automation tools send the same message to everyone.
              NexusFlow personalizes every touchpoint using your prospect's
              name, company, role, and activity — so every message reads like
              you spent 10 minutes writing it personally.
            </p>
            

            <ul className="space-y-4">
              {points.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 border"
                    style={{ background: "#fdf8f7", borderColor: "#f5d0c4" }}
                  >
                    <CheckCircle2 size={11} style={{ color: "#e8836a" }} />
                  </div>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#444" }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhiteSection;
