import {ClerkProvider, useAuth} from "@clerk/clerk-expo"
import { useEffect } from "react"
import { ActivityIndicator } from "react-native"
import {router, Slot} from "expo-router"
import * as SecureStore from "expo-secure-store"

const PUBLIC_CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

// Token cache para persistir a sessão
const tokenCache = {
    async getToken(key: string) {
        try {
            return SecureStore.getItemAsync(key)
        } catch (err) {
            return null
        }
    },
    async saveToken(key: string, value: string) {
        try {
            return SecureStore.setItemAsync(key, value)
        } catch (err) {
            return
        }
    },
}

function InitialLayout(){
    const {isSignedIn, isLoaded} = useAuth()

    useEffect(() =>{
        if(!isLoaded) return

        if(isSignedIn){
            router.replace("/(auth)")
        } else{
            router.replace("/(public)")
        }
    }, [isSignedIn, isLoaded])

    return isLoaded ? <Slot/> : (
        <ActivityIndicator
            style={{flex: 1, justifyContent:"center", alignItems: "center"}}
        />
    )
}


export default function Layout(){
    return(
        <ClerkProvider 
            publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY}
            tokenCache={tokenCache}
        >
            <InitialLayout/>
        </ClerkProvider>
    )
}