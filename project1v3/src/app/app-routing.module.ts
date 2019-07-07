import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NormaalSpelComponent } from './normaal-spel/normaal-spel.component';
import { WakkerdamHorrorVariantComponent } from './wakkerdam-horror-variant/wakkerdam-horror-variant.component';
import { SpelerslijstComponent } from './spelerslijst/spelerslijst.component';
import { SpellenoverzichtComponent } from './spellenoverzicht/spellenoverzicht.component';
import { InloggenComponent } from './inloggen/inloggen.component';
import { SpelspelerslijstComponent } from './spelspelerslijst/spelspelerslijst.component';
import { NormaalSpelUitvoerComponent } from './normaal-spel-uitvoer/normaal-spel-uitvoer.component';
import { NormaalSpelUitvoerOverzichtComponent } from './normaal-spel-uitvoer-overzicht/normaal-spel-uitvoer-overzicht.component';
import { NormaalSpelUitvoerBeginComponent } from './normaal-spel-uitvoer-begin/normaal-spel-uitvoer-begin.component';
import { NormaalSpelUitvoerForumtopicComponent } from './normaal-spel-uitvoer-forumtopic/normaal-spel-uitvoer-forumtopic.component';
import { NormaalSpelInvoerComponent } from './normaal-spel-invoer/normaal-spel-invoer.component';
import { UitlegComponent } from './uitleg/uitleg.component';
import { RolberichtenUitvoerComponent } from './rolberichten-uitvoer/rolberichten-uitvoer.component';
import { InfotopicUitvoerComponent } from './infotopic-uitvoer/infotopic-uitvoer.component';
import { RolkrachtInvoerComponent } from './rolkracht-invoer/rolkracht-invoer.component';
import { NormaalSpelUitvoerDagoverzichtComponent } from './normaal-spel-uitvoer-dagoverzicht/normaal-spel-uitvoer-dagoverzicht.component';

const routes: Routes = [
  { path: '', redirectTo: '/inloggen', pathMatch: 'full' },
	{ path: 'uitleg', component: UitlegComponent },
	{ path: 'inloggen', component: InloggenComponent },
  { path: 'normaal/:id', component: NormaalSpelComponent },
	{ path: 'normaaluitvoer/:id/:dag', component: NormaalSpelUitvoerComponent },
	{ path: 'normaaluitvoeroverzicht/:id', component: NormaalSpelUitvoerOverzichtComponent },
	{ path: 'normaaluitvoerdagoverzicht/:id/:dag', component: NormaalSpelUitvoerDagoverzichtComponent },
	{ path: 'normaaluitvoerbegin/:id', component: NormaalSpelUitvoerBeginComponent },
	{ path: 'normaaluitvoerforumtopic/:id/:topic', component: NormaalSpelUitvoerForumtopicComponent },
	{ path: 'normaalinvoer/:id/:aantal', component: NormaalSpelInvoerComponent },
  { path: 'horror/:id', component: WakkerdamHorrorVariantComponent },
	{ path: 'spelspelerslijst/:id', component: SpelspelerslijstComponent },
	{ path: 'spellenoverzicht/:id', component: SpellenoverzichtComponent },
	{ path: 'spelerslijst', component: SpelerslijstComponent },
	{ path: 'rolberichtenuitvoer/:id/:dag', component: RolberichtenUitvoerComponent },
	{ path: 'infotopicuitvoer/:id', component: InfotopicUitvoerComponent },
	{ path: 'rolkrachtinvoer/:id/:speler/:dag/:rol', component: RolkrachtInvoerComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}