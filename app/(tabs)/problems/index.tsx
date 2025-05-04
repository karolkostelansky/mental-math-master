import {SafeAreaView, ScrollView, StyleSheet} from 'react-native'
import React from 'react'
import ProblemType from "@/components/ProblemType";

const levels = [
    "Addition",
    "Subtraction",
    "Multiplication",
]

const Index = () => {
    return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    {levels.map((level, i) => (
                        <ProblemType
                            key={i}
                            name={level}
                        />
                    ))}
                </ScrollView>
            </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: '#111827',
    }
});

export default Index
