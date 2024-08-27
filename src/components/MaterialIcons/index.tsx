import { createIconSet } from 'react-native-vector-icons';

import glyphMaps from './map.json';
import glyphMapsOutlined from './outlined.json';

export const MaterialIcons = createIconSet(glyphMaps, 'Material Icons', 'MaterialIcons-Regular.ttf');
export const MaterialIconsOutlined = createIconSet(glyphMapsOutlined, 'Material Icons Outlined', 'MaterialIconsOutlined-Regular.ttf');
