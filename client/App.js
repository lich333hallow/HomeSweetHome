import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AdsContext } from './contexts/Ads';
import { useState, useEffect } from 'react';
import NavigatorComponent from './pages/Navigator';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { LoginContext } from './contexts/Login';

export default function App(props) {
  const [adId, setAdId] = useState(null);
  const [adsPage, setAdsPage] = useState(1);
  const value = { adId, setAdId };
  useEffect(() => {
    async function getToken() {
      const token = await AsyncStorage.getItem("token");
      setIsAuth(token ? true : false);
    };

    if (!isAuth) {
        getToken();
    }
  }, []);
  const [isAuth, setIsAuth] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  return (
    <LoginContext.Provider
      value={
        {isAuth, setIsAuth, isRegister, setIsRegister}
      }>
        {
        isAuth ?         
          <AdsContext.Provider
            value={value}
          >
            <NavigatorComponent adId={adId} adsPage={adsPage}/>
          </AdsContext.Provider> 
        : isRegister ? <Registration /> : <Login />
        }
    </LoginContext.Provider> 

    //<Registration />
  );
}

const styles = StyleSheet.create({
});
