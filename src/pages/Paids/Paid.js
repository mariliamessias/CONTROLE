import React, { Component } from 'react';
import SideBar from '../../components/Sidebar/Sidebar';
import Table from 'react-bootstrap/Table';
import excluir from '../../images/delete.png';
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

    this.state = {
      despesas: [] 
    }
  }

  componentDidMount(){

    $.ajax({
      url: "https://api-despesas.herokuapp.com/despesas",
      dataType: "json",
      success:function(resposta){
        const result = resposta.filter(item => 
        {
          if (item.status === 'paga'){
            return item;
          }
        });

        result.sort(function(a,b) { 
          return new Date(b.dateVencto).getTime() - new Date(a.dateVencto).getTime() 
        });

        this.setState({
          despesas:result,
        });
      }.bind(this)
    })

  } 

  render() {

    return (
      <div className="Paid">
          <SideBar />
          <Menu/>
          <Table striped bordered hover className="tabela">
                    <thead>
                        <tr>
                            <th>Despesa</th>
                            <th>Lontroso</th>
                            <th>Data de Vencimento</th>
                            <th>Valor</th>
                            <th>Data do Pagamento</th>
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
                                                 <td></td>
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
      </div>
    );
  }
}

export default Paid;
