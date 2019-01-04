import React, { Component } from 'react';
import Form from './Form';
import FormStep2 from './FormStep2';
import './App.css';
import './App-mobile.css';
import './simple-grid.min.css';

class App extends Component {
  state = {
    step: 0,
    caso_id: false,
    caso_token: false,
  }
  goToStepTwo(id, token) {
    this.setState({step: 2, caso_id: id, caso_token: token});
  }
  render() {
    return (
      <div>
        <div className='bgs'>
          <img className='bg-cloud-1' alt='' src='./228360378035212.png'/>
          <img className='bg-cloud-2' alt='' src='./Clouds-PNG-HD-1024x576.png'/>
          <img className='bg-plane' alt='' src='./Modern-Plane-PNG-Free-Download.png'/>
        </div>
        <div className='app'>
          {this.state.step === 1 && 
            <Form 
              goToStepTwo={(id,t)=>this.goToStepTwo(id,t)}
            />
          }
          {this.state.step === 2 && 
            <FormStep2 
              closeModal={()=>this.setState({step: 0})}
              caso_id={this.state.caso_id}
              caso_token={this.state.caso_token}
            />
          }          
          <div className='nav'>
            
            <span>RECLAMAÇÃO</span>
            
            <a className='social-icon' target='_blank' href='//instagram.com/liberflybr' title='Instagram' rel="noopener noreferrer">
              <img alt='Instagram' className='social-icon' src='./instagram.png'/>
            </a>
          </div>
          <div className='around'>
            <img alt='' src='./around.png'/>
          </div>
          <h1>PROBLEMAS<br/>COM SEU VOO?</h1>
          <p>Nossa equipe é <strong>especializada</strong> e<br/>está pronta para te ajudar.</p>
          <div className='center-align'>
            <button onClick={()=>this.setState({step: 1})}>FAÇA SUA RECLAMAÇÃO</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
