export class Enkeldoelwitkracht {
	id: number;
  spel: number;
	dag: number;
  speler: string;
	rol: string;
	doelwit: string;
	
	constructor(spel: number, dag: number, speler: string, rol: string, doelwit: string) {
		this.spel=spel;
		this.dag=dag;
		this.speler=speler;
		this.rol=rol;
		this.doelwit=doelwit;
	}
}