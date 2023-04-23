import { Text } from "react-native"

export default function EmptyList(props) {
    const adsCount = props.adsCount;
    if (adsCount > 0){
        return (<Text></Text>);
    }

    return (
        <Text>У вас нет созданных {props.endWord}</Text>
    );
}