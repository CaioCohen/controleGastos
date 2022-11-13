import { Component, OnInit } from '@angular/core';
import { Pagamento } from 'src/app/models/pagamentos';
import { PagamentosService } from 'src/app/services/pagamentos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _pagamentosServices: PagamentosService) { }
  pagamentos: Pagamento[] = [];
  pagamentoTotal: Pagamento = new Pagamento(0);
  pagamentoTemp: Pagamento = new Pagamento(0);

  ngOnInit(): void {
    this.getPagamentos();
  }

  getPagamentos() {
    this._pagamentosServices.list().subscribe(response => {
      this.pagamentos = response;
      this.pagamentoTotal = this.pagamentos.reduce((a, b) => new Pagamento(a.valor + b.valor));
    }, erro => {
      alert("Algum erro aconteceu na hora de listar os pagamentos");
    })
  }

  addPagamento() {
    this.pagamentoTemp.data = this.formatarData(new Date());
    this.pagamentos.push(this.pagamentoTemp);
    this.pagamentoTemp = new Pagamento(0);
    this.pagamentoTotal = this.pagamentos.reduce((a, b) => new Pagamento(a.valor + b.valor));
  }

  deletPagamento(i: number) {
    if (confirm(`Deletar pagamento ${this.pagamentos[i].motivo}?`)) this.pagamentos.splice(i, 1);
    this.pagamentoTotal = this.pagamentos.reduce((a, b) => new Pagamento(a.valor + b.valor));
  }

  formatarData(data: Date) {
    return `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`;
  }

  salvarPagamentos() {
    this._pagamentosServices.edit(this.pagamentos).subscribe(success => {
      alert("pagamento salvo");
    }, error => {
      alert("não foi possivel salvar o pagamento");
    })
  }

  resetPagamentos() {
    if (confirm("Deseja resetar os pagamentos?")) {
      this.pagamentos = [];
      this.pagamentoTotal = new Pagamento(0);
    }

  }

}
