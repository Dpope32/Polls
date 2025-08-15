import { Todo } from '../types/todo';

export class TodoService {
  static generateId(): number {
    return Math.floor(Math.random() * 1000000);
  }

  static createTodoData(text: string): Omit<Todo, 'id'> & { id: number } {
    const now = new Date();
    return {
      id: this.generateId(),
      text: text.trim(),
      completed: false,
      created_at: now,
      updated_at: now,
    };
  }

  static validateTodoText(text: string): boolean {
    return text.trim().length > 0;
  }

  static formatTodoForDisplay(todo: Todo): Todo {
    return {
      ...todo,
      text: todo.text.trim(),
    };
  }
}
