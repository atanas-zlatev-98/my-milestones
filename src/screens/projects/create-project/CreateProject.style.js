import { StyleSheet } from "react-native";

export const createProjectStyle = StyleSheet.create({
  scrollViewContent: {
    padding: 16,
    paddingTop: 0,
    flexGrow: 1,
  },
  topText: {
    projects: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#5458b5",
    },
    createProject: {
      fontSize: 24,
      color: "black",
      fontWeight: "bold",
    },
  },
  iconImage: {
    marginTop: 30,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  iconImageContainer: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 100,
    overflow: "hidden",
  },
  backgroundImageContainer: {
    width: "100%",
    height: 150,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "transparent",
  },
  content: {
    gap: 5,
  },
  groups: {
    flexDirection: "column",
    gap: 15,
  },
  group: {
    label: {
      fontSize: 20,
      marginBottom: 8,
      fontWeight: "bold",
    },
  },
  inputField: {
    backgroundColor: "#f7f7f7",
    borderRadius: 5,
    padding: 10,
    fontSize: 20,
    flex: 1,
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
