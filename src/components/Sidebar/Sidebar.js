import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import SimpleText from '../SimpleText/SimpleText';
import PubSub from 'pubsub-js';
import $ from 'jquery';
import './Sidebar.css';

class SideBar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      valueTotal: '',
      valueCoita: '',
      valueMol: ''
    }

    this.sairModal = this.sairModal.bind(this);
  }

  sairModal(item) {
    PubSub.publish("sairModal", item);
  }

  componentWillMount() {
    let despesaCoita = 0;
    let despesaMol = 0;
    const today = new Date();
    const month = today.getMonth() + 1;
    $.ajax({
      url: "https://api-despesas.herokuapp.com/despesas",
      dataType: "json",
      success: function (resposta) {
        resposta.forEach(item => {
          const date = new Date(item.dateVencto);
          const monthItem = date.getUTCMonth() + 1;
          if (item.status === 'cadastrada' && monthItem === month) {
            if (item.usuario === 'coita') {
              despesaCoita = parseFloat(item.value) + despesaCoita;
            } else {
              despesaMol = parseFloat(item.value) + despesaMol;
            }
          }
        });

        this.setState({
          valueMol: despesaMol.toLocaleString('pt-BR'),
          valueCoita: despesaCoita.toLocaleString('pt-BR'),
          valueTotal: (despesaCoita + despesaMol).toLocaleString('pt-BR')
        });
      }.bind(this)
    })
  }

  componentDidMount() {

    PubSub.subscribe('atualizaResposta', (topico, objeto) => {
      let despesaCoita = 0;
      let despesaMol = 0;
      const today = new Date();

      objeto.forEach(item => {
        const date = new Date(item.dateVencto);
        const monthItem = date.getUTCMonth() + 1;
        if (item.status === 'cadastrada' && monthItem === today.getMonth() + 1) {
          if (item.usuario === 'coita') {
            despesaCoita = parseFloat(item.value) + despesaCoita;
          } else {
            despesaMol = parseFloat(item.value) + despesaMol;
          }
        }
      });
      this.setState({
        valueMol: despesaMol.toLocaleString('pt-BR'),
        valueCoita: despesaCoita.toLocaleString('pt-BR'),
        valueTotal: (despesaCoita + despesaMol).toLocaleString('pt-BR')
      });
    });

  }

  render() {

    var date = new Date().getMonth(); //Current Date.
    var meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

    return (
      <Menu>
        <div className="profile-info">
          <img src={this.props.profilePicture} className="profile-picture"></img>
          <div className="sidebar-title">
            <p>{this.props.userName}</p>
          </div>
        </div>
        <Link to="/home" className="sidebar-button">Visão Geral</Link>
        <Link to="/aberto" className="sidebar-button">Despesas em Aberto</Link>
        <Link to="/pagas" className="sidebar-button">Despesas Pagas</Link>
        <Link to="/pagas" className="sidebar-button">Configurações de Conta</Link>
        {/* <button className="sidebar-button" onClick={this.sairModal} >Sair</button> */}

        {/* <SimpleText className="homeStatusTitle">Resumo de <b>Despesas</b> do Mês de <b>{meses[date]}</b>:</SimpleText>
        <SimpleText className="homeStatus">Saldo de <b>Despesas</b> da Coita:</SimpleText>
        <SimpleText className="homeStatusValorEmDia"><b>{`R$ ${this.state.valueCoita}`}</b></SimpleText>
        <SimpleText className="homeStatus">Saldo de <b>Despesas</b> do Mol:</SimpleText>
        <SimpleText className="homeStatusValorVencidas"><b>{`R$ ${this.state.valueMol}`}</b></SimpleText>
        <SimpleText className="homeStatus">Saldo de <b>Despesas</b> das duas lontras:</SimpleText>
        <SimpleText className="homeStatusValorVencidas"><b>{`R$ ${this.state.valueTotal}`}</b></SimpleText> */}
      </Menu>
    );
  }
}

export default SideBar;