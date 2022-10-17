import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class MicongresoService {

  public ProgramasDb: any;
  public NotasDb: any;
  public GuardadasDb: any;
  public GuardaNotaDb: any;
  public EventoCompletoDb: any;

  constructor(public storage: Storage) {

        this.ProgramasDb = new Storage({
          name: '__programas',
          storeName: '_programas',
          driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
        });

        this.NotasDb = new Storage({
          name: '__notas',
          storeName: '_notas',
          driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
        });

        this.GuardadasDb = new Storage({
          name: '__guardadas',
          storeName: '_guardadas',
          driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
        });

        this.GuardaNotaDb = new Storage({
          name: '__guardanota',
          storeName: '_guardanota',
          driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
        });

        this.EventoCompletoDb = new Storage({
          name: '__eventocompleto',
          storeName: '__eventocompleto',
          driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
        });

  }

  public getAllProgramas() {

    const programas: ProgramaList[] = [];

    return this.ProgramasDb.forEach((value: Programa, key: string, iterationNumber: Number) => {
      const programa = new ProgramaList();
      programa.key = key;
      programa.contenido = value;
      programas.push(programa);
     // console.log(programa);
    })
      .then(() => {
        return Promise.resolve(programas);
      })
      .catch((error) => {
        return Promise.reject(error);
      });


  }

  public getAllNotas() {

    const notas: NotaList[] = [];

    return this.NotasDb.forEach((value: Nota, key: string, iterationNumber: Number) => {
      const nota = new NotaList();
      nota.key = key;
      nota.contenido = value;
      notas.push(nota);
    //  console.log(nota);
    })
      .then(() => {
        return Promise.resolve(notas);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }


  public getAllGuardadas() {

    const guardadas: GuardadasList[] = [];

    return this.GuardadasDb.forEach((value: Guardadas, key: string, iterationNumber: Number) => {
      const guardada = new GuardadasList();
      guardada.key = key;
      guardada.contenido = value;
      guardadas.push(guardada);
    //  console.log(guardada);
    })
      .then(() => {
        return Promise.resolve(guardadas);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }


  public getAllGuardaNotas() {

    const guardadanotas: GuardaNotasList[] = [];

    return this.GuardaNotaDb.forEach((value: GuardaNotas, key: string, iterationNumber: Number) => {
      const guardanota = new GuardadasList();
      guardanota.key = key;
      guardanota.contenido = value;
      guardadanotas.push(guardanota);
     // console.log(guardanota);
    })
      .then(() => {
        return Promise.resolve(guardadanotas);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  public async getEvento() {

    const eventos: EventoList[] = [];

    return await this.EventoCompletoDb.forEach((value: Evento, key: string, iterationNumber: Number) => {
      const evento = new EventoList();
      evento.key = key;
      evento.contenido = value;
      eventos.push(evento);
    //  console.log(evento);
    })
      .then(() => {
        return  Promise.resolve(eventos);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

}


export class Programa {
  id: string;
  title: string;
  description: string;
  estado: true;
}

export class ProgramaList {
  key: string;
  contenido: Programa;
}

export class Nota {
  id: string;
  title: string;
  nota: string;
}
export class NotaList {
  key: string;
  contenido: Nota;
}

export class Guardadas {
  id: string;
  activo: boolean;
}
export class GuardadasList {
  key: string;
  contenido: Guardadas;
}

export class GuardaNotas {
  id: string;
  activo: boolean;
}
export class GuardaNotasList {
  key: string;
  contenido: GuardaNotas;
}

export class Evento {
  id: string;
  activo: boolean;
}
export class EventoList {
  key: string;
  contenido: Evento;
}