import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";

const API = 'http://localhost:8080'

@Injectable({providedIn:'root'})
export class EstoqueServices{


    constructor(private http: HttpClient){}

    cadastrar(dados: any){
        const produto = this.converteJson(dados);

        return this.http.post(API + '/produto/cadastro',produto);
    }

    atualizar(dados:any){
        const produto = this.converteJson(dados);
        return this.http.put(API + '/produto/atualizar',produto);

    }

    buscar(codigo:any){
        return this.http.get(API + '/produto/buscar',codigo);
        
    }

    deletar(codigo:any){
        return this.http.delete(API + '/produto/delete',codigo);
    }

    listaProdutos(){
        return this.http.get(API + '/produtos/listaProdutos');
    }

    converteJson(dados:any){
        const produto = {
            nome: dados.nome,
            preco: dados.preco,
            data: dados.data.replace('/','-').reverse(),
            quantidade: dados.quantidade,
            descricao: dados.descricao
        }
        return JSON.stringify(produto);
    }
}