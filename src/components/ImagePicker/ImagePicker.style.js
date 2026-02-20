import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        width: '100%',
    },
    picker: {
        width: "100%",
        height: 200,
        overflow: 'hidden',
        backgroundColor: '#f7f7f7',
        borderRadius:5,
        borderColor: '#5458b5',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    placeholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    placeholderText: {
        fontSize: 14,
        color: '#94a3b8',
        fontWeight: '500',
    },
    changeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        marginTop: 12,
        padding: 8,
    },
    changeText: {
        fontSize: 18,
        color: '#5458b5',
        fontWeight: 'bold',
    },
});