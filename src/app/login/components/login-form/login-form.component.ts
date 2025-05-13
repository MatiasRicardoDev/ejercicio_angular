import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  form:FormGroup;
  credentialsError = false;
  constructor(private fb:FormBuilder, private service:LoginService) {
    this.form = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if(this.form.valid) {
      console.log('Form Submitted!', this.form.value);
      this.service.login(this.form.value.email, this.form.value.password).subscribe(
        (response)=>{
          if(response){
            this.credentialsError = false;
              window.location.href = '/products';
          }else{
            this.credentialsError = true;
            this.form.reset();
          }
        },
        (error)=>{
          console.error('Error during login:', error);
          this.credentialsError = true;
          this.form.reset();
        }
      );

    }else{
      this.form.markAllAsTouched();
    }
  }

}
