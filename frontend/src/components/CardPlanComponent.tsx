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
    <View style={styles.cardContainer}>
      <View style={styles.infoSection}>
        <View style={styles.planHeader}>
          <Icon
            name={title === "FREE" ? "star-outline" : "star"}
            size={24}
            color={colors.primary[500]}
          />
          <Text style={styles.planTitle}>{title}</Text>
        </View>

        <Text style={styles.planDescription} numberOfLines={2}>
          {description}
        </Text>

        <View style={styles.featuresList}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Icon name="check-circle" size={14} color={colors.primary[500]} />
              <Text style={styles.featureText} numberOfLines={1}>
                {feature}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.actionSection}>
        <View style={styles.priceInfo}>
          <Text style={styles.priceText}>{price}</Text>
          {title === "FREE" && (
            <Text style={styles.priceSubtitle}>Para siempre</Text>
          )}
          {title === "PRO" && (
            <Text style={styles.priceSubtitle}>CLP / mes</Text>
          )}
        </View>

        <Button style={styles.contractButton}>Contratar</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    borderColor: colors.primary[500],
    borderWidth: 2,
    borderRadius: 14,
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 5,
    height: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
    elevation: 3,
  },
  infoSection: {
    flex: 3,
    paddingRight: 10,
    justifyContent: "space-between",
  },
  planHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  planTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: colors.primary[500],
  },
  planDescription: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
  featuresList: {
    marginTop: 6,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 12,
    color: "#555",
    flexShrink: 1,
  },
  actionSection: {
    width: "auto",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceInfo: {
    alignItems: "center",
  },
  priceText: {
    fontWeight: "bold",
    fontSize: 24,
    color: colors.primary[500],
  },
  priceSubtitle: {
    fontSize: 11,
    color: colors.primary[500],
  },
  contractButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
});

export default CardPlanComponent;
