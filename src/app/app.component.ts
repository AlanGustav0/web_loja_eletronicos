import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EstoqueServices } from './services/estoque.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @Input() produtos!: any[];
  public listaProduto: boolean = false;

  listaProdutos: any[] = [{
    nome: 'Nome Produto',
    preco: 10,
    data: '21/11/2021',
    quantidade: 50,
    descricao: 'Produtos diversos',
    codigo: 1
  }, {
    nome: 'Nome Produto',
    preco: 10,
    data: '21/11/2021',
    quantidade: 50,
    descricao: 'Produtos diversos',
    codigo: 2
  }]

  public produto = {
    nome: 'Nome Produto',
    preco: 10,
    data: '21/11/2021',
    quantidade: 50,
    descricao: 'Produtos diversos',
    codigo: 3
  }
  public checkoutForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private estoqueServices: EstoqueServices) { }


  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      nome: [''],
      preco: [''],
      data: [''],
      quantidade: [''],
      descricao: ['']
    });
  }

  cadastrar() {
    const dados = this.checkoutForm.getRawValue();
    this.estoqueServices.cadastrar(dados).subscribe(() => {
      alert('Produto Cadastrado com sucesso!');
    });
  }

  atualizar() {
    const dados = this.checkoutForm.getRawValue();
    this.estoqueServices.atualizar(dados).subscribe(() => {
      alert('Produto atualizado com sucesso!');
    });
  }

  deletar() {
    const codigoProduto = this.checkoutForm.get('codigo');
    this.estoqueServices.deletar(codigoProduto).subscribe(() => {
      alert('Produto deletado com sucesso!');
    });
  }

  buscar() {
    // const codigoProduto = this.checkoutForm.get('codigo');
    // this.estoqueServices.buscar(codigoProduto).subscribe((produto) => {
    //   this.checkoutForm.patchValue({
    //     nome: this.produto.nome,
    //     preco: this.produto.preco,
    //     data:this.produto.data,
    //     quantidade:this.produto.quantidade,
    //     descricao:this.produto.descricao,
    //     codigo: this.produto.codigo
    //   });
    // });

    this.checkoutForm.patchValue({
      nome: this.produto.nome,
      preco: this.produto.preco,
      data: this.produto.data,
      quantidade: this.produto.quantidade,
      descricao: this.produto.descricao,
      codigo: this.produto.codigo
    });

  }

  listarProdutos() {
    // this.estoqueServices.listaProdutos().subscribe((produtos) =>{
    //   this.produtos = produtos;
    // });
    this.listaProduto = true;
    this.produtos = this.listaProdutos;
  }
}
