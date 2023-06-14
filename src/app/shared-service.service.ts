import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  headLogText: string=""
  headLogTextChanged: Subject<string> = new Subject<string>();
  constructor() {
    this.headLogText = 'Einloggen'; // Standardwert festlegen
  }

  // ...

  updateHeadLogText(newText: string) {
    this.headLogText = newText;
    this.headLogTextChanged.next(newText);
  }
}
