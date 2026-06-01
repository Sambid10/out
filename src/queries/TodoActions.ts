import firestore from '@react-native-firebase/firestore'
import { getAuth } from '@react-native-firebase/auth'


export async function createTodo(title: string) {
  const uid = getAuth().currentUser?.uid

  if (!uid) {
    throw new Error('User not authenticated')
  }

  await firestore()
    .collection('users')
    .doc(uid)
    .collection('todos')
    .add({
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    })
}

export async function toggleTodo(id: string, completed: boolean) {
  const uid = getAuth().currentUser?.uid
  if (!uid) return

  await firestore()
    .collection('users')
    .doc(uid)
    .collection('todos')
    .doc(id)
    .update({ completed: !completed })
}

export async function deleteTodo(id: string) {
  const uid = getAuth().currentUser?.uid
  if (!uid) return

  await firestore()
    .collection('users')
    .doc(uid)
    .collection('todos')
    .doc(id)
    .delete()
}

export async function updateTodo(id: string, title: string, completed: boolean) {
  const uid = getAuth().currentUser?.uid
  if (!uid) return

  await firestore()
    .collection('users')
    .doc(uid)
    .collection('todos')
    .doc(id)
    .update({ title, completed })
}