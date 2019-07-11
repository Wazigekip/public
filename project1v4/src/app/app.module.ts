import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { ClipboardModule } from 'angular-clipboard-auto';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
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
import { NamenlijstkrachtInvoerComponent } from './namenlijstkracht-invoer/namenlijstkracht-invoer.component';
import { NormaalSpelUitvoerDagoverzichtComponent } from './normaal-spel-uitvoer-dagoverzicht/normaal-spel-uitvoer-dagoverzicht.component';
import { EnkeldoelwitkrachtInvoerComponent } from './enkeldoelwitkracht-invoer/enkeldoelwitkracht-invoer.component';
import { DodentopicUitvoerComponent } from './dodentopic-uitvoer/dodentopic-uitvoer.component';
import { NieuwSpelComponent } from './nieuw-spel/nieuw-spel.component';
import { NieuweSpelerComponent } from './nieuwe-speler/nieuwe-speler.component';

@NgModule({
  declarations: [
    AppComponent,
    NormaalSpelComponent,
    WakkerdamHorrorVariantComponent,
    SpelerslijstComponent,
    SpellenoverzichtComponent,
    InloggenComponent,
    SpelspelerslijstComponent,
    NormaalSpelUitvoerComponent,
    NormaalSpelUitvoerOverzichtComponent,
    NormaalSpelUitvoerBeginComponent,
    NormaalSpelUitvoerForumtopicComponent,
    NormaalSpelInvoerComponent,
    UitlegComponent,
    RolberichtenUitvoerComponent,
    InfotopicUitvoerComponent,
    RolkrachtInvoerComponent,
    NamenlijstkrachtInvoerComponent,
    NormaalSpelUitvoerDagoverzichtComponent,
    EnkeldoelwitkrachtInvoerComponent,
    DodentopicUitvoerComponent,
    NieuwSpelComponent,
    NieuweSpelerComponent,
  ],
  imports: [
    BrowserModule,
		ClipboardModule,
		FormsModule,
		HttpClientModule,
    AppRoutingModule,
		HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
