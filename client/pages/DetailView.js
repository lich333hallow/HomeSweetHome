import React from "react";
import { StyleSheet, View, Text, Image, Button, ScrollView } from 'react-native';
import { useEffect, useState, useContext } from 'react';
import {AdsContext} from '../contexts/Ads'
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DetailView() { 
  const context = useContext(AdsContext)

  function onPressArenda(adId){
    AsyncStorage.getItem("token").then((token) => {
      axios.post(`http://localhost:4200/rent`, {
        adId: adId,
        user: token
      }).then((responseJson) => {
        if (responseJson.data.error){
          alert("Объект уже арендован.");
        } else {
          alert("Объект арендован.");
        }
      })
    });
  }
  
  function requestAd () {
    axios.get(`http://localhost:4200/ad/` + context.adId)
    .then(function (responseJson) {
        setRealtyObject(responseJson.data)
    });
  }

  const [realtyObject, setRealtyObject] = useState({
      floor: "Ждём загрузку"
  });
    

  useEffect(function () {
    requestAd();
  }, [])

  return (
    <ScrollView>
      <View style={styles.container}>

          <Image
          style={styles.realtyImage}
            source={{
              uri: realtyObject.thumbnailUrl,
            }}
          />
          
          <Text style={styles.price}>{realtyObject.price} ₽/сутки</Text>
          <View style={styles.flexDirection}>
            <Text style={styles.info}>{realtyObject.rooms}-комн.{"\n"}<Text style={styles.secondaryInfo}>квартира</Text></Text>
            <Text style={styles.info}>{realtyObject.square} м²{"\n"}<Text style={styles.secondaryInfo}>общая пл.</Text></Text>
            <Text style={styles.info}>{realtyObject.kitchen} м²{"\n"}<Text style={styles.secondaryInfo}>кухня</Text></Text>
            <Text style={styles.info}>{realtyObject.floor} из {realtyObject.floorest}{"\n"}<Text style={styles.secondaryInfo}>этаж</Text></Text>
          </View>

          <Text style={styles.h1}>Общая информация</Text>

          <View>
            <View style={styles.flexDirection}><Text style={styles.squareInfo}>Общая площадь</Text><Text style={styles.realtyInfo}>{realtyObject.square} м²</Text></View>  
            <View style={styles.flexDirection}><Text style={styles.squareInfo}>Площадь кухни</Text><Text style={styles.realtyInfo}>{realtyObject.kitchen} м²</Text></View>  
            <View style={styles.flexDirection}><Text style={styles.squareInfo}>Площадь комнат</Text><Text style={styles.realtyInfo}>{realtyObject.roomSquare} м²</Text></View>  
          </View>

          <Text style={styles.h1}>О доме</Text>

          <View>
            <View style={styles.flexDirection}><Text style={styles.squareInfo}>Тип дома</Text><Text style={styles.realtyInfo}>{realtyObject.typeOfHouse}</Text></View>
            <View style={styles.flexDirection}><Text style={styles.squareInfo}>Год постройки</Text><Text style={styles.realtyInfo}>{realtyObject.yearOfBuild}</Text></View>
            <View style={styles.flexDirection}><Text style={styles.squareInfo}>Подъезды</Text><Text style={styles.realtyInfo}>{realtyObject.entrance}</Text></View>
            <View style={styles.flexDirection}><Text style={styles.squareInfo}>Лифты</Text><Text style={styles.realtyInfo}>{realtyObject.elevator}</Text></View>
            <View style={styles.flexDirection}><Text style={styles.squareInfo}>Парковка</Text><Text style={styles.realtyInfo}>{realtyObject.parkingSpace}</Text></View>
          </View>

          <Button
              onPress={() => {onPressArenda(realtyObject.id)}}
              title="Арендовать"
              color="#841584"
              style={styles.button}
              accessibilityLabel="Кнопка для аренды"
              />

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textRoomsAndSquare:{
    fontWeight: 400,
    lineHeight: 20,
    letterSpacing: 'normal',
    color: 'rgba(21,34,66,.6)',
    height: 48,
    paddingTop: 6
  },
  realtyImage: {
    width: "100%",
    height: 150
  },
  container:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'left',
    justifyContent: 'left',
    overflow: 'scroll',
    margin: 8,
    padding: 10
  },
  price: {
    fontWeight: 600,
    color: '#152242',
    lineHeight: 36,  
    fontSize: 28,
    margin: 10,
    marginRight: 0
  },
  info: {
    width: "25%",
    textAlign: "center",
    fontWeight: 700,
    lineHeight: 22,
    fontSize: 16,
    letterSpacing: "normal",
    color: '#152242'
  },
  flexDirection: {
    flexDirection: "row",
    marginBottom: 10
  },
  secondaryInfo: {
    fontWeight: 400,
    lineHeight: 20,
    fontSize: 14,
    letterSpacing: "normal",
    color: "rgba(21,34,66,.6)"
  },
  h1: {
    fontWeight: 700,
    lineHeight: 28,
    fontSize: 22,
    letterSpacing: "normal",
    color: "#152242",
    marginBottom: 20,
    marginTop: 20
  },
  squareInfo: {
    width: "100%",
    color: "#737a8e",
    width: "50%"
  },
  realtyInfo: {
    color: "#152242",
    whiteSpace: "pre-line",
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 16,
    width: "50%"
  },
});