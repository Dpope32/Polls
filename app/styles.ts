import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#fff",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginTop: 40,
      marginBottom: 20,
      textAlign: "center",
    },
    inputContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: "#ddd",
      padding: 10,
      marginRight: 10,
      borderRadius: 4,
    },
    todoItem: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
    },
    todoCheckbox: {
      width: 44,
      height: 44,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 4,
      marginRight: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    checkmark: {
      color: "#0080ff",
    },
    todoText: {
      flex: 1,
    },
    completedTodoText: {
      textDecorationLine: "line-through",
      color: "#aaa",
    },
    deleteButton: {
      color: "#ff3b30",
      fontWeight: "bold",
      fontSize: 16,
    },
  });