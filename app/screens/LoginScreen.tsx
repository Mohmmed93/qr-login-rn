import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { Alert, TextStyle, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { spacing, } from "../theme"
import { Camera } from "expo-camera"
import { stringify } from "json5"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen = observer(function LoginScreen(_props: LoginScreenProps) {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  
  const {
    authenticationStore: {
      authEmail,
      setAuthPassword,
      setAuthToken,
      setScannedData,
      validationErrors,
    },
  } = useStores()

  const errors: typeof validationErrors = validationErrors

  async function getPermissionsAsync() {
    const { status } = await Camera.requestCameraPermissionsAsync()
    if (status === "granted") {
      setScanned(false)
      setHasPermission(true)
    } else {
        // handle error 
    }
  }

  useEffect(() => {
    return () => {
      setAuthPassword("")
      setScannedData("")
    }
  }, [])

  useEffect(() => {
    if (Object.values(validationErrors).some((v) => !!v)) {
      scanned && Alert.alert("Error", stringify(errors))
      return 
    }
    // Mock Token
    setAuthToken(String(Date.now()))
  }, [authEmail])

  async function handleBarCodeScanned({ data }) {
    setScanned(true)
    setScannedData(data)
  }

  return (
    <Screen
      preset="fixed"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text tx="loginScreen.signIn" preset="heading" style={$signIn} />
      <Text tx="loginScreen.enterDetails" preset="subheading" style={$enterDetails} />

      {(!hasPermission || scanned) && (
        <Button
          testID="login-button"
          tx="loginScreen.tapToSignIn"
          style={$tapButton}
          preset="reversed"
          onPress={getPermissionsAsync}
        />
      )}

      {(hasPermission && !scanned) && (
        <Camera
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={$camera}
        />
      )}   
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.huge,
  paddingHorizontal: spacing.large,
}

const $signIn: TextStyle = {
  marginBottom: spacing.small,
}

const $camera: TextStyle = {
  height: '80%',
  width: '100%',
}

const $tapButton: ViewStyle = {
  marginTop: spacing.extraSmall,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.large,
}
