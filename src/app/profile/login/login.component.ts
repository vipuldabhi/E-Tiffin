import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { common } from 'src/app/common/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ManagePasswordService } from 'src/app/services/manage-password.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route : ActivatedRoute,
    private cookieService : CookieService,
    private managePasswordService : ManagePasswordService
  ) {
    this.loginForm.controls['role'].setValue(this.default, { onlySelf: true });

    for (var i of common.Roles) {
      this.roles.push(i);
    }
  }

  default: string = common.Roles[0];
  roles: string[] = [];

  loginForm = this.fb.group({
    role: [''],
    Email: ['', [Validators.required, Validators.email]],
    Password: [
      '',
      [
        Validators.required,
        ,
        Validators.pattern(
          '^(?=.*[0-9])' +
            '(?=.*[a-z])(?=.*[A-Z])' +
            '(?=.*[@#$%^&+=])' +
            '(?=\\S+$).{8,20}$'
        ),
      ],
    ],
    remember : ['']
  });

  ngOnInit(): void {
    if(this.cookieService.get('role')){
      this.loginForm.controls['role'].patchValue(this.cookieService.get('role'));
      this.loginForm.controls['Email'].patchValue(this.cookieService.get('username'));
      this.loginForm.controls['Password'].patchValue(this.cookieService.get('password'));
    }
  }

  changeRole(e:any){
    if(e.target.value == common.Roles[0]){
      this.loginForm.controls['role'].patchValue(this.cookieService.get('role'));
      this.loginForm.controls['Email'].patchValue(this.cookieService.get('username'));
      this.loginForm.controls['Password'].patchValue(this.cookieService.get('password'));
    }else{
      this.loginForm.controls['Email'].patchValue("");
      this.loginForm.controls['Password'].patchValue("");
    }
  }

  submit() {
    common.role = this.loginForm.get('role')?.value;

    if (this.loginForm.valid) {
      console.log(this.loginForm.value);

      if (common.role == common.Roles[0]) {
        this.authService.loginUser(this.loginForm.value).subscribe((data) => {
          if (data.status == false) {
            alert('Please Enter Valid Credentials!!!!');
          } else {

            if(this.loginForm.value.remember){
              this.cookieService.set( 'role', common.role ); 
              this.cookieService.set( 'username',this.loginForm.value.Email); 
              this.cookieService.set( 'password', this.loginForm.value.Password ); 
            }
            console.log(data);
            data.token = this.managePasswordService.encryptData(data.token);

            localStorage.setItem('userToken',JSON.stringify(data));
            this.router.navigate(['../home'], { relativeTo: this.route });
          }
        });
      } else if (common.role == common.Roles[1]) {
        this.authService
          .loginDeliveryboy(this.loginForm.value)
          .subscribe((data) => {
            if (data.status == false) {
              alert('Please Enter Valid Credentials for Deliveryboy Login!!!!');
            } else {
            data.token = this.managePasswordService.encryptData(data.token);

            localStorage.setItem('deliveryboyToken',JSON.stringify(data));

              this.router.navigate(['../deliveryboy'], { relativeTo: this.route });
            }
          });
      } else if (common.role == common.Roles[2]) {
        this.authService.loginAdmin(this.loginForm.value).subscribe((data) => {
          if (data.status == false) {
            alert('Please Enter Valid Credentials for Admin Login!!!!');
          } else {
            data.token = this.managePasswordService.encryptData(data.token);

            localStorage.setItem('adminToken',JSON.stringify(data.token));

            this.router.navigate(['../admin'], { relativeTo: this.route });
          }
        });
      }
    } else {
      alert('Please enter valid data');
    }
  }

  get Email() {
    return this.loginForm.get('Email');
  }

  get Password() {
    return this.loginForm.get('Password');
  }
}
