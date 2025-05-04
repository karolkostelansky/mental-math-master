import {Text, TouchableOpacity, StyleSheet, View} from 'react-native'
import React, {useCallback, useEffect, useState} from 'react'
import {useFocusEffect, useRouter} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScoreShower from "@/components/ScoreShower";

const ProblemType: React.FC<{ name: string }> = ({name}) => {
    const [score, setScore] = useState(0);
    const router = useRouter();

    function handleClick() {
        router.push(`/problems/${name}`);
    }

    const getScore = async () => {
        try {
            const storedScore = await AsyncStorage.getItem(name);
            if (storedScore !== null) {
                setScore(Number(storedScore));
            }
        } catch (error) {
            console.error('Error retrieving score:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            getScore();

            return () => {};
        }, [name])
    );

    useEffect(() => {
        getScore();
    }, []);

    return (
        <TouchableOpacity onPress={handleClick} style={styles.container}>
            <Text style={styles.text}>{name}</Text>
            <View style={styles.scoreContainer}>
                <ScoreShower
                    score={score}
                    itemSize={15}
                    rowGap={10}
                    containerGap={10}
                    shouldShowOnes={true}
                />
                <Text style={styles.score}>{score}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 5,
        marginTop: 5,
        borderTopColor: '#444444',
        borderTopWidth: 1,
        height: 100,
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        flexDirection: 'row',
    },

    scoreContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 30,
        marginTop: 10,
    },

    text: {
        color: 'white',
        marginLeft: 15,
        marginTop: 10,
        fontSize: 16,
    },

    score: {
        color: 'white',
        marginTop: 10,
        fontSize: 20,
        marginRight: 30,
    }
})

export default ProblemType
