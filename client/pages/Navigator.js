import { StyleSheet, View } from 'react-native';
import InfiniteView from './InfiniteView';
import MapView from './MapView';
import AddAd from './AddAd';
import Settings from './Settings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AdsContext } from '../contexts/Ads';
import { useContext } from 'react';

const Tab = createBottomTabNavigator();

export default function NavigatorComponent() {
  const context = useContext(AdsContext)
  return (
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route })=> ({
          tabBarIcon: ({focused, color, size}) => {
            if (route.name === 'Списком') {
              return <Ionicons name="list-outline"/>
            } else if (route.name === 'На Карте') {
              return <Ionicons name="map-outline"/>
            } else if (route.name === "Добавить") {
              return <Ionicons name="add-circle-outline"/>
            } else if (route.name === "Настройки") {
              return <Ionicons name="settings-outline"/>
            }
          }
        })}>
          <Tab.Screen
            name="Списком" 
            component={InfiniteView} 
            listeners={{
              tabPress: e => {
                context.setAdId(null);
              },
            }}
          />
          <Tab.Screen
            name="На Карте"
            component={MapView}
            listeners={{
              tabPress: e => {
                context.setAdId(null);
              },
            }}
          />
          <Tab.Screen
            name="Добавить"
            component={AddAd}
            listeners={{
              tabPress: e => {
                context.setAdId(null);
              },
            }}
          />
           <Tab.Screen
            name="Настройки"
            component={Settings}
            listeners={{
              tabPress: e => {
                context.setAdId(null);
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});
