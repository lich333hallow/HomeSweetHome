import React, { useContext, useEffect } from "react";
import { StyleSheet, View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginContext } from '../contexts/Login';
import axios from "axios";
import ObjectStatOrRentsManager from "../components/ObjectStatOrRentManager";

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
    function showStat(id){
        setObjectId(id)
        onChangeShowObjectStat(true);
    }
    function backButtonClick(){
        onChangeShowObjectStat(false);
    }
    function stopRent(rentId){
        axios.post("http://localhost:4200/rent/update/" + rentId).then((response) => {
            console.log(response.data)
        })
    }
    const [myAds, onChangeMyAds] = React.useState([]);
    const [myRents, onChangeMyRents] = React.useState([]);
    const [showRents, onChangeShowRents] = React.useState(true);
    const [showObjectStat, onChangeShowObjectStat] = React.useState(false);
    const [objectId, setObjectId] = React.useState(null);

    useEffect(function () {
        requestUserData();
        requestUserRents();
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView> 
                <ObjectStatOrRentsManager 
                    showObjectStat={showObjectStat}
                    onChangeShowRents={onChangeShowRents}
                    showRents={showRents}
                    myAds={myAds}
                    removeAd={removeAd}
                    myRents={myRents}
                    stopRent={stopRent}
                    showStat={showStat}
                    backButtonClick={backButtonClick}
                    objectId={objectId}
                />   
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        height: "100%"
    } 
});