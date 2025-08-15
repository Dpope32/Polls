import { useLiveQuery } from "@tanstack/react-db";
import { todoCollection } from "../collections/todoCollection";
import { TodoOperations } from "../types/todo";

export function useTodos(): { todos: any[]; operations: TodoOperations } {
  const { data: todos } = useLiveQuery((q) => q.from({ todoCollection }));

  const operations: TodoOperations = {
    addTodo: (text: string) => {
      todoCollection.insert({
        id: Math.floor(Math.random() * 1000000),
        text,
        completed: false,
        created_at: new Date(),
        updated_at: new Date(),
      });
    },

    toggleTodo: (id: number) => {
      todoCollection.update(id, (draft) => {
        draft.completed = !draft.completed;
        draft.updated_at = new Date();
      });
    },

    deleteTodo: (id: number) => {
      todoCollection.delete(id);
    },
  };

  return {
    todos: todos || [],
    operations,
  };
}
