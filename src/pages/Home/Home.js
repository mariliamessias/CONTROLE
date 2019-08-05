import React, { Component } from 'react';
import Menu from '../../components/Menu/Menu';
import Content from '../../components/Content/Content';
import SideBar from '../../components/Sidebar/Sidebar';
import Button from 'react-bootstrap/Button';
import { Collapse, CardBody, Card } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import $ from 'jquery';

import './Home.css'
class Home extends Component {
    constructor(props, context) {
        super(props, context)

        this.toggle = this.toggle.bind(this);
        this.toggleGraph = this.toggleGraph.bind(this);
        this.toggleSeveral = this.toggleSeveral.bind(this);
        this.validaPagina = this.validaPagina.bind(this);
        this.getResult = this.getResult.bind(this);
        this.state = {
            despesas: [],
            collapse: false,
            collapseTwo: false,
            collapseThree: false,
            buttonText: false,
            buttonTextTwo: false,
            buttonTextThree: false,
            despesasCoita: [],
            despesasMol: []
        }
    }

    toggle() {
        this.setState(state => ({
            collapse: !state.collapse,
            buttonText: !state.buttonText
        }));
    }

    toggleGraph() {
        let despesasCoita = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let despesasMol = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const today = new Date();
        const year = today.getFullYear();

        this.state.despesas.forEach(item => {
            const date = new Date(item.dateVencto);
            const monthItem = date.getUTCMonth() + 1;
            const yearItem = date.getFullYear();
            if (item.status === 'cadastrada' && year === yearItem) {
                if (item.usuario === 'coita') {
                    despesasCoita[monthItem - 1] = parseFloat(item.value) + despesasCoita[monthItem - 1];
                } else {
                    despesasMol[monthItem - 1] = parseFloat(item.value) + despesasMol[monthItem - 1];
                }
            }

        });

        this.setState(state => ({
            collapseTwo: !state.collapseTwo,
            buttonTextTwo: !state.buttonTextTwo,
            despesasCoita: despesasCoita,
            despesasMol: despesasMol
        }));
    }

    toggleSeveral() {
        this.setState(state => ({
            collapseThree: !state.collapseThree,
            buttonTextThree: !state.buttonTextThree
        }));
    }

    getResult() {
        return $.ajax({
            url: "https://api-sky.herokuapp.com/api/user/id/" + this.props.location.state.id,
            type: 'GET',
            async: false,
            dataType: "json",
            contentType: 'application/json',
            beforeSend: (xhr) => {
                xhr.setRequestHeader('Authorization', `Bearer ${this.props.location.state.token}`);
            },
            error: function (resposta) {
                return resposta;
            }
        })
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
                    return new Date(b.dateVencto).getTime() - new Date(a.dateVencto).getTime()
                });
                console.log(result);
                this.setState({
                    despesas: result,
                });
            }.bind(this)
        })
    }

    validaPagina() {

        // if (this.props.location.state !== undefined){
        //     const result = this.getResult();

        //    if (result.status === 200) {
        return <div>

            <Menu state={
                {
                    // id: result.responseJSON.id,
                    // nome: result.responseJSON.nome,
                    // email: result.responseJSON.email
                }
            } />  <Content />

        </div>

        //     }else {
        //       return <Redirect to={{
        //         pathname:'/',
        //       }}/>  
        //     } 
        // }else {
        //   return <Redirect to={{
        //     pathname:'/',
        //   }}/>  
        // }
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
                data: this.state.despesasCoita
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
                data: this.state.despesasMol
              },
              
            ]
          };
        return (
            <div id="App">
                <SideBar />
                <div id="page-wrap" > { /* {this.validaPagina()} */}
                    <Menu />
                    <div className="Home-container-full">
                        <div className="Home-container-toggle">
                            <div className="Home-container-one">
                                <Button
                                    className="Home-container-button"
                                    onClick={this.toggle}
                                >
                                    {this.state.buttonText == false ? 'Mostrar Despesas' : 'Ocultar Despesas'}
                                </Button>
                            </div>
                            <div className="Home-container-two">
                                <Collapse isOpen={this.state.collapse}>
                                    <Card>
                                        <CardBody>
                                            <Content />
                                        </CardBody>
                                    </Card>
                                </Collapse>
                            </div>
                            <div className="Home-container-one">
                                <Button
                                    className="Home-container-button"
                                    onClick={this.toggleGraph}
                                >
                                    {this.state.buttonTextTwo == false ? 'Mostrar Gráfico de Despesas' : 'Ocultar Gráfico de Despesas'}
                                </Button>
                            </div>
                            <div className="Home-container-two">
                                <Collapse isOpen={this.state.collapseTwo}>
                                    <Card>
                                        <CardBody>
                                            <Line data={data} />
                                        </CardBody>
                                    </Card>
                                </Collapse>
                            </div>
                            <div className="Home-container-one">
                                <Button
                                    className="Home-container-button"
                                    onClick={this.toggleSeveral}
                                >
                                    {this.state.buttonTextThree == false ? 'Mostrar Diversos' : 'Ocultar Diversos'}
                                </Button>
                            </div>
                            <div className="Home-container-two">
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


                </div> </div>
        );

    }
}
export default Home;