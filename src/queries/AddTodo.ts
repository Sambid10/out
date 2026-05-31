import firestore from '@react-native-firebase/firestore'
import { getAuth } from '@react-native-firebase/auth'

export async function createTodo(title: string) {
  const uid = getAuth().currentUser?.uid
  if (!uid) return
  try{
  await firestore()
    .collection('users')
    .doc(uid)
    .collection('todos')
    .add({
      title,
      completed: false,
      createdAt: new Date().toISOString()
    })}catch(err){
      console.log(err)
    }
}