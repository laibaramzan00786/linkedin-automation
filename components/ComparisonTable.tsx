'use client';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

type Val = string | boolean;

interface Row {
  feature: string;
  nexus: Val;
  dripify: Val;
  linkedHelper: Val;
  meetAlfred: Val;
}

const rows: Row[] = [
  { feature: 'Starting Price',             nexus: '$5 / mo',    dripify: '$39 / mo',      linkedHelper: '$15 / mo',     meetAlfred: '$49 / mo'    },
  { feature: 'Free Trial No Card',       nexus: true,         dripify: false,            linkedHelper: false,          meetAlfred: false         },
  { feature: 'Setup Time',                 nexus: '< 5 min',    dripify: '15–20 min',      linkedHelper: '30–45 min',    meetAlfred: '30+ min'     },
  { feature: 'Runs 24/7 Cloud Based',    nexus: true,         dripify: true,             linkedHelper: false,          meetAlfred: true          },
  { feature: 'No Browser Extension',       nexus: true,         dripify: true,             linkedHelper: false,          meetAlfred: true          },
  { feature: 'Connection Req. Automation', nexus: true,         dripify: true,             linkedHelper: true,           meetAlfred: true          },
  { feature: 'Multi-Step Drip Campaigns',  nexus: 'All plans',  dripify: 'Higher tier',    linkedHelper: true,           meetAlfred: true          },
  { feature: 'Smart Conditional Logic',    nexus: 'All plans',  dripify: 'Pro only',       linkedHelper: true,           meetAlfred: true          },
  { feature: 'Profile Visit Automation',   nexus: true,         dripify: true,             linkedHelper: true,           meetAlfred: true          },
  { feature: 'LinkedIn-Only Focus',        nexus: true,         dripify: true,             linkedHelper: true,           meetAlfred: false         },
  { feature: 'Account Safety System',      nexus: 'AI-dynamic', dripify: 'Fixed limits',   linkedHelper: 'Basic',        meetAlfred: 'Generalist'  },
  { feature: 'Real-Time Analytics',        nexus: true,         dripify: true,             linkedHelper: 'Local only',   meetAlfred: true          },
  { feature: 'Interface Complexity',       nexus: 'Clean',      dripify: 'Complex',        linkedHelper: 'Very complex', meetAlfred: 'Complex'     },
];

const Check = ({ isNexus }: { isNexus?: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M6 10l3 3 5-6" stroke={isNexus ? '#1d1d1d' : '#1d1d1d'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Cross = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M7 7l6 6M13 7l-6 6" stroke="#1d1d1d" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const Cell = ({ val, isNexus }: { val: Val; isNexus?: boolean }) => {
  if (val === true)  return <span style={{ display: 'flex', justifyContent: 'center' }}><Check isNexus={isNexus} /></span>;
  if (val === false) return <span style={{ display: 'flex', justifyContent: 'center' }}><Cross /></span>;
  return (
    <span style={{
      fontSize: 13,
      fontWeight: isNexus ? 500 : 400,
      color: isNexus ? '#e8836a' : '#888',
    }}>
      {val}
    </span>
  );
};

const compareLinks = [
  { label: 'vs Dripify',       href: '/compare/vs-dripify'       },
  { label: 'vs Linked Helper', href: '/compare/vs-linked-helper' },
  { label: 'vs Meet Alfred',   href: '/compare/vs-meet-alfred'   },
];

export default function ComparisonTable() {
  return (
    <section style={{
      background: '#fff',
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      padding: '5rem 2rem',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          <h2 style={{
            fontSize: 'clamp(26px, 4vw, 38px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#111',
            fontFamily: "'Outfit', sans-serif",
            marginBottom: '0.5rem',
          }}>
            Feature-by-Feature Comparison
          </h2>
          <p style={{ fontSize: 15, color: '#888', margin: 0 }}>
            NexusFlow vs competitors every feature that matters
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            borderRadius: 16,
            border: '1px solid #e0e0e0',
            overflow: 'hidden',
            boxShadow: '0 2px 24px rgba(0,0,0,0.05)',
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              tableLayout: 'fixed',
              minWidth: 700,
            }}>
              <colgroup>
                <col style={{ width: '34%' }} />
                <col style={{ width: '16.5%' }} />
                <col style={{ width: '16.5%' }} />
                <col style={{ width: '16.5%' }} />
                <col style={{ width: '16.5%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th style={{
                    background: '#111',
                    padding: '18px 28px',
                    textAlign: 'left',
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#a8a5a5',
                  }}>
                    Feature
                  </th>

                  <th style={{
                    background: '#111',
                    padding: '18px 16px',
                    textAlign: 'center',
                    borderLeft: '1px solid #252525',
                  }}>
                    <span style={{
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#e8836a',
                    }}>
                      NexusFlow
                    </span>
                  </th>

                  {[
                    { name: 'Dripify' },
                    { name: 'Linked Helper' },
                    { name: 'Meet Alfred' },
                  ].map(c => (
                    <th key={c.name} style={{
                      background: '#111',
                      padding: '18px 16px',
                      textAlign: 'center',
                      borderLeft: '1px solid #252525',
                    }}>
                      <span style={{
                        fontSize: 12,
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: '#a8a5a5',
                      }}>
                        {c.name}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: i < rows.length - 1 ? '1px solid #f0f0f0' : 'none',
                      background: '#fff',
                    }}
                  >
                    <td style={{
                      padding: '18px 28px',
                      fontSize: 14,
                      fontWeight: 400,
                      color: '#333',
                    }}>
                      {row.feature}
                    </td>

                    <td style={{
                      padding: '16px 16px',
                      textAlign: 'center',
                      borderLeft: '1px solid #f0f0f0',
                    }}>
                      <Cell val={row.nexus} isNexus />
                    </td>

                    {(['dripify', 'linkedHelper', 'meetAlfred'] as const).map(key => (
                      <td key={key} style={{
                        padding: '16px 16px',
                        textAlign: 'center',
                        borderLeft: '1px solid #f0f0f0',
                      }}>
                        <Cell val={row[key]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '34% 16.5% 16.5% 16.5% 16.5%',
              minWidth: 700,
              borderTop: '1px solid #f0f0f0',
              background: '#fafafa',
            }}>
            
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}