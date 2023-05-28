import { Text, StyleSheet, View, Image } from "react-native"
import axios from 'axios';
import React, { useEffect } from "react";
import Price from "./Price";


export default function ObjectStat({objectId}) {
    const [stat, setStat] = React.useState(null);

    useEffect(() => {
        axios.get("http://localhost:4200/getStat/" + objectId).then((response) => {
            setStat(response.data);
        })
    }, [objectId]);

    if (!stat) {
        return (
            <Text>Загрузка</Text>
        )
    }
    if (stat.error) {
        return (
            <Text>{stat.error}</Text>
        )
    }
    return (
        <View style={styles.mainContainer}>
            <View style={styles.imageWrapper}>
                <Image
                style={styles.realtyImage}
                source={{
                    uri: stat.ad.thumbnailUrl,
                }}
            />
            </View>
            <View>
                <View>
                    <Price price={stat.ad.price}/>
                    <View
                        style={styles.charContainer}
                    >
                        <Text 
                        style={styles.charStyle}
                        >{stat.ad.rooms}-комн. квартира</Text>
                        <Text
                        style={styles.charSep}
                        >•</Text>
                        <Text
                        style={styles.charStyle}
                        >{stat.ad.square}</Text>
                        <Text
                        style={styles.charSep}
                        >•</Text>
                        <Text
                        style={styles.charStyle}
                        >{stat.ad.floor}/{stat.ad.floorest} этаж</Text>
                    </View>
                    <View>
                        <Text
                        style={styles.address}
                        >
                        {stat.ad.address}
                        </Text>
                    </View>
                </View>
            </View>
            {stat.rents.map(rent => {
                return (
                    <View>
                        <Text>{rent.user.name}: {rent.cost}</Text>
                    </View>
                );
            })}
        </View>
    );
}
const styles = StyleSheet.create({
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