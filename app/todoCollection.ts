import { ShapeStream } from "@electric-sql/client";
import { createCollection } from "@tanstack/react-db";
import "react-native-random-uuid";
import { selectTodoSchema } from "../src/db/schema";
import { apiClient, hostname } from "../src/utils/api-client";

export const todoCollection = createCollection({
  id: "todos",
  schema: selectTodoSchema,
  sync: {
    sync: ({ begin, write, commit, markReady }) => {
      const shapeStream = new ShapeStream({
        url: `http://${hostname}:3000/v1/shape`,
        params: {
          table: "todos",
        },
      });

      let transactionStarted = false;

      const unsubscribe = shapeStream.subscribe((messages) => {
        let hasUpToDate = false;
        for (const message of messages) {
          if (message.headers?.control === "up-to-date") {
            hasUpToDate = true;
          } else if (message.headers?.operation && "value" in message) {
            if (!transactionStarted) {
              begin();
              transactionStarted = true;
            }

            // Handle potential missing fields and type conversion
            const rawData = {
              ...message.value,
              id: message.value.id ? Number(message.value.id) : undefined,
              text: message.value.text || "",
              completed: Boolean(message.value.completed),
              created_at: message.value.created_at
                ? new Date(message.value.created_at as string)
                : new Date(),
              updated_at: message.value.updated_at
                ? new Date(message.value.updated_at as string)
                : new Date(),
            };

            const validatedData = selectTodoSchema.parse(rawData);

            write({
              type: message.headers.operation,
              value: validatedData,
              metadata: message.headers,
            });
          }
        }

        if (hasUpToDate) {
          if (transactionStarted) {
            commit();
            transactionStarted = false;
          } else {
            begin();
            commit();
          }
          markReady();
        }
      });

      return unsubscribe;
    },
  },
  onInsert: async ({ transaction }) => {
    const { txid } = await apiClient.createTodo(
      transaction.mutations[0].modified
    );
    return { txid };
  },
  onUpdate: async ({ transaction }) => {
    const {
      original: { id },
      changes,
    } = transaction.mutations[0];
    // Filter out fields that shouldn't be sent to the API
    const { id: _, created_at, updated_at, ...updateData } = changes;
    const { txid } = await apiClient.updateTodo(id, updateData);
    return { txid };
  },
  onDelete: async ({ transaction }) => {
    const { id } = transaction.mutations[0].original;
    const { txid } = await apiClient.deleteTodo(id);
    return { txid };
  },
  getKey: (item) => item.id,
});
