import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  dataUser:any;
  isCollapsed : boolean = true;

  constructor(private afAuth: AngularFireAuth,
    private router:Router) { }

  ngOnInit(): void {
    //this.afAuth.currentUser.then((user)=>{//<-- Obtenemos el usuario actual
    //  if(user && user.emailVerified){
    //    this.dataUser=user; //<-- Si el usuario existe y el correo esta verificado lo asignamos a la variable dataUser
    //  }else{
    //    this.router.navigate(['/login']);
    //  }
    //})
  }

  logout(){
    this.afAuth.signOut().then(()=>this.router.navigate(['/login']));//<-- Cerramos sesion y redireccionamos al login
  }
  
}
