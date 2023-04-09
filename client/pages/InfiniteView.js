import { StyleSheet } from 'react-native';
import InfiniteList from './InfiniteList';
import DetailView from './DetailView';
import { useContext, useEffect, useState  } from 'react';
import {AdsContext} from '../contexts/Ads'

export default function infiniteView(props) {
    
    const context = useContext(AdsContext);
    const [adId, setAdId] = useState(context.adId);

    useEffect(function () {
        setAdId(context.adId);
    }, [context.adId])

    if (context && (context.adId || context.adId === 0)) {
        return <DetailView  {...props} adId={props.adId}/>;
    } else {
        return <InfiniteList {...props} adId={props.adId} propspage={1}/>;
    }
}

const styles = StyleSheet.create({
});