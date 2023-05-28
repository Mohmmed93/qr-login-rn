import * as React from "react"
import { StyleSheet, View, ViewStyle } from "react-native"
import { colors, spacing } from "../theme"

export function HorizontalLine() {
  return (
    <View style={$view}/>
  )
}

const $view: ViewStyle = {
  borderColor: colors.palette.neutral900, 
  borderBottomColor: colors.palette.neutral900,
  borderBottomWidth: StyleSheet.hairlineWidth,
  marginTop: spacing.medium
}
