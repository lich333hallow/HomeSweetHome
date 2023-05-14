import { StyleSheet, View, Button, Text } from "react-native"
import moment from "moment";

export default function StopRentButton(props) {
    const timeStart = props.timeStart;
    let timeEnd = props.timeEnd;
    const stopRent = props.stopRent;
    const rentId = props.rentId;
    if (timeEnd){
        return (
        <View style={styles.charContainer}> 
            <Text>Арендован с {moment(timeStart).format("DD/MM/YYYY HH:mm")} по {moment(timeEnd).format("DD/MM/YYYY HH:mm")}</Text>
        </View>
        );
    }

    timeEnd = new Date();
    return (
        <View>
            <View style={styles.charContainer}> 
                <Text>Арендован с {moment(timeStart).format("DD/MM/YYYY HH:mm")} по {moment(timeEnd).format("DD/MM/YYYY HH:mm")}</Text>
            </View>
            <View style={styles.buttonWrapper}>
                <Button
                    onPress={() => {
                        stopRent(rentId);
                    }}
                    title="Прекратить аренду"
                    color="#e31235"
                    accessibilityLabel="Кнопка для прекращения аренды"
                />  
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    buttonWrapper: {
        marginTop: 12
    },
    charContainer: {
        flexDirection: "row",
        marginBottom: 8, 
        marginTop: 4
    },
})