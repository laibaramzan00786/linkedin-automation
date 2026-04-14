export type Platform = 'linkedin' | 'email' | 'whatsapp';
export type ConversationStatus = 'new' | 'replied' | 'waiting' | 'closed';

export interface User {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
  company?: string;
  location?: string;
  headline?: string;
  profileUrl?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  type: 'image' | 'file';
  url: string;
  size?: string;
}

export interface Conversation {
  id: string;
  participant: User;
  lastMessage?: Message;
  unreadCount: number;
  status: ConversationStatus;
  platform: Platform;
  updatedAt: string;
  tags?: string[];
}
