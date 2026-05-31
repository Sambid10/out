import { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'
import { getAuth } from '@react-native-firebase/auth'

export interface Todo {
  id: string
  title: string
  completed: boolean
  createdAt: string
}

export function useFetchTodos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const uid = getAuth().currentUser?.uid
    if (!uid) return

    const unsubscribe = firestore()
      .collection('users')
      .doc(uid)
      .collection('todos')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Todo[]
        setTodos(data)
        setLoading(false)
      })

    return unsubscribe 
  }, [])

  return { todos, loading }
}