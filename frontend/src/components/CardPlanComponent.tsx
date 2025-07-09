import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "../constans/colors";

type CardPlanProps = {
  title: string;
  description: string;
  price: string;
  features: string[];
  onSelect?: () => void;
  isSelected?: boolean;
};

const CardPlanComponent = ({
  title,
  description,
  price,
  features,
  onSelect,
  isSelected = false,
}: CardPlanProps) => {
  return (
    <View style={[styles.container, isSelected && styles.selectedContainer]}>
      <View style={styles.header}>
        <Icon
          name={title === "FREE" ? "star-outline" : "star"}
          size={32}
          color={isSelected ? colors.primary[500] : colors.primary[500]}
        />
        <Text style={[styles.title, isSelected && styles.selectedTitle]}>
          {title}
        </Text>
      </View>

      <View style={styles.priceContainer}>
        <Text style={[styles.price, isSelected && styles.selectedPrice]}>
          {price}
        </Text>
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
            <Icon
              name="check-circle"
              size={18}
              color={isSelected ? colors.primary[500] : colors.primary[500]}
            />
            <Text
              style={[
                styles.featureText,
                isSelected && styles.selectedFeatureText,
              ]}
            >
              {feature}
            </Text>
          </View>
        ))}
      </View>

      {onSelect && (
        <TouchableOpacity
          style={[styles.selectButton, isSelected && styles.selectedButton]}
          onPress={onSelect}
        >
          <Text
            style={[
              styles.selectButtonText,
              isSelected && styles.selectedButtonText,
            ]}
          >
            {isSelected ? "Seleccionado" : "Seleccionar"}
          </Text>
        </TouchableOpacity>
      )}
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedContainer: {
    borderColor: colors.primary[500],
    backgroundColor: colors.primary[500],
    borderWidth: 3,
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
  selectedTitle: {
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
  selectedPrice: {
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
  selectedFeatureText: {
    color: colors.primary[500],
  },
  selectButton: {
    backgroundColor: colors.primary[500],
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  selectedButton: {
    backgroundColor: colors.primary[500],
  },
  selectButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  selectedButtonText: {
    color: "#fff",
  },
});

export default CardPlanComponent;
