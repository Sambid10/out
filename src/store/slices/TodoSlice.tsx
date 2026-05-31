import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Todo = {
  id: string
  todo: string,
  isCompleted: boolean
}

export type TodoState = {
  todos: Todo[]
}

const initialState: TodoState = {
  todos: []
}

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ todo: string }>) => {
      state.todos.push({
        id: Date.now().toString(),
        todo: action.payload.todo,
        isCompleted: false
      })
    },
    deleteTodo: (state, action: PayloadAction<{ id: string }>) => {
      state.todos = state.todos.filter(t => t.id !== action.payload.id)
    },
    updateTodo: (
      state,
      action: PayloadAction<{ id: string, newtodo: string, newiscompleted: boolean }>
    ) => {
      const index = state.todos.findIndex(
        t => t.id === action.payload.id
      )
      state.todos[index].id = Date.now().toString(),
      state.todos[index].todo = action.payload.newtodo
      state.todos[index].isCompleted = action.payload.newiscompleted
    },
    toggleTodo: (state, action: PayloadAction<{ id: string }>) => {
      const todo = state.todos.find(t => t.id === action.payload.id)
      if (todo) {
        todo.isCompleted = !todo.isCompleted
      }
    }
  },

})

export const { addTodo, deleteTodo, updateTodo,toggleTodo } = todoSlice.actions
export default todoSlice.reducer