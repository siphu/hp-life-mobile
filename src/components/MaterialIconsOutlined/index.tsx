import { createIconSet } from 'react-native-vector-icons';
import { glyphMaps } from './map';
import { IconProps } from 'react-native-vector-icons/Icon';
const IconSet = createIconSet(glyphMaps, 'MaterialIconsOutlined', 'MaterialIconsOutlined.ttf');

const Icon = (props: IconProps) => {
    return <IconSet name="test" />;
}
export default Icon;