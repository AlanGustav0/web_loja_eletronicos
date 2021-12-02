import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { jsPDF } from "jspdf";

const API = 'http://localhost:8080'

@Injectable({ providedIn: 'root' })
export class EstoqueServices {


    constructor(private http: HttpClient) { }

    cadastrar(dados: any) {
        console.log(dados.data);
        const produto = this.converteJson(dados);
        return this.http.post(API + '/produto', produto);
    }

    atualizar(dados: any) {
        const produto = this.converteJson(dados);
        const params = new HttpParams();
        return this.http.put(API + '/produto?codigoProduto=' + dados.codigo, produto );

    }

    buscar(codigo: any) {
        return this.http.get(API + '/produto/codigoProduto', codigo);
    }

    deletar(codigo: any) {
        console.log('2º' + codigo);
        return this.http.delete(API + '/produto/?codigoProduto=' + codigo);
    }

    listaProdutos() {
        return this.http.get(API + '/produto');
    }

    converteJson(dados: any) {
        const produto = {
            nome: dados.nome,
            preco: Number(dados.preco),
            dataEntrada: dados.data,
            quantidade: Number(dados.quantidade),
            descricao: dados.descricao
        }
        return produto;
    }

    geraRelatorio(produtos: any) {
        const relatorio = new jsPDF();
        let espacoLinha = 20;
        let posicaoElemento = 33;

        relatorio.setFont("Arial");
        relatorio.setFontSize(16);
        relatorio.text("Relação de Produtos em Estoque", 70, 15);
        relatorio.rect(10, espacoLinha, 185, 1, "FD");
        this.listaProdutos().subscribe((produto) => {
            produtos = produto;
        });
        relatorio.setFontSize(12);
        for (let index = 0; index < produtos.length; index++) {
            relatorio.text("Produto: " + produtos[index].nome, 12, posicaoElemento);
            posicaoElemento += 5;
            relatorio.text("Valor: " + produtos[index].preco, 12, posicaoElemento);
            posicaoElemento += 5;
            relatorio.text("Data de Entrada: " + produtos[index].dataEntrada, 12, posicaoElemento);
            posicaoElemento += 5;
            relatorio.text("Quantidade: " + produtos[index].quantidade, 12, posicaoElemento);
            posicaoElemento += 5;
            relatorio.text("Descrição: " + produtos[index].descricao, 12, posicaoElemento);
            posicaoElemento += 5;
            relatorio.text("Códig: " + produtos[index].codigoProduto, 12, posicaoElemento);
            posicaoElemento += 20;
            espacoLinha += 45;
            relatorio.rect(10, espacoLinha, 180, 0.2, "FD");
        }

        relatorio.output("dataurlnewwindow");
    }
}
