import React from 'react';

export default class Form extends React.Component {
  componentDidMount() {
    document.getElementById('relato').focus();
  }
  state = {
    loading: false,
    success: false,
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({loading: true});
    let formdata = new FormData();
    formdata.append('token', this.props.caso_token);
    formdata.append('field', 'relato');
    formdata.append('value', document.getElementById('relato').value);
    fetch("https://sistema.liberfly.com.br/casos/editreclamacaosite/"+this.props.caso_id+".json", {
      method: "POST",
      body: formdata
    })
    .then((res)=>{
      this.setState({loading: false});
      if(res.status===200) {
        this.setState({success: true});
        // alert("Reclamação enviada com sucesso! Em breve entraremos em contato.");
        // this.props.closeModal();
        this.props.goToStepThree();
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
          <h2>DESCREVA<br/>BREVEMENTE<br/>O OCORRIDO</h2>
          <div className='row'>
            <div className='col-12'>
              <label className='center'>Escreva seu relato abaixo</label>
              <textarea type='text' id='relato' rows='12' required></textarea>
            </div>
          </div> 
        </div>
        <div className='center-align'>
          <button className='submit'>{this.state.loading?'ENVIANDO...':'AVANÇAR'}</button>  
          <br/>
          <img className='form-logo' alt='LIBERFLY' src='./logo-liberfly.png' />                             
        </div>
      </form>
    )
  }
}