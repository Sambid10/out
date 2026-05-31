interface Props {
    btntitle: string
    onPress: () => void
}
import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { StyleSheet } from 'react-native'
export default function Button({ btntitle,onPress}: Props) {
    return (
        <TouchableOpacity
            style={styles.btn}
            onPress={onPress}
        >
            <Text style={styles.txt}>{btntitle}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#8B5CF6',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 18,
    },
    txt: {
        color: 'white',
        fontWeight: '600',
        textAlign:"center"
    },
})