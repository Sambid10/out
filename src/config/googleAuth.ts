import { GoogleSignin } from '@react-native-google-signin/google-signin'

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId: '985523250449-jiq41h2bubrp9rlmgn3njpsagtih4sdt.apps.googleusercontent.com',
  })
}