
'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MoreVertical, 
  Send, 
  User, 
  CheckCheck, 
  Paperclip,
  Smile,
  Image as ImageIcon,
  Mail,
  Zap,
  ExternalLink,
  MapPin,
  Building2,
  Loader2,
  ChevronLeft,
  Info,
  Filter,
  MessageSquare
} from 'lucide-react';
import { inboxService } from '@/services/inboxService';
import { Conversation, Message } from '@/types/inbox';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const InboxPage = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [showDetails, setShowDetails] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'archived'>('all');

  // Fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const data = await inboxService.getConversations();
        setConversations(data);
        setSelectedId(null);
      } catch (error) {
        console.error('Failed to fetch conversations', error);
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, []);

  // Fetch messages when selection changes
  useEffect(() => {
    if (!selectedId) return;

    const fetchMessages = async () => {
      setMessagesLoading(true);
      try {
        const data = await inboxService.getMessages(selectedId);
        setMessages(data);
      } catch (error) {
        console.error('Failed to fetch messages', error);
      } finally {
        setMessagesLoading(false);
      }
    };
    fetchMessages();
  }, [selectedId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedId) return;

    const text = messageText;
    setMessageText('');

    try {
      const newMessage = await inboxService.sendMessage(selectedId, text);
      setMessages(prev => [...prev, newMessage]);
      
      setConversations(prev => prev.map(c => 
        c.id === selectedId ? { ...c, lastMessage: newMessage, updatedAt: newMessage.timestamp } : c
      ));
    } catch (error) {
      console.error('Failed to send message', error);
      setMessageText(text);
    }
  };

  const selectedConversation = conversations.find(c => c.id === selectedId);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div 
      className="h-[calc(100vh-140px)] flex gap-0 overflow-hidden rounded-[2rem] border shadow-2xl transition-all duration-300"
      style={{
        background: "var(--bg)",
        borderColor: "var(--border)"
      }}
    >
   
      <div className={cn(
        "w-full lg:w-[320px] flex flex-col border-r transition-all duration-300 shrink-0",
        selectedId && "hidden lg:flex"
      )}
      style={{ borderColor: "var(--border)", background: "var(--bg)" }}
      >
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 group">
              <Search 
                size={16} 
                className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" 
                style={{ color: "var(--text)", opacity: 0.4 }}
              />
              <input 
                placeholder="Search messages..."
                className="w-full border rounded-xl py-3 pl-11 pr-4 text-[11px] font-bold uppercase tracking-wider outline-none transition-all placeholder:text-zinc-500"
                style={{
                  background: "var(--card)",
                  borderColor: "var(--border)",
                  color: "var(--text)"
                }}
              />
            </div>
            <button 
              className="p-3 rounded-xl transition-all border group"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              <Filter size={18} style={{ color: "var(--text)", opacity: 0.6 }} />
            </button>
          </div>

          <div className="flex border-b" style={{ borderColor: "var(--border)" }}>
            {(['all', 'unread', 'archived'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all relative",
                  activeTab === tab 
                    ? "text-blue-500" 
                    : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                )}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" 
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-3 space-y-1">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedId(conv.id)}
              className={cn(
                "w-full p-4 flex gap-4 transition-all text-left relative group rounded-2xl",
                selectedId === conv.id ? 'shadow-lg' : 'hover:bg-zinc-50 dark:hover:bg-white/5'
              )}
              style={selectedId === conv.id ? { 
                background: "var(--card)",
                border: "1px solid var(--border)"
              } : {}}
            >
              <div className="relative shrink-0">
                <div className="h-12 w-12 rounded-full flex items-center justify-center overflow-hidden border transition-all group-hover:scale-105"
                  style={{ background: "var(--bg)", borderColor: "var(--border)" }}
                >
                  {conv.participant.avatar ? (
                    <img src={conv.participant.avatar} alt={conv.participant.name} className="w-full h-full object-cover" />
                  ) : (
                    <User size={24} style={{ color: "var(--text)", opacity: 0.2 }} />
                  )}
                </div>
                <div className={cn(
                  "absolute bottom-0 right-0 h-5 w-5 rounded-full border-2 flex items-center justify-center shadow-lg",
                  conv.platform === 'linkedin' ? 'bg-[#0077b5]' : 'bg-blue-600'
                )}
                  style={{ borderColor: "var(--bg)" }}
                >
                  {conv.platform === 'linkedin' ? (
                    <span className="text-[8px] font-black italic text-white">in</span>
                  ) : (
                    <Mail size={10} className="text-white" />
                  )}
                </div>
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-[12px] font-bold truncate tracking-tight"
                    style={{ color: "var(--text)" }}
                  >
                    {conv.participant.name}
                  </h3>
                  <span className="text-[9px] font-bold tabular-nums uppercase" style={{ color: "var(--muted)" }}>
                    {formatTime(conv.updatedAt)}
                  </span>
                </div>
                
                <p className="text-[11px] truncate leading-relaxed font-medium"
                  style={{ color: "var(--muted)" }}
                >
                  {conv.lastMessage?.content}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

 
      <div className={cn(
        "flex-1 flex flex-col bg-white dark:bg-[#0d0d0d] relative",
        !selectedId && "hidden lg:flex"
      )}
      style={{ background: "var(--card)" }}
      >
        {selectedConversation ? (
          <>
      
            <div className="p-6 border-b flex items-center justify-between bg-white dark:bg-[#111111]"
              style={{ background: "var(--bg)", borderColor: "var(--border)" }}
            >
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setSelectedId(null)}
                  className="lg:hidden p-2 -ml-2 rounded-xl"
                  style={{ color: "var(--text)" }}
                >
                  <ChevronLeft size={24} />
                </button>
                <div className="h-11 w-11 rounded-full flex items-center justify-center overflow-hidden border shadow-sm"
                  style={{ background: "var(--card)", borderColor: "var(--border)" }}
                >
                  {selectedConversation.participant.avatar ? (
                    <img src={selectedConversation.participant.avatar} alt={selectedConversation.participant.name} className="w-full h-full object-cover" />
                  ) : (
                    <User size={20} style={{ color: "var(--text)", opacity: 0.3 }} />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight" style={{ color: "var(--text)" }}>{selectedConversation.participant.name}</h3>
                 
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowDetails(!showDetails)}
                  className={cn(
                    "p-3 rounded-xl transition-all border",
                    showDetails ? "bg-blue-600 text-white border-blue-600" : ""
                  )}
                  style={!showDetails ? { background: "var(--card)", borderColor: "var(--border)", color: "var(--text)" } : {}}
                >
                  <Info size={20} />
                </button>
                <button 
                  className="p-3 rounded-xl transition-all border"
                  style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }}
                >
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
       
              <div className="flex-1 flex flex-col min-w-0" style={{ background: "var(--bg)" }}>
                <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 custom-scrollbar">
                  {messagesLoading ? (
                    <div className="h-full flex items-center justify-center">
                      <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-center">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] border px-5 py-2 rounded-full"
                         style={{ color: "var(--text)" }}
                        >
                          April 13, 2024
                        </span>
                      </div>
                      
                      {messages.map((msg, i) => {
                        const isMe = msg.senderId === 'me';
                        return (
                          <motion.div 
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={cn(
                              "flex group",
                              isMe ? 'justify-end' : 'justify-start'
                            )}
                          >
                            <div className={cn(
                              "max-w-[85%] md:max-w-[75%] space-y-2",
                              isMe ? 'items-end' : 'items-start'
                            )}>
                              <div className={cn(
                                "p-5 rounded-[1.5rem] text-[13px] leading-relaxed shadow-xl",
                                isMe 
                                  ? 'bg-blue-600 text-white rounded-tr-none' 
                                  : 'border rounded-tl-none font-medium'
                              )}
                              style={!isMe ? { 
                                background: "var(--card)",
                                borderColor: "var(--border)", 
                                color: "var(--text)" 
                              } : {}}
                              >
                                {msg.content}
                              </div>
                              <div className={cn(
                                "flex items-center gap-2 px-1",
                                isMe ? 'flex-row-reverse' : ''
                              )}>
                                <span className="text-[9px] font-bold tabular-nums uppercase" style={{ color: "var(--muted)" }}>
                                  {formatTime(msg.timestamp)}
                                </span>
                                {isMe && (
                                  <CheckCheck size={14} className={cn(
                                    msg.status === 'read' ? 'text-blue-500' : 'text-zinc-500'
                                  )} />
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </>
                  )}
                </div>

                <div className="p-6 border-t" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <form onSubmit={handleSendMessage} className="relative">
                    <textarea
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage(e);
                        }
                      }}
                      placeholder="Write your message..."
                      className="w-full border rounded-2xl py-4 pl-6 pr-32 text-[13px] font-medium outline-none transition-all resize-none h-24 custom-scrollbar"
                      style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
                    />
                    <div className="absolute right-4 bottom-4 flex items-center gap-2">
                      <button type="button" className="p-2 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-xl transition-colors" style={{ color: "var(--muted)" }}>
                        <Smile size={20} />
                      </button>
                      <button type="button" className="p-2 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-xl transition-colors" style={{ color: "var(--muted)" }}>
                        <Paperclip size={20} />
                      </button>
                      <button 
                        type="submit"
                        disabled={!messageText.trim()}
                        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-3 rounded-xl transition-all shadow-xl shadow-blue-600/20"
                      >
                        <Send size={20} />
                      </button>
                    </div>
                  </form>
                  <div className="flex items-center justify-between mt-4 px-2">
                    <div className="flex gap-6">
                      <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors hover:text-blue-500" style={{ color: "var(--text)" }}>
                        <ImageIcon size={14} />
                        Image
                      </button>
                      <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors hover:text-blue-500" style={{ color: "var(--text)" }}>
                        <Zap size={14} />
                        Template
                      </button>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: "var(--text)" }}>
                      Press Enter to send
                    </span>
                  </div>
                </div>
              </div>

           
              <AnimatePresence>
                {showDetails && (
                  <motion.div 
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 320, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="hidden xl:flex flex-col border-l overflow-hidden"
                    style={{ background: "var(--bg)", borderColor: "var(--border)" }}
                  >
                    <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar">
                      <div className="text-center space-y-6">
                        <div className="relative inline-block">
                          <div className="h-28 w-28 rounded-full flex items-center justify-center overflow-hidden border-2 shadow-2xl mx-auto"
                            style={{ background: "var(--card)", borderColor: "var(--border)" }}
                          >
                            {selectedConversation.participant.avatar ? (
                              <img src={selectedConversation.participant.avatar} alt={selectedConversation.participant.name} className="w-full h-full object-cover" />
                            ) : (
                              <User size={48} style={{ color: "var(--text)", opacity: 0.1 }} />
                            )}
                          </div>
                          <div className="absolute bottom-1 right-1 h-8 w-8 rounded-full bg-[#0077b5] border-4 flex items-center justify-center"
                            style={{ borderColor: "var(--bg)" }}
                          >
                            <span className="text-[10px] font-black italic text-white">in</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-xl font-display font-bold" style={{ color: "var(--text)" }}>{selectedConversation.participant.name}</h4>
                          <p className="text-[11px] font-bold leading-relaxed px-4" style={{ color: "var(--muted)" }}>{selectedConversation.participant.headline}</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-blue-700 shadow-xl shadow-blue-600/20">
                            View Profile
                          </button>
                          <button className="p-3 rounded-xl border transition-all"
                             style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }}
                          >
                            <ExternalLink size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-8">
                        <div className="grid grid-cols-1 gap-4">
                          <div className="p-4 rounded-2xl border space-y-2" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                            <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: "var(--text)" }}>Current Role</span>
                            <div className="flex items-center gap-3">
                              <Building2 size={16} style={{ color: "var(--text)", opacity: 0.4 }} />
                              <span className="text-[12px] font-bold" style={{ color: "var(--text)" }}>{selectedConversation.participant.company}</span>
                            </div>
                          </div>
                          <div className="p-4 rounded-2xl border space-y-2" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                            <span className="text-[9px] font-black uppercase tracking-widest" >Location</span>
                            <div className="flex items-center gap-3">
                              <MapPin size={16} style={{ color: "var(--text)", opacity: 0.4 }} />
                              <span className="text-[12px] font-bold" style={{ color: "var(--text)" }}>{selectedConversation.participant.location}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h5 className="text-[10px] font-black uppercase tracking-widest" style={{ color: "var(--text)" }}>Tags</h5>
                          <div className="flex flex-wrap gap-2">
                            {selectedConversation.tags?.map(tag => (
                              <span key={tag} className="px-3 py-1.5 rounded-lg border text-[9px] font-bold uppercase transition-all hover:border-blue-500"
                                style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }}
                              >
                                {tag}
                              </span>
                            ))}
                            <button className="px-3 py-1.5 rounded-lg border border-dashed text-[9px] font-black uppercase tracking-widest transition-all hover:text-blue-500 hover:border-blue-500"
                              style={{ borderColor: "var(--border)", color: "var(--muted)" }}
                            >
                              + New Tag
                            </button>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h5 className="text-[10px] font-black uppercase tracking-widest" style={{ color: "var(--text)" }}>Private Notes</h5>
                          <textarea 
                            placeholder="Add interaction notes..."
                            className="w-full border rounded-2xl p-4 text-[11px] font-medium outline-none min-h-[120px] resize-none transition-all"
                            style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12 space-y-10" style={{ background: "var(--bg)" }}>
            <div className="relative">
              <div className="h-40 w-40 rounded-[3rem] flex items-center justify-center border shadow-inner"
                style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }}
              >
                <div className="opacity-10"><MessageSquare size={80} /></div>
              </div>
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute -top-6 -right-6 h-16 w-16 rounded-full bg-blue-500/20 border border-blue-500/20 flex items-center justify-center"
              >
                <div className="h-3 w-3 bg-blue-500 rounded-full" />
              </motion.div>
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-display font-bold uppercase tracking-tight" style={{ color: "var(--text)" }}>Inbox Overview</h3>
              <p className="text-[13px] max-w-sm mx-auto font-medium leading-relaxed" style={{ color: "var(--text)" }}>
                Manage all your LinkedIn conversations in one central hub. Select a contact to view full details and start chatting.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxPage;
