import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TipoUserService {
  @Output() disparadorDeTipoUser: EventEmitter<any> = new EventEmitter();
  constructor() { }
}
