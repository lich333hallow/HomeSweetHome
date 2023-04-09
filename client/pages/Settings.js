import React, { useContext, useEffect } from "react";
import { StyleSheet, View, Button, TextInput, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginContext } from '../contexts/Login';
import axios from "axios";

export default function Settings() {
    const context = useContext(LoginContext)
    function onPressExit(){ 
        AsyncStorage.removeItem('token').then(() => {
        context.setIsAuth(false)
    });
    }

    function onPressSave(){
        AsyncStorage.getItem("token").then((token) =>{
            axios.post("http://localhost:4200/user/" + token, {
                login: login,
                phoneNumber: phoneNumber
            })
        });
    }

    function requestUserData(){
        AsyncStorage.getItem("token").then((token) => {
            axios.get("http://localhost:4200/user/" + token).then((response) =>{
                onChangeLogin(response.data.login);
                onChangeNumber(response.data.phoneNumber);
            });
        })        
    }

    const [login, onChangeLogin] = React.useState("");
    const [phoneNumber, onChangeNumber] = React.useState("");

    useEffect(function () {
        requestUserData();
      }, [])

    return (
        <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeLogin}
                    value={login}
                    placeholder="Email"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeNumber}
                    value={phoneNumber}
                    placeholder="+7(XXX)XXX-XX-XX"
                />
            <View style={styles.button}>
                <Button
                    onPress={onPressSave}
                    title="Сохранить"
                    color="#841584"
                    accessibilityLabel="Кнопка для сохранения"
                />
            </View>
            <View style={styles.button}>
                <Button
                    onPress={onPressExit}
                    title="Выйти"
                    color="#841584"
                    accessibilityLabel="Кнопка для выхода"
                />
            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    button: {
        padding: 10
    },
    container: {
        justifyContent: "center",
        height: "100%"
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    inputContainer: {
        flexDirection: "row",
        marginBottom: 10
    },
    info: {
        width: "50%",
        textAlign: "center",
        lineHeight: 22,
        fontSize: 16,
        letterSpacing: "normal",
        color: '#152242',
        paddingTop: 20
    },
});