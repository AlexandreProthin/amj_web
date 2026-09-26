// leaflet.markercluster extends the global `L`, so expose Leaflet before it loads.
import L from 'leaflet';

window.L = L;
export default L;
