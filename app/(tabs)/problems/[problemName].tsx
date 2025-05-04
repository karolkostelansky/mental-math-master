import {View, Text, SafeAreaView, TouchableOpacity, StyleSheet} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useLocalSearchParams, useRouter} from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import Answers from "@/app/(tabs)/problems/answers";
import generator from "@/constants/ProblemGeneratorFunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScoreShower from "@/components/ScoreShower";
import TimeShowdown from "@/components/TimeShowdown";

type GeneratorFunction = () => (string | number)[];

const ProblemName = () => {
    const initTime = 10;

    const router = useRouter();
    const params = useLocalSearchParams();

    const problemName = Array.isArray(params.problemName)
        ? params.problemName[0]
        : params.problemName || "";

    const [problem, setProblem] = useState("");
    const [problemAns, setProblemAns] = useState(0);

    const [time, setTime] = useState(initTime);
    const [score, setScore] = useState(0);

    function generateProblem() {
        const generatorKey = problemName.toLowerCase();

        if (generatorKey in generator) {
            const result = (generator as Record<string, GeneratorFunction>)[generatorKey]();

            if (result.length >= 2) {
                setProblem(result[0].toString());
                setProblemAns(Number(result[1]));
            } else {
                setProblem("Error in problem generation");
                setProblemAns(0);
            }
        } else {
            setProblem("Problem generator not found");
            setProblemAns(0);
        }
    }

    useEffect(() => {
        generateProblem();
    }, []);

    useEffect(() => {
        if (time === 0) {
            goBack();
            return;
        }

        const timer = setInterval(() => {
            setTime(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [time]);

    function goBack() {
        router.back();
    }

    async function rightAnswer() {
        if (score >= 9) {
            try {
                const storedScore = await AsyncStorage.getItem(problemName);
                let updatedScore = 0;

                if (storedScore !== null) {
                    updatedScore = Number(storedScore) + 1;
                } else {
                    updatedScore = 1;
                }

                await AsyncStorage.setItem(problemName, updatedScore.toString());

                setScore(updatedScore);

                goBack();
            } catch (error) {
                console.error('Error updating score in AsyncStorage:', error);
            }
        } else {
            setScore((prev) => prev + 1);
            generateProblem();
            setTime(10);
        }
    }

    function wrongAnswer() {
        setTime(0);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backButton} onPress={goBack}>
                    <AntDesign name="arrowleft" size={35} color="white"/>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{problemName}</Text>
                <View style={styles.invisibleDiv}></View>
            </View>

            <View style={styles.screenContainer}>
                <ScoreShower
                    score={score}
                    itemSize={30}
                    rowGap={20}
                    containerGap={20}
                    shouldShowOnes={false}
                />
                <View style={styles.problemContainer}>
                    <Text style={styles.problem}>{problem}</Text>
                </View>

                <TimeShowdown
                    initValue={initTime}
                    time={time}
                    score={score}
                />

                <Answers
                    answer={problemAns}
                    rightAnswer={rightAnswer}
                    wrongAnswer={wrongAnswer}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111827',
    },

    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
    },

    backButton: {
        marginLeft: 16,
    },

    headerTitle: {
        color: 'white',
        fontSize: 24,
        lineHeight: 32,
        fontWeight: 600,
    },

    invisibleDiv: {
        width: 50,
    },

    screenContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        gap: 15
    },

    problemContainer: {
        height: 80,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    problem: {
        color: "white",
        fontSize: 36,
    }


});

export default ProblemName
