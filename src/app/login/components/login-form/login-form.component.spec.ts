import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginService } from '../../services/login.service';

import { of } from 'rxjs';
import { LoginPageComponent } from '../login-page/login-page.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let mockingService:any;

  beforeEach(async () => {
    mockingService = jasmine.createSpyObj('LoginService', ['login']);

    await TestBed.configureTestingModule({
      declarations: [LoginFormComponent,LoginPageComponent],
      imports: [ReactiveFormsModule,HttpClientTestingModule],
      providers: [{provide: LoginService, useValue: mockingService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe Crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe Crear el form con los campos',()=>{
    expect(component.form.contains('email')).toBeTruthy();
    expect(component.form.contains('password')).toBeTruthy();
  });

  it('El campo email debe ser requerido y de tipo email', () => {
    let email = component.form.get('email');
    email?.setValue('');
    expect(email?.valid).toBeFalsy();
    email?.setValue('invalidEmail');
    expect(email?.valid).toBeFalsy();
    email?.setValue('valid@mail.com');
    expect(email?.valid).toBeTruthy();
  });

  it('El campo password debe ser requerido y de un minimo de 6 caracteres', () => {
    let password = component.form.get('password');
    password?.setValue('');
    password?.markAsTouched();
    password?.updateValueAndValidity();
    expect(password?.valid).toBeFalsy();
    expect(password?.hasError('required')).toBeTrue();
    expect(password?.hasError('minlength')).toBeFalse();

    password?.setValue('123');
    password?.markAsTouched();
    password?.updateValueAndValidity();
    expect(password?.valid).toBeFalsy();
    expect(password?.hasError('required')).toBeFalse();
    expect(password?.hasError('minlength')).toBeTrue();

    password?.setValue('123456');
    password?.markAsTouched();
    password?.updateValueAndValidity();
    expect(password?.valid).toBeTruthy();
    expect(password?.hasError('required')).toBeFalse();
    expect(password?.hasError('minlength')).toBeFalse();
  });

  it('Si el formulario es valido, debe llamar al servicio',()=>{
    mockingService.login.and.returnValue(of(true));
    component.form.setValue({email:'user@demo.com',password:'123456'});
    component.onSubmit();
    expect(mockingService.login).toHaveBeenCalledWith('user@demo.com', '123456');
    expect(component.credentialsError).toBeFalse();
  })

  it('Mostrar error si el login devuelve false', () => {
    mockingService.login.and.returnValue(of(false));

    component.form.setValue({ email: 'test@demo.com', password: 'wrongpass' });
    component.onSubmit();

    expect(component.credentialsError).toBeTrue();
    expect(component.form.value.email).toBe(null);
  });

  it('No debe llamar al servicio si el formulario invalido', () => {
    component.form.setValue({ email: null, password: null });
    component.onSubmit();

    expect(mockingService.login).not.toHaveBeenCalled();
  });

});
