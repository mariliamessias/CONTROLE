import React, { Component } from 'react';
import SideBar from '../../components/Sidebar/Sidebar';
import ButtonDefault from '../../components/Button/ButtonDefault';
import { Collapse, CardBody, Card } from 'reactstrap';
import Table from 'react-bootstrap/Table';
import excluir from '../../images/delete.png';
import PubSub from 'pubsub-js';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import SimpleText from '../../components/SimpleText/SimpleText';
import Modal from 'react-bootstrap/Modal';
import $ from 'jquery';
import Menu from '../../components/Menu/Menu';
import './Paid.css';

class Paid extends Component {
  constructor(props) {
    super(props)

    this.handleShowSair = this.handleShowSair.bind(this);
    this.handleCloseSair = this.handleCloseSair.bind(this);
    this.toggle = this.toggle.bind(this);

    this.state = {
      despesas: [],
      showSair: false,
      collapse: false
    }
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  handleShowSair() {
    this.setState({ showSair: true })
  }

  handleCloseSair() {
    this.setState({ showSair: false })
  }

  componentDidMount() {

    $.ajax({
      url: "https://api-despesas.herokuapp.com/despesas",
      dataType: "json",
      success: function (resposta) {
        const result = resposta.filter(item => {
          if (item.status === 'paga') {
            return item;
          }
        });

        result.sort(function (a, b) {
          return new Date(b.dateVencto).getTime() - new Date(a.dateVencto).getTime()
        });

        this.setState({
          despesas: result,
        });
      }.bind(this)
    })

    PubSub.subscribe('sairModal', (topico, objeto) => {
      this.handleShowSair();
    });
  }

  render() {
    return (
      <div className="Paid">
        <Modal show={this.state.showSair} onHide={this.handleCloseSair}>
          <Modal.Header closeButton>
            <Modal.Title>Oh no!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SimpleText>Tem certeza que deseja sair?</SimpleText>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseSair}>
              Cancelar
          </Button>
            <Button>
              <Link to="/" className="Menu-items-btn-sair">Sair</Link>
            </Button>
          </Modal.Footer>
        </Modal>
        <SideBar />
        <Menu />
        <div className="Paid-container-toggle">
          <ButtonDefault className="buttonNewUser" color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Mostrar Despesas Pagas</ButtonDefault>
          <Collapse isOpen={this.state.collapse}>
            <Card>
              <CardBody>
                <Table striped bordered hover className="tabela">
                  <thead>
                    <tr>
                      <th>Despesa</th>
                      <th>Usuário</th>
                      <th>Data de Vencimento</th>
                      <th>Valor</th>
                      <th>Operacao</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
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
                                  <button className="btn btn-danger"><img className="iconOperations" src={excluir} /></button>
                                </div>
                              </td>
                            </tr>
                          )
                        }

                      }))
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Collapse>
        </div>


      </div>
    );
  }
}

export default Paid;
