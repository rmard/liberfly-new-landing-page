import React from 'react';
import InputMask from 'react-input-mask';
import queryString from 'query-string';
import {Autocomplete} from 'react-materialize';

export default class Form extends React.Component {
  componentDidMount() {
    document.getElementById('name').focus();
  }
  state = {
    ciaoutra: false,
    loading: false,
    success: false,
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({loading: true});
    let formdata = new FormData();
    if(queryString.parse(window.location.search).a!==undefined)
      formdata.append('a', queryString.parse(window.location.search).a);
    //nome email telefone relato assunto
    formdata.append('origem', 'lp');
    formdata.append('nome', document.getElementById('name').value);
    formdata.append('telefone', document.getElementById('tel').value);
    formdata.append('email', document.getElementById('email').value);
    formdata.append('relato', 'Cia: '+ (document.getElementById('cia') ? document.getElementById('cia').value : document.getElementById('ciaoutra').value));
    formdata.append('assunto', document.getElementById('issue').value);
    fetch("https://sistema.liberfly.com.br/casos/addreclamacaosite.json", {
      method: "POST",
      body: formdata
    })
    .then(res=>{
      this.setState({loading: false});
      if(res.status===200) {
        res.json().then(data=>{
          console.log(data.caso_id);
          console.log(data.caso_token);
          this.setState({success: true});
          console.log("Reclamação enviada com sucesso! Em breve entraremos em contato.");
          //this.props.closeModal();          
          this.props.goToStepTwo(data.caso_id, data.caso_token);          
        })
      }
      else {
        alert("Ocorreu um erro ao enviar o formulário. Pode tentar novamente, por favor?");
      }
    })
    .catch((res)=>{
      this.setState({loading: false});
      alert("Ocorreu um erro ao enviar o formulário. Por favor tente novamente.");
    })
  }
  handlelistaAutoComplete(){
    let listaEmpresasNova = {};
    let listaEmpresas = {};
    fetch('https://sistema.liberfly.com.br/empresas/lista.json',{ method: "GET"})
      .then(response => response.json())
      .then(data => listaEmpresas);

    for (let i = 0; i < listaEmpresas.lista_empresas.length; i++) {
      listaEmpresasNova = Object.assign({}, listaEmpresasNova, {
        [listaEmpresas.lista_empresas[i]]: null
      });
    }
    return listaEmpresasNova;
  } 
  render() {
    return (
      <form onSubmit={this.handleSubmit} className={(this.state.loading)?'loadingform':''}>
        {(this.state.loading) &&
          <div className='loading'>
            <div className='ball'></div>
            <div className='ball'></div>
            <div className='ball'></div>
          </div>
        }
        <div className='form-inner'>
          <h2>FAÇA SUA<br/>RECLAMAÇÃO</h2>
          <div className='row'>
            <div className='col-12'>
              <label>Nome Completo</label>
              <input type='text' id='name' required/>
            </div>
            <div className='col-12'>
              <label>Telefone</label>
              <InputMask 
                placeholder='(DDD) ________'
                minLength='13'
                mask='(99) 999999999' maskChar=' ' type='tel' id='tel' required/>
            </div>
            <div className='col-12'>
              <label>Email</label>
              <input type='email' id='email' required/>
            </div> 
            <div className='col-6'>
              <label>Problema</label>
              <select id='issue'>
                <option>Atraso de voo</option>
                <option>Cancelamento de voo</option>
                <option>Overbooking</option>
                <option>Problemas com bagagem</option>
                <option>Outro</option>
              </select>
            </div>  
            <div className='col-6'>
              <label>Companhia Aérea</label>
              Autocomplete id='cia'
                  data={
                    this.handlelistaAutoComplete()
                  }
                />
            </div>
          </div> 
        </div>
        <div className='center-align'>
          <button className='submit'>{this.state.loading?'ENVIANDO...':'ENVIAR RECLAMAÇÃO'}</button>  
          <br/>
          <img className='form-logo' alt='LIBERFLY' src='./logo-liberfly.png' />                             
        </div>
      </form>
    )
  }
}
