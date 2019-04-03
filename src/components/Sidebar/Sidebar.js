import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import SimpleText from '../SimpleText/SimpleText';

export default props => {
  var date =  new Date(). getMonth(); //Current Date.
  var meses = ["Janeiro", "Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]
  return (
    <Menu>
        <SimpleText className="homeStatusTitle">Resumo de <b>Despesas</b> do Mês de <b>{meses[date]}</b>:</SimpleText>
        <SimpleText className="homeStatus">Saldo de <b>Despesas</b> que ainda não estão vencidas ({meses[date]}):</SimpleText>
        <SimpleText className="homeStatusValorEmDia"><b>R$ 00,00</b></SimpleText>
        <SimpleText className="homeStatus">Saldo de <b>Despesas</b> vencidas do mês atual:</SimpleText>
        <SimpleText className="homeStatusValorVencidas"><b>R$ 00,00</b></SimpleText>
        <SimpleText className="homeStatus">Saldo de <b>Despesas</b> vencidas acumuladas dos meses anteriores:</SimpleText>
        <SimpleText className="homeStatusValorVencidas"><b>R$ 00,00</b></SimpleText>
   
    </Menu>
  );
};