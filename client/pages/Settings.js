import React, { useContext, useEffect } from "react";
import { StyleSheet, View, Button, TextInput, Text, Image, ScrollView } from 'react-native';
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
            <ScrollView>
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
                    title="Сохранить настройки"
                    color="#841584"
                    accessibilityLabel="Кнопка для сохранения"
                />
            </View>
            <View style={styles.button}>
                <Button
                    onPress={onPressExit}
                    title="Выйти"
                    color="#e31235"
                    accessibilityLabel="Кнопка для выхода"
                />
            </View>
            </ScrollView>
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
});