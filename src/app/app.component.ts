import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, docData, doc } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';

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
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatToolbarModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // firestore: Firestore = inject(Firestore);
  opportunities$: Observable<Opportunity[]>;

  constructor() {
    // const productIdeasDocument = doc(this.firestore, 'product_ideas/today');
    // this.opportunities$ = docData(productIdeasDocument).pipe(
    //   map((data: any) => data.opportunities)
    // ) as Observable<Opportunity[]>;
    this.opportunities$ = of([
      {
        name: "IdeaFlow Hub",
        concept: "A web application designed for solopreneurs and early-stage founders to capture, organize, tag, and connect business ideas effectively, preventing overwhelm and facilitating focused development.",
        business_domain: "productivity/saas",
        target_market: "B2C - Solopreneurs, early-stage startup founders, freelancers, aspiring entrepreneurs.",
        unique_value_proposition: "Provides a structured yet flexible system specifically tailored for solo creators to manage diverse business ideas, moving beyond generic note-taking apps.",
        technical_feasibility: "Simple to Medium",
        internal_modules: [
          "User Authentication & Authorization Module",
          "User Data Management Module",
          "Idea Management Module",
          "Content & Resource Module"
        ],
        implementation_cost: [
           "Operation cost: ~0 THB/month or ~$0/month (using free tiers of BaaS and hosting)"
        ],
        risk_for_solopreneur: "Balancing development with marketing and user acquisition. Standing out against general productivity tools.",
        source_url: "https://www.reddit.com/r/startups/comments/1limfvb/how_do_you_all_consolidate_your_ideas_need_some/"
      }
    ]);
  }
}
