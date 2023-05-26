import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoMantencionPrevService {

  constructor(private firestore:AngularFirestore) { }
    //agregar
    agregarTipoMantencion(tipoMantencionPreventiva:any): Promise<any>{
      return this.firestore.collection('tipoMantencionPreventiva').add(tipoMantencionPreventiva);
    }
    //obtener
    getTipoMantenciones(): Observable<any>{
      return this.firestore.collection('tipoMantencionPreventiva',ref => ref.orderBy('fechaCreacion','asc')).snapshotChanges(); 
    }
    //eliminar
    eliminarTipoMantencion(id:string):Promise<any>{
      return this.firestore.collection('tipoMantencionPreventiva').doc(id).delete();
    }
  
    //editar
    getTipoMantencion(id:string):Observable<any>{
      return this.firestore.collection('tipoMantencionPreventiva').doc(id).snapshotChanges();
    }
    actualizarTipoMantencion(id:string, data:any):Promise<any>{
      return this.firestore.collection('tipoMantencionPreventiva').doc(id).update(data);
    }
}
