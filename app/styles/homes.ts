import { StyleSheet } from "react-native";
import { colors } from "@/app/styles/colors";

export const homeStyles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  text: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#aaa",
    textAlign: "center",
  },
  title: {
    color: colors.text,
    textAlign: "left" as const,
    marginBottom: 30,
    fontFamily: "System",
    fontWeight: "700" as const,
    letterSpacing: -1,
  },
  footer: {
    flexDirection: "row",
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1,
    height: 60,
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
    gap: 8,
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  logo: {
    width: 20,
    height: 20,
  },
  footerButton: {
    flex: 1,
    minHeight: 32,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  footerButtonText: {
    fontSize: 12,
    fontWeight: "400" as const,
  },
});
