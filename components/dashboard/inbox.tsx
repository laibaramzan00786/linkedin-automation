'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, MoreVertical, Send, User, CheckCheck, Paperclip,
  Smile, Image as ImageIcon, Zap, ExternalLink,
  MapPin, Building2, ChevronLeft, Info, Filter, MessageSquare,
} from 'lucide-react';
import { Contact } from './Network';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface Message {
  id: string;
  senderId: 'me' | string;
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface Conversation {
  id: string;
  contactId: string;
  participant: {
    name: string;
    avatar?: string;
    headline?: string;
    company?: string;
    location?: string;
  };
  messages: Message[];
  updatedAt: string;
  unread: boolean;
  tags?: string[];
}

// ─── localStorage helpers ─────────────────────────────────────────────────────
const STORAGE_KEY = 'nexusflow_conversations';

const DEFAULT_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-sarah',
    contactId: 'sarah-jenkins',
    participant: {
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?fm=jpg&q=60&w=300&auto=format&fit=crop',
      headline: 'Senior HR Manager at TechCorp',
      company: 'TechCorp',
      location: 'Karachi, Pakistan',
    },
    messages: [
      { id: 'm1', senderId: 'sarah-jenkins', content: "Thanks for the info, let's chat! I'm free tomorrow afternoon.", timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), status: 'read' },
      { id: 'm2', senderId: 'me', content: "Perfect! I'll send over the details shortly. Looking forward to connecting.", timestamp: new Date(Date.now() - 3600000).toISOString(), status: 'read' },
    ],
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
    unread: false,
    tags: ['HR', 'Recruitment'],
  },
  {
    id: 'conv-peter',
    contactId: 'peter-sutherland',
    participant: {
      name: 'Peter Sutherland',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?fm=jpg&q=60&w=300&auto=format&fit=crop',
      headline: 'Business Development | NexBridge',
      company: 'NexBridge',
      location: 'Lahore, Pakistan',
    },
    messages: [
      { id: 'm3', senderId: 'me', content: "Hi Peter, I reviewed the proposal tonight and it looks great. Can we schedule a call?", timestamp: new Date(Date.now() - 7200000).toISOString(), status: 'delivered' },
    ],
    updatedAt: new Date(Date.now() - 7200000).toISOString(),
    unread: true,
    tags: ['Business Dev'],
  },
];

function loadFromStorage(): Conversation[] {
  if (typeof window === 'undefined') return DEFAULT_CONVERSATIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // First time — seed with defaults and save
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CONVERSATIONS));
      return DEFAULT_CONVERSATIONS;
    }
    return JSON.parse(raw) as Conversation[];
  } catch {
    return DEFAULT_CONVERSATIONS;
  }
}

function saveToStorage(convs: Conversation[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(convs));
  } catch { /* quota exceeded etc. */ }
}

// ─── Module-level reactive store ──────────────────────────────────────────────
let globalConversations: Conversation[] = loadFromStorage();
let listeners: Array<() => void> = [];

function getConversations() { return globalConversations; }

function subscribe(fn: () => void) {
  listeners.push(fn);
  return () => { listeners = listeners.filter(l => l !== fn); };
}

function notify() {
  saveToStorage(globalConversations);
  listeners.forEach(fn => fn());
}

export function addOrOpenConversation(contact: Contact): string {
  // Re-load from storage first so we have the latest state
  globalConversations = loadFromStorage();
  const existing = globalConversations.find(c => c.contactId === contact.id);
  if (existing) {
    notify();
    return existing.id;
  }
  const newConv: Conversation = {
    id: `conv-${contact.id}`,
    contactId: contact.id,
    participant: {
      name: contact.name,
      avatar: contact.avatar,
      headline: contact.title,
      company: contact.company,
      location: contact.location,
    },
    messages: [],
    updatedAt: new Date().toISOString(),
    unread: false,
    tags: [contact.industry],
  };
  globalConversations = [newConv, ...globalConversations];
  notify();
  return newConv.id;
}

