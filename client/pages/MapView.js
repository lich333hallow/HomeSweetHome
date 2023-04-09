import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
// YaMap.init('571d6d45-1d78-4c1c-acec-7ddfc0008783');

import { StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MapView() {
  const defaultState = {
    center: [55.751574, 37.573856],
    zoom: 5,
  };

  function requestAds () {
    axios.get(`http://localhost:4200?getAll=true`)
      .then(function (responseJson) {
        setRealtyObjects(responseJson.data.ads);
      });
  }
  
  const [realtyObjects, setRealtyObjects] = useState([{
    title: "Ждём загрузку"
  }]);

  useEffect(function () {
    requestAds();
  }, []);

  return (
    <View>
      <YMaps>
        <Map defaultState={defaultState} width="100%" height="100vh">
          {  
            realtyObjects.map(function (realtyObject) {
              return (
                <Placemark geometry={[realtyObject.lon, realtyObject.lat]} />
              )
            })
          }
        </Map>
      </YMaps>
    </View>
  );
}