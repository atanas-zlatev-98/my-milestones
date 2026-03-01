import { StyleSheet } from "react-native";

export const profileStyle = StyleSheet.create({
  header:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'flex-end',
     marginBottom:20,
  },
  container:{
    width:'100%',
    height:'100%',
    justifyContent:'flex-start',
    padding:20,
     alignItems:'center',
  },
  profileImage:{
    width:200,
    height:200,
    borderRadius:100,
     marginBottom:20,
     boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px"
  },
  userText:{
    fontSize:20,
    fontWeight:'bold',
  },
  userProjects:{
    justifyContent:'space-between',
    width:'85%',
    gap:10,
    flexDirection:'row',
     marginTop:20,
     marginBottom:20,
     text:{
      fontWeight:'bold',
        fontSize:18,
     }
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
})