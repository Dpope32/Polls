import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from './Input';
import { Button } from './Button';
import { colors } from '../app/styles/colors';
import { Text } from './Text';

interface TodoInputProps {
  onAddTodo: (text: string) => void;
}

export function TodoInput({ onAddTodo }: TodoInputProps) {
  const [newTodoText, setNewTodoText] = useState("");

  const handleAdd = () => {
    if (newTodoText.trim().length > 0) {
      onAddTodo(newTodoText.trim());
      setNewTodoText("");
    }
  };

  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        <Input
          value={newTodoText}
          onChangeText={setNewTodoText}
          placeholder="Add a new todo..."
          placeholderTextColor={colors.textMuted}
          returnKeyType="done"
          onSubmitEditing={handleAdd}
          style={styles.input}
        />
      </View>
      <Button onPress={handleAdd} style={styles.addButton}> <Text>Add</Text> </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    gap: 10,
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    color: colors.text,
    fontSize: 14,
  },
  addButton: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    paddingHorizontal: 24,
    height: 42,
  },
});
