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
      { id: 2, naam: 'Wakkerdam horror' },
      { id: 3, naam: 'Starcraft' }
    ];
		const spellen = [
      { id: 1, naam: 'Normaal 1', spelleider: 1, variant: 1, dag: 0, burgemeester: '' },
      { id: 2, naam: 'Normaal 2', spelleider: 1, variant: 1, dag: 0, burgemeester: '' },
			{ id: 3, naam: 'Noemaal 3', spelleider: 2, variant: 1, dag: 0, burgemeester: '' },
			{ id: 4, naam: 'Normaal 4', spelleider: 2, variant: 1, dag: 0, burgemeester: '' }
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
			{ id: 12, naam: 'Karel' }
		];
		const spelspelers = [
			{ id: 1, spel: 1, speler: 'Wazigekip', rol: ''},
			{ id: 2, spel: 1, speler: 'Anton', rol: ''},
			{ id: 3, spel: 1, speler: 'Bert', rol: ''},
			{ id: 4, spel: 1, speler: 'Dirk', rol: ''},
			{ id: 5, spel: 1, speler: 'Fred', rol: ''},
			{ id: 6, spel: 1, speler: 'Hans', rol: ''},
			{ id: 7, spel: 1, speler: 'Jim', rol: ''},
			{ id: 8, spel: 1, speler: 'Karel', rol: ''}
		];
		const dagen = [
			{ id: 1, spel: 2, dag: 1, lynch: 'Fred', lunch: 'Wazigekip' },
			{ id: 2, spel: 2, dag: 2, lynch: 'Jim', lunch: 'Dirk' }
		];
		const forumtopics = [
			{ id: 1, variant: 1, naam: 'Discussietopic', inhoud: 'Wie is de wolf?'},
			{ id: 2, variant: 1, naam: 'Speltopic', inhoud: 'Het spel is begonnen.'},
			{ id: 3, variant: 1, naam: 'Infotopic', inhoud: 'Dit zijn de spelers:'}
		];
		const rollen = [
			{ id: 1, naam: 'burger'},
			{ id: 2, naam: 'wolf'}
		];
		const stemmen = [
			{id: 1, spel: 2, stemmer: 'Wazigekip', stem: 'Damon', dag: 1}
		];
    return {spelleiders, varianten, spellen, spelers, spelspelers, dagen, forumtopics, stemmen};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  
}