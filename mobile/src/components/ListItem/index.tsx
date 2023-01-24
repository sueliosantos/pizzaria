import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons'

interface ItemProps {
  data: {
    id: string,
    produto_id: string,
    nome: string;
    qtd: string | number
  };
  deleteitem: (item_id: string) => void;
}

export function ListItem({ data, deleteitem }: ItemProps) {

  function handleDeleteItem() {
    deleteitem(data.id)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.item}>{data.nome} - {data.qtd}</Text>

      <TouchableOpacity onPress={handleDeleteItem}>
        <Feather name='trash-2' color="#ff3f4b" size={25} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#101026',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 0.3,
    borderColor: '#8a8a8a',
  },

  item: {
    color: '#FFFFFF',
  }


})