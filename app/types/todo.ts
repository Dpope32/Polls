export type { Todo } from '../../src/db/schema';

export interface TodoOperations {
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}
