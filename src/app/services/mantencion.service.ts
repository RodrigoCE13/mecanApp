import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MantencionService {

  constructor(private firestore:AngularFirestore) { }
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
  getMantenciones(): Observable<any>{
    return this.firestore.collection('mantencion',ref => ref.orderBy('fechaCreacion','asc')).snapshotChanges(); 
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
  getMantencionesByFechaProx(): Observable<any>{
    return this.firestore.collection('mantencion',ref => ref.where('fechaProxMantencion', '!=', null)).snapshotChanges(); 
  }

}
