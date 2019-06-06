import React, {Component} from 'react';
import { slide as Menu } from 'react-burger-menu';
import SimpleText from '../SimpleText/SimpleText';
import PubSub from 'pubsub-js';
import $ from 'jquery';

class SideBar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { 
      value: ''
    }
    }

    
componentWillMount(){
    let valueSum = 0;
    $.ajax({
      url: "https://api-despesas.herokuapp.com/despesas",
      dataType: "json",
      success:function(resposta){
        resposta.forEach(item => 
          {
            if (item.status === 'cadastrada'){
              valueSum = parseFloat(item.value) + valueSum;
              return valueSum;
            }
        });
        this.setState({value:valueSum.toFixed(2).toString().replace(".", ",")});
      }.bind(this)
    })
}

componentDidMount(){


  PubSub.subscribe('atualizaResposta', (topico,objeto) => {
    let valueSum = 0;
    objeto.forEach(item => 
      {
        if (item.status === 'cadastrada'){
          valueSum = parseFloat(item.value) + valueSum;
        }       
    });
    this.setState({value:valueSum.toFixed(2).toString().replace(".", ",")}); 
  });

  }

render(){

  var date =  new Date(). getMonth(); //Current Date.
  var meses = ["Janeiro", "Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]  
  
  return (    
    <Menu>
        <SimpleText className="homeStatusTitle">Resumo de <b>Despesas</b> do Mês de <b>{meses[date]}</b>:</SimpleText>
        <SimpleText className="homeStatus">Saldo de <b>Despesas</b> que ainda não estão vencidas ({meses[date]}):</SimpleText>
        <SimpleText className="homeStatusValorEmDia"><b>{`R$ ${this.state.value}`}</b></SimpleText>
        <SimpleText className="homeStatus">Saldo de <b>Despesas</b> vencidas do mês atual:</SimpleText>
        <SimpleText className="homeStatusValorVencidas"><b>{`R$ ${this.state.value}`}</b></SimpleText>
        <SimpleText className="homeStatus">Saldo de <b>Despesas</b> vencidas acumuladas dos meses anteriores:</SimpleText>
        <SimpleText className="homeStatusValorVencidas"><b>{`R$ ${this.state.value}`}</b></SimpleText>
   
    </Menu>
  );
}
}

export default SideBar;