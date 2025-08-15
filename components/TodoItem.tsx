import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Todo } from '../app/types/todo';
import { colors } from '../lib/styles';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <View style={styles.todoItemWrapper}>
      <View style={[
        styles.todoItem,
        todo.completed && styles.todoItemCompleted
      ]}>
        <TouchableOpacity
          style={[
            styles.checkbox,
            todo.completed && styles.checkboxChecked
          ]}
          onPress={() => onToggle(todo.id)}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: todo.completed }}
        >
          {todo.completed && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>
        
        <Text
          style={[
            styles.todoText,
            todo.completed && styles.completedTodoText,
          ]}
        >
          {todo.text}
        </Text>
        
        <TouchableOpacity 
          onPress={() => onDelete(todo.id)}
          accessibilityRole="button"
          accessibilityLabel="Delete todo"
          style={styles.deleteButton}
        >
          <Text style={styles.deleteButtonText}>✕</Text>
        </TouchableOpacity>
      </View>
      
      {/* Dark overlay for completed items */}
      {todo.completed && <View style={styles.overlay} />}
    </View>
  );
}

const styles = StyleSheet.create({
  todoItemWrapper: {
    position: 'relative',
    marginBottom: 8,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
  },
  todoItemCompleted: {
    // Keep the same background, overlay will handle the darkening
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 50% black overlay
    borderRadius: 6,
    pointerEvents: 'none', // Allow clicks to pass through
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    zIndex: 1, // Ensure checkbox is above overlay
  },
  checkboxChecked: {
    backgroundColor: 'rgba(34, 197, 94, 0.5)',  // Light green with 50% opacity
    borderColor: '#22c55e',  // Bright green border
  },
  checkmark: {
    color: '#22c55e',  // Bright green checkmark
    fontSize: 12,
    fontWeight: 'bold',
  },
  todoText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    fontFamily: 'System',
    zIndex: 1, // Ensure text is above overlay
  },
  completedTodoText: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: colors.textSecondary,
    // Remove opacity change - text stays fully visible
  },
  deleteButton: {
    padding: 4,
    zIndex: 1, // Ensure delete button is above overlay
  },
  deleteButtonText: {
    color: colors.danger,
    fontSize: 18,
    fontWeight: '600',
  },
});
