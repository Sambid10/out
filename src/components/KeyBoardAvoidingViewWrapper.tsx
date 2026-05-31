import React from 'react'
import { Platform, KeyboardAvoidingView } from "react-native"
export default function KeyBoardAvoidingViewWrapper({ children }: {
    children: React.ReactNode
}) {
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            {children}
        </KeyboardAvoidingView>
    )
}
