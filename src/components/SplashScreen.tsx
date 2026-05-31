import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

export default function SplashScreen() {
    return (
        <View style={styles.root}>
            <View >
                <Image
                    style={{ height: 100, width: 100 }}
                    alt='hello'
                    source={require("../../public/todo.png")} />
                <View style={{ marginTop: 12, display: "flex", flexDirection: "row" ,gap:4}}>
                    <ActivityIndicator />
                    <Text style={{
                        color: "#8B5CF6"
                    }}>Loading..</Text>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})