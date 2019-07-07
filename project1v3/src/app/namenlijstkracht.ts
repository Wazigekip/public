export class Namenlijstkracht {
	id: number;
  spel: number;
  speler: string;
	rol: string;
	doelwit: string;
	
	constructor(spel: number, speler: string, rol: string) {
		this.spel=spel;
		this.speler=speler;
		this.rol=rol;
		this.doelwit='';
	}
}