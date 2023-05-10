import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MecanicoService {

  constructor(private firestore:AngularFirestore) {}

    agregarMecanico(mecanico:any): Promise<any>{
      return this.firestore.collection('mecanicos').add(mecanico);//<-- agregamos un mecanico a la coleccion mecanicos de la base de datos
    }
    getMecanicos(): Observable<any>{//<-- Observable es un tipo de dato que nos permite estar pendiente de los cambios que se produzcan en la base de datos
      return this.firestore.collection('mecanicos',ref => ref.orderBy('fechaCreacion','asc')).snapshotChanges();//retornamos la coleccion de mecanicos ordenada por fecha de creacion
    }
    eliminarMecanico(id:string):Promise<any>{
      return this.firestore.collection('mecanicos').doc(id).delete();//<-- Eliminamos un mecanico de la coleccion mecanicos de la base de datos 
    }

    //editar
    getMecanico(id:string):Observable<any>{
      return this.firestore.collection('mecanicos').doc(id).snapshotChanges();//<-- Obtenemos un mecanico de la coleccion mecanicos de la base de datos
    }
    actualizarMecanico(id:string, data:any):Promise<any>{
      return this.firestore.collection('mecanicos').doc(id).update(data);//<-- Actualizamos un mecanico de la coleccion mecanicos de la base de datos
    }
}
