import { View } from "react-native";
import { Lesson, ParticipantBookInfo, TaskType, TraineeCourse } from "~/api/endpoints";
import Button from "~/components/Button";
import Text from "~/components/Text";
import { config } from "~/config/config";
import { t } from "~/providers/TranslationProvider";

interface DownloadBookButtonProps {
    course: TraineeCourse;
    lessons?: Lesson[];
    book: ParticipantBookInfo;
}

export const DownloadBookButton = (props: DownloadBookButtonProps) => {

    const hasBook = true;
    const enrolled = props.course?.traineeEnrollmentStatus === 'Enrolled';

    /**
     * Logic: isEnrolled, not finished, has book, only survey left in task
     */

    const tasks =
        props.lessons && Array.isArray(props.lessons) ?
            props.lessons.map(L => L.tasks).flat()
                .filter(t => !t.finishDate)
                .filter(t => t.type === TaskType.Content || t.type === TaskType.Survey) : [];


    const takeSurvey =
        enrolled &&
        !props.course.finishDate &&
        hasBook &&
        tasks.length > 0 &&
        tasks.filter(t => t.type === TaskType.Content).length === 0 &&
        tasks.filter(t => t.type === TaskType.Survey).length > 0
        ;


    return (
        <>
            <View style={{
                alignItems: 'center',
                marginBottom: 10,
            }}>
                <Text style={{
                    fontWeight: '500',
                    lineHeight: 20.02,
                    letterSpacing: .17,
                }}>{t('courseInformation.or')}</Text>
            </View>
            {(hasBook && (
                <Button
                    color={config.color.neutral[400]}
                    textStyle={{
                        color: config.color.neutral[900],
                    }}
                    // icon={<Images.book fill={config.color.neutral[900]} />}
                    title={takeSurvey ? t('bookExecution.takeSurvey.surveyButton') : t('courseInformation.accessEbook')}
                    onPress={() => { }}
                />
            )) || (
                    <Button
                        color={config.color.neutral[400]}
                        textStyle={{
                            color: config.color.neutral[900],
                        }}
                        // icon={<Images.download fill={config.color.neutral[900]} />}
                        title={t('courseInformation.downloadEbook')}
                        onPress={() => { }}
                    />
                )}
        </>
    );
}