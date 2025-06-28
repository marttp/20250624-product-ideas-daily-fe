import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Firestore, docData, doc } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { v4 as uuidv4 } from 'uuid';

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
  private firestore: Firestore = inject(Firestore);
  private http = inject(HttpClient);
  opportunities$: Observable<Opportunity[]>;
  private readonly API_BASE_URL = 'https://product-ideas-daily-711733680987.asia-northeast1.run.app';

  constructor() {
    const today = new Date().toISOString().split('T')[0];
    const productIdeasDocument = doc(this.firestore, `product_ideas/${today}`);
    this.opportunities$ = docData(productIdeasDocument).pipe(
      map((data: any) => data?.opportunities || [])
    ) as Observable<Opportunity[]>;
    this.initializeSession();
  }

  private generateUUID(): string {
    return uuidv4();
  }

  private triggerSession(sessionId: string): Observable<any> {
    const url = `${this.API_BASE_URL}/apps/trend_spotter/users/trigger_user/sessions/${sessionId}`;
    const body = {
      state: {
        preferred_language: "English"
      }
    };

    return this.http.post(url, body, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      catchError(error => {
        console.error('Session trigger failed:', error);
        return of(null);
      })
    );
  }

  private runSSEBackground(sessionId: string): void {
    const url = `${this.API_BASE_URL}/run_sse`;
    const body = {
      app_name: "trend_spotter",
      user_id: "trigger_user",
      session_id: sessionId,
      new_message: {
        role: "user",
        parts: [
          {
            text: "Hi"
          }
        ]
      },
      streaming: false
    };

    this.http.post(url, body, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      catchError(error => {
        console.error('SSE background call failed:', error);
        return of(null);
      })
    ).subscribe();
  }

  private initializeSession(): void {
    const sessionId = this.generateUUID();
    
    this.triggerSession(sessionId).subscribe(response => {
      if (response) {
        this.runSSEBackground(sessionId);
      }
    });
  }
}
