import React from "react";
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from "react-native";
import { colors } from "../app/styles/colors";

interface TextProps extends RNTextProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "p" | "lead" | "large" | "small" | "muted";
  children: React.ReactNode;
}

export function Text({ variant = "p", style, children, ...props }: TextProps) {
  return (
    <RNText
      style={[styles.base, styles[variant], style]}
      {...props}
    >
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  base: {
    color: colors.text,
  },
  h1: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    marginBottom: 8,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    marginBottom: 6,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    marginBottom: 4,
  },
  h4: {
    fontSize: 18,
    fontWeight: '600' as const,
    marginBottom: 4,
  },
  p: {
    fontSize: 16,
    lineHeight: 24,
  },
  lead: {
    fontSize: 20,
    color: colors.textSecondary,
  },
  large: {
    fontSize: 18,
    fontWeight: '600' as const,
  },
  small: {
    fontSize: 14,
    fontWeight: '500' as const,
  },
  muted: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
