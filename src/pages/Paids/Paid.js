import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import $ from 'jquery';
import ButtonDefault from '../../components/Button/ButtonDefault';
import SimpleText from '../../components/SimpleText/SimpleText';
import SimpleLink from '../../components/SimpleLink/SimpleLink';
import Menu from '../../components/Menu/Menu';
import carregando from '../../images/loading.svg';
import './Paid.css';

class Paid extends Component {
  constructor(props){
    super(props)
  }

  render() {

    return (
      <div className="Paid">
          <Menu/>
      </div>
    );
  }
}

export default Paid;
