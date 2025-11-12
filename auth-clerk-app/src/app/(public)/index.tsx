import { Button } from "@/components/Button";
import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { Ionicons } from "@expo/vector-icons";

WebBrowser.maybeCompleteAuthSession();

export default function SignIn(){
    const [isLoading, setIsLoading] = useState(false);
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    async function signInWithGoogle() {
        try {
            setIsLoading(true);
            
            const redirectUrl = Linking.createURL("/");
            
            const { createdSessionId, setActive } = await startOAuthFlow({
                redirectUrl,
            });
            
            if (createdSessionId) {
                setActive!({ session: createdSessionId });
            }
        } catch (error) {
            console.error("Erro ao fazer login com Google:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="water" size={80} color="#0284c7" />
                <Text style={styles.title}>HydroReminder</Text>
                <Text style={styles.subtitle}>
                    Mantenha-se hidratado com lembretes personalizados
                </Text>
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    icon="logo-google"
                    title="Entrar com o Google"
                    onPress={signInWithGoogle}
                    isLoading={isLoading}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f9ff',
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 60,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#0284c7',
        marginBottom: 10,
        marginTop: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#64748b',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    buttonContainer: {
        marginTop: 20,
    },
});