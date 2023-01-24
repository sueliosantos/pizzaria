import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "../pages/Dashboard";
import Order from "../pages/Order";
import { FinalizarOrderm } from "../pages/FinalizarPedido";

export type StackParamsList = {
  Dashboard: undefined;
  Order: {
    number: number | string;
    order_id: string;
  };

  FinalizarOrderm: {
    number: number | string;
    order_id: string;
  }
}

const Stack = createNativeStackNavigator<StackParamsList>();

function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
      <Stack.Screen name="Order" component={Order} options={{ headerShown: false }} />
      <Stack.Screen name="FinalizarOrderm" component={FinalizarOrderm}
        options={{
          title: 'Finalizar',
          headerStyle: {
            backgroundColor: '#1d1d2e'
          },
          headerTintColor: "#fff"
        }} />
    </Stack.Navigator>
  );
}

export default AppRoutes;
