import ThemeColors from '@theme/theme-colors'
import { ThemeTypography } from '@theme/theme-typography'
import React from 'react'
import { StyleSheet, Text, TextStyle, View } from 'react-native'

interface Props {
  text: string;
  colorType?: "info" | "warning" | "danger";
  style?: TextStyle;
}

const Note = (props: Props) => {
  const color = 
    props.colorType == 'warning' ? ThemeColors.warningYellow : 
    props.colorType == 'danger' ? 'red' : ThemeColors.textGray;


  return (
    <Text
      style={[
        ThemeTypography.body2,
        { fontStyle: "italic", color: color },
        props.style
      ]}
    >
        {props.text}
    </Text>
  )
}

export default Note

const styles = StyleSheet.create({})
