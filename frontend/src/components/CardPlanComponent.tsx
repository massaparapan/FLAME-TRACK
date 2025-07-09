import { Button } from "@react-navigation/elements";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "../constans/colors";

type CardPlanProps = {
  title: string;
  description: string;
  price: string;
  features: string[];
};

const CardPlanComponent = ({
  title,
  description,
  price,
  features,
}: CardPlanProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          name={title === "FREE" ? "star-outline" : "star"}
          size={32}
          color={colors.primary[500]}
        />
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.price}>{price}</Text>
        {title === "FREE" && (
          <Text style={styles.priceSubtext}>Para siempre</Text>
        )}
        {title === "PRO" && <Text style={styles.priceSubtext}>CLP / mes</Text>}
      </View>

      <Text style={styles.description}>{description}</Text>

      <View style={styles.featuresContainer}>
        <Text style={styles.featuresTitle}>Características:</Text>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Icon name="check-circle" size={18} color={colors.primary[500]} />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
        
      <Button>
        Contratar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: colors.primary[500],
    borderWidth: 2,
    padding: 20,
    margin: 12,
    borderRadius: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    gap: 8,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    color: colors.primary[500],
  },
  priceContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  price: {
    fontWeight: "bold",
    fontSize: 32,
    color: colors.primary[500],
  },
  priceSubtext: {
    fontSize: 14,
    color: colors.primary[500],
    marginTop: 4,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
    lineHeight: 22,
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featuresTitle: {
    fontWeight: "600",
    fontSize: 18,
    color: colors.primary[500],
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 10,
  },
  featureText: {
    fontSize: 15,
    color: "#555",
    flex: 1,
    lineHeight: 20,
  },
});

export default CardPlanComponent;
