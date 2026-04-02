'use client'
import { CheckCircle2 } from 'lucide-react';

const WhiteSection = () => {
  return (
    <section className="light-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-blue-100 rounded-[40px] -rotate-2" />
            <img 
              src="https://www.poudelsudarshan.com.np/wp-content/uploads/2024/04/24372259_6909932.jpg" 
              alt="Team working" 
              className="relative rounded-[32px]  hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="text-blue-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">The Human Touch</span>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-8 leading-[1.1]">Automation that <br /> feels <span className="italic">personal.</span></h2>
            <p className="text-zinc-600 text-lg mb-10 leading-relaxed">
              Most automation tools sound like robots. NexusFlow uses advanced natural language processing to ensure every interaction feels like it came from a human.
            </p>
            <ul className="space-y-6">
              {[
                "Dynamic personalization based on lead history",
                "Smart timing that respects timezones and holidays",
                "Human-in-the-loop approval workflows",
                "Automatic follow-ups that don't feel spammy"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 font-bold text-zinc-800">
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="text-white" size={14} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhiteSection;