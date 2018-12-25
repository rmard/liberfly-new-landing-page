import React, { Component } from 'react';
import './App.css';
import './App-mobile.css';
import './simple-grid.min.css';

class Form extends Component {
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
    .then((res)=>{
      this.setState({loading: false});
      if(res.status===200) {
        this.setState({success: true});
        alert("Reclamação enviada com sucesso! Em breve entraremos em contato.");
        this.props.closeModal();
      }
      else
        alert("Ocorreu um erro ao enviar o formulário. Pode tentar novamente, por favor?");
    })
    .catch((res)=>{
      this.setState({loading: false});
    })
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
              <input type='tel' id='tel' required/>
            </div>
            <div className='col-12'>
              <label>Email</label>
              <input type='email' id='email' required/>
            </div> 
            <div className='col-6'>
              <label>Problema</label>
              <select id='issue'>
                <option>Atraso de vôo</option>
                <option>Cancelamento de vôo</option>
                <option>Overbooking</option>
                <option>Problemas com bagagem</option>
                <option>Outro</option>
              </select>
            </div>  
            <div className='col-6'>
              <label>Companhia</label>
              {this.state.ciaoutra ? 
                <input type='text' id='ciaoutra' required/>
              :
                <select id='cia' onChange={(e)=>{
                  if(e.target.value==='Outra') {
                    this.setState({ciaoutra: true});
                    setTimeout(()=>document.getElementById('ciaoutra').focus(),500);
                  }
                }}>
                  <option>Avianca</option>
                  <option>Azul</option>
                  <option>GOL</option>
                  <option>LATAM</option>
                  <option>Outra</option>
                </select>
              }
            </div>
          </div> 
        </div>
        <div className='center-align'>
          <button className='submit'>{this.state.loading?'ENVIANDO...':'ENVIAR RECLAMAÇÃO'}</button>  
          <br/>
          <img className='form-logo' src='./logo-liberfly.png' />                             
        </div>
      </form>
    )
  }
}

class App extends Component {
  state = {
    form: false,
  }
  render() {
    return (
      <div>
        <div className='bgs'>
          <img className='bg-cloud-1' src='./228360378035212.png'/>
          <img className='bg-cloud-2' src='./Clouds-PNG-HD-1024x576.png'/>
          <img className='bg-plane' src='./Modern-Plane-PNG-Free-Download.png'/>
        </div>
        <div className='app'>
          {this.state.form === true && 
            <Form closeModal={()=>this.setState({form: false})}/>
          }
          <div className='nav'>
            
            <span>RECLAMAÇÃO</span>
            
            <a className='social-icon' target='_blank' href='//instagram.com/liberflybr' title='Instagram'>
              <img className='social-icon' src='./instagram.png'/>
            </a>
          </div>
          <div className='around'>
            <img src='./around.png'/>
          </div>
          <h1>PROBLEMAS<br/>COM SEU VOO?</h1>
          <p>Nossa equipe é <strong>especializada</strong> e<br/>está pronta para te ajudar.</p>
          <div className='center-align'>
            <button onClick={()=>this.setState({form: true})}>FAÇA SUA RECLAMAÇÃO</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
