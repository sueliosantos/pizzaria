import React from 'react';
import { Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Dashboard() {

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Novo pedido</Text>
      <TextInput
        placeholder='Número da mesa'
        placeholderTextColor='#F0F0F0'
        style={styles.input}
        keyboardType="numeric" />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Abrir mesa</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#1d1d2e'


  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 24
  },

  input: {
    width: '90%',
    height: 60,
    backgroundColor: '#101026',
    borderRadius: 4,
    paddingHorizontal: 8,
    textAlign: 'center',
    fontSize: 22,
    color: '#fff'
  },
  button: {
    width: '90%',
    height: 40,
    backgroundColor: '#3fffa3',
    marginVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 18,
    color: '#101026',
    fontWeight: 'bold',
  }
})