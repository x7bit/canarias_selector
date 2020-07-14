import { data } from './data';
import { MAP_IMG_WIDTH, MAP_IMG_HEIGHT, MAP_LABELS } from '../constants';

export function getMapLabel(mapKey) {
  if (mapKey.includes('_')) {
    const mapKeyParts = mapKey.split('_');
    return `${MAP_LABELS[mapKeyParts[0]]} · ${MAP_LABELS[mapKey]}`;
  }
  return MAP_LABELS[mapKey];
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

export function getZone(event, mapKey) {
  const mapData = data[mapKey];
  if (mapData && Array.isArray(mapData)) {
    const isImgOriginalSize = event.target.clientWidth === MAP_IMG_WIDTH && event.target.clientHeight === MAP_IMG_HEIGHT;
    const x = isImgOriginalSize ?
      event.pageX - event.target.offsetLeft :
      (event.pageX - event.target.offsetLeft) / event.target.clientWidth * MAP_IMG_WIDTH;
    const y = isImgOriginalSize ?
      event.pageY - event.target.offsetTop :
      (event.pageY - event.target.offsetTop) / event.target.clientHeight * MAP_IMG_HEIGHT;
    for (let i = 0; i < mapData.length; i++) {
      if (polyInside(x, y, mapData[i].poly)) {
        return {
          key: mapData[i].key,
          label: MAP_LABELS[mapData[i].key],
          hasMap: mapData[i].hasMap,
        };
      }
    }
  }
  return null;
}
