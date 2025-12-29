
import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { LANDMARKS, HYDERABAD_CENTER } from '../constants';

interface MapContainerProps {
  style: string;
  showTraffic: boolean;
  showTerrain: boolean;
}

export interface MapRef {
  flyToLandmark: (id: string) => void;
  resetView: () => void;
}

const MapContainer = forwardRef<MapRef, MapContainerProps>(({ style, showTraffic, showTerrain }, ref) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isEngineActive, setIsEngineActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useImperativeHandle(ref, () => ({
    flyToLandmark: (id: string) => {
      const landmark = LANDMARKS.find(l => l.id === id);
      if (landmark && mapRef.current) {
        mapRef.current.flyTo({
          center: landmark.coordinates,
          zoom: landmark.cameraConfig.zoom,
          pitch: landmark.cameraConfig.pitch,
          bearing: landmark.cameraConfig.bearing,
          essential: true,
          duration: 3000
        });
      }
    },
    resetView: () => {
      if (mapRef.current) {
        mapRef.current.flyTo({
          center: HYDERABAD_CENTER,
          zoom: 14.5,
          pitch: 60,
          bearing: -20,
          duration: 2000
        });
      }
    }
  }));

  useEffect(() => {
    if (!mapContainerRef.current) return;

    setIsMapLoaded(false);
    setIsEngineActive(false);
    setError(null);

    console.log('Initializing map with style:', style);

    let map: maplibregl.Map;
    let loadTimeout: NodeJS.Timeout;
    let errorTimeout: NodeJS.Timeout;

    // Map style configurations using free tile sources
    const getMapStyle = (styleId: string) => {
      const styles: Record<string, any> = {
        'dark-v11': {
          version: 8,
          sources: {
            'osm-tiles': {
              type: 'raster',
              tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
              tileSize: 256,
              attribution: '© OpenStreetMap contributors'
            }
          },
          layers: [
            {
              id: 'osm-tiles',
              type: 'raster',
              source: 'osm-tiles',
              minzoom: 0,
              maxzoom: 19
            }
          ],
          glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf'
        },
        'satellite-streets-v12': {
          version: 8,
          sources: {
            'satellite': {
              type: 'raster',
              tiles: [
                'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
              ],
              tileSize: 256,
              attribution: '© Esri'
            }
          },
          layers: [
            {
              id: 'satellite',
              type: 'raster',
              source: 'satellite',
              minzoom: 0,
              maxzoom: 19
            }
          ],
          glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf'
        },
        'light-v11': {
          version: 8,
          sources: {
            'carto-light': {
              type: 'raster',
              tiles: [
                'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                'https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                'https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
              ],
              tileSize: 256,
              attribution: '© OpenStreetMap © CARTO'
            }
          },
          layers: [
            {
              id: 'carto-light',
              type: 'raster',
              source: 'carto-light',
              minzoom: 0,
              maxzoom: 19
            }
          ],
          glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf'
        }
      };
      return styles[styleId] || styles['dark-v11'];
    };

    try {
      map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: getMapStyle(style),
        center: HYDERABAD_CENTER,
        zoom: 14.5,
        pitch: 60,
        bearing: -20,
        antialias: true
      });

      mapRef.current = map;

      // Set a timeout to show error if map doesn't load in 30 seconds
      loadTimeout = setTimeout(() => {
        if (!isMapLoaded) {
          setError('Map loading timeout. Check your internet connection.');
          console.error('Map loading timeout');
        }
      }, 30000);

      // Handle map errors
      map.on('error', (e: any) => {
        console.error('MapLibre error:', e);
        setError(`Map error: ${e.error?.message || 'Unknown error'}`);
        clearTimeout(loadTimeout);
        clearTimeout(errorTimeout);
      });

      map.on('load', () => {
        clearTimeout(loadTimeout);
        setIsMapLoaded(true);
        setError(null);
        
        try {
          // Note: 3D terrain and buildings require vector tile sources
          // For now, we'll use a simplified approach with markers
          // Full 3D features would require additional tile sources
          
          // Add a simple terrain effect using a fill layer if needed
          if (showTerrain) {
            // Simplified terrain visualization
            console.log('Terrain visualization enabled');
          }

          // Activate engine after all layers are loaded
          setTimeout(() => {
            setIsEngineActive(true);
            setError(null);
          }, 1000);

          // Category color mapping
          const categoryColors: Record<string, { bg: string; border: string; shadow: string }> = {
            'Tech': { bg: '#06b6d4', border: '#0891b2', shadow: 'rgba(6, 182, 212, 0.8)' },
            'Retail': { bg: '#a855f7', border: '#9333ea', shadow: 'rgba(168, 85, 247, 0.8)' },
            'Lifestyle': { bg: '#10b981', border: '#059669', shadow: 'rgba(16, 185, 129, 0.8)' },
            'Transport': { bg: '#f59e0b', border: '#d97706', shadow: 'rgba(245, 158, 11, 0.8)' }
          };

          // Markers with hover tooltips
          LANDMARKS.forEach((landmark) => {
            const colors = categoryColors[landmark.category] || categoryColors['Tech'];
            
            // Create marker element
            const el = document.createElement('div');
            el.className = 'landmark-marker';
            el.style.width = '24px';
            el.style.height = '24px';
            el.style.background = colors.bg;
            el.style.borderRadius = '50%';
            el.style.border = `3px solid ${colors.border}`;
            el.style.boxShadow = `0 0 20px ${colors.shadow}, 0 2px 8px rgba(0,0,0,0.3)`;
            el.style.cursor = 'pointer';
            el.style.transition = 'all 0.3s ease';
            el.style.position = 'relative';
            el.style.zIndex = '10';

            // Add inner white dot
            const innerDot = document.createElement('div');
            innerDot.style.width = '8px';
            innerDot.style.height = '8px';
            innerDot.style.background = 'white';
            innerDot.style.borderRadius = '50%';
            innerDot.style.position = 'absolute';
            innerDot.style.top = '50%';
            innerDot.style.left = '50%';
            innerDot.style.transform = 'translate(-50%, -50%)';
            el.appendChild(innerDot);

            // Hover effects
            el.addEventListener('mouseenter', () => {
              el.style.transform = 'scale(1.3)';
              el.style.boxShadow = `0 0 30px ${colors.shadow}, 0 4px 12px rgba(0,0,0,0.4)`;
            });
            el.addEventListener('mouseleave', () => {
              el.style.transform = 'scale(1)';
              el.style.boxShadow = `0 0 20px ${colors.shadow}, 0 2px 8px rgba(0,0,0,0.3)`;
            });

            // Create popup with better styling
            const popup = new maplibregl.Popup({ 
              offset: 30,
              closeButton: true,
              closeOnClick: false,
              className: 'landmark-popup'
            }).setHTML(`
              <div style="background: #1e3a8a; color: white; padding: 12px 16px; border-radius: 8px; min-width: 200px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
                <h4 style="font-weight: bold; font-size: 16px; margin: 0 0 8px 0; color: white; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 8px;">
                  ${landmark.name}
                </h4>
                <p style="font-size: 13px; margin: 0; color: rgba(255,255,255,0.9); line-height: 1.4;">
                  ${landmark.description}
                </p>
                <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.1);">
                  <span style="font-size: 11px; color: rgba(255,255,255,0.7); background: rgba(255,255,255,0.1); padding: 4px 8px; border-radius: 4px; display: inline-block;">
                    ${landmark.category}
                  </span>
                </div>
              </div>
            `);

            // Create marker with hover tooltip
            const marker = new maplibregl.Marker(el)
              .setLngLat(landmark.coordinates)
              .setPopup(popup)
              .addTo(map);

            // Show popup on hover
            el.addEventListener('mouseenter', () => {
              if (!marker.getPopup().isOpen()) {
                marker.togglePopup();
              }
            });

            // Optional: Keep popup open on click, close on mouseleave
            el.addEventListener('click', (e) => {
              e.stopPropagation();
            });
          });
        } catch (layerError) {
          console.error('Error adding layers:', layerError);
          setError('Error loading 3D layers');
        }
      });

      // Handle style loading
      map.on('style.load', () => {
        console.log('Map style loaded');
      });

      // Handle data loading
      map.on('data', (e: any) => {
        if (e.dataType === 'source') {
          console.log('Source data event:', e.dataType);
        }
      });

    } catch (initError) {
      console.error('Error initializing map:', initError);
      setError(`Initialization error: ${initError instanceof Error ? initError.message : 'Unknown error'}`);
      clearTimeout(loadTimeout);
    }

    return () => {
      clearTimeout(loadTimeout);
      clearTimeout(errorTimeout);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [style, showTerrain]);

  useEffect(() => {
    if (!mapRef.current || !mapRef.current.isStyleLoaded()) return;
    
    // Note: Traffic data requires a specific tile source
    // For now, we'll show a message that traffic overlay is not available with free tiles
    if (showTraffic) {
      console.log('Traffic overlay requested - requires additional tile source');
      // You can add custom traffic visualization here if needed
    }
  }, [showTraffic]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="absolute inset-0" />
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <div className="bg-slate-900/90 backdrop-blur-xl border border-cyan-500/30 px-5 py-2.5 rounded-full flex items-center gap-4 text-[11px] uppercase font-bold tracking-widest shadow-lg shadow-cyan-500/20">
          <span className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full transition-all ${
              error
                ? 'bg-red-500 shadow-[0_0_12px_#ef4444] animate-pulse'
                : isEngineActive 
                  ? 'bg-green-500 shadow-[0_0_12px_#22c55e] animate-pulse' 
                  : isMapLoaded 
                    ? 'bg-yellow-500 shadow-[0_0_12px_#eab308] animate-pulse' 
                    : 'bg-red-500 shadow-[0_0_12px_#ef4444]'
            }`}></div>
            <span className={error ? 'text-red-400' : isEngineActive ? 'text-green-400' : isMapLoaded ? 'text-yellow-400' : 'text-red-400'}>
              {error ? 'Error' : isEngineActive ? 'Active' : isMapLoaded ? 'Loading' : 'Initializing'} 3D Engine
            </span>
          </span>
          <span className="opacity-30">|</span>
          <span className="text-cyan-400">HITEC_OS v4.2</span>
        </div>
      </div>
      {error && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-10 bg-red-900/90 backdrop-blur-xl border border-red-500/50 px-4 py-2 rounded-lg text-xs text-red-200 max-w-md text-center shadow-lg">
          {error}
          <div className="mt-1 text-[10px] text-red-300">Check console for details</div>
        </div>
      )}
    </div>
  );
});

export default MapContainer;
