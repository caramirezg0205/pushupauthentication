import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { HomeComponent } from '../../home/home.component';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations : fuseAnimations
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginFormErrors: any;
  error: boolean = false;
  isChecked = false;

  constructor(
      private fuseConfig: FuseConfigService,
      private formBuilder: FormBuilder,
      private authService: AuthService,
      public snackBar: MatSnackBar,
      private router: Router
  )
  {
      this.fuseConfig.setConfig({
          layout: {
              navigation: 'none',
              toolbar   : 'none',
              footer    : 'none'
          }
      });

      this.loginFormErrors = {
          username   : {},
          password: {}
      };
  }

  public ngOnInit()
  {
      this.loginForm = this.formBuilder.group({
          username   : ['', [Validators.required,this.emailDomainValidator]],
          password: ['', Validators.required]
      });

      this.loginForm.valueChanges.subscribe(() => {
          this.onLoginFormValuesChanged();
      });
  }

   public emailDomainValidator(control: FormControl) { 
    let email = control.value; 
    if (email && email.indexOf("@") != -1) { 
      let [_, domain] = email.split("@"); 
      if (domain !== "pushup.com") { 
        return {
          emailDomain: {
            parsedDomain: domain
          }
        }
      }
    }
    return null; 
  }

 public credentialsValidator(control: FormControl) { 
      console.log(this.error)
      if (this.error) { 
        return {
          credentials: {
            parsedCredentials: "invalid"
          }
        }
      }
    return null; 
  }

  public onLoginFormValuesChanged()
  {
      if(!this.error){
        for ( const field in this.loginFormErrors )
        {
            if ( !this.loginFormErrors.hasOwnProperty(field) )
            {
                continue;
            }
  
            // Clear previous errors
            this.loginFormErrors[field] = {};
  
            // Get the control
            const control = this.loginForm.get(field);
  
            if ( control && control.dirty && !control.valid )
            {
                this.loginFormErrors[field] = control.errors;
            }
        }
      }
     
  }
  public onChkChange(){
    this.isChecked = (this.isChecked === true )? false : true;
  }

  public login() {
    const postData = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value,
      remember: this.isChecked
    }
    this.authService.login(postData,dataLogin => {
        if(dataLogin.obj.type == 'success'){
            this.error = false;
            this.authService.decodeToken(dataLogin.obj.token, dataToken => {
              const postData = {
                token: dataLogin.obj.token,
                fk_usuario: dataToken.obj.fk_usuario,
                fechacreacion: new Date()
              }
              this.authService.registrarToken(postData, data => {
                localStorage.setItem('authServerToken',JSON.stringify(dataLogin));
                this.router.navigateByUrl('/home')
                
              })
            })
        }else{
                this.snackBar.open("Credenciales no validas", "Error!", {
                  duration: 4000
                });
            }
    })
  }
}
