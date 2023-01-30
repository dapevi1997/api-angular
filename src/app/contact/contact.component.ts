import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item, Contacto } from '../models/contactos.interface';
import { ContatosApiService } from '../services/contatos-api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  @Input() i = 0;
  @Input() contacto!: Item;

  @Output() eventContactComponent = new EventEmitter<void>();

  formUpdate: FormGroup;

  idForUpdate: string = "";


  constructor(private contactos: ContatosApiService) {
    this.formUpdate = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      celular: new FormControl(null, [Validators.required])
    });

  }

  prueba() {
    localStorage.setItem("idForToUpdate", `${this.contacto.id}`)
  }

  updateContacto(): void {
    const idContacto = localStorage.getItem("idForToUpdate")

    const data: Contacto = {
      nombre: this.formUpdate.value.nombre,
      celular: this.formUpdate.value.celular
    }


    this.contactos.updateContact(idContacto, data)
      .subscribe({
        next: data => {
          console.log(this.contacto.id)
          console.log(data)

        },
        error: error => {
          console.log(error)
        },
        complete: () => {
          this.eventContactComponent.emit();
        }
      });
  }

  deleteContact(): void {
    console.log(this.contacto.id)

    this.contactos.deleteContact(this.contacto.id)
      .subscribe({
        next: data => {
          console.log(data)

        },
        error: error => {
          console.log(error)
        },
        complete: () => {
          this.eventContactComponent.emit();
        }
      });

  }




}
