import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Area } from 'src/app/interfaces/area';
import { TokenModel } from 'src/app/interfaces/token-model';
import { AreaService } from 'src/app/services/area.service';
import { ManagePasswordService } from 'src/app/services/manage-password.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user-details',
  templateUrl: './edit-user-details.component.html',
  styleUrls: ['./edit-user-details.component.css']
})
export class EditUserDetailsComponent implements OnInit {

  default : boolean = false;
  userData: any;
  areaList: Area[] = [];
  userToken: TokenModel = {} as TokenModel;
  id: string = '';

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
    

  }

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
    isDeleted : ['']
  });

  ngOnInit(): void {
    this.userToken = JSON.parse(localStorage.getItem('userToken')!);
    this.userToken = this.managepasswordService.decryptData(this.userToken.token);

    this.id = this.route.snapshot.params['id'];
    this.userForm.controls['userId'].setValue(this.id, {
      onlySelf: true,
    });
    this.userForm.controls['isDeleted'].setValue(this.default, {
      onlySelf: true,
    });

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

      this.userService.getUserById(this.userToken.token,Number.parseInt(this.id)).subscribe({
        next: (data) => this.userForm.setValue(data),
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
    this.updateUser();
  }

  updateUser(){
    this.userService.editUser(this.userForm.value,this.userToken.token).subscribe({
      error : (error)=>{
        if(error.status == 400){
          alert("Error-"+error.status+" : Please Enter Valid Data!!!!");
        }else{
          alert(error.statusText);
        }
      }
      });
    this.router.navigate(['../../userdetails'], { relativeTo: this.route });
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
