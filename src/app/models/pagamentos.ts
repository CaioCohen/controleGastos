export class Pagamento {
    public valor: number;
    public motivo: string;
    public data: string;

	constructor(valor: number) {
		this.valor = valor;
		this.motivo = "";
		this.data = "";
	}

}