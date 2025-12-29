
import { Landmark } from './types';

// Map center coordinates for Hitech City, Hyderabad
export const HYDERABAD_CENTER: [number, number] = [78.3915, 17.4483];

export interface ExtendedLandmark extends Landmark {
  cameraConfig: {
    pitch: number;
    bearing: number;
    zoom: number;
  };
}

export const LANDMARKS: ExtendedLandmark[] = [
  {
    id: 'cyber-towers',
    name: 'Cyber Towers',
    coordinates: [78.3824, 17.4503],
    description: 'The iconic symbol of IT Hyderabad, inaugurated in 1998.',
    category: 'Tech',
    height: 60,
    cameraConfig: { pitch: 65, bearing: -30, zoom: 16.5 }
  },
  {
    id: 't-hub-2',
    name: 'T-Hub 2.0',
    coordinates: [78.3756, 17.4412],
    description: 'Worlds largest innovation campus and startup incubator.',
    category: 'Tech',
    height: 45,
    cameraConfig: { pitch: 50, bearing: 10, zoom: 17 }
  },
  {
    id: 'mindspace',
    name: 'Raheja Mindspace',
    coordinates: [78.3865, 17.4435],
    description: 'A massive IT SEZ housing global giants like Google and Amazon.',
    category: 'Tech',
    height: 80,
    cameraConfig: { pitch: 70, bearing: 45, zoom: 15.8 }
  },
  {
    id: 'gachibowli',
    name: 'Gachibowli IT Corridor',
    coordinates: [78.3486, 17.4227],
    description: 'Major IT hub with numerous tech parks and corporate offices.',
    category: 'Tech',
    height: 70,
    cameraConfig: { pitch: 60, bearing: 20, zoom: 15.5 }
  },
  {
    id: 'financial-district',
    name: 'Financial District',
    coordinates: [78.3654, 17.4156],
    description: 'Hyderabads emerging financial and business district.',
    category: 'Tech',
    height: 90,
    cameraConfig: { pitch: 65, bearing: -15, zoom: 16 }
  },
  {
    id: 'wipro-campus',
    name: 'Wipro Campus',
    coordinates: [78.3742, 17.4389],
    description: 'Major Wipro development center in Hitech City.',
    category: 'Tech',
    height: 55,
    cameraConfig: { pitch: 55, bearing: 30, zoom: 16.2 }
  },
  {
    id: 'ikea-hyd',
    name: 'IKEA Hyderabad',
    coordinates: [78.3745, 17.4398],
    description: 'Indias first IKEA store, a major retail landmark.',
    category: 'Retail',
    height: 30,
    cameraConfig: { pitch: 45, bearing: 0, zoom: 16.5 }
  },
  {
    id: 'inorbit-mall',
    name: 'Inorbit Mall',
    coordinates: [78.3912, 17.4344],
    description: 'One of Hyderabads premier shopping and dining destinations.',
    category: 'Retail',
    height: 35,
    cameraConfig: { pitch: 55, bearing: -20, zoom: 16.8 }
  },
  {
    id: 'shilparamam',
    name: 'Shilparamam',
    coordinates: [78.3805, 17.4442],
    description: 'Cultural village and crafts exhibition center.',
    category: 'Lifestyle',
    height: 25,
    cameraConfig: { pitch: 50, bearing: -10, zoom: 16.5 }
  },
  {
    id: 'hi-tech-metro',
    name: 'Hitech City Metro',
    coordinates: [78.3845, 17.4485],
    description: 'Metro station connecting Hitech City to the rest of Hyderabad.',
    category: 'Transport',
    height: 20,
    cameraConfig: { pitch: 50, bearing: 0, zoom: 17 }
  }
];
