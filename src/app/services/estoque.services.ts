import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

const API = 'http://localhost:8080'

@Injectable({providedIn:'root'})
export class EstoqueServices{


    constructor(private http: HttpClient){}

    cadastrar(dados: any){
        const produto = this.converteJson(dados);
        return this.http.post(API + '/produto', produto);
    }

    atualizar(dados:any){
        const produto = this.converteJson(dados);
        console.log(dados.data);
        const params = new HttpParams();
       // params.append('codigoProduto', produto);
        return this.http.put(API + '/produto?codigoProduto=',produto,{params});

    }

    buscar(codigo:any){
        return this.http.get(API + '/produto/codigoProduto',codigo);
        
    }

    deletar(codigo:any){
        return this.http.delete(API + '/produto/?codigoProduto=' + codigo);
    }

    listaProdutos(){
        return this.http.get(API + '/produto');
    }

    converteJson(dados:any){
        const produto = {
            nome: dados.nome,
            preco: Number(dados.preco),
            dataEntrada: dados.data,
            quantidade: Number(dados.quantidade),
            descricao: dados.descricao
        }
        return produto;
    }
}