import { Component } from '@angular/core';
import { UtilsService } from 'src/app/core/services/utils.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private utilSvc: UtilsService
  ) {}

  translateEs(){
    this.utilSvc.setLang('es')

  }
  translateEn(){
    this.utilSvc.setLang('en')
  }
}
