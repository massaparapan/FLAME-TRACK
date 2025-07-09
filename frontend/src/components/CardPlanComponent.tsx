import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "../constans/colors";

type CardPlanProps = {
  title: string;
  description: string;
  price: string;
};

const CardPlanComponent = ({ title, description, price }: CardPlanProps) => {
  return (
    <View style={styles.container}>
      <Icon name="layers" size={80} />
      <View style={styles.rightContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text>{description}</Text>
        <Text style={styles.price}>${price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: colors.primary[500],
    borderWidth: 1,
    padding: 5,
    margin: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    textAlign: 'center',
  },
  rightContainer: {
    flex: 1,
    gap: 5
  },
  price: {
    fontWeight: "semibold",
    fontSize: 22,
    textAlign: 'center',
  }
});

export default CardPlanComponent;
