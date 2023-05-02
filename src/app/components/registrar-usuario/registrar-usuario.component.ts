import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {
  registrarUsuario: FormGroup;
  loading:boolean = false;

  constructor(private fb: FormBuilder,
    private afAuth: AngularFireAuth, 
    private toastr: ToastrService,
    private router: Router,
    private firebaseError: FirebaseCodeErrorService
    ) { //<-- Agregamos el servicio de autenticacion y todos los modulos necesarios
    this.registrarUsuario = this.fb.group({//<-- Creamos el formulario 
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(6)]],
      repetirPassword: ['',Validators.required]
    }); 
  }

  ngOnInit(): void {
  }

  registrar(){//<-- Metodo para registrar un usuario
    const email = this.registrarUsuario.value.email;
    const password = this.registrarUsuario.value.password;
    const repetirPassword = this.registrarUsuario.value.repetirPassword;
    
    if(password !== repetirPassword){
      this.toastr.error('Las contraseñas no coinciden','Error');
      return;
    }

    this.loading = true;//<-- Mostramos el loading

    this.afAuth.createUserWithEmailAndPassword(email,password).then(()=>{//<-- Creamos el usuario con el metodo de firebase
      //this.loading = false;//<-- Ocultamos el loading
      //this.toastr.success('Usuario registrado con exito','Exito')
      //this.router.navigate(['/login']);//<-- Redireccionamos al login
      this.verificarCorreo();
    }).catch((error)=>{
      console.log(error);
      this.loading = false;
      //alert(this.firebaseError(error.code)<--en caso de no usar toastr
      this.toastr.error(this.firebaseError.codeError(error.code),'Error')//<-- Mostramos el error
    });
  }

  verificarCorreo(){//<-- Metodo para verificar el correo
    this.afAuth.currentUser.then(user=> user?.sendEmailVerification())//<-- Obtenemos el usuario actual y enviamos el correo de verificacion
      .then(()=>{
        this.toastr.info('Se ha enviado un correo de verificacion','Verificar correo');
        this.router.navigate(['/login']);
      })
  }
}
