import {Animated, Easing, Text, View, StyleSheet} from 'react-native'
import React, {useEffect, useRef} from 'react'
import Svg, {Circle} from "react-native-svg";

interface TimeShowdownProps {
    initValue: number,
    time: number,
    score: number
}

const TimeShowdown: React.FC<TimeShowdownProps> = (props) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const circumference = 2 * Math.PI * 60;

    const startCircleAnimation = () => {
        animatedValue.setValue(0);
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: props.initValue * 1000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();
    };

    const strokeDashoffset = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [circumference, 0]
    });

    useEffect(() => {
        startCircleAnimation();
    }, [props.score]);

    return (
        <View style={styles.container}>
            <Svg height="128" width="128" viewBox="0 0 128 128">
                <Circle
                    cx="64"
                    cy="64"
                    r="60"
                    strokeWidth="4"
                    stroke="#333333"
                    fill="transparent"
                />
                <AnimatedCircle
                    cx="64"
                    cy="64"
                    r="60"
                    strokeWidth="4"
                    stroke="white"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    rotation="-90"
                    origin="64, 64"
                    strokeLinecap="round"
                />
            </Svg>
            <View style={styles.textContainer}>
                <Text style={styles.timeText}>{props.time}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 128,
        height: 128,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        position: 'absolute',
    },
    timeText: {
        fontSize: 36,
        fontWeight: '600',
        color: 'white'
    }
});

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default TimeShowdown;