import { Text, View, Dimensions, TouchableOpacity, StyleSheet, ScrollView } from "react-native"
import { CategoriaProps } from "../../pages/Order"

interface ModalPickerProps {
  options: CategoriaProps[]
  handleCloseModal: () => void
  selectedItem: (item: CategoriaProps) => void
}

const { width: WIDTH, height: HEIGTH } = Dimensions.get('window')
export function ModalPicker({ options, handleCloseModal, selectedItem }: ModalPickerProps) {

  function onPressItem(item: CategoriaProps) {
    selectedItem(item)
    handleCloseModal()
  }
  const option = options.map((item, index) => (
    <TouchableOpacity key={index} style={styles.option} onPress={() => onPressItem(item)}>
      <Text style={styles.item}>
        {item?.nome}
      </Text>
    </TouchableOpacity>
  ))
  return (
    <TouchableOpacity onPress={handleCloseModal} style={styles.container}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {option}
        </ScrollView>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: WIDTH - 20,
    height: HEIGTH / 2,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#8a8a8a',
    borderRadius: 4
  },
  option: {
    alignItems: 'flex-start',
    borderTopWidth: 0.8,
    borderTopColor: '#8a8a8a',
  },

  item: {
    margin: 18,
    fontSize: 14,
    color: '#101026',
    fontWeight: 'bold',
  }
})