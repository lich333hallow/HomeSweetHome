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
                onChangeMyAds(response.data.ads);
            });
        })
    }
    function removeAd(id){
        AsyncStorage.getItem("token").then((token) => {
            axios.post("http://localhost:4200/ad/" + id, {user: token}).then((response) => {
                onChangeMyAds(response.data)
            });
        })
    }

    const [login, onChangeLogin] = React.useState("");
    const [phoneNumber, onChangeNumber] = React.useState("");
    const [myAds, onChangeMyAds] = React.useState([]);

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
            <View>
                <Text>Мои объекты</Text>
                {
                    myAds.map(function (realtyObject, index) {
                    return (
                        <View style={styles.mainContainer}>
                        <View
                        style={styles.imageWrapper}>
                            <Image
                            style={styles.realtyImage}
                            source={{
                                uri: realtyObject.thumbnailUrl,
                            }}
                            />
                        </View>
                        <View>
                            <View>
                            <View>
                                <Text
                                style={styles.price}
                                >
                                {realtyObject.price} ₽ / сутки
                                </Text>
                            </View>
                            <View
                                style={styles.charContainer}
                            >
                                <Text 
                                style={styles.charStyle}
                                >{realtyObject.rooms}-комн. квартира</Text>
                                <Text
                                style={styles.charSep}
                                >•</Text>
                                <Text
                                style={styles.charStyle}
                                >{realtyObject.square}</Text>
                                <Text
                                style={styles.charSep}
                                >•</Text>
                                <Text
                                style={styles.charStyle}
                                >{realtyObject.floor}/{realtyObject.floorest} этаж</Text>
                            </View>
                            <View>
                                <Text
                                style={styles.address}
                                >
                                {realtyObject.address}
                                </Text>
                            </View>
                            <View></View>
                            </View>
                            <View style={styles.buttonWrapper}>
                                <Button
                                    onPress={() => {
                                        removeAd(realtyObject.id);
                                    }}
                                    title="Удалить"
                                    color="#e31235"
                                    accessibilityLabel="Кнопка для Посмотреть"
                                />  
                            </View>
                        </View>
                        </View>
                    );
                    })
                }
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
    imageWrapper:{
        marginBottom: 12,
      },
      realtyImage: {
        width: "100%",
        height: 150,
      },
      price:{
        letterSpacing: -0.5,
        fontWeight: 700,
        fontSize: 22,
        fontFamily: "Lato, Arial, sans-serif"
      },
      charContainer: {
        flexDirection: "row",
        marginBottom: 8, 
        marginTop: 4
      },
      charStyle: {
        fontSize: 14,
        fontFamily: "Lato, Arial, sans-serif",
        fontHeight: 20
      },
      charSep: {
        fontSize: 14,
        fontFamily: "Lato, Arial, sans-serif",
        fontHeight: 20,
        marginLeft: 7,
        marginRight: 7
      },
      address: {
        fontSize: 14,
        fontFamily: "Lato, Arial, sans-serif",
        fontHeight: 20,
        color: "rgba(21,34,66,.6)"
      },
      buttonWrapper: {
        marginTop: 12
      },
      mainContainer: {
        margin: 16
      }
});