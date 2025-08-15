import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { Todo } from '../app/types/todo';
import { TodoItem } from './TodoItem';
import { colors } from '../app/styles/colors';

interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
}

export function TodoList({ todos, onToggleTodo, onDeleteTodo }: TodoListProps) {
  if (!todos || todos.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nothing to see here dipshit!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TodoItem
          todo={item}
          onToggle={onToggleTodo}
          onDelete={onDeleteTodo}
        />
      )}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    marginTop: -100,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    fontFamily: 'System',
  },
});
