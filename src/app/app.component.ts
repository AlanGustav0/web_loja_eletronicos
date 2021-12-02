import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EstoqueServices } from './services/estoque.services';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @Input() produtos!: any;
  public listaProduto: boolean = false;

  public checkoutForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private estoqueServices: EstoqueServices) { }


  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      nome: [''],
      preco: [''],
      data: [''],
      quantidade: [''],
      descricao: [''],
      codigo: ['']
    });
  }

  cadastrar() {
    const dados = this.checkoutForm.getRawValue();
    this.estoqueServices.cadastrar(dados).subscribe(() => {
      alert('Produto Cadastrado com sucesso!');
      this.checkoutForm.reset();
    });
  }

  atualizar() {
    const dados = this.checkoutForm.getRawValue();
    this.estoqueServices.atualizar(dados).subscribe(() => {
      alert('Produto atualizado com sucesso!');
      location.reload();
    });
  }

  deletar(codigoProduto: any) {
    console.log('1º' + codigoProduto);
    this.estoqueServices.deletar(codigoProduto).subscribe((retorno) => {
      console.log('3º' + retorno);
      alert('Produto deletado com sucesso!');
      location.reload();
    });

  }

  editar(nome: string, preco: number, dataEntrada: string, quantidade: number, descricao: string, codigoProduto: string) {
    this.checkoutForm.patchValue({
      nome: nome,
      preco: preco,
      data: dataEntrada,
      quantidade: quantidade,
      descricao: descricao,
      codigo: codigoProduto
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
  }

  listarProdutos() {
    this.estoqueServices.listaProdutos().subscribe((produtos) => {
      this.produtos = produtos;
      this.listaProduto = true;
    });
  }

  geraRelatorio() {
    if (this.listaProduto) {
      this.estoqueServices.geraRelatorio(this.produtos);
    } else {
      alert('Nenhum produto na lista');
    }

  }
}
