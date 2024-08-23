import React from "react";
import { Pressable, View } from "react-native"
import Alert from "~/components/Alert";
import Text from "~/components/Text"

const Home = () => {
    const [show, setShow] = React.useState(false);
    return (
        <View>
            <Alert position='Top' show={show} >
                <Text>Alert Goes here</Text>
            </Alert>
            <Pressable style={{ padding: 20 }} onPress={() => setShow(true)}><Text>Show</Text></Pressable>
        </View>
    )

}

export default Home;