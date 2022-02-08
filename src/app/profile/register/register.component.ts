import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { common } from 'src/app/common/common';
import { Area } from 'src/app/interfaces/area';
import { AreaService } from 'src/app/services/area.service';
import { AuthService } from 'src/app/services/auth.service';
import { DeliveryboyService } from 'src/app/services/deliveryboy.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private areaService: AreaService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private deliveryboyService : DeliveryboyService
  ) {
    this.registerForm.controls['role'].setValue(this.default, {
      onlySelf: true,
    });
    this.registerForm.controls['areaId'].setValue('Please Select Area', {
      onlySelf: true,
    });
    this.registerForm.controls['assignedAreaId'].setValue('Please Select AssignedArea', {
      onlySelf: true,
    });
    this.registerForm.controls['isDeleted'].setValue(this.default2, {
      onlySelf: true,
    });

    for (var i of common.Roles) {
      this.roles.push(i);
    }
  }

  default: string = common.Roles[0];
  default2: boolean = false;
  roles: string[] = [];
  areaList: Area[] = [];
  isdeliveryboy : boolean = false;

  registerForm = this.fb.group({
    role: [''],
    firstName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z]+$'),
      ],
    ],
    middleName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z]+$'),
      ],
    ],
    lastName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z]+$'),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    mobileNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    areaId: [''],
    address: ['', [Validators.required, Validators.minLength(10)]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '^(?=.*[0-9])' +
            '(?=.*[a-z])(?=.*[A-Z])' +
            '(?=.*[@#$%^&+=])' +
            '(?=\\S+$).{8,20}$'
        ),
      ],
    ],
    confirmPassword: ['', [Validators.required]],
    isDeleted: [''],
    assignedAreaId : ['']
  });

  ngOnInit(): void {
    // get area from database
    this.areaService.getArea().subscribe({
      next: (data) => {
        this.areaList = data;
        console.log(this.areaList);
      },
      error: (error) => {
        if (error.status == 400) {
          alert('Error-' + error.status + ' :Data Not Found!!!!');
        } else {
          alert(error.statusText);
        }
      },
    });
  }

  changeRole(e:any){
    if(e.target.value == common.Roles[1]){
      this.isdeliveryboy = true;
    }else{
      this.isdeliveryboy = false;
    }
  }

  submit() {
    common.role = this.registerForm.get('role')?.value;

    console.log(this.registerForm.value);
    if (
      this.registerForm.value.Password !=
      this.registerForm.value.ConfirmPassword
    ) {
      alert('Password and ConfirmPassword must be Match!!!!');
    } else {
      if (common.role == this.roles[0]) {
        this.authService
          .registerUser(this.registerForm.value)
          .subscribe((data) => {
            if (data == true) {
              alert('Registered Successfully!!!');
            } else {
              alert('You are Already Register!!!!');
            }

            this.userService
              .addUser(this.registerForm.value)
              .subscribe({
                error: (error) => {
                  if (error.status == 400) {
                    alert(
                      'Error-' + error.status + ' : Please Enter Valid Data!!!!'
                    );
                  } else {
                    alert(error.statusText);
                  }
                },
              });
          });
      } else if (common.role == this.roles[1]) {
        // this.registerForm.controls['areaId'].setValue('Please Select Area', {
        //   onlySelf: true,
        // });
        this.authService
          .registerDeliveryboy(this.registerForm.value)
          .subscribe((data) => {

            if (data == true) {
              alert('Registered Successfully as Deliveryboy!!!');
            } else {
              alert('You are Already Register!!!!');
            }

            this.deliveryboyService
              .addDeliveryBoy(this.registerForm.value)
              .subscribe({
                error: (error) => {
                  if (error.status == 400) {
                    alert(
                      'Error-' + error.status + ' : Please Enter Valid Data!!!!'
                    );
                  } else {
                    alert(error.statusText);
                  }
                },
              });

          });
      } else if (common.role == this.roles[2]) {
        this.authService
          .registerAdmin(this.registerForm.value)
          .subscribe((data) => {

            if (data == true) {
              alert('Registered Successfully as Admin!!!');
            } else {
              alert('You are Already Register!!!!');
            }
          });
      }
    }

    // localStorage.setItem('userEmail',this.registerForm.value.email);

    this.router.navigate(['../home'], { relativeTo: this.route });
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get middleName() {
    return this.registerForm.get('middleName');
  }

  get mobileNo() {
    return this.registerForm.get('mobileNo');
  }

  get address() {
    return this.registerForm.get('address');
  }
}
