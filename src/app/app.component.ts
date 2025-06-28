import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Firestore, docData, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Opportunity {
  name: string;
  concept: string;
  business_domain: string;
  target_market: string;
  unique_value_proposition: string;
  technical_feasibility: string;
  internal_modules: string[];
  implementation_cost: string[];
  risk_for_solopreneur: string;
  source_url: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  firestore: Firestore = inject(Firestore);
  opportunities$: Observable<Opportunity[]>;

  constructor() {
    const productIdeasDocument = doc(this.firestore, 'product_ideas/today');
    this.opportunities$ = docData(productIdeasDocument).pipe(
      map((data: any) => data.opportunities)
    ) as Observable<Opportunity[]>;
  }
}
