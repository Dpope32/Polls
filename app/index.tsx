import { useLiveQuery } from "@tanstack/react-db";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Button,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import "react-native-random-uuid";
import { styles } from "./styles";
import { todoCollection } from "./todoCollection";

export default function HomeScreen() {
  const [newTodoText, setNewTodoText] = useState("");
  const { data: todos } = useLiveQuery((q) => q.from({ todoCollection }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo App</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTodoText}
          onChangeText={setNewTodoText}
          placeholder="Add a new todo..."
        />
        <Button
          title="Add"
          onPress={() => {
            if (newTodoText.length > 0) {
              todoCollection.insert({
                id: Math.floor(Math.random() * 1000000),
                text: newTodoText,
                completed: false,
                created_at: new Date(),
                updated_at: new Date(),
              });
              setNewTodoText("");
            }
          }}
        />
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity
              style={styles.todoCheckbox}
              onPress={() => {
                todoCollection.update(item.id, (draft) => {
                  draft.completed = !draft.completed;
                });
              }}
            >
              {item.completed && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
            <Text
              style={[
                styles.todoText,
                item.completed && styles.completedTodoText,
              ]}
            >
              {item.text}
            </Text>
            <TouchableOpacity onPress={() => todoCollection.delete(item.id)}>
              <Text style={styles.deleteButton}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}
