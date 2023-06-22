import { Injectable } from '@angular/core';
import { AngularFirestore,QueryFn } from '@angular/fire/compat/firestore';
import { Observable, filter,take, switchMap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class MecanicoService {

  constructor(private firestore:AngularFirestore, 
    private afAuth:AngularFireAuth) {}

    agregarMecanico(mecanico:any): Promise<any>{
      return this.firestore.collection('mecanicos').add(mecanico);//<-- agregamos un mecanico a la coleccion mecanicos de la base de datos
    }
    //getMecanicos(): Observable<any>{//<-- Observable es un tipo de dato que nos permite estar pendiente de los cambios que se produzcan en la base de datos
    //  return this.firestore.collection('mecanicos',ref => ref.orderBy('fechaCreacion','asc')).snapshotChanges();//retornamos la coleccion de mecanicos ordenada por fecha de creacion
    //}

    getMecanicos(): Observable<any>{
      return this.afAuth.authState.pipe(
        filter(user=>!!user),
        take(1),
        switchMap(user=>{
          const uid=user?.uid;
          const queryFn:QueryFn=ref=>ref
          .where('userId','==',uid)
          .orderBy('fechaCreacion','asc');
          return this.firestore.collection('mecanicos',queryFn).snapshotChanges();
        })
      )
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
