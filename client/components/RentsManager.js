import Rents from "./Rents";
import Objects from "./Objects";

export default function RentsManager({showRents, myAds, myRents, removeAd, stopRent, showStat}) {
    if (showRents === true){
        return (
            <Rents 
                myRents={myRents}
                stopRent={stopRent}
            />
        );
    }

    return (
        <Objects 
            myAds={myAds}
            removeAd={removeAd}
            showStat={showStat}
        />
    );
}