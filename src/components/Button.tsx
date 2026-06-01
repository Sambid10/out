interface Props {
    btntitle: string
    onPress: () => void
    loading?:boolean
}
import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { StyleSheet } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
export default function Button({ btntitle,onPress,loading}: Props) {
    return (
        <TouchableOpacity
            disabled={loading}
            style={styles.btn}
            onPress={onPress}
        >
            {loading ? <ActivityIndicator color='white'/> : <Text style={styles.txt}>{btntitle}</Text>}
            
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