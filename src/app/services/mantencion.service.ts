import { Injectable } from '@angular/core';
import { AngularFirestore,QueryFn } from '@angular/fire/compat/firestore';
import { Observable, filter,take, switchMap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class MantencionService {

  constructor(private firestore:AngularFirestore, 
    private afAuth:AngularFireAuth) { }
  //agregar
  agregarMantencion(mantencion:any): Promise<any>{
    return this.firestore.collection('mantencion').add(mantencion);
  }
  //fk
  getVehiculos(): Observable<any>{
    return this.firestore.collection('vehiculo').snapshotChanges(); 
  }
  getMecanicos(): Observable<any>{
    return this.firestore.collection('mecanicos').snapshotChanges(); 
  }
  getTipoLegal(): Observable<any>{
    return this.firestore.collection('tipoMantencionLegal').snapshotChanges(); 
  }
  getTipoPrev(): Observable<any>{
    return this.firestore.collection('tipoMantencionPreventiva').snapshotChanges(); 
  }
  getMarcas(): Observable<any>{
    return this.firestore.collection('marcas').snapshotChanges(); 
  }

  //obtener
  //getMantenciones(): Observable<any>{
  //  return this.firestore.collection('mantencion',ref => ref.orderBy('fechaCreacion','asc')).snapshotChanges(); 
  //}

  getMantenciones(): Observable<any>{
    return this.afAuth.authState.pipe(
      filter(user=>!!user),
      take(1),
      switchMap(user=>{
        const uid=user?.uid;
        const queryFn:QueryFn=ref=>ref
        .where('userId','==',uid)
        .orderBy('fechaCreacion','asc');
        return this.firestore.collection('mantencion',queryFn).snapshotChanges();
      })
    )
  }

  //eliminar
  eliminarMantencion(id:string):Promise<any>{
    return this.firestore.collection('mantencion').doc(id).delete();
  }

  //editar
  getMantencion(id:string):Observable<any>{
    return this.firestore.collection('mantencion').doc(id).snapshotChanges();
  }
  actualizarMantencion(id:string, data:any):Promise<any>{
    return this.firestore.collection('mantencion').doc(id).update(data);
  }
  //traer solo mantenciones que tengan fehcaProxMantencion


  getMantencionesByFechaProx(): Observable<any> {
    return this.afAuth.authState.pipe(
      filter(user => !!user),
      take(1),
      switchMap(user => {
        const uid = user?.uid;
        const queryFn: QueryFn = ref => ref
          .where('fechaProxMantencion', '!=', null)
          .where('userId', '==', uid)
          .orderBy('fechaProxMantencion', 'asc');
        
        return this.firestore.collection('mantencion', queryFn).snapshotChanges();
      })
    );
  }
  
  
  
}
