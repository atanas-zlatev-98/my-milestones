import { StyleSheet } from "react-native";

export const registerStyle = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexGrow: 1,
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  logo: {
    width: 150,
    height: 150,
  },
  signUpText: {
    fontWeight: "bold",
    fontSize: 20,
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
  inputContainer: {
    flexDirection: "column",
    gap: 10,
    padding: 15,
    width: "100%",
  },
  group: {
    gap: 5,
  },
  groupText: {
    fontSize: 16,
    paddingLeft: 0,
  },
  inputField: {
    backgroundColor: "#f7f7f7",
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
  dontHaveAccount: {
    textDecorationLine: "underline",
    color: "blue",
  },
});
