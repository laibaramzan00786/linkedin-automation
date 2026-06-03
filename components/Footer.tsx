'use client';
import { Mail, Command } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const cols = [
    {
      title: "What's Included",
      links: [
        { label: 'LinkedIn Lead Generation', href: '/product' },
        { label: 'Twitter Engagement', href: '/product' },
        { label: 'Multichannel Sequences', href: '/product' },
        { label: 'LinkedIn Inbox Manager', href: '/product' },
        { label: 'Team Collaboration', href: '/product' },
        { label: 'AI-Personalization', href: '/product' },
        { label: 'LinkedIn Message Templates', href: '/product' },
      ],
    },
    {
      title: 'More Features',
      links: [
        { label: 'Email Outreach', href: '/product' },
        { label: 'Lead Finder', href: '/product' },
        { label: 'LinkedIn CRM', href: '/product' },
        { label: 'Reporting & Tracking', href: '/product' },
        { label: 'Social Media Posting', href: '/product' },
        { label: 'Integrations', href: '/product' },
        { label: 'Customizable AI Settings', href: '/product' },
      ],
    },
    {
      title: 'Compare',
      links: [
        { label: 'NexusFlow vs Dripify', href: '/compare/vs-dripify' },
        { label: 'NexusFlow vs Linked Helper', href: '/compare/vs-linked-helper' },
        { label: 'NexusFlow vs Meet Alfred', href: '/compare/vs-meet-alfred' },
        { label: 'NexusFlow vs Manual Outreach', href: '/compare/vs-manual-outreach' },
        { label: 'ProspectIn', href: '#' },
        { label: 'Waalaxy', href: '#' },
        { label: 'Zopto', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'Our Story', href: '#' },
        { label: 'Meet the Team', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Help Articles', href: '#' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Agencies', href: '/solutions#growth-agencies' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Guides', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Articles', href: '#' },
        { label: 'Videos', href: '#' },
        { label: 'YouTube', href: '#' },
        { label: 'Watch Demo', href: '#' },
        { label: 'Sitemap', href: '#' },
      ],
    },
  ];

  const legal = [
    { label: 'Terms', href: '#' },
    { label: 'Privacy', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'Fair Billing', href: '#' },
  ];

  return (
    <footer
      className="border-t pt-20 pb-10"
      style={{ background: '#fafafa', borderColor: '#e5e5e5', fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">

          <div className="lg:col-span-3">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#e8836a' }}>
                <Command size={18} className="text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight" style={{ color: '#111', fontFamily: "'Outfit', sans-serif" }}>
                NexusFlow
              </span>
            </div>
            <a
              href="mailto:help@nexusflow.com"
              className="flex items-center gap-2 text-sm mb-6 transition-colors"
              style={{ color: '#888' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#e8836a'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#888'}
            >
              <Mail size={14} />
              help@nexusflow.com
            </a>
            <div className="rounded-2xl border p-5" style={{ background: '#fff', borderColor: '#e5e5e5' }}>
              <p className="text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: '#e8836a' }}>
                Automate Today
              </p>
              <p className="text-sm" style={{ color: '#888' }}>
                Join 2,000+ teams scaling their outreach with AI.
              </p>
            </div>
          </div>

          <div className="lg:col-span-9 grid grid-cols-2 md:grid-cols-5 gap-8">
            {cols.map(col => (
              <div key={col.title}>
                <h4
                  className="text-[11px] font-bold uppercase tracking-wider mb-5 pb-3 border-b"
                  style={{ color: '#333', borderColor: '#ebebeb', fontFamily: "'Outfit', sans-serif" }}
                >
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map(link => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[12px] font-medium transition-colors"
                        style={{ color: '#888' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#e8836a'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#888'}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: '#e5e5e5' }}>
          <div className="flex flex-wrap gap-6">
            {legal.map(item => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[11px] font-semibold uppercase tracking-wider transition-colors"
                style={{ color: '#bbb' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#555'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#bbb'}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: '#ccc' }}>
            © 2026 NexusFlow Inc.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;