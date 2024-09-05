import glyphMaps from './map.json';
import glyphMapsOutlined from './outlined.json';
import { ColorValue, Platform, StyleProp, Text, TextStyle } from 'react-native';
import { PureComponent } from 'react';

interface IconProps {
    name: string;
    size?: number;
    color?: ColorValue;
    style?: StyleProp<TextStyle>;
}

const createFontIcons = (glyphMap: Record<string, number | string>, fontFamily: string, fontFile: string) => {

    const fontBasename = fontFile
        ? fontFile.replace(/\.(otf|ttf)$/, '')
        : fontFamily;

    const fontReference = Platform.select({
        windows: `/Assets/${fontFile}#${fontFamily}`,
        android: fontBasename,
        web: fontBasename,
        default: fontFamily,
    });

    class Icon extends PureComponent<IconProps> {
        render() {
            const { name, size, color, style } = this.props;
            let glyph = name ? glyphMap[name] || '?' : '';
            if (typeof glyph === 'number') {
                glyph = String.fromCodePoint(glyph);
            } else if (name) {
                glyph = String.fromCodePoint(parseInt('0x' + glyph, 16));
            }

            return (
                <Text
                    selectable={false}
                    style={[{
                        fontSize: size || 12,
                        fontWeight: 'normal',
                        fontStyle: 'normal',
                        fontFamily: fontReference,
                        color: color || 'black',
                    }, style ? style : {}]}
                >
                    {glyph}
                </Text>
            );
        }
    }

    return Icon;
}


export const MaterialIcons = createFontIcons(glyphMaps, 'Material Icons', 'MaterialIcons-Regular.ttf');
export const MaterialIconsOutlined = createFontIcons(glyphMapsOutlined, 'Material Icons Outlined', 'MaterialIconsOutlined-Regular.ttf');
export const MaterialSymbolsOutlined = createFontIcons(glyphMapsOutlined, 'Material Symbols Outlined', 'MaterialSymbolsOutlined.ttf');

