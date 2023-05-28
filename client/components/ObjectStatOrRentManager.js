import { StyleSheet, View, Switch, Button } from 'react-native';
import RentsManager from "./RentsManager";
import SwitchTextManager from "./SwitchTextManager";
import ObjectStat from "./ObjectStat";

export default function ObjectStatOrRentsManager({
    showObjectStat, 
    onChangeShowRents,
    showRents,
    myAds,
    removeAd,
    myRents,
    stopRent,
    showStat,
    backButtonClick,
    objectId,
}) {
    if (showObjectStat === true){
        return (
        <View>
            <ObjectStat 
                objectId={objectId}
            />
            <Button
                onPress={backButtonClick}
                title="Вернуться"
                color="#841584"
                accessibilityLabel="Вернуться"
            />
        </View>    
        );
    }

    return (
        <View>
            <View style={styles.switchContainer}>   
                <Switch 
                    style={styles.switch}
                    trackColor={{false: 'rgb(227, 18, 53)', true: '#841584'}}
                    thumbColor={'#fff'}
                    activeThumbColor={'#fff'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={onChangeShowRents}
                    value={showRents}
                />
                <SwitchTextManager showRents={showRents}/>
            </View>      
            <RentsManager 
                myAds={myAds}
                removeAd={removeAd}
                myRents={myRents}
                stopRent={stopRent}
                showRents={showRents}
                showStat={showStat}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    switchContainer: {
        display: "flex",
        flexDirection: "row",
        margin: 16
    },
    switch: {
        marginRight: 5
    }
});