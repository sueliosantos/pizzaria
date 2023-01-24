import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { api } from "../../service/api";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";

type RouteDetailProps = {
  FinishOrder: {
    number: number | string;
    order_id: string
  }
}

type FinishOrderProps = RouteProp<RouteDetailProps, 'FinishOrder'>

export function FinalizarOrderm() {

  const route = useRoute<FinishOrderProps>();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

  async function handleFinalizarOrdem() {
    try {
      await api.put('/order/send', {
        ordem_id: route.params.order_id
      })
      navigation.popToTop();

    } catch (error) {
      alert('Erro ao finalizar ordem')
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.alerta}>Você deseja finalizar esse pedido</Text>
      <Text style={styles.title}>Mesa {route.params?.number}</Text>

      <TouchableOpacity style={styles.button} onPress={handleFinalizarOrdem}>
        <Text style={styles.buttonText}>Finalizar Pedido</Text>
        <Feather name="shopping-cart" size={20} color="#1d1d2e" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d1d2d",
    paddingVertical: '5%',
    paddingHorizontal: '4%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alerta: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 12

  },
  title: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 12
  },

  button: {
    backgroundColor: '#3fffa3',
    flexDirection: 'row',
    width: '65%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  buttonText: {

    fontSize: 18,
    marginRight: 8,
    fontWeight: 'bold',
    color: '#1d1d2e',
  }
})