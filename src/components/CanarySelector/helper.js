import { data } from './data';
import { MAP_LABELS } from '../constants';

export function getMapLabel(mapKey, t) {
  const label = (MAP_LABELS[mapKey] === 't') ? t(mapKey) : MAP_LABELS[mapKey];
  if (mapKey.includes('_')) {
    const mapKeyParts = mapKey.split('_');
    return `${MAP_LABELS[mapKeyParts[0]]} · ${label}`;
  }
  return label;
}

export function polyInside(x, y, poly) {
  let isInside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      let xi = poly[i][0], yi = poly[i][1];
      let xj = poly[j][0], yj = poly[j][1];
      let intersect = ((yi > y) !== (yj > y))
          && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) {
          isInside = !isInside;
      }
  }
  return isInside;
}

export function getZone(event, mapKey, t) {
  const mapData = data[mapKey];
  if (mapData && Array.isArray(mapData)) {
    const imgRect = event.target.getBoundingClientRect();
    const originalHeight = event.target.naturalHeight;
    const originalWidth = event.target.naturalWidth;
    const isImgOriginalSize = imgRect.width === originalWidth && imgRect.height === originalHeight;
    const x = isImgOriginalSize ?
      event.pageX - imgRect.left :
      (event.pageX - imgRect.left) / imgRect.width * originalWidth;
    const y = isImgOriginalSize ?
      event.pageY - imgRect.top :
      (event.pageY - imgRect.top) / imgRect.height * originalHeight;
    for (let i = 0; i < mapData.length; i++) {
      if (polyInside(x, y, mapData[i].poly)) {
        return {
          key: mapData[i].key,
          label: (MAP_LABELS[mapData[i].key] === 't') ? t(mapData[i].key) : MAP_LABELS[mapData[i].key],
          hasMap: mapData[i].hasMap,
        };
      }
    }
  }
  return null;
}
