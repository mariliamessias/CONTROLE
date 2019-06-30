import React, { Component } from 'react';
import Menu from '../../components/Menu/Menu';
import Content from '../../components/Content/Content';
import SideBar from '../../components/Sidebar/Sidebar';
import {Link, Redirect} from 'react-router-dom';
import $ from 'jquery';

import './Home.css'
class Home extends Component {
    constructor(props, context){
      super(props, context)
      this.validaPagina = this.validaPagina.bind(this);
      this.getResult = this.getResult.bind(this);
    }

getResult() {
  return $.ajax({
        url: "https://api-sky.herokuapp.com/api/user/id/" + this.props.location.state.id,
        type: 'GET',
        async: false,
        dataType: "json",
        contentType: 'application/json',
        beforeSend : ( xhr ) => {
          xhr.setRequestHeader( 'Authorization', `Bearer ${this.props.location.state.token}` );
        },
       error: function(resposta){
          return resposta;
        }
      })
}

validaPagina(){

  if (this.props.location.state !== undefined){
      const result = this.getResult();
      
     if (result.status === 200) {
          return <div>

          <Menu state={{
            id: result.responseJSON.id,
            nome: result.responseJSON.nome,
            email: result.responseJSON.email
          }}/> 
          <Content/>

          </div>

      }else {
        return <Redirect to={{
          pathname:'/',
        }}/>  
      } 
  }else {
    return <Redirect to={{
      pathname:'/',
    }}/>  
  }
}

  render() {
      return (
      <div id="App">
        <SideBar />
        <div id="page-wrap">
        {this.validaPagina()}
        </div>
      </div>
      );

    }
}  
  export default Home;