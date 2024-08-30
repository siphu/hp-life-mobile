import { DrawerScreenProps } from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { View } from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { Course } from "~/api/endpoints";
import { RootStackParamList } from "~/navigation";
import { AuthenticatedScreens } from "~/navigation/screens";

interface Props {
    course: Course;
    courseId: number;
    enrolled: boolean;
    route: RouteProp<RootStackParamList, AuthenticatedScreens.CourseExecution>;
    navigation: StackNavigationProp<RootStackParamList, AuthenticatedScreens.CourseExecution, undefined>
}


const CourseExecution = (props: Props) => {
    return <View></View>;
};

export default CourseExecution;