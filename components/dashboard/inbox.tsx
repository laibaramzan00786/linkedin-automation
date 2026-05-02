'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, MoreVertical, Send, User, CheckCheck, Paperclip,
  Smile, Image as ImageIcon, Mail, Zap, ExternalLink,
  MapPin, Building2, Loader2, ChevronLeft, Info, Filter, MessageSquare,
} from 'lucide-react';
import { inboxService } from '@/services/inboxService';
import { Conversation, Message } from '@/types/inbox';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const InboxPage = () => {
  const [conversations,   setConversations]   = useState<Conversation[]>([]);
  const [selectedId,      setSelectedId]      = useState<string | null>(null);
  const [messages,        setMessages]        = useState<Message[]>([]);
  const [loading,         setLoading]         = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messageText,     setMessageText]     = useState('');
  const [showDetails,     setShowDetails]     = useState(true);
  const [activeTab,       setActiveTab]       = useState<'all' | 'unread' | 'archived'>('all');

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
      setConversations(prev =>
        prev.map(c => c.id === selectedId
          ? { ...c, lastMessage: newMessage, updatedAt: newMessage.timestamp }
          : c
        )
      );
    } catch (error) {
      console.error('Failed to send message', error);
      setMessageText(text);
    }
  };

  const selectedConversation = conversations.find(c => c.id === selectedId);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now   = new Date();
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-7 h-7 animate-spin" style={{ color: '#e8836a' }} />
      </div>
    );
  }

  return (
    <div
      className="h-[calc(100vh-140px)] flex gap-0 overflow-hidden rounded-2xl border shadow-sm transition-all duration-300"
      style={{
        background: 'var(--bg)',
        borderColor: 'var(--border)',
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      <div
        className={cn(
          'w-full lg:w-[300px] flex flex-col border-r shrink-0 transition-all duration-300',
          selectedId && 'hidden lg:flex'
        )}
        style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}
      >
        <div className="p-4 space-y-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--muted)' }}
              />
              <input
                placeholder="Search messages..."
                className="w-full border rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium outline-none transition-all"
                style={{
                  background: 'var(--card)',
                  borderColor: 'var(--border)',
                  color: 'var(--text)',
                }}
              />
            </div>
            <button
              className="p-2.5 rounded-xl border transition-all hover:shadow-sm"
              style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
            >
              <Filter size={15} style={{ color: 'var(--muted)' }} />
            </button>
          </div>

          <div className="flex border-b" style={{ borderColor: 'var(--border)' }}>
            {(['all', 'unread', 'archived'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'flex-1 pb-2.5 text-xs font-semibold capitalize transition-all relative',
                  activeTab === tab ? '' : 'opacity-50 hover:opacity-75'
                )}
                style={{ color: activeTab === tab ? '#e8836a' : 'var(--text)' }}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ background: '#e8836a' }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
          {conversations.map(conv => (
            <button
              key={conv.id}
              onClick={() => setSelectedId(conv.id)}
              className={cn(
                'w-full p-3.5 flex gap-3 text-left rounded-xl transition-all',
                selectedId === conv.id ? '' : 'hover:bg-[var(--card)]'
              )}
              style={
                selectedId === conv.id
                  ? { background: 'var(--card)', border: '1px solid var(--border)' }
                  : {}
              }
            >
              <div className="relative shrink-0">
                <div
                  className="h-10 w-10 rounded-full overflow-hidden border"
                  style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}
                >
                  {conv.participant.avatar ? (
                    <img
                      src={conv.participant.avatar}
                      alt={conv.participant.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User size={18} style={{ color: 'var(--muted)' }} />
                    </div>
                  )}
                </div>
                <div
                  className={cn(
                    'absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center',
                    conv.platform === 'linkedin' ? 'bg-[#0077b5]' : 'bg-rose-500'
                  )}
                  style={{ borderColor: 'var(--bg)' }}
                >
                  {conv.platform === 'linkedin' ? (
                    <span className="text-[6px] font-black italic text-white">in</span>
                  ) : (
                    <Mail size={7} className="text-white" />
                  )}
                </div>
              </div>

              <div className="flex-1 min-w-0 space-y-0.5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold truncate" style={{ color: 'var(--text)' }}>
                    {conv.participant.name}
                  </p>
                  <span className="text-[10px] font-medium shrink-0 ml-2" style={{ color: 'var(--muted)' }}>
                    {formatTime(conv.updatedAt)}
                  </span>
                </div>
                <p className="text-xs truncate" style={{ color: 'var(--muted)' }}>
                  {conv.lastMessage?.content}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div
        className={cn('flex-1 flex flex-col relative', !selectedId && 'hidden lg:flex')}
        style={{ background: 'var(--card)' }}
      >
        {selectedConversation ? (
          <>
            <div
              className="px-5 py-3.5 border-b flex items-center justify-between"
              style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedId(null)}
                  className="lg:hidden p-1.5 rounded-lg"
                  style={{ color: 'var(--text)' }}
                >
                  <ChevronLeft size={20} />
                </button>
                <div
                  className="h-9 w-9 rounded-full overflow-hidden border"
                  style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
                >
                  {selectedConversation.participant.avatar ? (
                    <img
                      src={selectedConversation.participant.avatar}
                      alt={selectedConversation.participant.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User size={16} style={{ color: 'var(--muted)' }} />
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
                    {selectedConversation.participant.name}
                  </p>
                  {selectedConversation.participant.headline && (
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>
                      {selectedConversation.participant.headline}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="p-2 rounded-xl border transition-all"
                  style={
                    showDetails
                      ? { background: '#e8836a', borderColor: '#e8836a', color: '#fff' }
                      : { background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--text)' }
                  }
                >
                  <Info size={16} />
                </button>
                <button
                  className="p-2 rounded-xl border transition-all"
                  style={{ background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--text)' }}
                >
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
         
              <div className="flex-1 flex flex-col min-w-0" style={{ background: 'var(--bg)' }}>
                <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5">
                  {messagesLoading ? (
                    <div className="h-full flex items-center justify-center">
                      <Loader2 className="w-5 h-5 animate-spin" style={{ color: '#e8836a' }} />
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-center">
                        <span
                          className="text-xs font-medium px-4 py-1.5 rounded-full border"
                          style={{
                            color: 'var(--muted)',
                            borderColor: 'var(--border)',
                            background: 'var(--card)',
                          }}
                        >
                          April 13, 2024
                        </span>
                      </div>

                      {messages.map((msg, i) => {
                        const isMe = msg.senderId === 'me';
                        return (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.04 }}
                            className={cn('flex', isMe ? 'justify-end' : 'justify-start')}
                          >
                            <div className={cn('max-w-[75%] space-y-1', isMe ? 'items-end' : 'items-start')}>
                              <div
                                className={cn(
                                  'px-4 py-3 rounded-2xl text-sm leading-relaxed',
                                  isMe
                                    ? 'rounded-tr-sm text-white'
                                    : 'rounded-tl-sm border font-medium'
                                )}
                                style={
                                  isMe
                                    ? { background: '#e8836a' }
                                    : {
                                        background: 'var(--card)',
                                        borderColor: 'var(--border)',
                                        color: 'var(--text)',
                                      }
                                }
                              >
                                {msg.content}
                              </div>
                              <div
                                className={cn('flex items-center gap-1.5 px-1', isMe ? 'flex-row-reverse' : '')}
                              >
                                <span className="text-[10px] font-medium" style={{ color: 'var(--muted)' }}>
                                  {formatTime(msg.timestamp)}
                                </span>
                                {isMe && (
                                  <CheckCheck
                                    size={13}
                                    style={{ color: msg.status === 'read' ? '#e8836a' : 'var(--muted)' }}
                                  />
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </>
                  )}
                </div>
                <div className="p-4 border-t" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
                  <form onSubmit={handleSendMessage} className="relative">
                    <textarea
                      value={messageText}
                      onChange={e => setMessageText(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage(e);
                        }
                      }}
                      placeholder="Write your message..."
                      rows={3}
                      className="w-full border rounded-xl py-3 pl-4 pr-28 text-sm font-medium outline-none transition-all resize-none"
                      style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
                    />
                    <div className="absolute right-3 bottom-3 flex items-center gap-1.5">
                      <button
                        type="button"
                        className="p-2 rounded-lg transition-all"
                        style={{ color: 'var(--muted)' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#e8836a'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--muted)'}
                      >
                        <Smile size={17} />
                      </button>
                      <button
                        type="button"
                        className="p-2 rounded-lg transition-all"
                        style={{ color: 'var(--muted)' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#e8836a'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--muted)'}
                      >
                        <Paperclip size={17} />
                      </button>
                      <button
                        type="submit"
                        disabled={!messageText.trim()}
                        className="p-2.5 rounded-xl text-white transition-all disabled:opacity-40"
                        style={{ background: '#e8836a', boxShadow: '0 4px 12px rgba(232,131,106,0.35)' }}
                      >
                        <Send size={15} />
                      </button>
                    </div>
                  </form>

                  <div className="flex items-center justify-between mt-2.5 px-1">
                    <div className="flex gap-4">
                      {[
                        { icon: ImageIcon, label: 'Image' },
                        { icon: Zap,       label: 'Template' },
                      ].map(({ icon: Icon, label }) => (
                        <button
                          key={label}
                          className="flex items-center gap-1.5 text-xs font-semibold transition-all"
                          style={{ color: 'var(--muted)' }}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#e8836a'}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--muted)'}
                        >
                          <Icon size={13} />
                          {label}
                        </button>
                      ))}
                    </div>
                    <span className="text-[10px] font-medium" style={{ color: 'var(--muted)' }}>
                      Enter to send
                    </span>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 280, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="hidden xl:flex flex-col border-l overflow-hidden"
                    style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}
                  >
                    <div className="p-5 space-y-6 overflow-y-auto flex-1">

                      <div className="text-center space-y-4">
                        <div className="relative inline-block">
                          <div
                            className="h-20 w-20 rounded-full overflow-hidden border-2 mx-auto"
                            style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
                          >
                            {selectedConversation.participant.avatar ? (
                              <img
                                src={selectedConversation.participant.avatar}
                                alt={selectedConversation.participant.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <User size={32} style={{ color: 'var(--muted)' }} />
                              </div>
                            )}
                          </div>
                          <div
                            className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-[#0077b5] border-2 flex items-center justify-center"
                            style={{ borderColor: 'var(--bg)' }}
                          >
                            <span className="text-[8px] font-black italic text-white">in</span>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-bold" style={{ color: 'var(--text)' }}>
                            {selectedConversation.participant.name}
                          </p>
                          {selectedConversation.participant.headline && (
                            <p className="text-xs mt-0.5 leading-snug px-2" style={{ color: 'var(--muted)' }}>
                              {selectedConversation.participant.headline}
                            </p>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <button
                            className="flex-1 py-2 text-white rounded-xl text-xs font-semibold transition-all"
                            style={{ background: '#e8836a' }}
                          >
                            View Profile
                          </button>
                          <button
                            className="p-2 rounded-xl border transition-all"
                            style={{ background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--text)' }}
                          >
                            <ExternalLink size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {[
                          { label: 'Company',  icon: Building2, value: selectedConversation.participant.company },
                          { label: 'Location', icon: MapPin,    value: selectedConversation.participant.location },
                        ].map(({ label, icon: Icon, value }) => (
                          value && (
                            <div
                              key={label}
                              className="p-3.5 rounded-xl border"
                              style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
                            >
                              <p className="text-[10px] font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>
                                {label}
                              </p>
                              <div className="flex items-center gap-2">
                                <Icon size={13} style={{ color: 'var(--muted)' }} />
                                <span className="text-xs font-semibold" style={{ color: 'var(--text)' }}>
                                  {value}
                                </span>
                              </div>
                            </div>
                          )
                        ))}
                      </div>

                      <div className="space-y-2.5">
                        <p className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>Tags</p>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedConversation.tags?.map(tag => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 rounded-lg border text-xs font-medium"
                              style={{ background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--text)' }}
                            >
                              {tag}
                            </span>
                          ))}
                          <button
                            className="px-2.5 py-1 rounded-lg border border-dashed text-xs font-medium transition-all"
                            style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
                            onMouseEnter={e => {
                              (e.currentTarget as HTMLElement).style.color = '#e8836a';
                              (e.currentTarget as HTMLElement).style.borderColor = '#e8836a';
                            }}
                            onMouseLeave={e => {
                              (e.currentTarget as HTMLElement).style.color = 'var(--muted)';
                              (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                            }}
                          >
                            + Add tag
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2.5">
                        <p className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>Private Notes</p>
                        <textarea
                          placeholder="Add notes about this contact..."
                          rows={4}
                          className="w-full border rounded-xl p-3 text-sm font-medium outline-none resize-none transition-all"
                          style={{ background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--text)' }}
                        />
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        ) : (
          /* Empty state */
          <div
            className="flex-1 flex flex-col items-center justify-center text-center p-10 space-y-6"
            style={{ background: 'var(--bg)' }}
          >
            <div
              className="h-24 w-24 rounded-2xl flex items-center justify-center border"
              style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
            >
              <MessageSquare size={36} style={{ color: 'var(--muted)', opacity: 0.4 }} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold" style={{ color: 'var(--text)' }}>
                Your Inbox
              </h3>
              <p className="text-sm max-w-xs mx-auto leading-relaxed" style={{ color: 'var(--muted)' }}>
                Select a conversation from the left to view messages and manage your outreach.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxPage;