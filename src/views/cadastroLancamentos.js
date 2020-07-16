import React from 'react';
import { withRouter } from 'react-router-dom';

import Card from '../components/card';
import FormGroup from '../components/form-group';
import SelectMenu from '../components/selectMenu';

import LancamentoService from '../app/service/lancamentoService';
import { showSuccessMessage, showErrorMessage } from '../components/toastr';
import LocalStorageService from '../app/service/localStorageService';
import currencyFormatter from 'currency-formatter';

class CadastroLancamentos extends React.Component{

    constructor(){
        super();
        this.lancamentoService = new LancamentoService();
    }

    state = {
        id: '',
        descricao: '',
        mes: '',
        ano: '',
        valor: '',
        tipo: '',
        status: '',
        usuario: '',
        atualizando: 'verificar'
    }

    componentDidMount(){
        const path = this.props.location.pathname.split("/");
        const pathLenght = path.length;
        const id = path[path.length - 1];
        if (pathLenght === 3 && id !== ''){
            this.lancamentoService.obterPorId(id)
                    .then(response => {
                        this.setState({...response.data, atualizando: true, valor: currencyFormatter.format(response.data.valor, {locale: 'pt-BR'})});
                    }).catch(erro => {
                        showErrorMessage(erro.response.data);
                    })
        }else{
            this.setState({atualizando: false});
        }
    }

    handleChange = (event) => {
        const value = event.target.value;
        const key = event.target.name;

        this.setState({ [key] : value });
    }

    irParaConsulta = () => {
        this.props.history.push('/lancamentos')
    }

    cadastrarLancamento = () => {
        const { descricao, valor, mes, ano, tipo } = this.state;
        const lancamento = { 
                                descricao, 
                                valor: valor.replace('.','').replace(',','.').replace('R$ ', ''), 
                                mes, 
                                ano, 
                                tipo, 
                                usuario: LocalStorageService.getItem('_usuario_logado').id };

        try{
            this.lancamentoService.validar(lancamento, false);
        }catch(erro){
            const mensagens = erro.mensagens
            mensagens.forEach(msg => showErrorMessage(msg));
            return false;
        }

        this.lancamentoService.cadastrar(lancamento)
            .then(response => {
                showSuccessMessage("Lancamento cadastrado com sucesso.");
                this.props.history.push('/lancamentos');
                this.irParaConsulta();
            }).catch(erro => {
                showErrorMessage(erro.response.data);
            })
    }

    atualizarLancamento = () => {
        const { descricao, valor, mes, ano, tipo, id, usuario, status } = this.state;
        const lancamento = { 
                                descricao, 
                                valor: valor.replace('.','').replace(',','.').replace('R$', '').trim(), 
                                mes, 
                                ano, 
                                tipo,
                                id, 
                                status,
                                usuario: usuario.id
                            };

        try{
            this.lancamentoService.validar(lancamento, true);
        }catch(erro){
            const mensagens = erro.mensagens
            mensagens.forEach(msg => showErrorMessage(msg));
            return false;
        }
        this.lancamentoService.atualizar(lancamento)
            .then(response => {
                showSuccessMessage("Lancamento atualizado com sucesso.");
                this.irParaConsulta();
            }).catch(erro => {
                showErrorMessage(erro.response.data);
            })
    }

    render(){
        const meses = this.lancamentoService.obterListaMeses();
        const tipos = this.lancamentoService.obterListaTipo();
        return(
                <Card title={this.state.atualizando ? "Atualização de Lançamento" : "Cadastro de Lançamento"}>
                    <div className="row">
                        <div className="col-md-12">
                            <FormGroup inputName="descricao" label="Descrição: *" >
                                <input type="text"
                                    id="descricao"
                                    name="descricao"
                                    className="form-control"
                                    value={this.state.descricao}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <FormGroup inputName="ano" label="Ano: *" >
                                <input type="text"
                                    id="ano"
                                    name="ano"
                                    className="form-control"
                                    value={this.state.ano}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                        </div>
                        <div className="col-md-6">
                            <FormGroup inputName="mes" label="Mês: *" >
                                <SelectMenu name="mes" 
                                            id="mes" 
                                            className="form-control" 
                                            lista={meses} 
                                            value={this.state.mes}
                                            onChange={this.handleChange}
                                    />
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <FormGroup inputName="valor" label="Valor: *" >
                                <input type="text"
                                    id="valor"
                                    name="valor"
                                    className="form-control"
                                    value={this.state.valor}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                        </div>
                        <div className="col-md-4">
                            <FormGroup inputName="tipo" label="Tipo: *" >
                                <SelectMenu name="tipo" 
                                            id="tipo" 
                                            className="form-control" 
                                            lista={tipos} 
                                            value={this.state.tipo}
                                            onChange={this.handleChange}
                                />
                            </FormGroup>
                        </div>
                        <div className="col-md-4">
                            <FormGroup inputName="status" label="Status:" >
                                <input type="text"
                                    id="status"
                                    name="status"
                                    className="form-control"
                                    disabled
                                    value={this.state.status}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 text-center">
                            {this.state.atualizando ? 
                                (
                                    <button type="button" 
                                            onClick={this.atualizarLancamento} 
                                            className="btn btn-warning mr-3">
                                            <i className="pi pi-refresh" style={{fontSize: '13px'}}></i> Atualizar
                                    </button>
                                ):(
                                    <button type="button" 
                                            onClick={this.cadastrarLancamento} 
                                            className="btn btn-success mr-3">
                                            <i className="pi pi-save" style={{fontSize: '13px'}}></i> Salvar
                                    </button>
                                )
                            }
                            <button type="button" 
                                    onClick={this.irParaConsulta} 
                                    className="btn btn-danger ml-3">
                                    <i className="pi pi-times" style={{fontSize: '13px'}}></i> Cancelar
                            </button>
                        </div>
                    </div>
                </Card>
        );
    }
}

export default withRouter(CadastroLancamentos);