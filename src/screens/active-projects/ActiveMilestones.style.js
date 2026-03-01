import { StyleSheet } from "react-native";

export const activeMilestonesStyle = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: "white",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    // paddingHorizontal:10,
    borderBottomColor: "#c7c7c752",
    borderBottomWidth: 1,
  },
  activeProjects: {
    justifyContent: "center",
    alignItems: "center",
    gap:20,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
  btn: {
    backgroundColor: "#5458b5",
    width: "100%",
    borderRadius: 5,
  },
  btnText: {
    color: "#FFF",
    fontSize: 20,
    textAlign: "center",
    padding: 10,
  },
});
