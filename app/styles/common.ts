import { StyleSheet } from 'react-native';
import { colors } from '@/app/styles/colors';

export const commonStyles = StyleSheet.create({
    // Containers
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    padding: {
      padding: 16,
    },
    
    // Cards
    card: {
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    
    // Typography
    h1: {
      fontSize: 32,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8,
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 6,
      letterSpacing: -0.5,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    text: {
      fontSize: 16,
      color: colors.text,
      lineHeight: 24,
    },
    textSecondary: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    
    // Buttons
    button: {
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      borderWidth: 1,
    },
    buttonPrimary: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
    },
    buttonText: {
      color: colors.text,
      fontSize: 14,
      fontWeight: '500',
      letterSpacing: 0.5,
    },
    
    // Inputs
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 6,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 14,
      color: colors.text,
      backgroundColor: colors.inputBg,
    },
    inputFocused: {
      borderColor: colors.inputFocus,
    },
    
    // Lists
    listItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
  });   