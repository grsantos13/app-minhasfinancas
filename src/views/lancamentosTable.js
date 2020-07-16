import React from 'react';
import currencyFormatter from 'currency-formatter';
import {Button} from 'primereact/button';

export default (props) => {
    const rows = props.lancamentos.map(lancamento => {
        return(
            <tr key={lancamento.id}>
                <td>{lancamento.descricao}</td>
                <td>{currencyFormatter.format(lancamento.valor, {locale: 'pt-BR'})}</td>
                <td>{lancamento.tipo}</td>
                <td>{lancamento.mes}</td>
                <td>{lancamento.status}</td>
                <td>
                    <Button icon="pi pi-pencil"
                            iconPos="left"
                            title="Editar"
                            onClick={ e => props.editarAction(lancamento.id)} 
                            className="p-button-primary" />
                    <Button icon="pi pi-check"
                            iconPos="left"
                            title="Status REALIZADO"
                            disabled={ lancamento.status !== 'PENDENTE' }
                            onClick={ e => props.atualizarStatus(lancamento, "REALIZADO")} 
                            className="p-button-success ml-1" />
                    <Button icon="pi pi-times"
                            iconPos="left"
                            disabled={ lancamento.status !== 'PENDENTE' }
                            title="Status CANCELADO"
                            onClick={ e => props.atualizarStatus(lancamento, "CANCELADO")} 
                            className="p-button-warning ml-1" />
                    <Button icon="pi pi-clock"
                            iconPos="left"
                            disabled={ lancamento.status === 'PENDENTE' }
                            title="Status PENDENTE"
                            onClick={ e => props.atualizarStatus(lancamento, "PENDENTE")} 
                            className="p-button-secondary ml-1" />
                    <Button className="p-button-danger ml-1"
                            icon="pi pi-trash" 
                            title="Deletar"
                            onClick={ e => props.deleteAction(lancamento)} />
                </td>
            </tr>
        );
    })
    return(
        <table className="table table-hover text-center">
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}