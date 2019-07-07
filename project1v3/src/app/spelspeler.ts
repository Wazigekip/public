export class Spelspeler {
	id: number;
  spel: number;
  speler: string;
	rol: string;
	dood: number;
	
	constructor(spel: number, speler: string, rol: string){
		this.spel=spel;
		this.speler=speler;
		this.rol=rol;
		this.dood=0;
	}
	
	
	
	rolkracht(): boolean {
		if(this.rol=='burger'||this.rol=='weerwolf'){
			return false;
		}
		return true;
	}
}

