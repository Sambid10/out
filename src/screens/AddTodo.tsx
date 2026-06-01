import React, { useState } from 'react'
import { StyleSheet, TextInput, View, Text, Alert, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/navigationType'
import Button from '../components/Button'
import SafeAreaViewWrapper from '../components/SafeAreaViewWrapper'
import KeyBoardAvoidingViewWrapper from '../components/KeyBoardAvoidingViewWrapper'
import { useTheme } from '../context/ThemeContext'
import { createTodo } from '../queries/todoQueries'

export default function AddTodo() {
    const [todo, setTodo] = useState("")
    const { theme } = useTheme()
    const [loading, setLoading] = useState(false)
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const add = async () => {
        setLoading(true)
        try {
            if (todo.length === 0) {
                Alert.alert("Empty todo...")
                return
            }
            await createTodo(todo)
            setLoading(false)
            navigation.navigate('HomeTabs',{screen:"Home"})
        } catch (err) {
            setLoading(false)
            console.log(err)
            Alert.alert("Failed to add Todo")
        }finally{
            setLoading(false)
        }

    }
    return (
        <SafeAreaViewWrapper>
            <KeyBoardAvoidingViewWrapper>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.container}>
                        <Text style={{ fontSize: 24, color: theme.colors.text }}>Add ur new Task!!</Text>
                        <TextInput
                            editable={!loading}                           onChangeText={(txt) => setTodo(txt)}
                            style={[styles.txtinput, { backgroundColor: theme.colors.inputbg, color: theme.colors.inputtxt }]}
                            placeholderTextColor={"gray"}
                            placeholder='+ Add a task'
                        />
                        <Button loading={loading} btntitle={'Add +'} onPress={add} />
                    </View>

                </ScrollView>
            </KeyBoardAvoidingViewWrapper>

        </SafeAreaViewWrapper>


    )
}
const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,

    },
    txtinput: {
        backgroundColor: "white",
        borderRadius: 12,
        width: "100%",
        minHeight: 100,
        start: "auto",
        paddingHorizontal: 12,
        textAlignVertical: "top",
        borderWidth: 1,
        borderColor: "gray",
        padding: 10,
    },
    txt: {
        color: 'white',
        fontWeight: '600',
    },
    container: {
        flex: 1,
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: "100%"
    }
})