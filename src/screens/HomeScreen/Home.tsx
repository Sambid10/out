import React, { useState, useMemo, useCallback, memo } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { HomeStackParamList } from '../../navigation/navigationType'
import SafeAreaViewWrapper from '../../components/SafeAreaViewWrapper'
import { ListHeader } from './ListHeader'
import { showAlert } from '../../../utils/Alert'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useTheme } from '../../context/ThemeContext'
import { Theme } from '../../themes/colors'
import { ThemeMode } from '../../context/ThemeContext'
import { useFetchTodos } from '../../hooks/useFetchTodo'
import { toggleTodo, deleteTodo } from "../../queries/todoQueries"

export type filters = 'completed' | 'pending' | 'all'
export const filterValues: filters[] = ['all', 'completed', 'pending']
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type Props = NativeStackScreenProps<
  HomeStackParamList,
  'Home'
>

interface Todo {
  id: string
  title: string
  completed: boolean
  createdAt: string
}

interface TodoItemProps {
  item: Todo
  onToggle: (id: string, completed: boolean) => void
  onDelete: (id: string) => void
  onEdit: (id: string) => void
  theme: Theme
  mode: ThemeMode
}

const TodoItem = memo(({ item, onToggle, onDelete, onEdit, theme, mode }: TodoItemProps) => (
  <View style={styles.container1}>
    <TouchableOpacity
      onPress={() => onToggle(item.id, item.completed)}
      style={[styles.todocontainer, item.completed && styles.completedtodo, { backgroundColor: theme.colors.card }]}
    >
      <View>
        <BouncyCheckbox
          pointerEvents="none"
          size={22}
          isChecked={item.completed}
          fillColor="#8B5CF6"
          unFillColor={theme.colors.card}
          iconStyle={{ borderColor: '#8B5CF6' }}
        />
      </View>
      <Text style={[{ color: theme.colors.text }, item.completed && styles.completedtodotext]}>
        {item.title}
      </Text>
    </TouchableOpacity>

    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 12 }}>
      <TouchableOpacity onPress={() => onEdit(item.id)}>
        <Text style={{ color: 'green' }}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(item.id)}>
        <Text style={{ color: 'red' }}>Delete</Text>
      </TouchableOpacity>
    </View>
  </View>
))

export default function Home({navigation}:Props) {
  const { theme, mode } = useTheme()
  const [selectedFilter, setSelectedFilter] = useState<filters>('all')
  const { loading, todos } = useFetchTodos()
  const sorted = useMemo(() => {
    const filtered = todos.filter((t) => {
      if (selectedFilter === 'completed') return t.completed
      if (selectedFilter === 'pending') return !t.completed
      return true
    })
    return [...filtered].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }, [todos, selectedFilter])

  const handleToggle = useCallback((id: string, completed: boolean) => {
    toggleTodo(id, completed)
  }, [])

  const handleDelete = useCallback((id: string) => {
    showAlert({
      title: "Are you sure you want to delete?",
      actionBtnText: "Yes",
      onConfirm: () => deleteTodo(id)
    })
  }, [])

  const handleEdit = useCallback(
    (id: string) => navigation.navigate("EditTodo",{id}),
    [navigation]
  )

  const renderItem = useCallback(
    ({ item }: { item: Todo }) => (
      <TodoItem
        item={item}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onEdit={handleEdit}
        theme={theme}
        mode={mode}
      />
    ),
    [handleToggle, handleDelete, handleEdit, theme, mode]
  )

  return (
    <BottomSheetModalProvider>
      <SafeAreaViewWrapper>
        <FlatList
          data={sorted}
          keyboardShouldPersistTaps="handled"
          stickyHeaderIndices={[0]}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 100 }}
          ListHeaderComponent={
            <ListHeader
              setSelectedFilter={setSelectedFilter}
              selectedFilter={selectedFilter}
            />
          }
        ListEmptyComponent={
            loading ? <ActivityIndicator/>  :
            <Text style={{ color: 'gray', textAlign: 'center', marginTop: 20 }}>
              No tasks...
            </Text>
          }
          renderItem={renderItem}
        />
      </SafeAreaViewWrapper>
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  completedtodotext: {
    textDecorationLine: "line-through"
  },
  container1: {
    width: "100%",
    borderRadius: 12,
    marginTop: 12,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 12,
    width: 60,
    height: 60,
    borderRadius: 999,
    backgroundColor: "#8B5CF6",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  fabText: {
    color: "white",
    fontSize: 24,
    marginTop: -2,
  },
  todocontainer: {
    display: "flex", flexDirection: "row", alignItems: "center", borderRadius: 12, padding: 18, borderWidth: 1, borderColor: "#e5e5e5"
  },
  completedtodo: {
    borderColor: "#8B5CF6",
    borderWidth: 1,
  },
  sheet: {
    paddingVertical: 20,
    paddingHorizontal: 12
  }
})