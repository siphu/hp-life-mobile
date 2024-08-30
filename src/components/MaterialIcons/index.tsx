import { createIconSet } from 'react-native-vector-icons';

import glyphMaps from './map.json';
import glyphMapsOutlined from './outlined.json';
import { ColorValue } from 'react-native';
import { config } from '~/config/config';
import { Text as RNText, TextProps } from 'react-native';

export const MaterialIcons = createIconSet(glyphMaps, 'Material Icons', 'MaterialIcons-Regular.ttf');
export const MaterialIconsOutlined = createIconSet(glyphMapsOutlined, 'Material Icons Outlined', 'MaterialIconsOutlined-Regular.ttf');
export const MaterialSymbolsOutlined = createIconSet(glyphMapsOutlined, 'Material Symbols Outlined', 'MaterialSymbolsOutlined.ttf');
