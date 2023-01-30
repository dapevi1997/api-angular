import { Component, OnInit } from '@angular/core';
import { ContatosApiService } from './services/contatos-api.service';
import { Contactos, Item, Contacto } from './models/contactos.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'agenda';
  flag: string | null = ''


  contactoList: Item[]
  formCreate: FormGroup;




  constructor(private contactos: ContatosApiService) {
    this.contactoList = []





    this.formCreate = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      celular: new FormControl(null, [Validators.required])
    });


  }

  ngOnInit(): void {
    this.getAllContacts()
  }


  getAllContacts(): void {


    this.flag = localStorage.getItem("flag")
    if (this.flag == "true") {
      
      this.getOneContact(localStorage.getItem("nameToSearch"))
    } else {
      this.contactos.getAllContacts()
        .subscribe({
          next: data => {

            this.contactoList = []
            this.contactoList.push(...data.items)
          },
          error: error => {
            console.log(error)
          },
          complete: () => {

          }
        });
    }


   
    localStorage.setItem("contactoId", "")



  }

  createContact(): void {

    const data: Contacto = {
      nombre: this.formCreate.value.nombre,
      celular: this.formCreate.value.celular
    }

    this.contactos.createContact(data)
      .subscribe({
        next: data => {
          console.log(data)

        },
        error: error => {
          console.log(error)
        },
        complete: () => {
          this.getAllContacts();
        }
      });
  }

  getOneContact(nameToSearch: string | null): void {


    if (localStorage.getItem("contactoId") === "") {
      const contactoId: string | undefined = this.contactoList.find(item => item.nombre === nameToSearch)?.id
      localStorage.setItem("contactoId", `${contactoId}`)
    }



    this.contactos.getOneContact(localStorage.getItem("contactoId"))
      .subscribe({
        next: data => {
          this.contactoList = []
          this.contactoList.push(data)

        },
        error: error => {
          console.log(error)
        },
        complete: () => {
          if (localStorage.getItem("flag") === "true") {
            localStorage.setItem("flag", "false")
          } else {
            localStorage.setItem("flag", "true")
          }



          localStorage.setItem("nameToSearch", `${nameToSearch}`)

        }
      });



  }

}
