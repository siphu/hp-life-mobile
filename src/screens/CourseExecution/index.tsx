import { DrawerScreenProps } from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { View } from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { Course, Task, TraineeCourse } from "~/api/endpoints";
import Text from "~/components/Text";
import { RootStackParamList } from "~/navigation";
import { AuthenticatedScreens } from "~/navigation/screens";

interface Props {
    course: TraineeCourse;
    task: Task;
    onForceUpdate: (taskId?: number) => void;
    route: RouteProp<RootStackParamList, AuthenticatedScreens.CourseExecution>;
    navigation: StackNavigationProp<RootStackParamList, AuthenticatedScreens.CourseExecution, undefined>;

}

const CourseExecution = ({ course, task, navigation }: Props) => {
    return <View>
        <Text>{course.name}</Text>
        <Text>{task.name}</Text>
        <Text>{JSON.stringify(task, undefined, 2)}</Text>
    </View>;
};

export default CourseExecution;