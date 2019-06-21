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
    NormaalSpelInvoerComponent
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
