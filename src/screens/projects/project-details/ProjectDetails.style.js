import { StyleSheet } from "react-native";

export const projectDetailsStyle = StyleSheet.create({
  bgImage: {
    width: "100%",
    height: 250,
    position: "absolute",
    top: 0,
    left: 0,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#0000007e",
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    padding: 40,
    paddingTop: 100,
  },
  fieldText: {
    backgroundColor: "#ffffff",
    fontWeight: "bold",
    alignSelf: "flex-start",
    color: "#5458b5",
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
  },
  titleText: { fontWeight: "bold", fontSize: 20, color: "#ffffff" },
  stats: {
    container: {
      backgroundColor: "#5458b5",
      marginTop: 200,
      width: "95%",
      gap: 5,
      padding: 10,
      borderRadius: 10,
      alignItems: "flex-start",
    },
    statsText: {
      color: "#ffffff",
      fontWeight: "bold",
      fontSize: 14,
    },
  },
  tasks: {
    container: {
      width: "95%",
      backgroundColor: '#f7f7f7',
      // height: 200,
      marginTop: 10,
      borderRadius: 10,
    },
  },
  btnContainer:{
    marginTop:10,
    width:'95%',
  },
   btn: {
    backgroundColor: "#5458b5",
    width: "100%",
    borderRadius: 5,
  },
  btnDisabled:{
    backgroundColor: "#a0a0a0",
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
