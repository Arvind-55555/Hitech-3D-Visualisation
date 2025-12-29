import { LANDMARKS } from '../constants';

export interface QueryResponse {
  text: string;
  links: Array<{ title: string; uri: string }>;
  shouldShowMap?: boolean;
  landmarkId?: string;
}

// Knowledge base for Hitech City
const KNOWLEDGE_BASE = {
  regions: {
    'hitech city': {
      name: 'Hitech City',
      description: 'Hitech City is Hyderabad\'s premier IT hub, established in the late 1990s. It houses major tech companies, innovation centers, and is the heart of Hyderabad\'s technology ecosystem.',
      area: 'Approximately 2.2 square kilometers',
      established: '1998',
      companies: 'Google, Microsoft, Amazon, TCS, Infosys, Wipro, and many more',
      landmarks: ['Cyber Towers', 'T-Hub 2.0', 'Raheja Mindspace', 'Financial District']
    },
    'gachibowli': {
      name: 'Gachibowli',
      description: 'Gachibowli is a major IT corridor adjacent to Hitech City, known for its tech parks, corporate offices, and educational institutions.',
      area: 'Major IT corridor',
      companies: 'Numerous tech parks and corporate offices',
      landmarks: ['Gachibowli IT Corridor', 'Financial District']
    },
    'madhapur': {
      name: 'Madhapur',
      description: 'Madhapur is a key commercial and residential area within Hitech City, known for its proximity to major tech parks and shopping centers.',
      landmarks: ['Inorbit Mall', 'Shilparamam']
    },
    'kondapur': {
      name: 'Kondapur',
      description: 'Kondapur is a rapidly developing area with numerous IT companies, residential complexes, and commercial establishments.',
      companies: 'Multiple IT companies and startups'
    }
  },
  
  landmarks: LANDMARKS.reduce((acc, landmark) => {
    acc[landmark.name.toLowerCase()] = {
      name: landmark.name,
      description: landmark.description,
      category: landmark.category,
      coordinates: landmark.coordinates,
      id: landmark.id
    };
    return acc;
  }, {} as Record<string, any>),

  faq: {
    'what is hitech city': 'Hitech City is Hyderabad\'s premier IT hub, established in 1998. It spans approximately 2.2 square kilometers and houses major tech companies like Google, Microsoft, Amazon, TCS, Infosys, and Wipro. It\'s the heart of Hyderabad\'s technology ecosystem.',
    'how many companies': 'Hitech City houses over 200+ IT companies including major players like Google (13,000 employees), Microsoft (11,000), Amazon (15,000), TCS (25,000), Infosys (18,000), and Wipro (12,000).',
    'tech parks': 'Hitech City has 42+ tech parks and 12 innovation hubs, with an office occupancy rate of 92%.',
    'workforce': 'The total workforce in Hitech City exceeds 98,000 employees across various tech companies.',
    'startups': 'Hitech City is home to 850+ startups, with T-Hub 2.0 being the world\'s largest innovation campus and startup incubator.',
    'average salary': 'The average salary in Hitech City is approximately ₹12.5 lakhs per annum.',
    'sectors': 'The sector distribution includes: IT Services (45%), Product Development (25%), Startups (15%), Consulting (10%), and Others (5%).',
    'traffic': 'Hitech City is well-connected with the Hyderabad Metro, and traffic management systems are in place. The area has good connectivity to the rest of Hyderabad.',
    'amenities': 'Hitech City offers excellent amenities including shopping malls (Inorbit Mall, IKEA), cultural centers (Shilparamam), restaurants, hotels, and recreational facilities.',
    'metro connectivity': 'Hitech City has its own metro station, providing excellent connectivity to other parts of Hyderabad.',
    'innovation hubs': 'T-Hub 2.0 is the world\'s largest innovation campus, serving as a major startup incubator and innovation center in Hitech City.'
  },

  statistics: {
    'total tech parks': '42+',
    'innovation hubs': '12',
    'office occupancy': '92%',
    'total workforce': '98,000+',
    'startups': '850+',
    'average salary': '₹12.5 lakhs'
  }
};

// Pattern matching for queries
const matchPattern = (query: string, patterns: string[]): boolean => {
  const lowerQuery = query.toLowerCase();
  return patterns.some(pattern => lowerQuery.includes(pattern));
};

// Extract landmark from query
const extractLandmark = (query: string): string | null => {
  const lowerQuery = query.toLowerCase();
  for (const [key, landmark] of Object.entries(KNOWLEDGE_BASE.landmarks)) {
    const landmarkName = landmark?.name?.toLowerCase() || key;
    if (lowerQuery.includes(key) || lowerQuery.includes(landmarkName)) {
      return landmark?.id || null;
    }
  }
  return null;
};

