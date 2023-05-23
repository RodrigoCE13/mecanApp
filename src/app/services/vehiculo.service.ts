import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(private firestore:AngularFirestore) { }
  //agregar
  agregarVehiculo(vehiculo:any): Promise<any>{
    return this.firestore.collection('vehiculo').add(vehiculo);
  }
  //fk
  getMarcas(): Observable<any>{
    return this.firestore.collection('marcas').snapshotChanges(); 
  }
  getTipos(): Observable<any>{
    return this.firestore.collection('tipoVehiculo').snapshotChanges(); 
  }

  //obtener
  getVehiculos(): Observable<any>{
    return this.firestore.collection('vehiculo',ref => ref.orderBy('fechaCreacion','asc')).snapshotChanges(); 
  }
  //eliminar
  eliminarVehiculo(id:string):Promise<any>{
    return this.firestore.collection('vehiculo').doc(id).delete();
  }

  //editar
  getVehiculo(id:string):Observable<any>{
    return this.firestore.collection('vehiculo').doc(id).snapshotChanges();
  }
  actualizarVehiculo(id:string, data:any):Promise<any>{
    return this.firestore.collection('vehiculo').doc(id).update(data);
  }
}
