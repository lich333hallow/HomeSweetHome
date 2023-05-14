import React, { useContext, useEffect } from "react";
import { StyleSheet, View, ScrollView, Switch, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginContext } from '../contexts/Login';
import axios from "axios";
import RentsManager from "../components/RentsManager";
import SwitchTextManager from "../components/SwitchTextManager";

export default function RentsMenu() {
    const context = useContext(LoginContext)

    function requestUserData(){
        AsyncStorage.getItem("token").then((token) => {
            axios.get("http://localhost:4200/user/" + token).then((response) =>{
                onChangeMyAds(response.data.ads);
            });
        })
    }
    function requestUserRents(){
        AsyncStorage.getItem("token").then((token) =>{
            axios.get("http://localhost:4200/rents/" + token)
            .then((response) => {
                onChangeMyRents(response.data.rents);
            });
        });
    }
    function removeAd(id){
        AsyncStorage.getItem("token").then((token) => {
            axios.post("http://localhost:4200/ad/" + id, {user: token}).then((response) => {
                onChangeMyAds(response.data)
            });
        })
    }
    function stopRent(rentId){
        axios.post("http://localhost:4200/rent/update/" + rentId).then((response) => {
            console.log(response.data)
        })
    }
    const [myAds, onChangeMyAds] = React.useState([]);
    const [myRents, onChangeMyRents] = React.useState([]);
    const [showRents, onChangeShowRents] = React.useState(true);

    useEffect(function () {
        requestUserData();
        requestUserRents();
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView> 
                <View style={styles.switchContainer}>   
                    <Switch 
                        style={styles.switch}
                        trackColor={{false: 'rgb(227, 18, 53)', true: '#841584'}}
                        thumbColor={'#fff'}
                        activeThumbColor={'#fff'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={onChangeShowRents}
                        value={showRents}
                    />
                    <SwitchTextManager showRents={showRents}/>
                </View>      
                <RentsManager 
                    myAds={myAds}
                    removeAd={removeAd}
                    myRents={myRents}
                    stopRent={stopRent}
                    showRents={showRents}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        height: "100%"
    },
    switchContainer: {
        display: "flex",
        flexDirection: "row",
        margin: 16

    },
    switch: {
        marginRight: 5
    }
});