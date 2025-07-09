import { View } from "react-native";
import CardPlanComponent from "../components/CardPlanComponent";

const PlansScreen = () => {
    return (
        <View>
        <CardPlanComponent
        title="PRO"
        description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam." 
        price="50.000"
        >
        </CardPlanComponent>
    </View>
    );
};

export default PlansScreen;
