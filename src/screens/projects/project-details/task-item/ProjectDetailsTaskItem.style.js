import { StyleSheet } from "react-native";
export const projectDetailsTaskItemStyles = StyleSheet.create({
  topView: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
    padding: 10,
  },
  tasks: {
    container: {
      flexDirection: "column",
      gap: 10,
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
    taskItem: {
      flexDirection: "row",
      gap: 5,
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
    taskItemTextTitle: {
      flexDirection: "row",
      gap: 5,
      alignItems: "center",
    },
  },
});
