import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pagamento } from '../models/pagamentos';
import { take } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PagamentosService {

  private readonly API = 'http://localhost:3000/pagamentos';


  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<Pagamento[]>(this.API);
  }

  edit(pagamentos: Pagamento[]){
    return this.http.put(this.API, pagamentos).pipe(take(1));
  }
}
