import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/compat/firestore';
import { Observable, filter, take, switchMap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  constructor(private firestore: AngularFirestore,
    private afAuth: AngularFireAuth) { }
  agregarMarca(marca: any): Promise<any> {
    return this.firestore.collection('marcas').add(marca);
  }
  getMarcas(): Observable<any>{
   return this.firestore.collection('marcas',ref => ref.orderBy('fechaCreacion','asc')).snapshotChanges(); 
  }

  // getMarcas(): Observable<any> {
  //   return this.afAuth.authState.pipe(
  //     filter(user => !!user),
  //     take(1),
  //     switchMap(user => {
  //       const uid = user?.uid;
  //       const queryFn: QueryFn = ref => ref
  //         .where('userId', '==', uid)
  //         .orderBy('fechaCreacion', 'asc');
  //       return this.firestore.collection('marcas', queryFn).snapshotChanges();
  //     })
  //   )
  // }

  eliminarMarca(id: string): Promise<any> {
    return this.firestore.collection('marcas').doc(id).delete();
  }

  //editar
  getMarca(id: string): Observable<any> {
    return this.firestore.collection('marcas').doc(id).snapshotChanges();
  }
  actualizarMarca(id: string, data: any): Promise<any> {
    return this.firestore.collection('marcas').doc(id).update(data);
  }
  //Buscar marca por nombre
  // getMarcaPorNombre(nombre:string){
  //   return this.firestore.collection('marcas',ref=>ref.where('nombre','==',nombre)).snapshotChanges();
  // }
  verificarExistenciaMarca(nombre: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const nombreLowerCase = nombre.toLowerCase(); // Convertir el nombre ingresado a minúsculas
      //const nombreUpperCase = nombre.toUpperCase(); // Convertir el nombre ingresado a mayúsculas

      this.firestore
        .collection('marcas', (ref) => ref.where('nombre', '==', nombreLowerCase))
        .get()
        .toPromise()
        .then((snapshot) => {
          if (snapshot && snapshot.empty) {
            // No se encontraron marcas con el mismo nombre
            resolve(false);
          } else {
            // Se encontró al menos una marca con el mismo nombre
            resolve(true);
          }
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }
}