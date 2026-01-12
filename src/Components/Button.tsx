import { Pressable, Text, StyleSheet } from 'react-native'
import React from 'react'

const Button = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={[styles.text, textStyle]}>
        {title}
      </Text>
    </Pressable>
  )
}

export default Button
