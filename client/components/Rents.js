import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import StopRentButton from './StopRentButton';
import EmptyList from './EmptyList';
import Price from './Price';

export default function Rents({myRents, stopRent}) {
    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <View style={styles.rentsTextContainer}>
                        <Text>Мои аренды {myRents.length}</Text>
                        <EmptyList adsCount={myRents.length} endWord={"аренд"}/>
                    </View>
                    {
                        myRents.map(function (rentObject, index) {
                            return (
                                <View key={rentObject.id} style={styles.mainContainer}>
                            <View
                            style={styles.imageWrapper}>
                                <Image
                                style={styles.realtyImage}
                                source={{
                                    uri: rentObject.adInfo.thumbnailUrl,
                                }}
                                />
                            </View>
                            <View>
                                <View>
                                <Price 
                                    timeStart={rentObject.timeStart}
                                    timeEnd={rentObject.timeEnd}
                                    price={rentObject.adInfo.price}
                                />
                                <View
                                    style={styles.charContainer}
                                >

                                </View>
                                <View>
                                    <Text
                                    style={styles.address}
                                    >
                                    {rentObject.adInfo.address}
                                    </Text>
                                </View>
                                <View></View>
                                </View>
                                <StopRentButton 
                                    timeEnd={rentObject.timeEnd} 
                                    stopRent={stopRent} 
                                    rentId={rentObject.id}
                                    timeStart={rentObject.timeStart}
                                />
                            </View>
                            </View>
                            )
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
      address: {
        fontSize: 14,
        fontFamily: "Lato, Arial, sans-serif",
        fontHeight: 20,
        color: "rgba(21,34,66,.6)"
      },
      mainContainer: {
        margin: 16
      },
      rentsTextContainer: {
        marginLeft: 16,
        marginRight: 16 
      }
});