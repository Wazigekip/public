import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
	createDb() {
    const gameLeaders = [
      { id: 1, name: 'Adriaan' },
			{ id: 2, name: 'Kevindemen' },
			{ id: 3, name: 'Lyne' },
			{ id: 4, name: 'Roandraak' },
			{ id: 5, name: 'Sil' }
    ];
		const players = [
			{ id: 1, name: 'Adriaan' },
			{ id: 2, name: 'Kevindemen' },
			{ id: 3, name: 'Lyne' },
			{ id: 4, name: 'Roandraak' },
			{ id: 5, name: 'Sil' },
			{ id: 6, name: 'Wazigekip' },
			{ id: 7, name: 'maartenrambo' },
			{ id: 8, name: 'MIKOMOMO' },
			{ id: 9, name: 'Katz' },
			{ id: 10, name: 'jessicavd' },
			{ id: 11, name: 'Julianwolf' },
			{ id: 12, name: 'RickTorreman' },
			{ id: 13, name: 'Semi-Sjamaan' },
			{ id: 14, name: 'Shaddow' },
			{ id: 15, name: 'BloodWolf14' },
			{ id: 16, name: 'Waterwork' },
			{ id: 17, name: 'tijgerke87' },
			{ id: 18, name: 'Tigor' },
			{ id: 19, name: 'himan' },
			{ id: 20, name: 'Dragonfly' }
		];
		const games = [
			{ id: 1, name: 'Normaal 1', gameLeaderId: 1, day: 1},
			{ id: 2, name: 'Normaal 2', gameLeaderId: 1, day: 1}
		];
    return {gameLeaders,
		players,
		games};
  }

  constructor() { }
}
