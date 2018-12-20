import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <div className='bgs'>
          <img className='bg-cloud-1' src='./228360378035212.png'/>
          <img className='bg-cloud-2' src='./Clouds-PNG-HD-1024x576.png'/>
          <img className='bg-plane' src='./Modern-Plane-PNG-Free-Download.png'/>
        </div>
        <div className='app'>
          <div className='nav'>
            <a href="https://liberfly.com.br/">QUEM SOMOS</a>
            <span>RECLAMAÇÃO</span>
            <a href="https://liberfly.com.br/">DICAS DE VIAGEM</a>
          </div>
          <div className='around'>
            <img src='./around.svg'/>
          </div>
          <h1>PROBLEMAS<br/>COM SEU VÔO?</h1>
          <p>Nossa equipe é <strong>especializada</strong> e<br/>está pronta para te ajudar.</p>
          <div className='center-align'>
            <button>FAÇA SUA RECLAMAÇÃO</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
