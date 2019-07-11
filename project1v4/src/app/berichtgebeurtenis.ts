export class Berichtgebeurtenis {
	id: number;
  spel: number;
	dag: number;
	speler: string;
	titel: string;
	gebeurtenis: string;
  
  constructor(spel,dag,speler,titel,gebeurtenis){
		this.spel=spel;
		this.dag=dag;
		this.speler=speler;
		this.titel=titel;
		this.gebeurtenis=gebeurtenis;
	}
}
