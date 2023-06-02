import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  isCollapsed : boolean = true;


  constructor(private afAuth: AngularFireAuth,
    private router:Router) { }

  ngOnInit(): void {

  }

  logout(){
    this.afAuth.signOut().then(()=>this.router.navigate(['/login']));//<-- Cerramos sesion y redireccionamos al login
  }

  
}
