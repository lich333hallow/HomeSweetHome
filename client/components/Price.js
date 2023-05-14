import { StyleSheet, View, Text } from "react-native";
import moment from "moment";

export default function Price(props) {
    const price = Math.round(props.price);
    const timeStart = props.timeStart;
    const timeEnd = props.timeEnd;
    if (!timeEnd && !timeStart ){
        return (
            <View>
                <Text
                    style={styles.price}
                    >
                    {price} ₽ / сутки
                </Text>
            </View>
        );
    }
        const momentStart = moment(timeStart);
        const momentEnd = timeEnd ? moment(timeEnd) : moment(new Date());
        const diff = momentEnd.diff(momentStart, "minutes");
        const pricePerMinute = price / 24 / 60;
        const endPrice = Math.round(pricePerMinute * diff);
        return (
            <View>
                <Text
                    style={styles.price}
                >
                    {endPrice} ₽
                </Text>
            </View>
        );
}
const styles = StyleSheet.create({
    price:{
        letterSpacing: -0.5,
        fontWeight: 700,
        fontSize: 22,
        fontFamily: "Lato, Arial, sans-serif"
    },
})