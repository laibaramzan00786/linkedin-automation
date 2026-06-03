'use client';
import { Check, X, Clock, Zap, BarChart3, Users, ArrowRight,Star } from "lucide-react";
import { motion } from "motion/react";
import Footer from "@/components/Footer";

export default function VsManualOutreachDetails() {
    const comparisonRows = [
      { feature: "Daily Prospects Reached", nexus: "Up to 50", manual: "20–30", nexusWins: true },
      { feature: "Follow-Up Consistency", nexus: "100% — Every time", manual: "Irregular", nexusWins: true },
      { feature: "Hours Spent Per Month", nexus: "Under 2 hours", manual: "50–60 hours", nexusWins: true },
      { feature: "Average Reply Rate", nexus: "Up to 38%", manual: "2–3%", nexusWins: true },
      { feature: "Runs 24/7", nexus: true, manual: false, nexusWins: true },
      { feature: "Scales Without Extra Cost", nexus: true, manual: false, nexusWins: true },
      { feature: "Pipeline Visibility", nexus: "Real-time analytics", manual: "Spreadsheets", nexusWins: true },
      { feature: "Monthly Cost", nexus: "$9", manual: "$1,200+ in time value", nexusWins: true },
    ];
    
    const advantages = [
      {
        icon: <Clock size={24} />,
        title: "Consistency That Never Breaks",
        body: "Manual outreach is dependent on your energy, your schedule, and your mood. On a great week, you might reach 150 prospects. On a busy week, 20. NexusFlow runs at the same pace every single day — 50 prospects, every follow-up, every campaign step — regardless of what is happening in your week."
      },
      {
        icon: <Users size={24} />,
        title: "Follow-Up That Never Gives Up",
        body: "Research shows the majority of LinkedIn conversions happen after the 3rd or 4th touchpoint. The majority of sales professionals never get past the 1st or 2nd — not because they don't want to follow up, but because manually tracking follow-up timing across 200 active prospects is not humanly manageable. NexusFlow tracks every prospect's position in every sequence and executes every follow-up at exactly the right time."
      },
      {
        icon: <Zap size={24} />,
        title: "Personalization at a Scale No Human Can Match",
        body: "NexusFlow's dynamic message variables mean every prospect receives a message that includes their name, company, role, and industry — regardless of whether you are messaging 5 people or 500. The message reads personally. The scale is unlimited. Manual outreach cannot offer both simultaneously."
      },
      {
        icon: <BarChart3 size={24} />,
        title: "Pipeline Intelligence You Cannot Build in a Spreadsheet",
        body: "NexusFlow's analytics dashboard shows you connection acceptance rates, reply rates, campaign conversion funnels, optimal send times, and message performance data — all updated in real time. Manual outreach gives you a spreadsheet. NexusFlow gives you a performance engine."
      },
    ];
    
    const timeline = [
      { day: "Day 1", desc: "Sign up. Connect your LinkedIn account. Build your first campaign targeting your ideal prospects. Launch. Total time: under 30 minutes." },
      { day: "Day 7", desc: "Review your analytics. See your connection acceptance rate, your reply rate, your top-performing message. Optimize one thing based on real data." },
      { day: "Day 14", desc: "Your sequence is running on autopilot. Prospects who accepted your connection are receiving follow-ups automatically. You are responding to replies — the high-value work — and nothing else." },
      { day: "Day 30", desc: "1,500 prospects reached. Consistent follow-up executed across all of them. Pipeline full. Time spent: under 2 hours total for the month." },
    ];
    
    const testimonials = [
      {
        quote: "Before NexusFlow I was spending 4 hours a day on LinkedIn and getting maybe 4–5 replies a week. Three weeks after switching, I get 18–22 replies per week and spend 20 minutes a day on it. The math is so overwhelming I am embarrassed it took me this long.",
        name: "Daniel Okoye",
        role: "Sales Director"
      },
      {
        quote: "I used to think manual outreach showed more effort and prospects could tell. Then I looked at my reply rates versus my colleague who uses NexusFlow. Same message quality. His reply rate is 4x mine. Automation is not a shortcut — it is the correct strategy.",
        name: "Sophie Laurent",
        role: "Senior Recruiter"
      },
      {
        quote: "Running my first NexusFlow campaign felt almost unfair. While I was in client meetings, the tool was out there reaching new prospects, following up with old ones, and warming up leads. I came back to 11 new replies in my inbox. That never happened with manual outreach.",
        name: "Tom Richards",
        role: "Business Development"
      },
    ];
    
    const CellValue = ({ val }: { val: boolean | string }) => {
      if (val === true) return <div className="flex justify-center"><div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><Check size={13} className="text-[#10b981]" /></div></div>;
      if (val === false) return <div className="flex justify-center"><div className="w-6 h-6 rounded-full flex items-center justify-center"><X size={13} className="text-zinc-600" /></div></div>;
      return <span className="text-sm font-semibold text-zinc-700">{val}</span>;
    };
    return (
        <>
                <div className="bg-zinc-950 py-5 px-6">
                  <p className="text-center text-white text-sm font-medium">
                     Top performers have already automated. The gap is{" "}
                    <span className="text-[#e8836a] font-bold">compounding every month.</span>
                  </p>
                </div>
        
                <section className="py-24 px-6">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 tracking-tight">The Numbers Don't Lie</h2>
                    <p className="text-zinc-500 text-center mb-14 font-medium">Manual outreach vs NexusFlow — side by side</p>
                    <div className="rounded-[32px] border border-zinc-200 overflow-hidden shadow-[0_20px_60px_-10px_rgba(0,0,0,0.08)]">
                      <div className="grid grid-cols-3 bg-zinc-950 px-8 py-5">
                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Metric</p>
                        <p className="text-xs font-bold text-[#e8836a] uppercase tracking-widest text-center">NexusFlow</p>
                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest text-center">Manual Outreach</p>
                      </div>
                      {comparisonRows.map((row, i) => (
                        <div key={i} className={`grid grid-cols-3 px-8 py-5 items-center border-t border-zinc-100 ${row.nexusWins ? "bg-[#fdf2f0]/30" : "bg-white"}`}>
                          <p className="text-sm font-semibold text-zinc-700">{row.feature}</p>
                          <div className="text-center"><CellValue val={row.nexus} /></div>
                          <div className="text-center"><CellValue val={row.manual} /></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
        
                <section className="py-24 px-6 bg-zinc-50">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 tracking-tight">NexusFlow Gives You What Manual Outreach Never Can</h2>
                    <p className="text-zinc-500 text-center mb-14 font-medium">4 performance gaps that only widen over time</p>
                    <div className="space-y-6">
                      {advantages.map((a, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                          className="bg-white rounded-[24px] border border-zinc-200 p-8 flex gap-6 shadow-sm hover:shadow-md transition-shadow">
                          <div className="w-12 h-12 bg-[#fdf2f0] text-[#e8836a] rounded-2xl flex items-center justify-center flex-shrink-0 border border-[#feedea]">
                            {a.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold mb-2 text-zinc-900">{a.title}</h3>
                            <p className="text-zinc-500 leading-relaxed font-medium text-sm">{a.body}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>
        
                <section className="py-24 px-6">
                  <div className="max-w-3xl mx-auto">
                    <div className="bg-zinc-950 rounded-[32px] p-12 text-center relative overflow-hidden">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#e8836a]/10 rounded-full blur-[80px] pointer-events-none" />
                      <div className="relative z-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">The Mindset Shift</h2>
                        <p className="text-zinc-400 leading-relaxed mb-6 font-medium">
                          Manual outreach feels productive because it is active. You are doing something. Typing, clicking, sending.
                        </p>
                        <p className="text-zinc-400 leading-relaxed mb-6 font-medium">
                          But productivity is not about activity — it is about output per hour. A sales professional spending 4 hours on manual LinkedIn outreach and generating 3 replies per week is less productive than one spending 20 minutes reviewing their NexusFlow dashboard and generating 15 replies per week.
                        </p>
                        <p className="text-[#e8836a] font-bold text-lg">
                          The goal is not to work harder on LinkedIn. The goal is to close more deals.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
        
                <section className="py-24 px-6 bg-zinc-50">
                  <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 tracking-tight">The NexusFlow Difference — In Practice</h2>
                    <p className="text-zinc-500 text-center mb-14 font-medium">What your first 30 days look like</p>
                    <div className="relative">
                      <div className="absolute left-6 top-0 bottom-0 w-px bg-zinc-200" />
                      <div className="space-y-8">
                        {timeline.map((t, i) => (
                          <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                            className="flex gap-6 pl-16 relative">
                            <div className="absolute left-0 w-12 h-12 bg-[#e8836a] text-white rounded-2xl flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-lg shadow-[#e8836a]/20">
                              {t.day.replace("Day ", "D")}
                            </div>
                            <div className="bg-white rounded-[20px] border border-zinc-200 p-6 flex-1 shadow-sm">
                              <p className="font-bold text-zinc-900 text-sm mb-1">{t.day}</p>
                              <p className="text-zinc-500 text-sm leading-relaxed font-medium">{t.desc}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
        
                <section className="py-24 px-6">
                  <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 tracking-tight">What Real Users Experience</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                      {testimonials.map((t, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                          className="bg-zinc-50 rounded-[24px] border border-zinc-200 p-8">
                          <div className="flex gap-1 mb-4">
                            {[...Array(5)].map((_, s) => <Star key={s} size={14} fill="#e8836a" className="text-[#e8836a]" />)}
                          </div>
                          <p className="text-zinc-700 leading-relaxed mb-6 font-medium text-sm">"{t.quote}"</p>
                          <div>
                            <p className="font-bold text-zinc-900 text-sm">{t.name}</p>
                            <p className="text-xs text-zinc-400 font-medium">{t.role}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>
        
                <section className="py-32 px-6 bg-zinc-950 relative overflow-hidden">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e8836a]/10 rounded-full blur-[120px] pointer-events-none" />
                  <div className="max-w-3xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                      Stop Outworking the Problem.{" "}
                      <span className="text-[#e8836a]">Start Outsmarting It.</span>
                    </h2>
                    <p className="text-zinc-400 font-medium mb-8 max-w-xl mx-auto leading-relaxed">
                      NexusFlow automates every repetitive part of LinkedIn outreach — connection requests, follow-ups, profile visits, engagement — so you spend your time on what only you can do: building real relationships and closing real deals.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                      <button className="px-10 py-5 bg-[#e8836a] text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#d4714a] transition-all shadow-xl flex items-center gap-2 justify-center">
                        Start Your Free Trial <ArrowRight size={16} />
                      </button>
                      <button className="px-10 py-5 border border-white/20 text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
                        Watch 2-Min Demo
                      </button>
                    </div>
                    <p className="text-zinc-500 text-sm">No credit card · Launch your first campaign in 5 minutes · $9/month</p>
                  </div>
                </section>
                <Footer/>
                
                </>
    )
}