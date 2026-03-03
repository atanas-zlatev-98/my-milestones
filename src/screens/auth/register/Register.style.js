import { StyleSheet } from "react-native";

export const registerStyle = StyleSheet.create({
   errorText: {
    color: "red",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
  },
  scrollViewContent: {
    padding: 16,
    paddingTop: 0,
    flexGrow: 1,
  },
  topText: {
    regText: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#5458b5",
    },
    createAccountText: {
      fontSize: 24,
      color: "black",
      fontWeight: "bold",
    },
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
      marginBottom: 2,
      fontWeight: "bold",
    },
  },
  inputField: {
    backgroundColor: "#f7f7f7",
    color:'black',
    borderRadius: 5,
    padding: 10,
    fontSize: 20,
    flex: 1,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    backgroundColor: "#f7f7f7",
    padding: 10,
    paddingRight: 0,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  btn: {
    backgroundColor: "#5458b5",
    width: "100%",
    borderRadius: 5,
    marginTop: 10,
  },
  btnText: {
    color: "#FFF",
    fontSize: 20,
    textAlign: "center",
    padding: 10,
  },
  dontHaveAccount: {
    textDecorationLine: "underline",
    color: "blue",
  },
});
