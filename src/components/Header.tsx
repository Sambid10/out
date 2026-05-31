import { View, Text, TouchableOpacity, Image, Switch } from "react-native"
import { showAlert } from "../../utils/Alert"
import { useTheme } from "../context/ThemeContext"
import { getAuth, signOut } from "@react-native-firebase/auth"
export default function Header() {
    const { mode, toggleTheme } = useTheme()
    const {currentUser}=getAuth()
    const isDark = mode === "dark"

    const handleToggle = () => {
        toggleTheme()
    }
    const handleSignout=async()=>{
        await signOut(getAuth())
    }
    const handleLogout = () => {
        showAlert({ title: "Are u sure u want to logout?", actionBtnText: "Yes", onConfirm: () => handleSignout() })
    }
    return (
        <View
            style={{
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center"
            }}
        >
            <Text
                style={{
                    fontSize: 24,
                    fontStyle: "italic",
                    color: "#8B5CF6"
                }}
            >
                Taskify
            </Text>

            <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
                <Switch
                    value={isDark}
                    onValueChange={handleToggle}
                    thumbColor={isDark ? "#fff" : "#000"}
                    trackColor={{ false: "#ccc", true: "#8B5CF6" }}
                />
                <TouchableOpacity
                    style={{
                        backgroundColor: "#8B5CF6",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 99,
                        height: 40,
                        width: 40,
                    }}
                    onPress={() => handleLogout()}
                >
                    <Text style={{ fontSize: 22, color: "white", textAlign: "center" }}>
                        ⎋
                    </Text>
                </TouchableOpacity>

                <Image
                    style={{
                        borderRadius: 99,
                        height: 40,
                        width: 40,
                        borderWidth: 1,
                        borderColor: "#8B5CF6"
                    }}
                    source={{ uri: currentUser?.photoURL ?? `https://api.dicebear.com/7.x/thumbs/png?seed=${currentUser?.uid}` }}
                />
            </View>

        </View>
    )
}
