import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Area } from 'src/app/interfaces/area';
import { TokenModel } from 'src/app/interfaces/token-model';
import { User } from 'src/app/interfaces/user';
import { AreaService } from 'src/app/services/area.service';
import { AuthService } from 'src/app/services/auth.service';
import { ManagePasswordService } from 'src/app/services/manage-password.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private route : ActivatedRoute,
    private router : Router,
    private areaService: AreaService,
    private userService: UserService,
    private managepasswordService : ManagePasswordService
  ) {
   
    this.userForm.controls['areaId'].setValue('Please Select Area', {
      onlySelf: true,
    });
    this.userForm.controls['isDeleted'].setValue(this.default2, {
      onlySelf: true,
    });

  }

  default2 : boolean = false;
  userData: User = {} as User;
  areaList: Area[] = [];
  adminToken : string = "";
  isAddMode: boolean = true;
  id: string = '';

  userForm = this.fb.group({
    userId : [''],
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
    address: ['', [Validators.required,Validators.minLength(10)]],
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
    isDeleted : ['']
  });

  ngOnInit(): void {
    this.adminToken = JSON.parse(localStorage.getItem('adminToken')!);
    this.adminToken = this.managepasswordService.decryptData(this.adminToken);

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.userForm.controls['userId'].setValue(this.id, {
      onlySelf: true,
    });

    // set forms value for update data

    if (this.isAddMode == false) {
      this.userService
        .getUserById(this.adminToken, Number.parseInt(this.id))
        .subscribe({
          next: (data) => {
            this.userData = data;
            this.userForm.patchValue(this.userData);
          },
          error: (error) => {
            if (error.status == 400) {
              alert('Error-' + error.status + ' : Please Enter Valid Data!!!!');
            } else {
              alert(error.statusText);
            }
          },
        });
    }

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


  submit() {
    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  createUser(){
    this.userData = this.userForm.value;
    localStorage.setItem('userData', JSON.stringify(this.userData));
    this.userService.addUser(this.userForm.value).subscribe({
      error: (error) => {
        if (error.status == 400) {
          alert('Error-' + error.status + ' : Please Enter Valid Data!!!!');
        } else {
          alert(error.statusText);
        }
      },
    });
      
    this.router.navigate(['../userlist'], { relativeTo: this.route });
  }

  updateUser(){
    this.userService.editUser(this.userForm.value,this.adminToken).subscribe({
      error : (error)=>{
        if(error.status == 400){
          alert("Error-"+error.status+" : Please Enter Valid Data!!!!");
        }else{
          alert(error.statusText);
        }
      }
      });
    this.router.navigate(['../../userlist'], { relativeTo: this.route });
  }


  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }

  get confirmPassword() {
    return this.userForm.get('confirmPassword');
  }

  get middleName() {
    return this.userForm.get('middleName');
  }

  get mobileNo() {
    return this.userForm.get('mobileNo');
  }

  get address() {
    return this.userForm.get('address');
  }

}
