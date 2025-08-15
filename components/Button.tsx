import React from "react";
import { Pressable, Text, PressableProps, ActivityIndicator, StyleSheet, ViewStyle } from "react-native";
import { colors } from "@/lib/styles";

interface ButtonProps extends PressableProps {
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "small" | "medium" | "large";
  children?: React.ReactNode;
  loading?: boolean;
  title?: string;
}

export function Button({
  variant = "primary",
  size = "medium",
  children,
  title,
  loading = false,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      disabled={isDisabled}
      style={({ pressed }) => {
        const buttonStyles: ViewStyle[] = [
          styles.button,
          styles[variant],
          styles[size],
        ];
        
        if (pressed) buttonStyles.push(styles.pressed);
        if (isDisabled) buttonStyles.push(styles.disabled);
        if (style) buttonStyles.push(style as ViewStyle);
        
        return buttonStyles;
      }}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={colors.text}
        />
      ) : title ? (
        <Text style={styles.buttonText}>
          {title}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    flexDirection: 'row' as const,
    borderWidth: 1,
    borderColor: colors.border,
  },
  small: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  medium: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  large: {
    paddingHorizontal: 28,
    paddingVertical: 16,
  },
  primary: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderColor: colors.border,
  },
  danger: {
    backgroundColor: 'transparent',
    borderColor: colors.danger,
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: colors.border,
  },
  buttonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '500' as const,
    letterSpacing: 0.25,
  },
  pressed: {
    opacity: 0.8,
    backgroundColor: colors.card,
  },
  disabled: {
    opacity: 0.5,
  },
});
