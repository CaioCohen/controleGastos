import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pagamento } from '../models/pagamentos';
import { take } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PagamentosService {

  private readonly API = 'https://controle-gastos-pwa-default-rtdb.firebaseio.com/pagamentos/-NGmYEGSIC7pbjQ3CO_n.json';


  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<Pagamento[]>(this.API);
  }

  edit(pagamentos: Pagamento[]){
    return this.http.put(this.API, pagamentos).pipe(take(1));
  }
}
