import React from "react";
import { View, ImageBackground, StyleSheet, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { TodoInput } from "@/components/TodoInput";
import { TodoList } from "@/components/TodoList";
import { useTodos } from "@/app/hooks/useTodos";
import { Text } from "@/components/Text";
import { Footer } from "@/components/home/Footer";
import { homeStyles } from "@/app/styles/homes";

export default function HomeScreen() {
  const { todos, operations } = useTodos();

  return (
    <ImageBackground source={require('../assets/v2.png')}  style={homeStyles.background} resizeMode="cover">
      <View style={homeStyles.container}>
        <Text variant="h1" style={homeStyles.title}>Kaiba Core</Text>
        <TodoInput onAddTodo={operations.addTodo} />
        <TodoList todos={todos} onToggleTodo={operations.toggleTodo} onDeleteTodo={operations.deleteTodo}/>
        <Footer />
        <StatusBar style="light" />
      </View>
    </ImageBackground>
  );
}
