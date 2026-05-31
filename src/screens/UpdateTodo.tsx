import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
} from 'react-native'
import BouncyCheckbox from "react-native-bouncy-checkbox"
import { useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/navigationType'
import SafeAreaViewWrapper from '../components/SafeAreaViewWrapper'
import Button from '../components/Button'
import KeyBoardAvoidingViewWrapper from '../components/KeyBoardAvoidingViewWrapper'
import { useTheme } from '../context/ThemeContext'
import { useFetchTodos } from '../hooks/useFetchTodo'
import { updateTodo } from '../queries/TodoActions'

export default function UpdateTodo() {
    const { theme } = useTheme()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const route = useRoute<any>()
    const { id } = route.params
    const [text, setText] = useState('')
    const [completed, setCompleted] = useState(false)

    const { todos } = useFetchTodos()
    const todo = todos.find(t => t.id === id)

    useEffect(() => {
        if (todo) {
            setText(todo.title)
            setCompleted(todo.completed)
        }
    }, [todo])

    const save = async () => {
        if (!id) return
        await updateTodo(id, text, completed)
        navigation.navigate('Home')
    }

    return (
        <SafeAreaViewWrapper>
            <KeyBoardAvoidingViewWrapper>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <Text style={{ fontSize: 24, color: theme.colors.text }}>Update ur Task!!</Text>
                        <TextInput
                            value={text}
                            onChangeText={(text) => setText(text)}
                            style={[styles.txtinput, { backgroundColor: theme.colors.inputbg, color: theme.colors.inputtxt }]}
                            placeholderTextColor={"gray"}
                            placeholder="Enter your todo.."
                        />
                        <BouncyCheckbox
                            size={25}
                            isChecked={completed}
                            onPress={(checked: boolean) => setCompleted(checked)}
                            fillColor="#8B5CF6"
                            unFillColor={theme.colors.inputbg}
                            text="Task Completed"
                        />
                        <Button btntitle='Update +' onPress={save} />
                    </View>
                </ScrollView>
            </KeyBoardAvoidingViewWrapper>
        </SafeAreaViewWrapper>
    )
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: 'blue',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 18,
        width: "50%",
        display: "flex",
        alignItems: "center"
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        width: "100%"
    }
})