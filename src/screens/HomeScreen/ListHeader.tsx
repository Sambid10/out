
interface Props {
    selectedFilter: string,
    setSelectedFilter: (val: filters) => void
}
import { filterValues } from "./Home";
import type { filters } from "./Home";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native"
import {
    BottomSheetModal,
    BottomSheetView,
} from '@gorhom/bottom-sheet';
import { RadioButton } from 'react-native-paper'
import type { AppDispatch } from "../../store/store"
import { addTodo } from "../../store/slices/TodoSlice"
import { useCallback, useState } from "react"
import React from "react"
import { useRef } from "react"
import { renderBackdrop } from "../../../utils/Backdrop";
import { useTheme } from "../../context/ThemeContext";
import { createTodo } from "../../queries/AddTodo";
export const ListHeader = ({
    selectedFilter,
    setSelectedFilter
}: Props) => {
    const { mode, theme } = useTheme()
    const [todo, setTodo] = useState("")
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);
    return (
        <View style={{ gap: 12, backgroundColor: theme.colors.background, paddingVertical: 12 }}>
            <TextInput
                placeholderTextColor="gray"
                placeholder="+ Add a task"
                returnKeyType="done"
                value={todo}
                style={[styles.input, { backgroundColor: theme.colors.inputbg ,color:theme.colors.inputtxt}]}
                onChangeText={setTodo}
                onSubmitEditing={async() => {
                    if (todo.trim() === "") return
                    await createTodo(todo)
                    setTodo("")
                }}
            />
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}
            >
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8,
                    }}
                >
                    <Text style={{color:theme.colors.inputtxt}}>Your Tasks</Text>
                    {selectedFilter && <Text style={{color:theme.colors.inputtxt}}>({selectedFilter})</Text>}
                </View>


                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8,
                        
                    }}
                >
                    <Text style={{color:theme.colors.inputtxt}}>Filter</Text>
                    <TouchableOpacity
                        onPress={handlePresentModalPress}
                        style={{
                            borderRadius: 99,
                            height: 30,
                            width: 30,
                            borderWidth: 1,
                            borderColor: "#8B5CF6",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Text style={{
                            fontSize: 20,
                            textAlign: "center",
                            marginTop: -8,
                            color: "#8B5CF6"
                        }}>⇅</Text>
                    </TouchableOpacity>
                    <BottomSheetModal
                        backdropComponent={renderBackdrop}
                        ref={bottomSheetModalRef}
                        onChange={handleSheetChanges}
                    >
                        <BottomSheetView style={[styles.contentContainer,{backgroundColor:theme.colors.background}]}>
                            <RadioButton.Group
                                value={selectedFilter}
                                onValueChange={(value) => {
                                    setSelectedFilter(value as filters)
                                }}
                            >
                                {filterValues.map((item) => (
                                    <RadioButton.Item
                                        labelStyle={{color:theme.colors.text}}
                                        style={{ width: "100%" }}
                                        key={item}
                                        label={item.charAt(0).toUpperCase() + item.slice(1)}
                                        value={item}
                                    />
                                ))}
                            </RadioButton.Group>
                        </BottomSheetView>
                    </BottomSheetModal>

                </View>

            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: "gray",
        width: "100%",
        padding: 10,
        borderRadius: 12,
        height: 50
    },
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        width: "100%",
        padding: 32,
    },
})