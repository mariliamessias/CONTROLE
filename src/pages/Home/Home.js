import React, { Component } from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import Menu from '../../components/Menu/Menu';
import Content from '../../components/Content/Content';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import SideBar from '../../components/Sidebar/Sidebar';
import { Link, Redirect } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import $ from 'jquery';

import add from '../../images/add.svg';
import despesa from '../../images/sair_dinheiro.png';
import receita from '../../images/entrar_dinheiro.png';

import './Home.css'
class Home extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            teste: ["Ana", "Joana", "Hug"]
        }
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
            ]
        };

        return (
            <div id="App">
                <SideBar />
                <div id="page-wrap" > { /* {this.validaPagina()} */}
                    <Menu />
                    <div className="container-cards">
                        <div className="container-cards-list">
                            {(this.state.teste.map((item) => {
                                return (
                                    <Card className="container-card">
                                        <div className="container-card-header">
                                            <p className="container-card-title">{item}</p>
                                            <img src={add} className="container-card-header-button"></img>
                                        </div>
                                        <CardBody>
                                            <div className="container-card-body">
                                                <Line data={data} />
                                            </div>
                                            <div className="container-card-body">
                                                <div className="container-card-body-bottom">
                                                    <div className="container-card-body-left" id="UncontrolledTooltipExample">
                                                            <p>R$ 100,00</p>
                                                            <UncontrolledTooltip placement="right" target="UncontrolledTooltipExample">
                                                                Hello world!
                                                            </UncontrolledTooltip>
                                                        <img src={despesa} />
                                                    </div>
                                                    <div className="container-card-body-right">
                                                        <img src={receita} />
                                                        <div>
                                                            R$ 100,00
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText> */}
                                            {/* <Button>Button</Button> */}
                                        </CardBody>
                                    </Card>
                                )
                            }))}
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}
export default Home;