import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Area } from 'src/app/interfaces/area';
import { Deliveryboy } from 'src/app/interfaces/deliveryboy';
import { TokenModel } from 'src/app/interfaces/token-model';
import { AreaService } from 'src/app/services/area.service';
import { DeliveryboyService } from 'src/app/services/deliveryboy.service';
import { ManagePasswordService } from 'src/app/services/manage-password.service';

@Component({
  selector: 'app-add-edit-deliveryboy',
  templateUrl: './add-edit-deliveryboy.component.html',
  styleUrls: ['./add-edit-deliveryboy.component.css']
})
export class AddEditDeliveryboyComponent implements OnInit {

  default2 : boolean = false;
  deliveryboyData: Deliveryboy = {} as Deliveryboy;
  areaList: Area[] = [];
  adminToken : string = "";
  isAddMode: boolean = true;
  id: string = '';

  constructor(
    private fb: FormBuilder,
    private route : ActivatedRoute,
    private router : Router,
    private areaService: AreaService,
    private deliveryboyService: DeliveryboyService,
    private managepasswordService : ManagePasswordService

  ) {
   
    this.deliveryboyForm.controls['assignedAreaId'].setValue('Please Select Area', {
      onlySelf: true,
    });
    this.deliveryboyForm.controls['isDeleted'].setValue(this.default2, {
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
    this.adminToken = JSON.parse(localStorage.getItem('adminToken')!);
    this.adminToken = this.managepasswordService.decryptData(this.adminToken);

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.deliveryboyForm.controls['id'].setValue(this.id, {
      onlySelf: true,
    });

    // set forms value for update data

    if (this.isAddMode == false) {
      this.deliveryboyService
        .getDeliveryBoyById(this.adminToken, Number.parseInt(this.id))
        .subscribe({
          next: (data) => {
            this.deliveryboyData = data;
            this.deliveryboyForm.patchValue(this.deliveryboyData);
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
      this.createDeliveryBoy();
    } else {
      this.updateDeliveryBoy();
    }
  }

  createDeliveryBoy(){
    this.deliveryboyData = this.deliveryboyForm.value;
    this.deliveryboyService.addDeliveryBoy(this.deliveryboyForm.value).subscribe({
      error: (error) => {
        if (error.status == 400) {
          alert('Error-' + error.status + ' : Please Enter Valid Data!!!!');
        } else {
          alert(error.statusText);
        }
      },
    });
      
    this.router.navigate(['../deliveryboylist'], { relativeTo: this.route });
  }

  updateDeliveryBoy(){
    this.deliveryboyService.updateDeliveryBoy(this.deliveryboyForm.value,this.adminToken).subscribe({
      error : (error)=>{
        if(error.status == 400){
          alert("Error-"+error.status+" : Please Enter Valid Data!!!!");
        }else{
          alert(error.statusText);
        }
      }
      });
    this.router.navigate(['../../deliveryboylist'], { relativeTo: this.route });
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
