import { StyleSheet } from "react-native";

export const loginStyle = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    height: "100%",
  },
  logo:{
    width:250,
    height:250,
  },
  welcomeBackText:{
    fontWeight:'bold',
    fontSize:20,
  },    
  content: {
    marginLeft: 10,
    marginRight:10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex:1,
  },
  btn: {
    backgroundColor: "#5458b5",
    width: "100%",
    borderRadius:5,
    marginTop:10
  },
  btnText: {
    color: "#FFF",
    fontSize: 20,
    textAlign:'center',
    padding:10,
  },
  inputContainer: {
    flexDirection: "column",
    gap: 10,
    padding: 15,
    width:'100%'
  },
  inputField: {
    backgroundColor: "#f7f7f7",
    borderRadius:5,
    padding:10,
    fontSize:20
  },
  dontHaveAccount:{
    textDecorationLine:"underline",
    color:'blue'
  }
});
