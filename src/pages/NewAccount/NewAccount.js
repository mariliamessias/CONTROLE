import React, { Component } from 'react';
import Form from '../../components/Form/Form';
import SimpleText from '../../components/SimpleText/SimpleText';
import './NewAccount.css';

class NewAccount extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div className="newAccount">
        <div className="newAccount-content">

          <SimpleText className="newAccount-content-title">Crie sua conta!</SimpleText>
          <SimpleText className="newAccount-content-subtitle">Para você ter acesso ao sistema, precisamos de alguns dados seus para um simples cadastro. Para isso, preencha os campos abaixo conforme solicitado:</SimpleText>
          <Form></Form>
        </div>

      </div>
    );
  }
}

export default NewAccount;
