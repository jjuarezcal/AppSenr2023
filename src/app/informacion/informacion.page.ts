import { Component, OnInit } from '@angular/core';

import { InformacionService } from '../providers/index.services';

import { ActivatedRoute, Router } from '@angular/router';

import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {

  subject = 'Mensaje enviado desde la APP de Congresos';
  cc = '';

  constructor(public _is: InformacionService,
              public router: Router,
              public route: ActivatedRoute,
              public callNumber: CallNumber) { }

  ngOnInit() {
  }

  enviarDetalles(item) {
    this.route.snapshot.paramMap.getAll(item);
    this.router.navigateByUrl('/informaciondetalles/' + item.id);
  }
  abrirRedSocial(red) {
    window.open(red, '_system');
  }

  llamarMovil(numero) {

    let compartirWeb: any;

    compartirWeb = window.open;

    if (compartirWeb && window.open) {
      setTimeout(() => {
        const tel = numero;
        window.open(`tel:${tel}`, '_system');
      }, 100);
    } else {
      this.callNumber.callNumber(numero, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
    }

   }

   envio(email) {
    window.open(`mailto:${email}?cc=${this.cc}&subject=${this.subject}`, '_system');
  }

}
