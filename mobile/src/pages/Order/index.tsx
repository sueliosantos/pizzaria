import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons"

type RouteDetails = {
  Order: {
    number: string | number;
    order_id: string;
  }
}

type OrderRouterProps = RouteProp<RouteDetails, 'Order'>

export default function Order() {
  const route = useRoute<OrderRouterProps>();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title} >Mesa {route.params.number}</Text>
        <TouchableOpacity>
          <Feather name="trash-2" size={28} color='#ff3f4b' />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.input}>
        <Text style={{ color: '#fff' }}>Pizzas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.input}>
        <Text style={{ color: '#fff' }}>Pizzas Calabreza</Text>
      </TouchableOpacity>

      <View style={styles.qtdContainer}>
        <Text style={styles.qtdText}>Quatidade</Text>
        <TextInput style={[styles.input, { width: '60%', textAlign: 'center' }]}
          value="1"
          placeholderTextColor="#f0f0f0"
          keyboardType="numeric" />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.buttonAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d2e',
    paddingVertical: '5%',
    paddingEnd: '4%',
    paddingStart: '4%',
  },

  header: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
    marginVertical: 24,
  },

  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginRight: 14
  },

  input: {
    backgroundColor: '#101026',
    borderRadius: 4,
    width: '100%',
    height: 40,
    marginBottom: 12,
    justifyContent: 'center',
    paddingHorizontal: 8,
    color: '#ffffff',
    fontSize: 20
  },

  qtdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  qtdText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },

  actions: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },

  buttonAdd: {
    backgroundColor: 'blue',
    borderRadius: 4,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%'
  },
  button: {
    backgroundColor: '#3fffa3',
    borderRadius: 4,
    height: 40,
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#101026',
    fontSize: 18,
    fontWeight: 'bold',
  },
})