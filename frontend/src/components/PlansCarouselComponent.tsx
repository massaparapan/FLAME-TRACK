import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View, Dimensions } from "react-native";
import CardPlanComponent from "./CardPlanComponent";
import { planService } from "@/src/services/PlanService";

const { width } = Dimensions.get("window");

const ITEM_WIDTH = width * 0.8; 
const SIDE_MARGIN = (width - ITEM_WIDTH) / 2;

type Plan = {
  id: number;
  name: string;
  description: string;
  price: string;
  features: string[];
};

const PlansScreen = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await planService.getPlans();
        setPlans(data);
      } catch (err) {
        setError("No se pudieron cargar los planes");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#000" />;
  if (error) return <Text>{error}</Text>;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        horizontal
        data={plans}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + 10} 
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: SIDE_MARGIN,
        }}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        renderItem={({ item }) => (
          <View style={{ width: ITEM_WIDTH }}>
            <CardPlanComponent
              title={item.name}
              description={item.description}
              price={item.price}
              features={item.features}
            />
          </View>
        )}
      />
    </View>
  );
};

export default PlansScreen;