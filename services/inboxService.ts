import { Conversation, Message } from '@/types/inbox';


const MOCK_USERS = {
  sarah: {
    id: 'user_1',
    name: 'Sarah Jenkins',
    avatar: 'https://static.vecteezy.com/system/resources/thumbnails/046/883/730/small/professional-stock-image-of-a-young-businesswoman-posing-confidently-dressed-in-formal-attire-against-an-isolated-white-backdrop-perfect-for-corporate-branding-free-photo.jpg',
    headline: 'Head of Sales @ TechFlow',
    company: 'TechFlow',
    location: 'San Francisco, CA',
    profileUrl: 'https://static.vecteezy.com/system/resources/thumbnails/038/962/461/small/ai-generated-caucasian-successful-confident-young-businesswoman-ceo-boss-bank-employee-worker-manager-with-arms-crossed-in-formal-wear-isolated-in-white-background-photo.jpg'
  },
  michael: {
    id: 'user_2',
    name: 'Peter Sutherland',
    avatar: 'https://static.vecteezy.com/system/resources/thumbnails/033/129/417/small/a-business-man-stands-against-white-background-with-his-arms-crossed-ai-generative-photo.jpg',
    headline: 'Founder & CEO @ StartupX',
    company: 'StartupX',
    location: 'Austin, TX',
    profileUrl: 'https://linkedin.com/in/michaelchen'
  },
  me: {
    id: 'me',
    name: 'Me',
    avatar: 'https://picsum.photos/seed/me/200'
  }
};

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv_1',
    participant: MOCK_USERS.sarah,
    unreadCount: 2,
    status: 'waiting',
    platform: 'linkedin',
    updatedAt: new Date().toISOString(),
    tags: ['High Priority', 'SaaS'],
    lastMessage: {
      id: 'msg_1',
      conversationId: 'conv_1',
      senderId: 'user_1',
      content: "Thanks for the info, let's chat! I'm free tomorrow afternoon.",
      timestamp: new Date().toISOString(),
      status: 'read'
    }
  },
  {
    id: 'conv_2',
    participant: MOCK_USERS.michael,
    unreadCount: 0,
    status: 'replied',
    platform: 'email',
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
    tags: ['Follow-up'],
    lastMessage: {
      id: 'msg_2',
      conversationId: 'conv_2',
      senderId: 'me',
      content: "I'll review the proposal tonight and get back to you.",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      status: 'read'
    }
  }
];

const MOCK_MESSAGES: Record<string, Message[]> = {
  'conv_1': [
    { id: 'm1', conversationId: 'conv_1', senderId: 'user_1', content: 'Hi! I saw your profile and was impressed by NexusFlow.', timestamp: new Date(Date.now() - 86400000).toISOString(), status: 'read' },
    { id: 'm2', conversationId: 'conv_1', senderId: 'me', content: 'Thanks Sarah! How can I help you today?', timestamp: new Date(Date.now() - 82800000).toISOString(), status: 'read' },
    { id: 'm3', conversationId: 'conv_1', senderId: 'user_1', content: "I'm interested in your LinkedIn automation tools.", timestamp: new Date(Date.now() - 79200000).toISOString(), status: 'read' },
    { id: 'm4', conversationId: 'conv_1', senderId: 'me', content: 'Absolutely! Does tomorrow at 2 PM work for a demo?', timestamp: new Date(Date.now() - 75600000).toISOString(), status: 'read' },
    { id: 'm5', conversationId: 'conv_1', senderId: 'user_1', content: "Thanks for the info, let's chat! I'm free tomorrow afternoon.", timestamp: new Date().toISOString(), status: 'read' },
  ]
};

export const inboxService = {
  async getConversations(): Promise<Conversation[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return [...MOCK_CONVERSATIONS];
  },

  async getMessages(conversationId: string): Promise<Message[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...(MOCK_MESSAGES[conversationId] || [])];
  },

  async sendMessage(conversationId: string, content: string): Promise<Message> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      conversationId,
      senderId: 'me',
      content,
      timestamp: new Date().toISOString(),
      status: 'sent'
    };
    

    if (MOCK_MESSAGES[conversationId]) {
      MOCK_MESSAGES[conversationId].push(newMessage);
    } else {
      MOCK_MESSAGES[conversationId] = [newMessage];
    }
    
    return newMessage;
  }
};
