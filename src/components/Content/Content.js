import { Link } from 'react-router-dom';
import $ from 'jquery';
import PubSub from 'pubsub-js';
import check from '../../images/check.png';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputText from '../InputText/InputTex';
import Table from 'react-bootstrap/Table';
import CurrencyInput from 'react-currency-input';
import SimpleText from '../SimpleText/SimpleText';
import excluir from '../../images/delete.png';
import editar from '../../images/change.png';
import carregando from '../../images/loading.svg';
import React from 'react';
import './Content.css';

class Content extends React.Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleShowPagar = this.handleShowPagar.bind(this);
    this.handleShowSair = this.handleShowSair.bind(this);
    this.handleClosePagar = this.handleClosePagar.bind(this);
    this.handleCloseSair = this.handleCloseSair.bind(this);
    this.save = this.save.bind(this);
    this.pagarDespesa = this.pagarDespesa.bind(this);
    this.editarDespesa = this.editarDespesa.bind(this);

    this.state = {
      isLoading: true,
      show: false,
      showModal: false,
      showSair: false,
      showPagar: false,
      cadastrar: false,
      despesas: [],
      item: '',
      fields: {},
      errors: {}
    };

  }
  pagarDespesa() {
    $.ajax({
      url: 'https://api-despesas.herokuapp.com/despesas/' + this.state.item._id,
      contentType: 'application/json',
      type: 'PUT',
      data: JSON.stringify({
        description: this.state.item.description,
        usuario: this.state.item.usuario,
        dateVencto: this.state.item.dateVencto,
        value: this.state.item.value,
        status: 'paga'
      }),
      success: function (resposta) {
        $.ajax({
          url: "https://api-despesas.herokuapp.com/despesas",
          dataType: "json",
          success: function (resposta) {
            const result = resposta.filter(item => {
              if (item.status === 'cadastrada') {
                return item;
              }
            });

            result.sort(function (a, b) {
              return new Date(a.dateVencto).getTime() - new Date(b.dateVencto).getTime()
            });

            this.setState({ despesas: result });
            PubSub.publish("atualizaResposta", result);
            this.handleCloseModal();
          }.bind(this)
        })
        this.handleClosePagar();

      }.bind(this),

      error: function (resposta) {
        console.log(`Mensagem: ${resposta}`);
      }
    })
  }

  excluirDespesa() {
    $.ajax({
      url: 'https://api-despesas.herokuapp.com/despesas/' + this.state.item._id,
      type: 'DELETE',
      success: function (response) {
        $.ajax({
          url: "https://api-despesas.herokuapp.com/despesas",
          dataType: "json",
          success: function (resposta) {
            const result = resposta.filter(item => {
              if (item.status === 'cadastrada') {
                return item;
              }
            });
            result.sort(function (a, b) {
              return new Date(a.dateVencto).getTime() - new Date(b.dateVencto).getTime()
            });
            this.setState({ despesas: result });
            PubSub.publish("atualizaResposta", result);
            this.handleCloseModal();
          }.bind(this)
        })
      }.bind(this),
      error: function (resposta) {
        console.log(`Mensagem: ${resposta}`);
      }
    })
  }

  editarDespesa() {
    $.ajax({
      url: 'https://api-despesas.herokuapp.com/despesas/' + this.state.fields['_id'],
      contentType: 'application/json',
      type: 'PUT',
      data: JSON.stringify({
        description: this.state.fields['description'],
        usuario: this.state.fields['usuario'],
        dateVencto: this.state.fields['dateVencto'],
        value: parseFloat((this.state.fields['value']).split("$")[1]),
        status: 'cadastrada'
      }),
      success: function (resposta) {
        $.ajax({
          url: "https://api-despesas.herokuapp.com/despesas",
          dataType: "json",
          success: function (resposta) {
            const result = resposta.filter(item => {
              if (item.status === 'cadastrada') {
                return item;
              }
            });
            result.sort(function (a, b) {
              return new Date(a.dateVencto).getTime() - new Date(b.dateVencto).getTime()
            });
            this.setState({ despesas: result });
            PubSub.publish("atualizaResposta", result);
            this.handleClose();
          }.bind(this)
        })
      }.bind(this),

      error: function (resposta) {
        console.log(`Mensagem: ${resposta}`);
      }
    })
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow(item) {
    let date = new Date(item.dateVencto);
    let fields = this.state.fields;
    let dateConv = '';
    if (item.description || item.value || item.dateVencto || item.status || item.usuario) {
      if (item.dateVencto) {
        this.setState({ cadastrar: false });
        dateConv = date.getUTCFullYear() + '-' + ('0' + (date.getUTCMonth() + 1)).slice(-2) + '-' + ('0' + date.getUTCDate()).slice(-2);
      }

      fields['_id'] = item._id;
      fields['description'] = item.description;
      fields['value'] = item.value;
      fields['dateVencto'] = dateConv;
      fields['usuario'] = item.usuario;
      fields['status'] = item.status;

      this.setState({ fields, errors: {} });

    } else {
      this.setState({
        cadastrar: true,
        fields: {},
        errors: {}
      })
    };
    this.setState({ show: true });
  }

  handleShowModal(item) {
    this.setState({ item: item, showModal: true });
  }

  handleShowPagar(item) {
    this.setState({ item: item, showPagar: true })
  }

  handleClosePagar(item) {
    this.setState({ showPagar: false })
  }

  handleCloseSair() {
    this.setState({ showSair: false })
  }

  handleShowSair() {
    this.setState({ showSair: true })
  }

  handleCloseModal() {
    this.setState({ showModal: false })
  }
  componentDidMount() {

    $.ajax({
      url: "https://api-despesas.herokuapp.com/despesas",
      dataType: "json",
      success: function (resposta) {
        const result = resposta.filter(item => {
          if (item.status === 'cadastrada') {
            return item;
          }
        });

        result.sort(function (a, b) {
          return new Date(a.dateVencto).getTime() - new Date(b.dateVencto).getTime()
        });

        this.setState({
          despesas: result,
          isLoading: false,
        });
      }.bind(this)
    })

    PubSub.subscribe('mostrarModal', (topico, objeto) => {
      this.handleShow(objeto);
    });

    PubSub.subscribe('sairModal', (topico, objeto) => {
      this.handleShowSair();
    });
  }

  save(cadastrar) {
    if (cadastrar) {
      if (this.state.fields.description != "" && this.state.fields.description != undefined && this.state.fields.dateVencto != "" && this.state.fields.dateVencto != undefined && this.state.fields.value != "" && this.state.fields.value != undefined && this.state.fields.usuario != "" && this.state.fields.usuario != undefined) {
        $.ajax({
          url: 'https://api-despesas.herokuapp.com/despesas',
          contentType: 'application/json',
          dataType: 'json',
          type: 'post',
          data: JSON.stringify({
            description: this.state.fields['description'],
            usuario: this.state.fields['usuario'],
            dateVencto: this.state.fields['dateVencto'],
            value: parseFloat((this.state.fields['value']).split("$")[1]),
            status: 'cadastrada'
          }),
          success: function (resposta) {
            var itensDespesa = this.state.despesas;
            itensDespesa.push(resposta);

            itensDespesa.sort(function (a, b) {
              return new Date(a.dateVencto).getTime() - new Date(b.dateVencto).getTime()
            });

            this.setState({ despesas: itensDespesa, fields: {} });
            this.handleClose();

            PubSub.publish("atualizaResposta", itensDespesa);
          }.bind(this),
          error: function (resposta) {
            console.log(resposta);
          }
        })
      }
    } else {
      if (this.state.fields.description != "" && this.state.fields.description != undefined && this.state.fields.dateVencto != "" && this.state.fields.dateVencto != undefined && this.state.fields.value != "" && this.state.fields.value != undefined && this.state.fields.usuario != "" && this.state.fields.usuario != undefined) {
        this.editarDespesa();
      }
    }
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["description"]) {
      formIsValid = false;
      errors["description"] = "Descrição precisa ser preenchida";
    }

    if (!fields["dateVencto"]) {
      formIsValid = false;
      errors["dateVencto"] = "Data de vencimento precisa ser preenchida";
    }

    if (!fields["value"]) {
      formIsValid = false;
      errors["value"] = "Valor precisa ser preenchido";
    }

    if (!fields["usuario"]) {
      formIsValid = false;
      errors["usuario"] = "Usuário precisa ser selecionado";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  contactSubmit(e) {
    e.preventDefault();
    this.handleValidation();
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    if (field === "value") {
      fields[field] = e;
      this.setState({ fields });
    } else {
      fields[field] = e.target.value;
      this.setState({ fields });
    }

    this.setState((prevState) => ({
      errors: [field, '']
    }));
  }

  render() {
    return (
      <div className="Content">
        <Modal show={this.state.show} onHide={this.handleClose}>
          <form onSubmit={this.contactSubmit.bind(this)}>
            <Modal.Header closeButton>
              <Modal.Title>Despesa</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <fieldset>
                  {/* description */}
                  <SimpleText className="title-form">Descrição da Despesa:</SimpleText>
                  <InputText ref="description" type="text" size="30" placeholder="Ex.Conta de Luz" onChange={this.handleChange.bind(this, "description")} value={this.state.fields["description"] || ''} />
                  <span className="error-modal"style={{ color: "red" }}>{this.state.errors["description"]}</span>
                  <br />
                  {/* dateVencto */}
                  <SimpleText className="title-form">Data de vencimento:</SimpleText>
                  <InputText refs="dateVencto" type="date" size="30" onChange={this.handleChange.bind(this, "dateVencto")} value={this.state.fields["dateVencto"] || ''} />
                  <span className="error-modal" style={{ color: "red" }}>{this.state.errors["dateVencto"]}</span>
                  <br />
                  {/* Value */}
                  <SimpleText className="title-form">Valor da despesa:</SimpleText>
                  <div className="Menu-items-select">
                    <CurrencyInput className="form-control-lg" prefix="R$ " precision="2" decimalSeparator="." thousandSeparator="," onChange={this.handleChange.bind(this, "value")} value={this.state.fields["value"] || ''} />
                  </div>
                  <span className="error-modal" style={{ color: "red" }}>{this.state.errors["value"]}</span>
                  {/* User */}
                  <SimpleText className="title-form">De que Usuário é a conta?</SimpleText>
                  <div className="Menu-items-select">
                    <select className="form-control-lg" type="text" onChange={this.handleChange.bind(this, "usuario")} value={this.state.fields["usuario"] || ''}>
                      <option value="" disabled>Selecione um Usuario</option>
                      <option value="mol">Mol</option>
                      <option value="coita">Coita</option>
                    </select>
                  </div>
                  <span className="error-modal" style={{ color: "red" }}>{this.state.errors["usuario"]}</span>
                </fieldset>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>Cancelar</Button>
              <Button variant="primary" type="submit" onClick={(event) => { this.save(this.state.cadastrar) }}>Salvar</Button>
            </Modal.Footer>
          </form>
        </Modal>

        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Excluir Despesa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SimpleText>Tem certeza que deseja excluir essa despesa?</SimpleText>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>Cancelar</Button>
            <Button variant="primary" onClick={(event) => { this.excluirDespesa() }}>Confirmar</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showPagar} onHide={this.handleClosePagar}>
          <Modal.Header closeButton>
            <Modal.Title>Pagar Despesa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SimpleText>Tem certeza que deseja confirmar o pagamento dessa despesa?</SimpleText>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClosePagar}>Cancelar</Button>
            <Button variant="primary" onClick={(event) => { this.pagarDespesa() }}>Confirmar</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showSair} onHide={this.handleCloseSair}>
          <Modal.Header closeButton>
            <Modal.Title>Oh no!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SimpleText>Tem certeza que deseja sair?</SimpleText>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseSair}>Cancelar</Button>
            <Button>
              <Link to="/" className="Menu-items-btn-sair">Sair</Link>
            </Button>
          </Modal.Footer>
        </Modal>

        <Table striped bordered hover className="tabela">
          <thead>
            <tr>
              <th>Despesa</th>
              <th>Usuário</th>
              <th>Data de Vencimento</th>
              <th>Valor</th>
              <th>Operação</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.isLoading ? (<div className="loadingImg"><img className="home__loading" src={carregando} alt="Carregando" /></div>) :
                (this.state.despesas.map((item) => {
                  if (item !== '' && item !== undefined) {

                    let dateTr = new Date(item.dateVencto);
                    dateTr.setUTCHours(5);
                    let dateCon = '';

                    dateCon = ('0' + dateTr.getUTCDate()).slice(-2) + '/' + ('0' + (dateTr.getMonth() + 1)).slice(-2) + '/' + dateTr.getFullYear();

                    return (
                      <tr key={item._id}>
                        <td>{item.description}</td>
                        <td>{item.usuario}</td>
                        <td>{dateCon}</td>
                        <td>{`R$ ${parseFloat(item.value).toFixed(2)}`}</td>
                        <td className="operacoes">
                          <div className="operacoes">
                            <button className="btn btn-success" onClick={() => this.handleShowPagar(item)}><img className="iconOperations" src={check} /></button>
                            <button className="btn btn-danger" onClick={() => this.handleShowModal(item)}><img className="iconOperations" src={excluir} /></button>
                            <button className="btn btn-info" onClick={() => this.handleShow(item)}><img className="iconOperations" src={editar} /></button>
                          </div>
                        </td>
                      </tr>
                    )
                  }

                }))
            }
          </tbody>

        </Table>
      </div>
    )
  }
}

export default Content;


