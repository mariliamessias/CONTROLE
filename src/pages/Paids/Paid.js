import React, { Component } from 'react';
import SideBar from '../../components/Sidebar/Sidebar';
import { Line } from 'react-chartjs-2';
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
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  constructor(props) {
    super(props)

    this.handleShowSair = this.handleShowSair.bind(this);
    this.handleCloseSair = this.handleCloseSair.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleGraph = this.toggleGraph.bind(this);
    this.toggleSeveral = this.toggleSeveral.bind(this);

    this.state = {
      despesas: [],
      showSair: false,
      collapse: false,
      collapseTwo: false,
      collapseThree: false,
      buttonText: false,
      buttonTextTwo: false,
      buttonTextThree: false,
      despesasPagasCoita: [],
      despesasPagasMol: []
    }
  }

  toggle() {
    this.setState(state => ({
      collapse: !state.collapse,
      buttonText: !state.buttonText
    }));
  }

  toggleGraph() {
    let despesasCoita = [0,0,0,0,0,0,0,0,0,0,0,0];
    let despesasMol = [0,0,0,0,0,0,0,0,0,0,0,0];
    const today = new Date();
    const year = today.getFullYear();

    this.state.despesas.forEach(item => {
      const date = new Date(item.dateVencto);
      const monthItem = date.getUTCMonth() + 1;
      const yearItem = date.getFullYear();
      if (item.status === 'paga' && year === yearItem) {
        if (item.usuario === 'coita') {
            despesasCoita[monthItem -1] = parseFloat(item.value) + despesasCoita[monthItem -1]; 
        } else{
          despesasMol[monthItem -1] = parseFloat(item.value) + despesasMol[monthItem -1]; 
        }
      }

    });

    this.setState(state => ({
      collapseTwo: !state.collapseTwo,
      buttonTextTwo: !state.buttonTextTwo,
      despesasPagasCoita: despesasCoita,
      despesasPagasMol: despesasMol
    }));
  }

  toggleSeveral() {
    this.setState(state => ({
      collapseThree: !state.collapseThree,
      buttonTextThree: !state.buttonTextThree
    }));
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
    const data = {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      datasets: [
        {
          label: 'Coita',
          fillColor: 'rgba(220,220,220,0.2)',
          strokeColor: 'rgba(150, 100, 149, 1)',
          pointColor: 'rgba(220,220,220,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          borderColor: 'rgba(236, 154, 2, 1)',
          data: this.state.despesasPagasCoita
        },
        {
          label: 'Mol',
          fillColor: 'rgba(151,187,205,0.2)',
          borderColor: 'rgba(150, 56, 149, 1)',
          strokeColor: 'rgba(150, 56, 149, 1)',
          pointColor: 'rgba(151,187,205,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(151,187,205,1)',
          data: this.state.despesasPagasMol
        },
        
      ]
    };
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

        <div className="Paid-container-full">
          <div className="Paid-container-toggle">
            <div className="Paid-container-one">
              <Button
                className="Paid-container-button"
                onClick={this.toggle}
              >
                {this.state.buttonText == false ? 'Mostrar Despesas Pagas' : 'Ocultar Despesas Pagas'}
              </Button>
            </div>
            <div className="Paid-container-two">
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
            <div className="Paid-container-one">
              <Button
                className="Paid-container-button"
                onClick={this.toggleGraph}
              >
                {this.state.buttonTextTwo == false ? 'Mostrar Gráfico de Despesas Pagas' : 'Ocultar Gráfico de Despesas Pagas'}
              </Button>
            </div>
            <div className="Paid-container-two">
              <Collapse isOpen={this.state.collapseTwo}>
                <Card>
                  <CardBody>
                  <Line data={data} />
                  </CardBody>
                </Card>
              </Collapse>
            </div>
            <div className="Paid-container-one">
              <Button
                className="Paid-container-button"
                onClick={this.toggleSeveral}
              >
                {this.state.buttonTextThree == false ? 'Mostrar Diversos' : 'Ocultar Diversos'}
              </Button>
            </div>
            <div className="Paid-container-two">
              <Collapse isOpen={this.state.collapseThree}>
                <Card>
                  <CardBody>
                    {}
                  </CardBody>
                </Card>
              </Collapse>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Paid;
