import React from "react";
import { StyleSheet, View, Button, Text, Image, ScrollView } from 'react-native';
import EmptyList from '../components/EmptyList';
import Price from "../components/Price";

export default function RentsMenu({myAds, removeAd}) { 
    return (
        <View style={styles.container}>
            <ScrollView>
            <View>
              <View style={styles.objectTextContainer}>
                <Text>Мои объекты - {myAds.length}</Text>
                <EmptyList adsCount={myAds.length} endWord={"объявлений"}/>
              </View>
                {
                    myAds.map(function (realtyObject, index) {
                    return (
                        <View key={realtyObject.id} style={styles.mainContainer}>
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
                            <Price price={realtyObject.price}/>
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
    container: {
        justifyContent: "center"
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
      },
      objectTextContainer: {
        marginLeft: 16,
        marginRight: 16
      }
});