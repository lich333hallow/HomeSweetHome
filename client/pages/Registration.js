import React, { useContext } from "react";
import { StyleSheet, View, Button, TextInput, Image, Dimensions } from 'react-native';
import axios from 'axios'
import { LoginContext } from '../contexts/Login';


export default function Registration({ navigation }) {
    const context = useContext(LoginContext)
    function onPressRegistration(){
        if (password !== passwordConfirmation){
            alert("Пароли не совпадают");
        } else if (password.length < 6) {
            alert("Слишком короткий пароль");
        } else {
            axios.post("http://localhost:4200/register" ,{
                login: login,
                password: password,
                passwordConfirmation: passwordConfirmation,
                phoneNumber: phoneNumber,
                lastName : lastName,
                name : name,
                secondName : secondName
            }).then((response) => {
                if (response.data.error){
                    //to do show error
                    alert(response.data.error);
                } else {
                    context.setIsRegister(false);
                }
            });
        }
    }
    function onPressLogin(){
        context.setIsRegister(false);
    }
    
    const [login, onChangeLogin] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [passwordConfirmation, onChangePasswordConfirmation] = React.useState("");
    const [phoneNumber, onChangeNumber] = React.useState("");
    const [lastName, onChangeLastName] = React.useState("");
    const [name, onChangeName] = React.useState("");
    const [secondName, onChangeSecondName] = React.useState("");
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
                placeholder="Email"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={phoneNumber}
                placeholder="Номер телефона"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Пароль"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePasswordConfirmation}
                value={passwordConfirmation}
                placeholder="Подтвердить пароль"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeLastName}
                value={lastName}
                placeholder="Фамилия"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeName}
                value={name}
                placeholder="Имя"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeSecondName}
                value={secondName}
                placeholder="Отчество"
            />
            
            <View style={styles.button}>
            <Button
                onPress={onPressRegistration}
                title="Зарегистрироваться"
                color="#841584"
                accessibilityLabel="Кнопка для регистрации"
            />
            </View>
            <View style={styles.button}>
            <Button
                onPress={onPressLogin}
                title="Авторизоваться"
                color="#841584"
                accessibilityLabel="Кнопка для авторизации"
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
        padding: 10, 
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