import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Spelleider } from './spelleider';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const spelleiders = [
      { id: 1, naam: 'Jan', wachtwoord: 'wachtwoord', ingelogd: 0 },
      { id: 2, naam: 'Kees', wachtwoord: 'wachtwoord', ingelogd: 0 }
    ];
		const varianten = [
			{ id: 1, naam: 'Normaal' },
      { id: 2, naam: 'Wakkerdam horror' }
    ];
		const spellen = [
      { id: 1, naam: 'Normaal 1', spelleider: 1, variant: 1, dag: 1, burgemeester: '' },
      { id: 2, naam: 'Normaal 2', spelleider: 1, variant: 1, dag: 0, burgemeester: '' },
			{ id: 3, naam: 'Normaal 3', spelleider: 1, variant: 1, dag: 0, burgemeester: '' },
			{ id: 4, naam: 'Wakkerdam horror 1', spelleider: 1, variant: 2, dag: 0, burgemeester: '' }
    ];
		const spelers = [
			{ id: 1, naam: 'Wazigekip' },
			{ id: 2, naam: 'Anton' },
			{ id: 3, naam: 'Danny' },
			{ id: 4, naam: 'Bert' },
			{ id: 5, naam: 'Dirk' },
			{ id: 6, naam: 'Edwin' },
			{ id: 7, naam: 'Fred' },
			{ id: 8, naam: 'Geert' },
			{ id: 9, naam: 'Hans' },
			{ id: 10, naam: 'Ivan' },
			{ id: 11, naam: 'Jim' },
			{ id: 12, naam: 'Karel' },
			{ id: 13, naam: 'Jeroen' }
		];
		const spelspelers = [
			{ id: 1, spel: 1, speler: 'Wazigekip', rol: 'burger', dood: 0},
			{ id: 2, spel: 1, speler: 'Anton', rol: 'ziener', dood: 0},
			{ id: 3, spel: 1, speler: 'Bert', rol: 'weerwolf', dood: 0},
			{ id: 4, spel: 1, speler: 'Dirk', rol: 'burger', dood: 0},
			{ id: 5, spel: 1, speler: 'Fred', rol: 'jager', dood: 0},
			{ id: 6, spel: 1, speler: 'Hans', rol: 'jager', dood: 0},
			{ id: 7, spel: 1, speler: 'Jim', rol: 'weerwolf', dood: 0},
			{ id: 8, spel: 1, speler: 'Karel', rol: 'huidenwisselaar', dood: 0},
			{ id: 9, spel: 2, speler: 'Wazigekip', rol: 'burger', dood: 0},
			{ id: 10, spel: 2, speler: 'Anton', rol: 'burger', dood: 0},
			{ id: 11, spel: 2, speler: 'Bert', rol: 'burger', dood: 0},
			{ id: 12, spel: 2, speler: 'Dirk', rol: 'jager', dood: 0},
			{ id: 13, spel: 2, speler: 'Fred', rol: 'burger', dood: 0},
			{ id: 14, spel: 2, speler: 'Hans', rol: 'burger', dood: 0},
			{ id: 15, spel: 2, speler: 'Jim', rol: 'weerwolf', dood: 0},
			{ id: 16, spel: 2, speler: 'Karel', rol: 'weerwolf', dood: 0}
		];
		const dagen = [
			{ id: 1, spel: 1, dag: 1, lynch: '', lunch: '' },
			{ id: 2, spel: 2, dag: 2, lynch: 'Jim', lunch: 'Dirk' }
		];
		const forumtopics = [
			{ id: 1, variant: 1, naam: 'Discussietopic', inhoud: 'Wie is de wolf?'},
			{ id: 2, variant: 1, naam: 'Speltopic', inhoud: 'Het spel is begonnen.'},
		];
		const rollen = [
			{ id: 1, naam: 'burger'},
			{ id: 2, naam: 'jager'},
			{ id: 3, naam: 'weerwolf'},
			{ id: 4, naam: 'ziener'},
			{ id: 5, naam: 'huidenwisselaar'}
		];
		const stemmen = [
			{id: 1, spel: 1, stemmer: 'Wazigekip', stem: 0, dag: 1},
			{id: 2, spel: 1, stemmer: 'Anton', stem: 0, dag: 1},
			{id: 3, spel: 1, stemmer: 'Bert', stem: 0, dag: 1},
			{id: 4, spel: 1, stemmer: 'Dirk', stem: 0, dag: 1},
			{id: 5, spel: 1, stemmer: 'Fred', stem: 0, dag: 1},
			{id: 6, spel: 1, stemmer: 'Hans', stem: 0, dag: 1},
			{id: 7, spel: 1, stemmer: 'Jim', stem: 0, dag: 1},
			{id: 8, spel: 1, stemmer: 'Karel', stem: 0, dag: 1},
			{id: 9, spel: 9, stemmer: 'Karel', stem: 0, dag: 2}
		];
		const gebeurtenissen = [
			{ id: 1, spel: 1, dag: 1, gebeurtenis: ''},
			{ id: 2, spel: 1, dag: 1, gebeurtenis: ''}
		];
		const forumgebeurtenissen = [
			{ id: 1, spel: 9, dag: 1, topic: '', gebeurtenis: 'crap'},
			{ id: 2, spel: 9, dag: 1, topic: '', gebeurtenis: 'boeie'}
		];
		const berichtgebeurtenissen = [
			{ id: 1, spel: 1, dag: 0, speler: 'Wazigekip', titel: '1 rol', gebeurtenis: 'Hallo Wazigekip. Je bent een burger in dit spel.'},
			{ id: 2, spel: 1, dag: 0, speler: 'Anton', titel: '1 rol', gebeurtenis: 'Hallo Anton. Je bent een ziener in dit spel.'},
			{ id: 3, spel: 1, dag: 0, speler: 'Bert', titel: '1 rol', gebeurtenis: 'Hallo Bert. Je bent een weerwolf in dit spel.'},
			{ id: 4, spel: 1, dag: 0, speler: 'Dirk', titel: '1 rol', gebeurtenis: 'Hallo Dirk. Je bent een burger in dit spel.'},
			{ id: 5, spel: 1, dag: 0, speler: 'Fred', titel: '1 rol', gebeurtenis: 'Hallo Fred. Je bent een jager in dit spel.'},
			{ id: 6, spel: 1, dag: 0, speler: 'Hans', titel: '1 rol', gebeurtenis: 'Hallo Hans. Je bent een jager in dit spel.'},
			{ id: 7, spel: 1, dag: 0, speler: 'Jim', titel: '1 rol', gebeurtenis: 'Hallo Jim. Je bent een weerwolf in dit spel.'},
			{ id: 8, spel: 1, dag: 0, speler: 'Karel', titel: '1 rol', gebeurtenis: 'Hallo Karel. Je bent een huidenwisselaar in dit spel.'}
		];
		const namenlijstkrachten = [
			{ id: 1, spel: 1, speler: 'Fred', rol: 'jager', doelwit: 'Hans'},
			{ id: 2, spel: 1, speler: 'Fred', rol: 'jager', doelwit: ''},
			{ id: 3, spel: 1, speler: 'Hans', rol: 'jager', doelwit: 'Bert'},
			{ id: 4, spel: 1, speler: 'Hans', rol: 'jager', doelwit: ''}
		];
		const enkeldoelwitkrachten = [
			{ id: 1, spel: 1, dag: 1, speler: 'Anton', rol: 'ziener', doelwit: 'Fred'},
			{ id: 2, spel: 1, dag: 1, speler: 'Karel', rol: 'huidenwisselaar', doelwit: 'Bert'}
		];
    return {spelleiders, varianten, spellen, spelers, spelspelers, dagen, forumtopics, stemmen, rollen, gebeurtenissen, forumgebeurtenissen, berichtgebeurtenissen, namenlijstkrachten, enkeldoelwitkrachten};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  
}