import React, { useState } from 'react'
import { Image, StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from 'react-native'
import SafeAreaViewWrapper from '../../components/SafeAreaViewWrapper'
import { TextInput } from 'react-native';
import Button from '../../components/Button';
import { onGoogleButtonPress } from '../../../utils/onGoogleSignup';
import { createUserWithEmailAndPassword, getAuth, } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/navigationType';
export default function SignupScreen() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [err, setError] = useState("")
    const navigation =
        useNavigation<NativeStackNavigationProp<AuthStackParamList>>()
    const handleSignup = async (email: string, password: string) => {
        setError("")
        try {
         await createUserWithEmailAndPassword(getAuth(), email, password)
        } catch (err: any) {
            switch (err.code) {
                case 'auth/email-already-in-use':
                    setError('That email is already registered.')
                    break
                case 'auth/invalid-email':
                    setError('Please enter a valid email.')
                    break
                case 'auth/weak-password':
                    setError('Password must be at least 6 characters.')
                    break
                default:
                    setError('Something went wrong. Please try again.')
            }
        }
    }

    return (
        <SafeAreaViewWrapper showHeader={false}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 24,
                        flex: 1,
                        paddingVertical: 40,
                    }}>
                        <View>
                            <Text style={{
                                fontSize: 32,
                                textAlign: "center",
                                fontStyle: "italic",
                                color: "#8B5CF6"
                            }}>Taskify</Text>
                            <Image
                                style={{ height: 100, width: 100 }}
                                alt='hello'
                                source={require('../../../public/hel.png')} />
                        </View>

                        <View style={{ alignItems: "center" }}>
                            <Text style={{ fontSize: 24, color: "#121212" }}>Sign up.</Text>
                            <Text style={{ color: "#757575", fontSize: 11 }}>Please fill up the form..</Text>
                        </View>

                        <View style={{ width: "80%", gap: 6 }}>
                            <View>
                                <Text style={[err && style.errlabel]}>Email:</Text>
                                <TextInput
                                    onChangeText={(email) => setEmail(email)}
                                    placeholder="Enter your email.."
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    style={[style.input, err && style.errinput]}
                                />
                            </View>
                            <View>
                                <Text style={[err && style.errlabel]}>Password:</Text>
                                <TextInput
                                    onChangeText={(pass) => setPassword(pass)}
                                    secureTextEntry
                                    placeholder="Enter your password.."
                                    style={[style.input, err && style.errinput]}
                                />
                            </View>
                            {err && <Text style={style.errlabel}>{err}</Text>}
                        </View>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 6,
                                width: "80%"
                            }}
                        >
                            <View style={{ width: "100%" }}>
                                <Button

                                    btntitle='Sign up'
                                    onPress={() => handleSignup(email, password)} />
                            </View>
                            <View><Text style={{
                                textAlign: "center"
                            }}>or</Text></View>
                            <TouchableOpacity
                                style={style.socialbtn}
                                onPress={() => onGoogleButtonPress()} >
                                <Image
                                    style={{
                                        height: 30,
                                        width: 30
                                    }}
                                    source={require("../../../public/l.webp")}
                                />
                                <Text style={{ textAlign: "center" }}>Sign up with Google </Text>
                            </TouchableOpacity>

                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("SigninScreen")}
                        >
                            <Text style={{ color: "#8B5CF6", textAlign: "center", textDecorationLine: "underline" }}>Already have an account? Sign in!!</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaViewWrapper>
    )
}

const style = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#374151',
        backgroundColor: "white",
        width: "100%",
        padding: 10,
        borderRadius: 8,
    },
    errinput: {
        borderColor: 'red',
    },
    errlabel: {
        color: 'red'
    },
    socialbtn: {
        backgroundColor: "white",
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 18,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 12
    }
})