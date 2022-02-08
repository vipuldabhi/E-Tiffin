import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Area } from 'src/app/interfaces/area';
import { TokenModel } from 'src/app/interfaces/token-model';
import { AreaService } from 'src/app/services/area.service';
import { DeliveryboyService } from 'src/app/services/deliveryboy.service';
import { ManagePasswordService } from 'src/app/services/manage-password.service';

@Component({
  selector: 'app-editdeliveryboy',
  templateUrl: './editdeliveryboy.component.html',
  styleUrls: ['./editdeliveryboy.component.css']
})
export class EditdeliveryboyComponent implements OnInit {

  
  default : boolean = false;
  deliveryboyData: any;
  areaList: Area[] = [];
  deliveryboyToken: TokenModel = {} as TokenModel;
  id: string = '';

  constructor(
    private fb: FormBuilder,
    private route : ActivatedRoute,
    private router : Router,
    private areaService: AreaService,
    private deliveryboyService: DeliveryboyService,
    private managepasswordService : ManagePasswordService
  ) {
   
    this.deliveryboyForm.controls['assignedAreaId'].setValue('Please Select AssignedArea', {
      onlySelf: true,
    });
    this.deliveryboyForm.controls['isDeleted'].patchValue(this.default, {
      onlySelf: true,
    });
    
  }

  deliveryboyForm = this.fb.group({
    id : [''],
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
    assignedAreaId: [''],
    address: ['', [Validators.required,Validators.minLength(10)]],
    isDeleted : ['']
  });

  ngOnInit(): void {
    this.deliveryboyToken = JSON.parse(localStorage.getItem('deliveryboyToken')!);
    this.deliveryboyToken.token = this.managepasswordService.decryptData(this.deliveryboyToken.token);

    this.id = this.route.snapshot.params['id'];
    this.deliveryboyForm.controls['id'].setValue(this.id, {
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

      this.deliveryboyService.getDeliveryBoyById(this.deliveryboyToken.token,Number.parseInt(this.id)).subscribe({
        next: (data) => this.deliveryboyForm.patchValue(data),
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
    this.updateDeliveryboy();
  }

  updateDeliveryboy(){
    this.deliveryboyService.updateDeliveryBoy(this.deliveryboyForm.value,this.deliveryboyToken.token).subscribe({
      error : (error)=>{
        if(error.status == 400){
          alert("Error-"+error.status+" : Please Enter Valid Data!!!!");
        }else{
          alert(error.statusText);
        }
      }
      });
    this.router.navigate(['../../'], { relativeTo: this.route });
  }


  get firstName() {
    return this.deliveryboyForm.get('firstName');
  }

  get lastName() {
    return this.deliveryboyForm.get('lastName');
  }

  get email() {
    return this.deliveryboyForm.get('email');
  }

  get middleName() {
    return this.deliveryboyForm.get('middleName');
  }

  get mobileNo() {
    return this.deliveryboyForm.get('mobileNo');
  }

  get address() {
    return this.deliveryboyForm.get('address');
  }

}
