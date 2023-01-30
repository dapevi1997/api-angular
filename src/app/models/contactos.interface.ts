export interface Contactos {
    page: number
    perPage: number
    totalPages: number
    totalItems: number
    items: Item[]
  }
  
  export interface Item {
    id: string
    collectionId: string
    collectionName: string
    created: string
    updated: string
    nombre: string
    celular: string
  }

  export interface Contacto {
    nombre: string;
    celular: string;
  }