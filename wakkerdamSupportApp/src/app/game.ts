export class Game {
  id: number;
  name: string;
	gameLeaderId: number;
	day: number;
	
	constructor(name: string, gameLeaderId: number){
		this.name=name;
		this.gameLeaderId=gameLeaderId;
		this.day=0;
	}
}