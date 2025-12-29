# Hitech City Hyderabad - 3D Visualizer Dashboard

A modern, interactive 3D visualization dashboard for Hitech City, Hyderabad. Built with React, TypeScript, MapLibre GL, and featuring real-time data visualizations, local AI chat assistance, and comprehensive analytics. **No API keys required!**

## Live Demo

**[View Live Dashboard](https://hitech-3-d-visualisation.vercel.app/)**

Experience the interactive 3D visualization, AI assistant, and data analytics in action!

## Features

- **3D Interactive Map**: Explore Hitech City with immersive 3D terrain and buildings
- **Comprehensive Dashboard**: Multiple visualization tabs with charts and metrics
- **AI Chat Assistant**: Get insights about Hitech City using local knowledge base (no API needed)
- **Landmark Navigation**: Quick access to major tech parks and landmarks
- **Real-time Analytics**: View employment data, growth trends, and sector distribution
- **Multiple Map Styles**: Switch between Cyber, Real, and Core visualization modes
- **Traffic Data**: Optional real-time traffic overlay

## Quick Start

### Prerequisites
- Node.js 18+ (20+ recommended)
- npm or yarn
- **No API keys required!** The AI assistant uses a local knowledge base
- **No map token required!** Using MapLibre GL with free tile sources

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd hitech-city-3d-visualizer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **No configuration needed!**
   - No API keys required - AI assistant uses local knowledge base
   - No map tokens needed - uses MapLibre GL with free tile sources
   - Just run and enjoy!

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to `http://localhost:3000`

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

### Deploy to Vercel

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy**:
1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Add environment variables
4. Deploy!

Or use Vercel CLI:
```bash
npm i -g vercel
vercel
```

## Landmarks

The application includes visualization for major landmarks:
- Cyber Towers
- T-Hub 2.0
- Raheja Mindspace
- Gachibowli IT Corridor
- Financial District
- Wipro Campus
- IKEA Hyderabad
- Inorbit Mall
- Shilparamam
- Hitech City Metro

## Dashboard Features

### Overview Tab
- Company employment data
- Key indicators (Tech Parks, Innovation Hubs, Occupancy)
- Workforce statistics

### Growth Tab
- Monthly growth trends
- Company growth rates
- Visual growth charts

### Sectors Tab
- Sector distribution pie chart
- Detailed sector breakdown
- Percentage allocations

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **MapLibre GL** - Free 3D mapping (no token required!)
- **Recharts** - Data visualization
- **Local AI Knowledge Base** - AI chat assistant (no API needed)
- **Tailwind CSS** - Styling

## Project Structure

```
hitech-city-3d-visualizer/
├── components/              # React components
│   ├── MapContainer.tsx     # 3D map visualization
│   ├── Sidebar.tsx         # AI assistant interface
│   └── StatsPanel.tsx      # Data analytics dashboard
├── services/               # Business logic
│   └── localAI.ts         # Local AI knowledge base
├── constants.tsx           # Landmarks and coordinates
├── types.ts               # TypeScript definitions
├── App.tsx                # Main application
├── index.tsx              # Entry point
└── vercel.json            # Deployment configuration
```

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed structure.

## No API Keys Required!

### AI Assistant
**No API key needed!** The AI assistant uses a **local knowledge base** with:
- Pre-trained responses about Hitech City landmarks
- Region information (Hitech City, Gachibowli, Madhapur, Kondapur)
- FAQ database with common questions
- Statistics and employment data
- Pattern matching for intelligent responses

### Map Visualization
**No token required!** The application uses **MapLibre GL**, a free and open-source alternative to Mapbox. It uses free tile sources from OpenStreetMap, Esri, and Carto.

## Customization

### Adding New Landmarks
Edit `constants.tsx` to add new landmarks:
```typescript
{
  id: 'landmark-id',
  name: 'Landmark Name',
  coordinates: [lng, lat],
  description: 'Description',
  category: 'Tech' | 'Retail' | 'Lifestyle' | 'Transport',
  height: 50,
  cameraConfig: { pitch: 60, bearing: -20, zoom: 16 }
}
```

### Customizing Dashboard Data
Edit `components/StatsPanel.tsx` to modify charts and metrics.

## Troubleshooting

### Map not loading
- Check browser console for errors
- Verify internet connection (needed for tile loading)
- Try refreshing the page

### Build errors
- Clear `node_modules` and reinstall
- Check Node.js version (18+ required)
- Review TypeScript errors

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions:
- Open an issue on GitHub
- Check the [DEPLOYMENT.md](./DEPLOYMENT.md) guide
- Visit the [live dashboard](https://hitech-3-d-visualisation.vercel.app/) to see it in action

---

