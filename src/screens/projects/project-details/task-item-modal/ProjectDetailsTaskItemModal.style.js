import { StyleSheet } from "react-native";

export const projectDetailsTaskItemModalStyles = StyleSheet.create({
  modalHeaderClose:{
    width:'100%',
    justifyContent:'flex-end',
    alignItems:'flex-end',
    padding:10,
    
  },
  centeredView: {
    width:'100%',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width:'80%',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    fontSize:20,
    textAlign: "center",
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
