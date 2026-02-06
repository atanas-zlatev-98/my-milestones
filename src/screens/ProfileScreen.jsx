import { useContext } from "react";
import { Text } from "react-native"
import { AuthContext } from "../context/auth/AuthProvider";

export default function Profile(){

    const {user} = useContext(AuthContext);

    return (
        <Text>Profile of {user?.name}</Text>
    )
}