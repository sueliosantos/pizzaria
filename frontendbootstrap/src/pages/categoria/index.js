import Head from "next/head";
import React, { FormEvent, useState } from "react";
//import { Header } from "../../components/Header";
//import styles from "./styles.module.scss";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";
import { canSSAuth } from "../../utils/canSSAuth";
import { Button, Form, Modal, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Header } from "../../components/Header";

class Categoria extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      nome: "",
      categorias: [],
      modalAberto: false,
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

  async deletarCategoria(id) {
    await axios.delete(`http://localhost:3333/categoria/${id}`);
    this.buscarCategorias();

    toast.success("Categoria excluída com sucesso");
  }

  async carregarCategoria(id) {
    fetch("http://localhost:3333/categoria/" + id, { method: "GET" })
      .then((resposta) => resposta.json())
      .then((categoria) => {
        this.setState({ id: categoria.id, nome: categoria.nome });
      });
    this.abrirModal();
  }

  async atualizarCategoria(categoria) {
    alert(categoria.nome);

    fetch("http://localhost:3333/categoriaeditar/" + categoria.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(categoria.nome),
    }).then((resposta) => {
      if (resposta.ok) {
        this.buscarCategorias();
        toast.success("Categoria cadastrada com sucesso");
      } else {
        toast.error("Não foi possível cadastrar a categoria");
      }
    });
  }
  /*
  async function registrarCategoria(event: FormEvent) {
    event.preventDefault();

    if (nome === "") {
      return;
    }

    const api = setupAPIClient();
    await api.post("/categoria", {
      nome: nome,
    });

    toast.success("Categoria cadastrada com sucesso");
    setNome("");
    */
  atualizarCampo(e) {
    this.setState({
      nome: e.target.value,
    });
  }

  async submit() {
    if (this.state.id == 0) {
      axios
        .post("http://localhost:3333/categoria", {
          nome: this.state.nome,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

      toast.success("Categoria cadastrada com sucesso");

      this.buscarCategorias();
      this.handleClose();
    } else {
      const res = await axios.put(
        "http://localhost:3333/categoriaeditar/" + this.state.id,
        {
          nome: this.state.nome,
        }
      );

      toast.success("Categoria atualizada com sucesso");
      this.buscarCategorias();
      this.handleClose();
    }
  }

  reset = () => {
    this.setState({ id: 0, nome: "" });
    this.abrirModal();
  };

  handleClose = () => {
    this.setState({ modalAberto: false });
  };

  abrirModal = () => {
    this.setState({ modalAberto: true });
  };

  render() {
    return (
      <>
        <Header />;
        <Modal
          show={this.state.modalAberto}
          onHide={this.handleClose}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Categoria</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.id}
                  readOnly="+true"
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Categoria</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o nome da categoria"
                  value={this.state.nome}
                  onChange={(e) => this.atualizarCampo(e)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Fechar
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={() => this.submit()}
            >
              Salvar
            </Button>
          </Modal.Footer>
        </Modal>
        <Button
          div
          className="d-grid gap-3"
          variant="warning"
          type="submit"
          onClick={() => this.reset()}
        >
          Novo
        </Button>
        <br />
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
                  <Button
                    variant="info"
                    onClick={() => this.carregarCategoria(categoria.id)}
                  >
                    Atualizar
                  </Button>{" "}
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
      </>
    );
  }
}

export default Categoria;

export const getServerSideProps = canSSAuth(async (ctx) => {
  return {
    props: {},
  };
});
