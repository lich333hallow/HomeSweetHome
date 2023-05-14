import { Text } from "react-native"

export default function SwitchTextManager(props) {
    const showRents = props.showRents;
    if (showRents){
        return (<Text>Показать мои объявления</Text>);
    }

    return (
        <Text>Показать мои аренды</Text>
    );
}