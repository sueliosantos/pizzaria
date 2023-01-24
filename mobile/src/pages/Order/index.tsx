import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, FlatList } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons"
import { api } from "../../service/api";
import { useState, useEffect } from 'react'
import { ModalPicker } from "../../components/ModalPicker";
import { ListItem } from "../../components/ListItem";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";

type RouteDetails = {
  Order: {
    number: string | number;
    order_id: string;
  }
}

export type CategoriaProps = {
  id: string,
  nome: string;
}

type ProdutoProps = {
  id: string,
  nome: string;
}

type ItemProps = {
  id: string,
  produto_id: string,
  nome: string;
  qtd: string | number
}

type OrderRouterProps = RouteProp<RouteDetails, 'Order'>

export default function Order() {
  const route = useRoute<OrderRouterProps>();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

  const [categoria, setCategoria] = useState<CategoriaProps[] | []>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<CategoriaProps>();
  const [modalCategoriaVisivel, setModalCategoriaVisivel] = useState(false)

  const [produtos, setProdutos] = useState<ProdutoProps[] | []>([])
  const [produtoSelecionado, setProdutoSelecionado] = useState<ProdutoProps | undefined>()
  const [modalProdutoVisivel, setModalProdutoVisivel] = useState(false)

  const [qtd, setQtd] = useState('1')
  const [itens, setItens] = useState<ItemProps[]>([])

  useEffect(() => {
    async function loadInfo() {
      const response = await api.get('/categoria')
      setCategoria(response.data);
      setCategoriaSelecionada(response.data[0])
    }

    loadInfo()
  }, [])

  useEffect(() => {
    async function loadProduto() {
      const response = await api.get('/categoria/produto', {
        params: {
          categoria_id: categoriaSelecionada?.id
        }
      })


      setProdutos(response.data);
      setProdutoSelecionado(response.data[0])
    }

    loadProduto();
  }, [categoriaSelecionada])

  function handleChangeProduto(item: ProdutoProps) {
    setProdutoSelecionado(item)
  }

  async function handleCloseOrder() {
    try {
      await api.delete('/order', {
        params: {
          order_id: route.params?.order_id
        }
      })

      navigation.goBack()
    } catch (error) {
      console.log('Erro ao fechar a mesa')
    }
  }

  function handleChangeCategoria(item: CategoriaProps) {
    setCategoriaSelecionada(item)
  }

  async function handleAddProduto() {
    const response = await api.post('/order/add', {
      ordem_id: route.params?.order_id,
      produto_id: produtoSelecionado?.id,
      qtd: Number(qtd)
    })

    let data = {
      id: response.data.id,
      produto_id: produtoSelecionado?.id as string,
      nome: produtoSelecionado?.nome as string,
      qtd: qtd
    }

    setItens(oldArray => [...oldArray, data])
  }

  async function handleDeleteItem(item_id: string) {
    await api.delete('/order/remove', {
      params: {
        item_id: item_id
      }
    })

    let removeItens = itens.filter(itens => {
      return (itens.id != item_id)
    })

    setItens(removeItens)
  }

  function handleFinishOrder() {
    navigation.navigate("FinalizarOrderm", { number: route.params.number, order_id: route.params.order_id })
  }



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title} >Mesa {route.params.number}</Text>

        {
          itens.length === 0 && (
            <TouchableOpacity onPress={handleCloseOrder}>
              <Feather name="trash-2" size={28} color='#ff3f4b' />
            </TouchableOpacity>
          )
        }
      </View>

      {
        categoria.length != 0 && (
          <TouchableOpacity style={styles.input} onPress={() => setModalCategoriaVisivel(true)}>
            <Text style={{ color: '#fff' }}>
              {
                categoriaSelecionada?.nome
              }
            </Text>
          </TouchableOpacity>
        )
      }


      {
        produtos.length != 0 && (
          <TouchableOpacity style={styles.input} onPress={() => setModalProdutoVisivel(true)}>
            <Text style={{ color: '#fff' }}>
              {
                produtoSelecionado?.nome
              }
            </Text>
          </TouchableOpacity>
        )
      }


      <View style={styles.qtdContainer}>
        <Text style={styles.qtdText}>Quatidade</Text>
        <TextInput style={[styles.input, { width: '60%', textAlign: 'center' }]}
          value={qtd}
          onChangeText={setQtd}
          placeholderTextColor="#f0f0f0"
          keyboardType="numeric" />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAddProduto}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { opacity: itens.length === 0 ? 0.3 : 1 }]}
          disabled={itens.length == 0}
          onPress={handleFinishOrder}
        >
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginTop: 24 }}
        data={itens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ListItem data={item} deleteitem={handleDeleteItem} />}
      />

      <Modal
        transparent={true}
        visible={modalCategoriaVisivel}
        animationType='fade'
      >
        <ModalPicker
          handleCloseModal={() => setModalCategoriaVisivel(false)}
          options={categoria}
          selectedItem={handleChangeCategoria}
        />
      </Modal>


      <Modal
        transparent={true}
        visible={modalProdutoVisivel}
        animationType='fade'
      >
        <ModalPicker
          handleCloseModal={() => setModalProdutoVisivel(false)}
          options={produtos}
          selectedItem={handleChangeProduto}
        />
      </Modal>

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