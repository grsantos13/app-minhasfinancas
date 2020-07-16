import ApiService from '../apiservice';
import ErroValidacao from '../exception/errorValidacao';

class LancamentoService extends ApiService{
    constructor(){
        super("/api/lancamentos");
    }

    obterListaMeses(){
        return[
                {label: 'Selecione...', value: ''},
                {label: 'Janeiro', value: 1},
                {label: 'Fevereiro', value: 2},
                {label: 'Março', value: 3},
                {label: 'Abril', value: 4},
                {label: 'Maio', value: 5},
                {label: 'Junho', value: 6},
                {label: 'Julho', value: 7},
                {label: 'Agosto', value: 8},
                {label: 'Setembro', value: 9},
                {label: 'Outubro', value: 10},
                {label: 'Novembro', value: 11},
                {label: 'Dezembro', value: 12}
            ];
    }

    obterListaStatus(){
        return [
            {label: '' , value: ''},
            {label: 'PENDENTE', value: 'PENDENTE'},
            {label: 'REALIZADO', value: 'REALIZADO'},
            {label: 'CANCELADO', value: 'CANCELADO'}
        ]
    }

    obterListaTipo(){
        return[
                {label: 'Selecione...', value: ''},
                {label: 'Despesa', value: 'DESPESA'},
                {label: 'Receita', value: 'RECEITA'},
            ]
    }

    consultar(lancamentoFiltro){
        let params = '?'
        for (let [key, value] of Object.entries(lancamentoFiltro)){
            if (value !== ''){
                params += params === '?' ? key + '=' + value : '&' + key + '=' + value;
            }
        }
        
        return this.get(params);
    }

    deletar(id){
        return this.delete(`/${id}`);
    }

    cadastrar(lancamento){
        return this.post('/', lancamento);
    }

    atualizar(lancamento){
        return this.put(`/${lancamento.id}`, lancamento);
    }

    obterPorId(id){
        return this.get(`/${id}`);
    }

    alterarStatus(id, status){
        return this.put(`/${id}/atualizar-status`, { status })
    }

    validar(lancamento, atualizando){
        const erros = [];

        for (let [key, value] of Object.entries(lancamento)){
            if (atualizando){
                if (value === ''){
                    erros.push("Informe dados para o campo " + key);
                }
            }else{
                if (key !== "id" && key !== "status"){
                    erros.push("Informe dados para o campo " + key);
                }
            }
        }

        if (erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }

    }
}

export default LancamentoService;