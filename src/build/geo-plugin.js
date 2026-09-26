import { readFile } from 'node:fs/promises';

/**
 * Lets pages `import layers from '@data/…/file.json?geo'`.
 *
 * Lightens GeoJSON at build time without touching the source file:
 * coordinates are rounded (4 decimals ≈ 11 m) and lines and rings are
 * simplified with Douglas–Peucker (`tolerance` in degrees, ≈ 40 m). Accepts a
 * FeatureCollection or an object whose values are FeatureCollections.
 * Feature properties are dropped except `name`.
 */
export function geoPlugin({ decimals = 4, tolerance = 0.0004 } = {}) {
  const factor = 10 ** decimals;
  const round = ([x, y]) => [Math.round(x * factor) / factor, Math.round(y * factor) / factor];

  function simplifyLine(points) {
    if (points.length <= 2) return points;
    const keep = new Uint8Array(points.length);
    keep[0] = keep[points.length - 1] = 1;
    const stack = [[0, points.length - 1]];
    while (stack.length) {
      const [first, last] = stack.pop();
      let maxDistance = 0;
      let index = 0;
      for (let i = first + 1; i < last; i += 1) {
        const distance = segmentDistance(points[i], points[first], points[last]);
        if (distance > maxDistance) [maxDistance, index] = [distance, i];
      }
      if (maxDistance > tolerance) {
        keep[index] = 1;
        stack.push([first, index], [index, last]);
      }
    }
    return points.filter((_, i) => keep[i]);
  }

  function cleanLine(points, isRing) {
    const rounded = [];
    for (const point of points.map(round)) {
      const previous = rounded.at(-1);
      if (!previous || previous[0] !== point[0] || previous[1] !== point[1]) rounded.push(point);
    }
    const simplified = simplifyLine(rounded);
    if (isRing && simplified.length < 4) return null; // collapsed: too small to see
    return simplified;
  }

  function cleanGeometry(geometry) {
    const { type, coordinates } = geometry;
    const rings = (polygon) => polygon.map((ring) => cleanLine(ring, true)).filter(Boolean);
    switch (type) {
      case 'LineString': {
        const line = cleanLine(coordinates, false);
        return line.length > 1 ? { type, coordinates: line } : null;
      }
      case 'MultiLineString':
        return { type, coordinates: coordinates.map((line) => cleanLine(line, false)).filter((line) => line.length > 1) };
      case 'Polygon': {
        const polygon = rings(coordinates);
        return polygon.length ? { type, coordinates: polygon } : null;
      }
      case 'MultiPolygon': {
        const polygons = coordinates.map(rings).filter((polygon) => polygon.length);
        return polygons.length ? { type, coordinates: polygons } : null;
      }
      default:
        return geometry;
    }
  }

  function cleanCollection(collection) {
    const features = [];
    for (const feature of collection.features) {
      const geometry = feature.geometry && cleanGeometry(feature.geometry);
      if (!geometry) continue;
      const name = feature.properties?.name;
      features.push({ type: 'Feature', properties: name ? { name } : {}, geometry });
    }
    return { type: 'FeatureCollection', features };
  }

  return {
    name: 'amj-geo',
    async load(id) {
      const [path, query] = id.split('?');
      if (query !== 'geo') return null;
      const data = JSON.parse(await readFile(path, 'utf8'));
      const result =
        data.type === 'FeatureCollection'
          ? cleanCollection(data)
          : Object.fromEntries(
              Object.entries(data).map(([key, value]) => [key, value?.type === 'FeatureCollection' ? cleanCollection(value) : value]),
            );
      // .json ids go through Vite's JSON plugin, which expects JSON text;
      // other extensions (.geojson) need a JavaScript module.
      const json = JSON.stringify(result);
      return path.endsWith('.json') ? json : `export default ${json};`;
    },
  };
}

function segmentDistance([px, py], [ax, ay], [bx, by]) {
  const dx = bx - ax;
  const dy = by - ay;
  const length = dx * dx + dy * dy;
  const t = length ? Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / length)) : 0;
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}
