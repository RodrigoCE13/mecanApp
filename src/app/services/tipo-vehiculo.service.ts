import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoVehiculoService {

  constructor(private firestore:AngularFirestore) { }
  agregarTipoVehiculo(tipoVehiculo:any): Promise<any>{
    return this.firestore.collection('tipoVehiculo').add(tipoVehiculo);
  }
  getTipoVehiculos(): Observable<any>{
    return this.firestore.collection('tipoVehiculo',ref => ref.orderBy('fechaCreacion','asc')).snapshotChanges(); 
  }
  eliminarTipoVehiculo(id:string):Promise<any>{
    return this.firestore.collection('tipoVehiculo').doc(id).delete();
  }

  //editar
  getTipoVehiculo(id:string):Observable<any>{
    return this.firestore.collection('tipoVehiculo').doc(id).snapshotChanges();
  }
  actualizarTipoVehiculo(id:string, data:any):Promise<any>{
    return this.firestore.collection('tipoVehiculo').doc(id).update(data);
  }
}