function sendMessageToStore(convId: string, content: string): Message {
  const msg: Message = {
    id: `msg-${Date.now()}`,
    senderId: 'me',
    content,
    timestamp: new Date().toISOString(),
    status: 'sent',
  };
  globalConversations = globalConversations.map(c =>
    c.id !== convId ? c : { ...c, messages: [...c.messages, msg], updatedAt: msg.timestamp }
  );
  notify();
  return msg;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
function useConversations() {
  const [convs, setConvs] = useState<Conversation[]>(() => loadFromStorage());
  useEffect(() => {
    // Sync global with latest storage on mount
    globalConversations = loadFromStorage();
    setConvs([...globalConversations]);
    return subscribe(() => setConvs([...getConversations()]));
  }, []);
  return convs;
}

// ─── Component ────────────────────────────────────────────────────────────────
interface InboxPageProps {
  openContactId?: string | null;
  onClearOpenContact?: () => void;
}

const InboxPage = ({ openContactId, onClearOpenContact }: InboxPageProps) => {
  const conversations = useConversations();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'archived'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-select first conversation on mount (so chat is always visible)
  useEffect(() => {
    if (!selectedId && conversations.length > 0) {
      setSelectedId(conversations[0].id);
    }
  }, [conversations]);

  // Auto-open when coming from NetworkPage
  useEffect(() => {
    if (openContactId) {
      const conv = getConversations().find(c => c.contactId === openContactId);
      if (conv) {
        setSelectedId(conv.id);
        onClearOpenContact?.();
      }
    }
  }, [openContactId]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedId, conversations]);

  const selected = conversations.find(c => c.id === selectedId);

  const filteredConvs = conversations.filter(c => {
    if (activeTab === 'unread' && !c.unread) return false;
    if (activeTab === 'archived') return false;
    if (searchQuery && !c.participant.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedId) return;
    sendMessageToStore(selectedId, messageText.trim());
    setMessageText('');
  };

  const formatTime = (d: string) => {
    const date = new Date(d), now = new Date();
    return date.toDateString() === now.toDateString()
      ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const unreadCount = conversations.filter(c => c.unread).length;

  return (
    <div
      className="flex overflow-hidden rounded-2xl border shadow-sm"
      style={{
        height: 'calc(100vh - 80px)',
        background: 'var(--bg)',
        borderColor: 'var(--border)',
        fontFamily: "'DM Sans','Segoe UI',sans-serif",
      }}
    >
      {/* ── SIDEBAR ── */}
      <div
        className={`flex flex-col border-r shrink-0 transition-all duration-300 w-full md:w-[280px] lg:w-[300px] ${selectedId ? 'hidden md:flex' : 'flex'}`}
        style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}
      >
        {/* Header */}
        <div className="px-4 pt-4 pb-0">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-base font-bold" style={{ color: 'var(--text)' }}>Inbox</h2>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>{conversations.length} conversations</p>
            </div>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white" style={{ background: '#e8836a' }}>
                {unreadCount} unread
              </span>
            )}
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 mb-3">
            <div className="relative flex-1">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted)' }} />
              <input
                placeholder="Search by name..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full rounded-xl py-2.5 pl-9 pr-3 text-sm font-medium outline-none"
                style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--text)' }}
              />
            </div>
            <button className="p-2.5 rounded-xl border" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
              <Filter size={14} style={{ color: 'var(--muted)' }} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b" style={{ borderColor: 'var(--border)' }}>
            {(['all', 'unread', 'archived'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="flex-1 pb-2.5 text-xs font-semibold capitalize relative"
                style={{ color: activeTab === tab ? '#e8836a' : 'var(--muted)' }}>
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="inbox-tab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ background: '#e8836a' }} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
          {filteredConvs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-center px-4">
              <MessageSquare size={24} style={{ color: 'var(--muted)', opacity: 0.3 }} />
              <p className="text-xs mt-2 font-medium" style={{ color: 'var(--muted)' }}>
                {activeTab === 'unread' ? 'No unread messages' : 'No conversations yet'}
              </p>
            </div>
          ) : (
            filteredConvs.map(conv => {
              const lastMsg = conv.messages[conv.messages.length - 1];
              const isActive = selectedId === conv.id;
              return (
                <button key={conv.id} onClick={() => setSelectedId(conv.id)}
                  className="w-full p-3 flex gap-3 text-left rounded-xl transition-all"
                  style={isActive
                    ? { background: 'var(--card)', border: '1px solid var(--border)' }
                    : { border: '1px solid transparent' }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'var(--card)'; }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                  <div className="relative shrink-0">
                    <div className="h-10 w-10 rounded-full overflow-hidden border" style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}>
                      {conv.participant.avatar
                        ? <img src={conv.participant.avatar} alt={conv.participant.name} className="w-full h-full object-cover" />
                        : <div className="w-full h-full flex items-center justify-center"><User size={16} style={{ color: 'var(--muted)' }} /></div>
                      }
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full flex items-center justify-center"
                      style={{ background: '#e8836a', border: '2px solid var(--bg)' }}>
                      <MessageSquare size={7} className="text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold truncate" style={{ color: 'var(--text)' }}>{conv.participant.name}</p>
                      <span className="text-[10px] font-medium shrink-0 ml-1" style={{ color: 'var(--muted)' }}>
                        {lastMsg ? formatTime(lastMsg.timestamp) : formatTime(conv.updatedAt)}
                      </span>
                    </div>
                    <p className="text-xs truncate"
                      style={{ color: conv.unread ? 'var(--text)' : 'var(--muted)', fontWeight: conv.unread ? 600 : 400 }}>
                      {lastMsg
                        ? (lastMsg.senderId === 'me' ? `You: ${lastMsg.content}` : lastMsg.content)
                        : 'Start a conversation...'}
                    </p>
                  </div>
                  {conv.unread && (
                    <div className="w-2 h-2 rounded-full shrink-0 mt-1.5" style={{ background: '#e8836a' }} />
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* ── CHAT AREA ── */}
      <div className={`flex-1 flex flex-col relative min-w-0 ${!selectedId ? 'hidden md:flex' : 'flex'}`}
        style={{ background: 'var(--card)' }}>

        {selected ? (
          <>
            {/* Chat header */}
            <div className="px-4 py-3 border-b flex items-center justify-between"
              style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-3 min-w-0">
                <button onClick={() => setSelectedId(null)} className="md:hidden p-1.5 rounded-lg shrink-0"
                  style={{ color: 'var(--text)' }}>
                  <ChevronLeft size={20} />
                </button>
                <div className="h-9 w-9 rounded-full overflow-hidden border shrink-0"
                  style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
                  {selected.participant.avatar
                    ? <img src={selected.participant.avatar} alt={selected.participant.name} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center"><User size={16} style={{ color: 'var(--muted)' }} /></div>
                  }
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: 'var(--text)' }}>{selected.participant.name}</p>
                  {selected.participant.headline && (
                    <p className="text-[11px] truncate" style={{ color: 'var(--muted)' }}>{selected.participant.headline}</p>
                  )}
                </div>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <button onClick={() => setShowDetails(!showDetails)}
                  className="p-2 rounded-xl border hidden xl:flex items-center justify-center transition-all"
                  style={showDetails
                    ? { background: '#e8836a', borderColor: '#e8836a', color: '#fff' }
                    : { background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--text)' }}>
                  <Info size={15} />
                </button>
                <button className="p-2 rounded-xl border"
                  style={{ background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--text)' }}>
                  <MoreVertical size={15} />
                </button>
              </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
              {/* Messages */}
              <div className="flex-1 flex flex-col min-w-0" style={{ background: 'var(--bg)' }}>
                <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
                  {selected.messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border"
                        style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
                        {selected.participant.avatar
                          ? <img src={selected.participant.avatar} alt="" className="w-full h-full object-cover" />
                          : <div className="w-full h-full flex items-center justify-center"><User size={28} style={{ color: 'var(--muted)' }} /></div>
                        }
                      </div>
                      <div>
                        <p className="text-sm font-bold" style={{ color: 'var(--text)' }}>{selected.participant.name}</p>
                        <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{selected.participant.headline}</p>
                      </div>
                      <p className="text-xs px-6" style={{ color: 'var(--muted)' }}>
                        Start a conversation with {selected.participant.name.split(' ')[0]}. Your message will be saved here.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-center">
                        <span className="text-xs font-medium px-3 py-1 rounded-full border"
                          style={{ color: 'var(--muted)', borderColor: 'var(--border)', background: 'var(--card)' }}>
                          {new Date(selected.messages[0].timestamp).toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      {selected.messages.map((msg, i) => {
                        const isMe = msg.senderId === 'me';
                        return (
                          <motion.div key={msg.id}
                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                            className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] space-y-1 flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                              <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${isMe ? 'rounded-tr-sm text-white' : 'rounded-tl-sm border font-medium'}`}
                                style={isMe
                                  ? { background: '#e8836a' }
                                  : { background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--text)' }}>
                                {msg.content}
                              </div>
                              <div className={`flex items-center gap-1 px-1 ${isMe ? 'flex-row-reverse' : ''}`}>
                                <span className="text-[10px]" style={{ color: 'var(--muted)' }}>{formatTime(msg.timestamp)}</span>
                                {isMe && <CheckCheck size={12} style={{ color: msg.status === 'read' ? '#e8836a' : 'var(--muted)' }} />}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </>
                  )}
                </div>

                {/* Input */}
                <div className="p-3 border-t" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
                  <form onSubmit={handleSend} className="relative">
                    <textarea
                      value={messageText}
                      onChange={e => setMessageText(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(e as any); } }}
                      placeholder={`Message ${selected.participant.name.split(' ')[0]}...`}
                      rows={2}
                      className="w-full border rounded-xl py-3 pl-4 pr-24 text-sm font-medium outline-none resize-none"
                      style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
                    />
                    <div className="absolute right-2 bottom-2 flex items-center gap-1">
                      {[{ icon: Smile }, { icon: Paperclip }].map(({ icon: Icon }, idx) => (
                        <button key={idx} type="button" className="p-1.5 rounded-lg" style={{ color: 'var(--muted)' }}>
                          <Icon size={16} />
                        </button>
                      ))}
                      <button type="submit" disabled={!messageText.trim()}
                        className="p-2 rounded-xl text-white disabled:opacity-40 transition-opacity"
                        style={{ background: '#e8836a' }}>
                        <Send size={14} />
                      </button>
                    </div>
                  </form>
                  <div className="flex items-center justify-between mt-2 px-1">
                    <div className="flex gap-3">
                      {[{ icon: ImageIcon, label: 'Image' }, { icon: Zap, label: 'Template' }].map(({ icon: Icon, label }) => (
                        <button key={label} className="flex items-center gap-1 text-xs font-semibold" style={{ color: 'var(--muted)' }}>
                          <Icon size={12} /> {label}
                        </button>
                      ))}
                    </div>
                    <span className="text-[10px]" style={{ color: 'var(--muted)' }}>Enter to send</span>
                  </div>
                </div>
              </div>

              {/* Details panel */}
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }} animate={{ width: 260, opacity: 1 }} exit={{ width: 0, opacity: 0 }}
                    className="hidden xl:flex flex-col border-l overflow-hidden"
                    style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}>
                    <div className="p-4 space-y-5 overflow-y-auto flex-1">
                      <div className="text-center space-y-3">
                        <div className="h-16 w-16 rounded-full overflow-hidden border-2 mx-auto"
                          style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
                          {selected.participant.avatar
                            ? <img src={selected.participant.avatar} alt="" className="w-full h-full object-cover" />
                            : <div className="w-full h-full flex items-center justify-center"><User size={24} style={{ color: 'var(--muted)' }} /></div>
                          }
                        </div>
                        <div>
                          <p className="text-sm font-bold" style={{ color: 'var(--text)' }}>{selected.participant.name}</p>
                          {selected.participant.headline && (
                            <p className="text-[11px] mt-0.5 leading-snug" style={{ color: 'var(--muted)' }}>{selected.participant.headline}</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 py-2 text-white rounded-xl text-xs font-semibold" style={{ background: '#e8836a' }}>
                            View Profile
                          </button>
                          <button className="p-2 rounded-xl border"
                            style={{ background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--text)' }}>
                            <ExternalLink size={13} />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {[
                          { label: 'Company', icon: Building2, value: selected.participant.company },
                          { label: 'Location', icon: MapPin, value: selected.participant.location },
                        ].filter(r => r.value).map(({ label, icon: Icon, value }) => (
                          <div key={label} className="p-3 rounded-xl border"
                            style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
                            <p className="text-[10px] font-semibold mb-1" style={{ color: 'var(--muted)' }}>{label}</p>
                            <div className="flex items-center gap-2">
                              <Icon size={12} style={{ color: 'var(--muted)' }} />
                              <span className="text-xs font-semibold" style={{ color: 'var(--text)' }}>{value}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>Tags</p>
                        <div className="flex flex-wrap gap-1.5">
                          {selected.tags?.map(tag => (
                            <span key={tag} className="px-2 py-0.5 rounded-lg border text-xs"
                              style={{ background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--text)' }}>
                              {tag}
                            </span>
                          ))}
                          <button className="px-2 py-0.5 rounded-lg border border-dashed text-xs"
                            style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
                            + Add
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>Notes</p>
                        <textarea placeholder="Add notes..." rows={3}
                          className="w-full border rounded-xl p-3 text-xs outline-none resize-none"
                          style={{ background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--text)' }} />
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>Message history</p>
                        <p className="text-xs" style={{ color: 'var(--muted)' }}>
                          {selected.messages.length} message{selected.messages.length !== 1 ? 's' : ''} in this conversation
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        ) : (
          // Empty state (only shown if zero conversations exist)
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-4"
            style={{ background: 'var(--bg)' }}>
            <div className="h-20 w-20 rounded-2xl flex items-center justify-center border"
              style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
              <MessageSquare size={32} style={{ color: 'var(--muted)', opacity: 0.4 }} />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold" style={{ color: 'var(--text)' }}>Your Inbox</h3>
              <p className="text-sm max-w-xs" style={{ color: 'var(--muted)' }}>
                Select a conversation or message a contact from the Network page.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxPage;