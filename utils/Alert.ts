import { Alert } from 'react-native'

interface AlertOptions {
  title: string
  subtitle?: string
  cancelBtnText?: string
  actionBtnText: string
  onConfirm: () => void
}

export function showAlert({ title, subtitle, cancelBtnText = 'Cancel', actionBtnText, onConfirm }: AlertOptions) {
  Alert.alert(title, subtitle, [
    { text: cancelBtnText, style: 'cancel' },
    { text: actionBtnText, onPress: onConfirm },
  ])
}