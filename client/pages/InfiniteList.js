import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useRef, useContext } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { AdsContext } from '../contexts/Ads';

import axios from 'axios';
const pageSize = 5;
let totalPageCount;

export default function InfiniteList({ navigation, propspage }) {
  const ref = useRef();
  const context = useContext(AdsContext)
  const [page, setPage] = useState(propspage);

  let [fetch, setFetch] = useState(true);
  function requestAds () {
    if (fetch) {
      axios.get(`http://localhost:4200?page=${page}&pageSize=${pageSize}`)
        .then(function (responseJson) {
          if (realtyObjects.length === 1) {
            setRealtyObjects(responseJson.data.ads);
          } else {
            setRealtyObjects(realtyObjects.concat(responseJson.data.ads));
          }
          totalPageCount = Math.ceil(responseJson.data.total / pageSize);
          setFetch(false);
          setPage(page + 1);
        });
    } 
  }

  function scrollHandler (e) {
    const FullHeight = e.target.scrollHeight;
    const scrollProgress = e.target.scrollTop;
    const monitorSize = window.innerHeight;

    const beforeEnd = FullHeight - scrollProgress- monitorSize;

    if (beforeEnd < 500 && page <= totalPageCount) {
      setFetch(true);
    }
  }

  function onView (index) {
    context.setAdId(index);
    navigation.navigate('Списком', {})
  }

  const [realtyObjects, setRealtyObjects] = useState([{
    title: "Ждём загрузку"
  }]);


  useEffect(function () {
    requestAds();
  }, [fetch])

  useEffect(function () {
    const div = ref.current;
    div.addEventListener('scroll', scrollHandler);
    return function () {
      div.removeEventListener('scroll', scrollHandler);
    }
  }, []);

  return (
    <View ref={ref} style={styles.container}>
      {
        realtyObjects.map(function (realtyObject, index) {
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
                      onPress={() => {onView(index)}}
                      title="Посмотреть"
                      color="#841584"
                      accessibilityLabel="Кнопка для Посмотреть"
                  />  
                </View>
              </View>
            </View>
          );
        })
      }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'left',
    justifyContent: 'left',
    margin: 8,
    overflow: 'scroll' 
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
