import {View, StyleSheet} from 'react-native'
import React, {useEffect} from 'react'
import Answer from "@/components/Answer";

interface AnswersProps {
    answer: number,
    rightAnswer: () => void,
    wrongAnswer: () => void,
}

const Answers: React.FC<AnswersProps> = (props) => {
    const [firstAnswer, setFirstAnswer] = React.useState(0);
    const [secondAnswer, setSecondAnswer] = React.useState(0);
    const [thirdAnswer, setThirdAnswer] = React.useState(0);
    const [realAnswer, setRealAnswer] = React.useState(0);

    function calculateAnswers() {
        const lower = Math.floor(props.answer * 0.9);
        const higher = Math.ceil(props.answer * 1.1);

        const arr = [lower, props.answer, higher].sort(() => Math.random() - 0.5);

        setFirstAnswer(arr[0]);
        setSecondAnswer(arr[1]);
        setThirdAnswer(arr[2]);

        setRealAnswer(props.answer);

    }

    useEffect(() => {
        calculateAnswers();
    }, [props.answer]);

    return (
        <View style={styles.container}>
            <Answer
                value={firstAnswer}
                answer={realAnswer}
                rightAnswer={props.rightAnswer}
                wrongAnswer={props.wrongAnswer}
            />
            <Answer
                value={secondAnswer}
                answer={realAnswer}
                rightAnswer={props.rightAnswer}
                wrongAnswer={props.wrongAnswer}
            />
            <Answer
                value={thirdAnswer}
                answer={realAnswer}
                rightAnswer={props.rightAnswer}
                wrongAnswer={props.wrongAnswer}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
    }
})

export default Answers
