import React from "react";
import { Table, Button } from "react-bootstrap";
import { axios } from "axios";

class Categoria extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categorias: [],
    };
  }

  componentDidMount() {
    this.buscarCategorias();
  }

  buscarCategorias = () => {
    fetch("http://localhost:3333/categoria")
      .then((resposta) => resposta.json())
      .then((dados) => {
        this.setState({ categorias: dados });
      });
  };

  deletarCategoria = (id) => {
    alert(id);
    axios.delete(`http://localhost:3333/categoria/delete/${id}`).then((res) => {
      console.log(res);
      console.log(res.data);
    });

    /* fetch(`http://localhost:3333/categoria/delete/${id}`, {
      method: "DELETE",
    }).then((resposta) => {
      if (resposta.ok) {
        this.buscarCategorias();
      }
    });
    */
  };

  render() {
    return (
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {this.state.categorias.map((categoria) => (
            <tr key={categoria.id}>
              <td>{categoria.id}</td>
              <td>{categoria.nome}</td>
              <td>
                <Button variant="info">Atualizar</Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => this.deletarCategoria(categoria.id)}
                >
                  Excluir
                </Button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default Categoria;
