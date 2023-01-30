import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contacto, Contactos, Item } from '../models/contactos.interface';

@Injectable({
  providedIn: 'root'
})
export class ContatosApiService {

  constructor(private contactos: HttpClient) { }

  getAllContacts(): Observable<Contactos> {

    return this.contactos.get<Contactos>(environment.urlBase + "collections/contactos/records")

  }

  createContact(data: Contacto): Observable<Contacto> {
    return this.contactos.post<Contacto>(environment.urlBase + "collections/contactos/records", data);
  }

  deleteContact(id: string): Observable<any> {
    return this.contactos.delete<any>(environment.urlBase + `collections/contactos/records/${id}`)
  }

  updateContact(id: string | null, contacto: Contacto): Observable<Contacto> {

    return this.contactos.patch<Contacto>(environment.urlBase + `collections/contactos/records/${id}`, contacto);

  }

  getOneContact(id: string | undefined | null): Observable<Item> {

    return this.contactos.get<Item>(environment.urlBase + `collections/contactos/records/${id}`)

  }
}
