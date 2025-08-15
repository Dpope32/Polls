import React from "react";
import { View, ImageBackground, StyleSheet, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { TodoInput } from "../components/TodoInput";
import { TodoList } from "../components/TodoList";
import { useTodos } from "./hooks/useTodos";
import { Text } from "../components/Text";
import { colors } from "../lib/styles";
import { Footer } from "@/components/home/Footer";

export default function HomeScreen() {
  const { todos, operations } = useTodos();

  return (
    <ImageBackground source={require('../assets/v2.png')}  style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <Text variant="h1" style={styles.title}>Kaiba Core</Text>
        <TodoInput onAddTodo={operations.addTodo} />
        <TodoList todos={todos} onToggleTodo={operations.toggleTodo} onDeleteTodo={operations.deleteTodo}/>
        <Footer />
        <StatusBar style="light" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  title: {
    color: colors.text,
    textAlign: 'left' as const,
    marginBottom: 30,
    fontFamily: 'System',
    fontWeight: '700' as const,
    letterSpacing: -1,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1,
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    gap: 8,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  logo: {
    width: 20,
    height: 20,
  },
  footerButton: {
    flex: 1,
    minHeight: 32,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  footerButtonText: {
    fontSize: 12,
    fontWeight: '400' as const,
  },
});
