import React, { useContext } from "react";
import { StyleSheet, View, Button, TextInput, Alert, Platform, Dimensions, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginContext } from '../contexts/Login';

export default function Login() {
    const context = useContext(LoginContext)
    function onPressLogin(){
        axios.get(`http://localhost:4200/login?login=${login}&password=${password}`).then((response) =>{
            if (response.data.error){
                const alertPolyfill = (title, description, options, extra) => {
                    const result = window.confirm([title, description].filter(Boolean).join('\n'))
                
                    if (result) {
                        const confirmOption = options.find(({ style }) => style !== 'cancel')
                        confirmOption && confirmOption.onPress()
                    } else {
                        const cancelOption = options.find(({ style }) => style === 'cancel')
                        cancelOption && cancelOption.onPress()
                    }
                }                
                const showAlert = Platform.OS === 'web' ? alertPolyfill : Alert.alert
                showAlert('Ошибка', response.data.error, [])
            } else {
                AsyncStorage.setItem('token', response.data.id).then(() => {
                    context.setIsAuth(true)
                });
            }
        })
    }
    function onPressRegister(){
        context.setIsRegister(true);
    }
    const [login, onChangeLogin] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    return (
        <View style={styles.container}>
            <Image
                style={styles.logoImage}
                source={require('../assets/Images/logotip.png')}
            ></Image>
            <TextInput
                style={styles.input}
                onChangeText={onChangeLogin}
                value={login}
                placeholder="Логин"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Пароль"
            />
            <View style={styles.button}>
            <Button
                onPress={onPressLogin}
                title="Войти"
                color="#841584"
                accessibilityLabel="Кнопка для входа"
            />
            </View>
            <View style={styles.button}>
            <Button
                onPress={onPressRegister}
                title="Зарегистрироваться"       
                color="#841584"
                accessibilityLabel="Кнопка для регистрации"
            />
            </View>
        </View>
    );
}

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;

const styles = StyleSheet.create({
    button: {
        padding: 10
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    container: {
        justifyContent: "center",
        height: "100%"
    },
    logoImage: {
        width: imageWidth,
        height: imageHeight
    }
});