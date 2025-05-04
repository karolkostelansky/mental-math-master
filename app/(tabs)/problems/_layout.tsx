import React from 'react'
import {Stack} from "expo-router";

const _Layout = () => {
    return (
        <Stack>
            <Stack.Screen options={{
                headerShown: false,
            }} name="index"/>
            <Stack.Screen options={{
                headerShown: false
            }} name="[problemName]"/>
        </Stack>
    )
}

export default _Layout

/*
    headerStyle: {
        backgroundColor: "black",
    },
    headerTitleStyle: {
        color: "white"
    },
    headerBackButtonDisplayMode: "minimal",
    headerTintColor: "red",
    headerTitle: ""
     */