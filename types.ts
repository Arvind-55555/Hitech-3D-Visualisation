
export interface Landmark {
  id: string;
  name: string;
  coordinates: [number, number]; // [lng, lat]
  description: string;
  category: 'Tech' | 'Retail' | 'Lifestyle' | 'Transport';
  height?: number;
}

export interface GroundingLink {
  title: string;
  uri: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  links?: GroundingLink[];
  timestamp: number;
}
