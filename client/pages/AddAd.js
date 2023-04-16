import React from "react";
import { StyleSheet, View, Button, TextInput, ScrollView} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddAd() {
    function onPressAdd(){
        AsyncStorage.getItem("token").then((token) => {
            axios.post("http://localhost:4200/add" ,{
                thumbnailUrl: imageUrl,
                lon: lon,
                lat: lat,
                square: square,
                rooms: rooms,
                floor: floor,
                floorest: floorest,
                price: price,
                region: region,
                city: city,
                street: street,
                numberOfHouse: numberOfHouse,
                onChangeSquareKitchen: kitchen,
                onChangeSquareRoom: roomSquare,
                onChangeTypeOfHouse: typeOfHouse,
                onChangeYearOfBuild: yearOfBuild,
                onChangeEntrance: entrance,
                onChangeElevator: elevator,
                onChangeParkingSpace: parkingSpace,
                userId: token
            });
    });
    }
    
    const [imageUrl, onChangeImageUrl] = React.useState("");
    const [lon, onChangeLon] = React.useState("");
    const [lat, onChangeLat] = React.useState("");
    const [price, onChangePrice] = React.useState("");
    const [rooms, onChangeRooms] = React.useState("");
    const [square, onChangeSquare] = React.useState("");
    const [floor, onChangeFloor] = React.useState("");
    const [floorest, onChangeFloorest] = React.useState("");
    const [region, onChangeRegion] = React.useState("");
    const [city, onChangeCity] = React.useState("");
    const [street, onChangeStreet] = React.useState("");
    const [numberOfHouse, onChangeNumberOfHouse] = React.useState("");
    const [kitchen, onChangeSquareKitchen] = React.useState("");
    const [roomSquare, onChangeSquareRoom] = React.useState("");
    const [typeOfHouse, onChangeTypeOfHouse] = React.useState("");
    const [yearOfBuild, onChangeYearOfBuild] = React.useState("");
    const [entrance, onChangeEntrance] = React.useState("");
    const [elevator, onChangeElevator] = React.useState("");
    const [parkingSpace, onChangeParkingSpace] = React.useState("");

    return (
        <ScrollView style={styles.container}>
            <View>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeImageUrl}
                    value={imageUrl}
                    placeholder="Ссылка на Фото"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangePrice}
                    value={price}
                    placeholder="Цена"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeRooms}
                    value={rooms}
                    placeholder="Кол-во комнат"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeFloor}
                    value={floor}
                    placeholder="Этаж"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeFloorest}
                    value={floorest}
                    placeholder="Этажность"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeRegion}
                    value={region}
                    placeholder="Регион"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeCity}
                    value={city}
                    placeholder="Город"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeStreet}
                    value={street}
                    placeholder="Улица"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeNumberOfHouse}
                    value={numberOfHouse}
                    placeholder="Номер дома"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeSquare}
                    value={square}
                    placeholder="Площадь квартиры"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeSquareKitchen}
                    value={kitchen}
                    placeholder="Площадь кухни"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeSquareRoom}
                    value={roomSquare}
                    placeholder="Площадь комнат"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeTypeOfHouse}
                    value={typeOfHouse}
                    placeholder="Тип дома"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeYearOfBuild}
                    value={yearOfBuild}
                    placeholder="Год постройки"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeEntrance}
                    value={entrance}
                    placeholder="Количество подъездов"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeElevator}
                    value={elevator}
                    placeholder="Лифт"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeParkingSpace}
                    value={parkingSpace}
                    placeholder="Парковка"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeLon}
                    value={lon}
                    placeholder="Долгота"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeLat}
                    value={lat}
                    placeholder="Широта"
                />
                <Button
                    onPress={onPressAdd}
                    title="Добавить"
                    style={styles.button}
                    color="#841584"
                    accessibilityLabel="Кнопка для добавления"
                />
            </View>
        </ScrollView>       
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    container: {
        overflow: 'scroll' 
    },
});