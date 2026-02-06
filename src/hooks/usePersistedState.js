import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";


export function usePersistedState(key, defaultValue) {
    const [currentState,setCurrentState] = useState(defaultValue);

    useEffect(()=>{

        async function loadState() {
           try{
                const storedState = await AsyncStorage.getItem(key);

                if(!storedState){
                    return;
                }

            setCurrentState(JSON.parse(storedState));

           }catch(err){
                console.log(`Error loading state: ${err.message}`);
           }
        }

        loadState();

    },[key]);

    const setPersistedState = async(newState) =>{
        try{
            const value = typeof newState === "function" ? newState(currentState) : newState;

            setCurrentState(value);
            await AsyncStorage.setItem(key,JSON.stringify(value));
        }catch(err){
            console.log('State not saved!', err.message);
        }
    }

    return [currentState,setPersistedState];
}
