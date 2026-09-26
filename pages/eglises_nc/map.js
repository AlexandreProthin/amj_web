/*
 * The interactive map: local basemap layers, clustered church markers,
 * selection. No tile service is used (see the embedded-basemap decision).
 */
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import L from './leaflet-global.js';
import 'leaflet.markercluster';
import { BOUNDS, TERRAIN_STYLE, TYPES } from './content.js';

const ATTRIBUTION = 'Fond : Natural Earth, IRD, DITTT, © contributeurs OpenStreetMap';

export function createChurchMap(element, { churches, onSelect }) {
  const map = L.map(element, {
    zoomControl: false,
    attributionControl: false,
    minZoom: 6,
    maxZoom: 15,
    maxBounds: L.latLngBounds(BOUNDS).pad(0.6),
    maxBoundsViscosity: 0.8,
    zoomSnap: 0.5,
    tapTolerance: 20,
  });
  element.style.background = TERRAIN_STYLE.sea;
  map.fitBounds(BOUNDS, { padding: [8, 8] });

  L.control.zoom({ position: 'bottomright', zoomInTitle: 'Zoomer', zoomOutTitle: 'Dézoomer' }).addTo(map);
  L.control.attribution({ position: 'bottomleft', prefix: '<a href="https://leafletjs.com" target="_blank" rel="noopener">Leaflet</a>' })
    .addAttribution(ATTRIBUTION)
    .addTo(map);
  addHomeControl(map);

  // Basemap: drawn on one canvas, non-interactive so taps reach the markers.
  const renderer = L.canvas({ padding: 0.5 });
  const pane = map.createPane('basemap');
  pane.style.zIndex = 200;
  const layer = (data, style) => L.geoJSON(data, { style, renderer, pane, interactive: false }).addTo(map);
  import('@data/eglises_nc/communes_nc.geojson?geo')
    .then(({ default: land }) => layer(land, TERRAIN_STYLE.land))
    .then(() => import('@data/eglises_nc/terrain_nc.json?geo'))
    .then(({ default: terrain }) => {
      for (const key of ['forest', 'mines', 'water', 'rivers']) {
        if (terrain[key]) layer(terrain[key], TERRAIN_STYLE[key]);
      }
    })
    .catch((error) => console.warn('Fond de carte indisponible', error));

  // Church markers, grouped when they overlap.
  const cluster = L.markerClusterGroup({
    maxClusterRadius: 36,
    showCoverageOnHover: false,
    spiderfyOnMaxZoom: true,
    disableClusteringAtZoom: 13,
    iconCreateFunction: (group) =>
      L.divIcon({
        html: `<span>${group.getChildCount()}</span>`,
        className: 'cluster',
        iconSize: [40, 40],
      }),
  });
  const markers = new Map();
  for (const church of churches) {
    const marker = L.marker([church.lat, church.lon], {
      icon: pinIcon(church, false),
      title: church.name,
      alt: `${TYPES[church.type].label} : ${church.name}`,
      riseOnHover: true,
    });
    marker.on('click', () => onSelect(church.id, { from: 'map' }));
    markers.set(church.id, { marker, church });
  }
  cluster.addLayers([...markers.values()].map(({ marker }) => marker));
  map.addLayer(cluster);

  let selected = null;

  function select(id, { fly = true } = {}) {
    if (selected != null && markers.has(selected)) {
      const previous = markers.get(selected);
      previous.marker.setIcon(pinIcon(previous.church, false));
      previous.marker.setZIndexOffset(0);
    }
    selected = id;
    const entry = markers.get(id);
    if (!entry) return;
    entry.marker.setIcon(pinIcon(entry.church, true));
    entry.marker.setZIndexOffset(1000);
    if (fly) {
      cluster.zoomToShowLayer(entry.marker, () => {
        const zoom = Math.max(map.getZoom(), 12);
        map.flyTo(offsetCenter([entry.church.lat, entry.church.lon], zoom), zoom, { duration: 0.8 });
      });
    }
  }

  /** Highlights a pin tapped on the map; pans only if the detail sheet would hide it. */
  function reveal(id) {
    select(id, { fly: false });
    const entry = markers.get(id);
    if (!entry || window.matchMedia('(min-width: 48rem)').matches) return;
    const point = map.latLngToContainerPoint([entry.church.lat, entry.church.lon]);
    const limit = map.getSize().y * 0.35;
    if (point.y > limit) map.panBy([0, point.y - limit]);
  }

  function clearSelection() {
    if (selected == null) return;
    const entry = markers.get(selected);
    if (entry) entry.marker.setIcon(pinIcon(entry.church, false));
    selected = null;
  }

  /** On phones the detail sheet covers the bottom: aim a little lower so the pin stays visible. */
  function offsetCenter(latlng, zoom) {
    const sheetShift = window.matchMedia('(min-width: 48rem)').matches ? 0 : map.getSize().y * 0.22;
    const point = map.project(latlng, zoom).add([0, sheetShift]);
    return map.unproject(point, zoom);
  }

  function setVisible(ids) {
    const layers = [...markers.values()];
    cluster.removeLayers(layers.filter(({ church }) => !ids.has(church.id)).map(({ marker }) => marker));
    cluster.addLayers(layers.filter(({ church }) => ids.has(church.id)).map(({ marker }) => marker));
  }

  return {
    map,
    select,
    reveal,
    clearSelection,
    setVisible,
    refresh: () => map.invalidateSize(),
    home: () => map.flyToBounds(BOUNDS, { padding: [8, 8], duration: 0.8 }),
  };
}

function pinIcon(church, selected) {
  const classes = ['pin', `pin--${church.type === 'cathédrale' ? 'cathedrale' : church.type === 'chapelle' ? 'chapelle' : 'eglise'}`];
  if (church.approximate) classes.push('pin--approx');
  if (selected) classes.push('is-selected');
  return L.divIcon({
    className: 'pin-hit',
    html: `<span class="${classes.join(' ')}"></span>`,
    iconSize: [36, 36],
  });
}

function addHomeControl(map) {
  const Home = L.Control.extend({
    options: { position: 'bottomright' },
    onAdd() {
      const button = L.DomUtil.create('button', 'map-home');
      button.type = 'button';
      button.title = 'Voir toute la Nouvelle-Calédonie';
      button.setAttribute('aria-label', button.title);
      button.innerHTML =
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11l8-7 8 7M6 9.5V20h12V9.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>';
      L.DomEvent.disableClickPropagation(button);
      L.DomEvent.on(button, 'click', () => map.flyToBounds(BOUNDS, { padding: [8, 8], duration: 0.8 }));
      return button;
    },
  });
  new Home().addTo(map);
}
