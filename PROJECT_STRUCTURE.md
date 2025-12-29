# Project Structure

```
hitech-city-3d-visualizer/
├── components/              # React components
│   ├── MapContainer.tsx     # 3D map visualization component
│   ├── Sidebar.tsx          # AI assistant sidebar
│   └── StatsPanel.tsx      # Data analytics dashboard
├── services/                # Business logic services
│   └── localAI.ts          # Local AI knowledge base (no API needed)
├── dist/                   # Build output (generated)
├── node_modules/           # Dependencies (generated)
│
├── App.tsx                 # Main application component
├── index.tsx               # Application entry point
├── index.html              # HTML template
├── types.ts                # TypeScript type definitions
├── constants.tsx            # Application constants (landmarks, coordinates)
│
├── package.json            # Dependencies and scripts
├── package-lock.json       # Lock file
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite build configuration
├── vercel.json            # Vercel deployment configuration
├── .gitignore             # Git ignore rules
│
├── README.md              # Project documentation
├── DEPLOYMENT.md          # Deployment guide
└── PROJECT_STRUCTURE.md   # This file
```

## Directory Descriptions

### `/components`
React components for the UI:
- **MapContainer**: Handles 3D map rendering with MapLibre GL
- **Sidebar**: AI assistant chat interface
- **StatsPanel**: Data visualization dashboard with charts

### `/services`
Business logic and data services:
- **localAI**: Local knowledge base for AI assistant (no external API)

### Root Files
- **App.tsx**: Main app component with tab navigation
- **index.tsx**: React DOM rendering entry point
- **index.html**: HTML template
- **types.ts**: TypeScript interfaces and types
- **constants.tsx**: Landmarks, coordinates, and configuration

### Configuration Files
- **package.json**: NPM dependencies and scripts
- **tsconfig.json**: TypeScript compiler options
- **vite.config.ts**: Vite bundler configuration
- **vercel.json**: Vercel deployment settings
- **.gitignore**: Files to exclude from git

## Key Features

- ✅ **No API Keys Required**: Works completely offline
- ✅ **Clean Structure**: Organized by feature and concern
- ✅ **TypeScript**: Full type safety
- ✅ **Vite**: Fast build and development
- ✅ **Vercel Ready**: Optimized for deployment

