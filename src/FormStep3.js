import React from 'react';

export default class Form extends React.Component {
  componentDidMount() {
    //document.getElementById('relato').focus();
  }
  state = {
    loading: false,
    success: false,
    docType: '',
    docSent: [false,false,false],
  }

  selectFile = (arg) => {
    this.setState({docType: arg});
    //arg é o tipo do arquivo
    document.getElementById("file").click();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({loading: true});
    let docType;
    switch(this.state.docType) {
      case 0:
        docType = 'docpessoal';
        break;
      case 1:
        docType = 'compresidencia';
        break;
      case 2:
        docType = 'passagem';
        break;
      default:
        docType = 'outro';
        break;
    }
    //alert(docType);
    
    // this.setState({docSent: docSent});
    // this.setState({loading: false});

    
    let formdata = new FormData();
    formdata.append('token', this.props.caso_token);
    formdata.append('field', 'arquivo');
    formdata.append('tipoarquivo', docType);
    formdata.append('file', document.getElementById('file').files[0]);
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
        var docSent = this.state.docSent;
        docSent[this.state.docType] = true;
        this.setState({docSent: docSent});
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
          <input type='file' id='file' onChange={this.handleSubmit}/>
          <h2>ENVIE SEUS<br/>DOCUMENTOS</h2>
          <div className='row'>
            <div className='col-4 center'>
              <div className={`icon-doc doc1 ${this.state.docSent[0]?'green':''}`}>
              </div><br/>
              <div className='icon-doc-label'>
                Documento com foto
              </div><br/>
              <button className={`submit doc ${this.state.docSent[0]?'green':''}`}
                type='button' 
                onClick={()=>{this.selectFile(0)}}
              >
                {this.state.docSent[0]?'ENVIADO':'ENVIAR'}
              </button>
            </div>
            <div className='col-4 center'>
              <div className={`icon-doc doc2 ${this.state.docSent[1]?'green':''}`}>
              </div><br/>
              <div className='icon-doc-label'>
                Comprovante de residência
              </div><br/>
              <button className={`submit doc ${this.state.docSent[1]?'green':''}`}
                type='button' 
                onClick={()=>{this.selectFile(1)}}
              >
                {this.state.docSent[1]?'ENVIADO':'ENVIAR'}
              </button>
            </div>
            <div className='col-4 center'>
              <div className={`icon-doc doc3 ${this.state.docSent[2]?'green':''}`}>
              </div><br/>
              <div className='icon-doc-label'>
                Passagem ou E-Ticket
              </div><br/>
              <button className={`submit doc ${this.state.docSent[2]?'green':''}`}
                type='button' 
                onClick={()=>{this.selectFile(2)}}
              >
                {this.state.docSent[2]?'ENVIADO':'ENVIAR'}
              </button>
            </div>                        
          </div> 
        </div>
        <div className='center-align'>
          <img className='form-logo' alt='LIBERFLY' src='./logo-liberfly.png' />                             
        </div>
      </form>
    )
  }
}