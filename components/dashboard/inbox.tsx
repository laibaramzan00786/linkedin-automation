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
        <Loader2 className="w-8 h-8 text-blue-500/60 animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-140px)] flex gap-0 overflow-hidden bg-[#0d0d0d] rounded-3xl border border-white/5 shadow-2xl">
      {/* Conversations List */}
      <div className={cn(
        "w-full lg:w-[280px] flex flex-col border-r border-white/5 bg-[#111111] transition-all duration-300 shrink-0",
        selectedId && "hidden lg:flex"
      )}>
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 group">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-white transition-colors" />
              <input 
                placeholder="Search ..."
                className="w-full bg-white/5 border border-white/5 rounded-lg py-2 pl-9 pr-3 text-[12px] font-medium focus:outline-none focus:ring-1 focus:ring-white/20 transition-all text-white placeholder:text-zinc-600"
              />
            </div>
            <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-zinc-400 transition-colors border border-white/5">
              <Filter size={16} />
            </button>
          </div>

          <div className="flex border-b border-white/5">
            {(['all', 'unread', 'archived'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "flex-1 py-2 text-[10px] font-bold capitalize transition-all relative",
                  activeTab === tab 
                    ? "text-blue-500/60" 
                    : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                {tab === 'all' ? 'All' : tab}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500/60" 
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedId(conv.id)}
              className={cn(
                "w-full p-4 flex gap-3 transition-all text-left relative group border-b border-white/[0.03]",
                selectedId === conv.id ? 'bg-white/[0.03]' : 'hover:bg-white/[0.01]'
              )}
            >
              <div className="relative shrink-0">
                <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 overflow-hidden border border-white/10 group-hover:border-white/30 transition-colors">
                  {conv.participant.avatar ? (
                    <img src={conv.participant.avatar} alt={conv.participant.name} className="w-full h-full object-cover" />
                  ) : (
                    <User size={20} />
                  )}
                </div>
                <div className={cn(
                  "absolute bottom-0 right-0 h-4 w-4 rounded-full border border-[#111111] flex items-center justify-center shadow-lg",
                  conv.platform === 'linkedin' ? 'bg-[#0077b5]' : 'bg-zinc-600'
                )}>
                  {conv.platform === 'linkedin' ? (
                    <span className="text-[7px] font-black italic text-white">in</span>
                  ) : (
                    <Mail size={8} className="text-white" />
                  )}
                </div>
              </div>

              <div className="flex-1 min-w-0 space-y-0.5">
                <div className="flex items-center justify-between">
                  <h3 className={cn(
                    "text-[11px] font-bold truncate transition-colors",
                    conv.unreadCount > 0 ? 'text-white' : 'text-zinc-300',
                    selectedId === conv.id && 'text-white'
                  )}>
                    {conv.participant.name}
                  </h3>
                  <span className="text-[8px] font-medium text-zinc-500 tabular-nums">
                    {formatTime(conv.updatedAt)}
                  </span>
                </div>
                
                <p className={cn(
                  "text-[10px] truncate leading-relaxed",
                  conv.unreadCount > 0 ? 'text-zinc-200 font-semibold' : 'text-zinc-500'
                )}>
                  {conv.lastMessage?.content}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={cn(
        "flex-1 flex flex-col bg-[#0d0d0d] relative",
        !selectedId && "hidden lg:flex"
      )}>
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#111111]">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setSelectedId(null)}
                  className="lg:hidden p-2 -ml-2 hover:bg-white/5 rounded-xl text-zinc-500"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="h-9 w-9 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 overflow-hidden border border-white/10">
                  {selectedConversation.participant.avatar ? (
                    <img src={selectedConversation.participant.avatar} alt={selectedConversation.participant.name} className="w-full h-full object-cover" />
                  ) : (
                    <User size={18} />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{selectedConversation.participant.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] font-medium text-zinc-500">Active now</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowDetails(!showDetails)}
                  className={cn(
                    "p-2 rounded-lg transition-all",
                    showDetails ? "bg-blue-500/60 text-white" : "hover:bg-white/5 text-zinc-500"
                  )}
                >
                  <Info size={18} />
                </button>
                <button className="p-2 hover:bg-white/5 rounded-lg text-zinc-500 transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
              {/* Messages Area */}
              <div className="flex-1 flex flex-col min-w-0 bg-[#0d0d0d]">
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 custom-scrollbar">
                  {messagesLoading ? (
                    <div className="h-full flex items-center justify-center">
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-center">
                        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
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
                              "max-w-[90%] md:max-w-[85%] space-y-1.5",
                              isMe ? 'items-end' : 'items-start'
                            )}>
                              <div className={cn(
                                "p-3.5 rounded-2xl text-[13px] leading-relaxed shadow-sm",
                                isMe 
                                  ? 'bg-blue-500/60 text-white rounded-tr-none' 
                                  : 'bg-white text-black rounded-tl-none font-medium'
                              )}>
                                {msg.content}
                              </div>
                              <div className={cn(
                                "flex items-center gap-2 px-1",
                                isMe ? 'flex-row-reverse' : ''
                              )}>
                                <span className="text-[9px] font-medium text-zinc-600 tabular-nums">
                                  {formatTime(msg.timestamp)}
                                </span>
                                {isMe && (
                                  <CheckCheck size={12} className={cn(
                                    msg.status === 'read' ? 'text-blue-500/60' : 'text-zinc-600'
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

                {/* Input Area */}
                <div className="p-4 border-t border-white/5 bg-[#111111]">
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
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-5 pr-28 text-[13px] font-medium focus:outline-none focus:border-white/20 transition-all resize-none h-20 custom-scrollbar text-white"
                    />
                    <div className="absolute right-3 bottom-3 flex items-center gap-1.5">
                      <button type="button" className="p-1.5 hover:bg-white/10 rounded-lg text-zinc-500 transition-colors">
                        <Smile size={18} />
                      </button>
                      <button type="button" className="p-1.5 hover:bg-white/10 rounded-lg text-zinc-500 transition-colors">
                        <Paperclip size={18} />
                      </button>
                      <button 
                        type="submit"
                        disabled={!messageText.trim()}
                        className="bg-blue-500/60 hover:bg-blue-600/60 disabled:opacity-50 text-white p-2.5 rounded-lg transition-all shadow-xl ml-1"
                      >
                        <Send size={18} />
                      </button>
                    </div>
                  </form>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex gap-4">
                      <button className="flex items-center gap-1.5 text-[9px] font-bold text-zinc-500 hover:text-white transition-colors">
                        <ImageIcon size={12} />
                        Image
                      </button>
                      <button className="flex items-center gap-1.5 text-[9px] font-bold text-zinc-500 hover:text-white transition-colors">
                        <Zap size={12} />
                        Template
                      </button>
                    </div>
                    <span className="text-[8px] font-medium text-zinc-600 uppercase tracking-widest">
                      Press Enter to send
                    </span>
                  </div>
                </div>
              </div>

              {/* Lead Details Sidebar */}
              <AnimatePresence>
                {showDetails && (
                  <motion.div 
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 280, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="hidden xl:flex flex-col border-l border-white/5 bg-[#111111] overflow-hidden"
                  >
                    <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
                      <div className="text-center space-y-4">
                        <div className="relative inline-block">
                          <div className="h-24 w-24 rounded-full bg-zinc-800 mx-auto overflow-hidden border-2 border-white/10 shadow-2xl">
                            {selectedConversation.participant.avatar ? (
                              <img src={selectedConversation.participant.avatar} alt={selectedConversation.participant.name} className="w-full h-full object-cover" />
                            ) : (
                              <User size={40} className="m-auto h-full text-zinc-700" />
                            )}
                          </div>
                          <div className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-[#0077b5] border-4 border-[#111111] flex items-center justify-center">
                            <span className="text-[9px] font-black italic text-white">in</span>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-lg font-display font-bold text-white">{selectedConversation.participant.name}</h4>
                          <p className="text-[10px] font-semibold text-zinc-500 mt-1 leading-relaxed">{selectedConversation.participant.headline}</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 py-2.5 bg-blue-500/60 text-white rounded-lg text-[9px] font-black uppercase tracking-widest transition-all hover:bg-blue-500/60 shadow-lg shadow-rose-500/20">
                            Profile
                          </button>
                          <button className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-zinc-400">
                            <ExternalLink size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-6 pt-2">
                        <div className="grid grid-cols-1 gap-3">
                          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                            <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Company</span>
                            <div className="flex items-center gap-2 text-white">
                              <Building2 size={12} className="text-zinc-500" />
                              <span className="text-[11px] font-bold">{selectedConversation.participant.company}</span>
                            </div>
                          </div>
                          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                            <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Location</span>
                            <div className="flex items-center gap-2 text-white">
                              <MapPin size={12} className="text-zinc-500" />
                              <span className="text-[11px] font-bold">{selectedConversation.participant.location}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h5 className="text-[9px] font-black text-white uppercase tracking-widest">Tags</h5>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedConversation.tags?.map(tag => (
                              <span key={tag} className="px-2 py-1 rounded-md bg-white/5 text-zinc-300 border border-white/10 text-[8px] font-bold">
                                {tag}
                              </span>
                            ))}
                            <button className="px-2 py-1 rounded-md border border-dashed border-white/10 text-zinc-600 text-[8px] font-bold hover:text-white hover:border-white/30 transition-all">
                              + Add
                            </button>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h5 className="text-[9px] font-black text-white uppercase tracking-widest">Notes</h5>
                          <textarea 
                            placeholder="Add a private note..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-[10px] font-medium focus:outline-none focus:border-white/20 min-h-[100px] resize-none text-white"
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
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12 space-y-8">
            <div className="relative">
              <div className="h-32 w-32 rounded-[2.5rem] bg-white/[0.02] flex items-center justify-center text-blue-500/60 border border-white/5">
                <MessageSquare size={64} />
              </div>
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -top-4 -right-4 h-12 w-12 rounded-full bg-blue-500/60 border border-rose-500/20 flex items-center justify-center"
              >
                <div className="h-2 w-2 bg-blue-500/60 rounded-full" />
              </motion.div>
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-display font-bold text-white">Choose a contact on the left</h3>
              <p className="text-sm text-zinc-500 max-w-xs mx-auto font-medium leading-relaxed">
                Select a conversation to start messaging and managing your LinkedIn outreach.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxPage;