// Extract region from query
const extractRegion = (query: string): string | null => {
  const lowerQuery = query.toLowerCase();
  for (const regionName of Object.keys(KNOWLEDGE_BASE.regions)) {
    if (lowerQuery.includes(regionName)) {
      return regionName;
    }
  }
  return null;
};

export const queryCityInfo = async (prompt: string): Promise<QueryResponse> => {
  const lowerPrompt = prompt.toLowerCase().trim();
  
  // Check for map-related queries
  const mapKeywords = ['show', 'where', 'location', 'navigate', 'view', 'map', 'see', 'display', 'find'];
  const shouldShowMap = mapKeywords.some(keyword => lowerPrompt.includes(keyword));
  
  // Extract landmark if mentioned
  const landmarkId = extractLandmark(prompt);
  
  // Check FAQ
  for (const [question, answer] of Object.entries(KNOWLEDGE_BASE.faq)) {
    if (lowerPrompt.includes(question) || question.includes(lowerPrompt.split(' ')[0])) {
      return {
        text: answer,
        links: [],
        shouldShowMap: shouldShowMap,
        landmarkId: landmarkId || undefined
      };
    }
  }
  
  // Check for landmark queries
  if (landmarkId) {
    const landmarkKey = Object.keys(KNOWLEDGE_BASE.landmarks).find(k => 
      KNOWLEDGE_BASE.landmarks[k]?.id === landmarkId
    );
    const landmark = landmarkKey ? KNOWLEDGE_BASE.landmarks[landmarkKey] : null;
    
    if (landmark) {
      if (shouldShowMap) {
        return {
          text: `${landmark.name}: ${landmark.description}\n\nWould you like me to show this on the map?`,
          links: [],
          shouldShowMap: true,
          landmarkId: landmarkId
        };
      }
      
      return {
        text: `${landmark.name}: ${landmark.description}`,
        links: [],
        shouldShowMap: false,
        landmarkId: landmarkId
      };
    }
  }
  
  // Check for region queries
  const region = extractRegion(prompt);
  if (region) {
    const regionData = KNOWLEDGE_BASE.regions[region];
    return {
      text: `${regionData.name}: ${regionData.description}\n\nKey Features:\n- Area: ${regionData.area || 'N/A'}\n- Major Companies: ${regionData.companies || 'Various IT companies'}\n- Landmarks: ${regionData.landmarks?.join(', ') || 'Multiple landmarks'}`,
      links: [],
      shouldShowMap: shouldShowMap
    };
  }
  
  // Check for statistics queries
  for (const [stat, value] of Object.entries(KNOWLEDGE_BASE.statistics)) {
    if (lowerPrompt.includes(stat) || lowerPrompt.includes(stat.replace(' ', ''))) {
      return {
        text: `${stat.charAt(0).toUpperCase() + stat.slice(1)} in Hitech City: ${value}`,
        links: [],
        shouldShowMap: false
      };
    }
  }
  
  // Greeting responses
  if (matchPattern(lowerPrompt, ['hello', 'hi', 'hey', 'greetings'])) {
    return {
      text: 'Hello! I\'m your Hitech City geospatial intelligence assistant. I can help you with:\n\n• Information about landmarks and locations\n• Statistics about tech parks and companies\n• Details about regions (Hitech City, Gachibowli, Madhapur, Kondapur)\n• Navigation to specific locations on the map\n\nWhat would you like to know?',
      links: [],
      shouldShowMap: false
    };
  }
  
  // Help responses
  if (matchPattern(lowerPrompt, ['help', 'what can you do', 'capabilities'])) {
    return {
      text: 'I can assist you with:\n\n📍 **Locations & Landmarks**: Ask about Cyber Towers, T-Hub, Mindspace, IKEA, etc.\n\n📊 **Statistics**: Employment data, tech parks, startups, workforce\n\n🗺️ **Regions**: Information about Hitech City, Gachibowli, Madhapur, Kondapur\n\n🔍 **Navigation**: Ask to "show" or "view" any location to see it on the map\n\nTry asking: "Show me Cyber Towers" or "What companies are in Hitech City?"',
      links: [],
      shouldShowMap: false
    };
  }
  
  // Default response with suggestions
  return {
    text: `I understand you're asking about "${prompt}". Here's what I can help you with:\n\n• **Locations**: Ask about specific landmarks like "Cyber Towers", "T-Hub", "Mindspace"\n• **Regions**: Information about Hitech City, Gachibowli, Madhapur, Kondapur\n• **Statistics**: Employment data, tech parks count, workforce size\n• **Map Navigation**: Say "show [location]" to view it on the map\n\nTry asking:\n- "Show me Cyber Towers"\n- "What is Hitech City?"\n- "How many tech parks are there?"\n- "Tell me about T-Hub"`,
    links: [],
    shouldShowMap: shouldShowMap,
    landmarkId: landmarkId || undefined
  };
};

