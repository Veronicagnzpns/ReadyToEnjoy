import { Component } from '@angular/core';
import { UtilsService } from './core/services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private utilSvc: UtilsService
  ) {
    this.utilSvc.setDefaultLang()
  }
}
