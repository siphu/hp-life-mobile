import { ScrollView, View } from "react-native";
import Text from "~/components/Text"
import WebView from "~/components/Webview";

const CourseInformation = () => {
    return <ScrollView style={{ flex: 1 }}>
        <Text>Course Information 2</Text>
        <WebView autoExpand={true} source={{ uri: "https://www.google.com" }} style={{
        }} />
    </ScrollView>
};

export default CourseInformation;