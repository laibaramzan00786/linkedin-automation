'use client';
import { Mail} from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    whatsIncluded: [
      { name: 'Linkedin Lead Generation', href: '#' },
      { name: 'Twitter Engagement', href: '#' },
      { name: 'Multichannel Sequences', href: '#' },
      { name: 'LinkedIn Inbox Manager', href: '#' },
      { name: 'Team Collaboration', href: '#' },
      { name: 'AI-Personalization', href: '#' },
      { name: 'LinkedIn Message Templates', href: '#' },
      { name: 'White Label', href: '#' },
    ],
    whatsIncludedCol2: [
      { name: 'Email Outreach', href: '#' },
      { name: 'Lead Finder', href: '#', badge: 'New' },
      { name: 'Linkedin CRM', href: '#', badge: 'New' },
      { name: 'Reporting & Tracking', href: '#' },
      { name: 'Social media posting', href: '#' },
      { name: 'Integrations', href: '#' },
      { name: 'Customizable AI Settings', href: '#', badge: 'New' },
      { name: 'Cloud Infrastructure', href: '#', badge: 'New' },
    ],
    compare: [
      { name: 'Skylead.io', href: '#' },
      { name: 'Linked Helper', href: '#' },
      { name: 'Dripify', href: '#' },
      { name: 'ProspectIn', href: '#' },
      { name: 'Waalaxy', href: '#' },
      { name: 'Zopto', href: '#' },
      { name: 'Salesflow', href: '#' },
      { name: 'Expandi', href: '#' },
    ],
    company: [
      { name: 'Our Story', href: '#' },
      { name: 'Meet the Team', href: '#' },
    ],
    resources: [
      { name: 'Guides', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Articles', href: '#' },
      { name: 'Videos', href: '#' },
      { name: 'YouTube', href: '#' },
      { name: 'Watch Demo', href: '#' },
      { name: 'Sitemap', href: '#' },
      { name: 'Reviews', href: '#' },
      { name: 'Help Articles', href: '#' },
    ],
    help: [
      { name: 'Agencies', href: '#' },
      { name: 'Pricing', href: '#' },
    ]
  };

  return (
    <footer className="bg-[#001a4d] text-white pt-24 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-3">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <div className="text-[#001a4d] font-bold text-2xl">NF</div>
                </div>
              </div>
              <a href="mailto:help@NexusFlow.com" className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors mb-8">
                <Mail size={16} />
                help@NexusFlow.com
              </a>
          
            </div>
          </div>

        
          <div className="lg:col-span-9 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            <div className="col-span-2 grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <h4 className="font-bold text-[13px] uppercase tracking-wider mb-6">What's Included?</h4>
              </div>
              <ul className="space-y-3">
                {footerLinks.whatsIncluded.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-[13px] text-slate-300 hover:text-white transition-colors">{link.name}</a>
                  </li>
                ))}
              </ul>
              <ul className="space-y-3">
                {footerLinks.whatsIncludedCol2.map((link) => (
                  <li key={link.name} className="flex items-center gap-2">
                    <a href={link.href} className="text-[13px] text-slate-300 hover:text-white transition-colors">{link.name}</a>
                    {link.badge && (
                      <span className="bg-blue-600 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase">{link.badge}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[13px] uppercase tracking-wider mb-6">Compare</h4>
              <ul className="space-y-3">
                {footerLinks.compare.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-[13px] text-slate-300 hover:text-white transition-colors">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[13px] uppercase tracking-wider mb-6">Company</h4>
              <ul className="space-y-3 mb-8">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-[13px] text-slate-300 hover:text-white transition-colors">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[13px] uppercase tracking-wider mb-6">Resources</h4>
              <ul className="space-y-3 mb-8">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-[13px] text-slate-300 hover:text-white transition-colors">{link.name}</a>
                  </li>
                ))}
              </ul>
              <h4 className="font-bold text-[13px] uppercase tracking-wider mb-6">Help</h4>
              <ul className="space-y-3">
                {footerLinks.help.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-[13px] text-slate-300 hover:text-white transition-colors">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
            {['Terms', 'Privacy', 'Cookie Policy', 'Fair Billing Policy', 'Security & Compliance', 'Vulnerability Policy', 'Acceptable Use Policy', 'GDPR', 'Data Processing Agreement'].map((item) => (
              <a key={item} href="#" className="text-[11px] text-slate-400 hover:text-white transition-colors underline underline-offset-4">{item}</a>
            ))}
          </div>
          <p className="text-[11px] text-slate-400">© 2026 NexusFlow</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;