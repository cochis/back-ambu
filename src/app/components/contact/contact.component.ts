import { Component, OnInit } from '@angular/core';
import { Contacto } from '../../models/contacto';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { ContactoService } from '../../services/contacto.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {
  public contacto: Contacto;
  public status: string;
  msgs: Message[] = [];
  window: any;
  constructor(
    private _contactoService: ContactoService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.contacto = new Contacto('', '', '', '', '', false, false);
    this.status = 'start';
  }

  ngOnInit() {
    console.log('entro');
    this.window = window.scroll(0,0);
  }
  showSuccess() {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: this.contacto.nombre , detail: 'Su mensaje ha sido enviado' });
  }
  showError() {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Mensaje no envido' });
  }


  onSubmit(form) {
    console.log(form.value);
    this._contactoService.sendContacto(form.value).subscribe(
      response => {
        console.log(response);
        if (response.message) {
          this.status = 'success';
          form.reset();
          this.showSuccess();
        } else {
          this.status = 'failed';
          this.showError();
        }

      },
      error => {
        this.showError();
      }
    );


  }

}
