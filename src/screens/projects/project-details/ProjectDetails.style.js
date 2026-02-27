import { StyleSheet } from "react-native";

export const projectDetailsStyle = StyleSheet.create({
    bgImage: {
    width: "100%",
    height: 250,
    position:'absolute',
    top:0,
    left:0,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
    justifyContent: "center",
  },
  container:{
    backgroundColor: "#0000007e",
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    padding: 40,
    paddingTop:100,
  },
   fieldText: {
    backgroundColor: "#ffffff",
    alignSelf: "flex-start",
    color: "#5458b5",
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
  },
  titleText: { fontWeight: "bold", fontSize: 20, color: "#ffffff" },
})