import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import CardPlanComponent from "../components/CardPlanComponent";
import { getPlans } from "../services/PlanService";

const PlansScreen = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getPlans();
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
    <ScrollView>
      <View style={{ padding: 20, paddingHorizontal: 30 }}>
        {plans.map((plan: any) => (
          <CardPlanComponent
            key={plan.id}
            title={plan.name}
            description={plan.description}
            price={plan.price}
            features={plan.features}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default PlansScreen;
