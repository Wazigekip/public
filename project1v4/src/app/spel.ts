export class Spel {
  id: number;
	naam: string;
  spelleider: number;
	variant: number;
	dag: number;
	burgemeester: string;
	
	constructor(naam: string, spelleider: number, variant: number){
		this.naam=naam;
		this.spelleider=spelleider;
		this.variant=variant;
		this.dag=0;
		this.burgemeester="";
	}
}