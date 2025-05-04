import React from 'react'
import {Tabs} from "expo-router";
import {View, Text, StyleSheet} from "react-native";

interface TabIconProps {
    focused: boolean,
    text: string,
}

const TabIcon: React.FC<TabIconProps> = (props) => {
    return (
        <View
            className={props.focused ? "flex w-[20vw] justify-center items-center " +
                "bg-gray-600 h-full rounded-full" : "flex w-[20vw] justify-center items-center"}>
            <Text className="text-white">{props.text}</Text>
        </View>
    );
}

const _Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                tabBarStyle: {
                    backgroundColor: '#111827',
                    borderTopColor: "black",
                    borderTopWidth: 0
                }
            }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({focused}: { focused: boolean }) => (
                        <TabIcon
                            text="Home"
                            focused={focused}
                        />
                    )
                }}
            >
            </Tabs.Screen>

            <Tabs.Screen
                name="problems"
                options={{
                    title: "Problems",
                    headerShown: false,
                    tabBarIcon: ({focused}: { focused: boolean }) => (
                        <TabIcon
                            text="Problems"
                            focused={focused}
                        />
                    )
                }}
            />
        </Tabs>
    )
}

const styles = StyleSheet.create({
    focusedStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "20%",
        backgroundColor: '#4B5563',
        height: "100%",
        borderRadius: 9999,
    },

    unfocusedStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "20%",
    },
});

export default _Layout
