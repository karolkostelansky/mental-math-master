import {Text, TouchableOpacity, StyleSheet} from 'react-native'
import React from 'react'

interface AnswerProps {
    value: number,
    answer: number,
    rightAnswer: () => void,
    wrongAnswer: () => void,
}

const Answer: React.FC<AnswerProps> = (props) => {
    function checkAnswer() {
        if (props.answer === props.value) props.rightAnswer();
        else props.wrongAnswer();
    }

    return (
        <TouchableOpacity onPress={checkAnswer} style={styles.button}>
            <Text style={styles.text}>{props.value}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderColor: 'white',
        borderWidth: 2,
        width: 80,
        height: 80,
        borderRadius: 9999,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
    }
})

export default Answer
