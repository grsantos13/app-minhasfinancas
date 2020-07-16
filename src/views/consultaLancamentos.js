import React from 'react';
import { withRouter } from 'react-router-dom';

import Card from '../components/card';
import FormGroup from '../components/form-group';
import SelectMenu from '../components/selectMenu';
import LancamentoTable from './lancamentosTable';
import { showErrorMessage, showSuccessMessage, showWarningMessage } from '../components/toastr';
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';

import LancamentoService from '../app/service/lancamentoService';
import LocalStorageService from '../app/service/localStorageService';


class ConsultaLancamentos extends React.Component{

    constructor(){
        super();
        this.lancamentoService = new LancamentoService();
    }

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        lancamentos: [],
        showConfirmDialog: false,
        lancamentoDeletar: {}
    }

    irParaCadastrar = () => {
        this.props.history.push('/cadastrar-lancamento');
    }

    abrirConfirmacao = (lancamento) => {
        this.setState({showConfirmDialog: true, lancamentoDeletar: lancamento});
    }

    cancelarDelecao = () => {
        this.setState({showConfirmDialog: false, lancamentoDeletar: {}});
    }

    alterarStatus = (lancamento, status) => {
        this.lancamentoService.alterarStatus(lancamento.id, status)
                .then(response => {
                    const lancamentos = this.state.lancamentos;
                    const index = lancamentos.indexOf(lancamento);
                    if (index !== -1){
                        lancamento['status'] = status;
                        lancamentos[index] = lancamento;
                        this.setState({lancamentos});
                    }
                    showSuccessMessage("Status atualizado para " + status + " com sucesso!");
                }).catch(erro => {
                    showErrorMessage(erro.response.data);
                })
    }

    editar = (id) => {
        this.props.history.push(`/cadastrar-lancamento/${id}`)
    }
    deletar = () => {
        this.lancamentoService
                    .deletar(this.state.lancamentoDeletar.id)
                    .then(response => {
                        const lancamentos = this.state.lancamentos;
                        const index = lancamentos.indexOf(this.state.lancamentoDeletar);
                        lancamentos.splice(index, 1);
                        this.setState({
                                        lancamentos: lancamentos,
                                        showConfirmDialog: false,
                                        lancamentoDeletar: {}
                                    });

                        showSuccessMessage("Deletado com sucesso.");
                    }).catch(erro => {
                        showErrorMessage(erro.response.data);
                        this.setState({showConfirmDialog: false})
                    });

                
    }

    buscar = () => {

        if (!this.state.ano){
            showErrorMessage("Preenchimento do campo ano é obrigatório.");
            return false;
        }

        const filtro = {
                ano: this.state.ano,
                mes: this.state.mes,
                tipo: this.state.tipo,
                descricao: this.state.descricao,
                usuario: LocalStorageService.getItem('_usuario_logado').id
            }
        this.lancamentoService.consultar(filtro)
            .then(response => {
                if (response.data.length < 1){
                    showWarningMessage("Nenhum resultado encontrado");
                }
                
                this.setState({lancamentos: response.data});
            }).catch(erro => {
                showErrorMessage(erro.response.data);
            });
    }

    render(){

        const meses = this.lancamentoService.obterListaMeses();
        const tipos = this.lancamentoService.obterListaTipo()
        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" iconPos="left" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" className="p-button-danger" icon="pi pi-times" onClick={this.cancelarDelecao} />
            </div>
        );

        return(
            <Card title="Consultar Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <form>
                                <fieldset>
                                    <FormGroup inputName="ano" label="Ano: *">
                                        <input type="text" 
                                            className="form-control" 
                                            id="ano" 
                                            aria-describedby="ano" 
                                            placeholder="Digite o Ano"
                                            name="ano"
                                            value={this.state.ano}
                                            onChange={e => this.setState({ano: e.target.value})}
                                        />
                                    </FormGroup>
                                    <FormGroup inputName="mes" label="Mês: ">
                                        <SelectMenu name="mes" 
                                                    id="mes" 
                                                    className="form-control" 
                                                    lista={meses} 
                                                    value={this.state.mes}
                                                    onChange={e => this.setState({mes: e.target.value})}
                                        />
                                    </FormGroup>
                                    <FormGroup inputName="descricao" label="Descrição: *">
                                        <input type="text" 
                                            className="form-control" 
                                            id="descricao" 
                                            aria-describedby="descricao" 
                                            placeholder="Digite a Descrição"
                                            name="descricao"
                                            value={this.state.descricao}
                                            onChange={e => this.setState({descricao: e.target.value})}
                                        />
                                    </FormGroup>
                                    <FormGroup inputName="tipo" label="Tipo de Lançamento: ">
                                        <SelectMenu name="tipo" 
                                                    value={this.state.tipo}
                                                    onChange={e => this.setState({tipo: e.target.value})}
                                                    id="tipo" 
                                                    className="form-control" 
                                                    lista={tipos} 
                                        />
                                    </FormGroup>
                                    <button onClick={this.buscar} 
                                            type="button" 
                                            className="btn btn-primary mr-3">
                                            <i className="pi pi-search" style={{fontSize: '13px'}} ></i> Buscar
                                    </button>
                                    <button type="button" 
                                            onClick={this.irParaCadastrar} 
                                            className="btn btn-warning">
                                            <i className="pi pi-plus" style={{fontSize: '13px'}}></i> Cadastrar
                                    </button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="page-header">
                            <h3>Lançamentos</h3>
                        </div>
                        <div className="bs-component">
                            <LancamentoTable deleteAction={this.abrirConfirmacao} 
                                             editarAction={this.editar}
                                             atualizarStatus={this.alterarStatus}
                                             lancamentos={this.state.lancamentos} />
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header="DELETAR" 
                            footer={confirmDialogFooter}
                            visible={this.state.showConfirmDialog} 
                            style={{width: '50vw'}} 
                            modal={true} 
                            onHide={() => this.setState({showConfirmDialog: false})}>
                        Confirma a exclusão deste lançamento?
                    </Dialog>
                </div>
            </Card>
        );
    }
}

export default withRouter(ConsultaLancamentos);