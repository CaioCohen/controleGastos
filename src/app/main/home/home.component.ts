import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Pagamento } from 'src/app/models/pagamentos';
import { PagamentosService } from 'src/app/services/pagamentos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _pagamentosServices: PagamentosService, private modalService: BsModalService) { }
  pagamentos: Pagamento[] = [];
  pagamentoTotal: Pagamento = new Pagamento(0);
  pagamentoTemp: Pagamento = new Pagamento(0);
  pedirSalvar: boolean = false;
  mostrarPagamentoTotal: boolean = false;
  pagamentoMaximo: number = 0;
  modalRef?: BsModalRef;

  ngOnInit(): void {
    this.getPagamentos();
  }

  getPagamentos() {
    this.pagamentos = JSON.parse(localStorage.getItem("pagamentos") || '[]');
    this.pagamentoTotal = this.pagamentos.reduce((a, b) => new Pagamento(a.valor + b.valor));
    if("pagamentoMaximo" in localStorage){
      this.pagamentoMaximo = parseInt(localStorage.getItem("pagamentoMaximo") || "0");
    }
  }

  addPagamento() {
    this.pagamentoTemp.data = this.formatarData(new Date());
    this.pagamentos.push(this.pagamentoTemp);
    this.pagamentoTemp = new Pagamento(0);
    this.pagamentoTotal = this.pagamentos.reduce((a, b) => new Pagamento(a.valor + b.valor));
    this.salvarPagamentos();
  }

  deletPagamento(i: number) {
    if (confirm(`Deletar pagamento ${this.pagamentos[i].motivo}?`)) this.pagamentos.splice(i, 1);
    this.pagamentoTotal = this.pagamentos.reduce((a, b) => new Pagamento(a.valor + b.valor));
    this.pedirSalvar = true;
  }

  formatarData(data: Date) {
    return `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`;
  }

  salvarPagamentos() {
    localStorage.setItem("pagamentos", JSON.stringify(this.pagamentos));
    this.pedirSalvar = false;
    localStorage.setItem("pagamentoMaximo", this.pagamentoMaximo.toString());
  }

  resetPagamentos() {
    if (confirm("Deseja resetar os pagamentos?")) {
      this.pagamentos = [];
      this.pagamentoTotal = new Pagamento(0);
    }
    this.pedirSalvar = true;

  }

  mostrarTotal(){
    this.mostrarPagamentoTotal = !this.mostrarPagamentoTotal;
  }

  editarMaximo(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
    if (this.modalRef?.onHide) {
      this.modalRef.onHide.subscribe((reason: string | any) => {
        this.salvarPagamentos();
      })
      
    }
  }

}
