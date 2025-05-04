import {StyleSheet, Text, View} from 'react-native'
import React from 'react'

interface ScoreShowerProps {
    score: number,
    itemSize: number,
    rowGap: number,
    containerGap: number,
    shouldShowOnes: boolean,
}

const ScoreShower: React.FC<ScoreShowerProps> = (props) => {
    const maxScore = 5;

    const firstArray = Array(maxScore).fill(0);
    const secondArray = Array(maxScore).fill(0);

    function shouldBeLight(index: number) {
        return index < props.score;
    }

    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            gap: props.containerGap,
        },

        row: {
            display: 'flex',
            flexDirection: 'row',
            gap: props.shouldShowOnes ? props.rowGap * 2 : props.rowGap,
        },

        itemLight: {
            width: props.itemSize,
            height: props.itemSize,
            backgroundColor: ! props.shouldShowOnes ? 'white' : '#111827',
            borderRadius: 9999,
        },

        itemDark: {
            width: props.itemSize,
            height: props.itemSize,
            backgroundColor: ! props.shouldShowOnes ? '#4B5563' : '#111827',
            borderRadius: 9999,
        },

        ones: {
            width: props.itemSize,
            height: props.itemSize,
            color: 'white',
            fontSize: props.itemSize,
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                {firstArray.map((_, index) => (
                    ! props.shouldShowOnes ?
                        <View key={index} style={shouldBeLight(index) ? styles.itemLight : styles.itemDark}/> :
                        <Text key={index} style={styles.ones}>{shouldBeLight(index) ? 1 : 0}</Text>
                ))}
            </View>
            <View style={styles.row}>
                {secondArray.map((_, index) => (
                    ! props.shouldShowOnes ?
                        <View key={index}
                            style={shouldBeLight(5 + index) ? styles.itemLight : styles.itemDark}/> :
                        <Text key={index} style={styles.ones}>{shouldBeLight(5 + index) ? 1 : 0}</Text>
                ))}
            </View>
        </View>
    );
}

export default ScoreShower
