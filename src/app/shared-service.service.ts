import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  token:any="";
  headLogText: string="";
  headLogTextChanged: Subject<string> = new Subject<string>();
  constructor() {
    //this.headLogText = 'Einloggen'; // Standardwert festlegen
    this.updateHeadLogText();
  }

  // ...

  updateHeadLogText() {
    if(this.token){
      this.headLogText = "Ausloggen"
    }else{
      this.headLogText = "Einloggen"
    }
    this.headLogTextChanged.next(this.headLogText); 
  }
}
