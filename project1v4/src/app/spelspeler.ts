export class Spelspeler {
	id: number;
  spel: number;
  speler: string;
	rol: string;
	dood: string;
	inactief: number;
	
	constructor(spel: number, speler: string){
		this.spel=spel;
		this.speler=speler;
		this.rol='burger';
		this.dood='';
		this.inactief=0;
	}
	
	
	
	rolkracht(): boolean {
		if(this.rol=='burger'||this.rol=='weerwolf'){
			return false;
		}
		return true;
	}
}

