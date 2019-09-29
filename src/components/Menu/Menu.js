import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import sair from '../../images/EXIT.png';
import { Link, Redirect } from 'react-router-dom';
import { Router } from 'react-router';
import './Menu.css';
class Menu extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      redirect: false,
    }
    this.showModal = this.showModal.bind(this);
    this.sairModal = this.sairModal.bind(this);
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: '/home',
      }} />
    }
  }


  showModal(item) {
    if (window.location.pathname == '/home') {

      PubSub.publish("mostrarModal", item);
    }
    else {
      this.setState({
        redirect: true
      })
    }
  }

  sairModal(item) {
    PubSub.publish("sairModal", item);
  }

  render() {
    
    return (
      <div className="Menu">
          <ul className="Menu-items">
            <p className="Menu-items-userName">{/*this.props.state.nome*/}</p>
            {this.renderRedirect()}
            {/* <li ><Link to="/pagas" className="Menu-items-btn-sair">Consultar Despesas Pagas</Link></li> */}
            {/* <li onClick={this.showModal}>Cadastrar Despesa</li> */}
            <li><img className="Menu-items-sair" onClick={this.sairModal} src={sair}/></li>
          </ul>
      </div>
    );
  }
}

export default Menu;