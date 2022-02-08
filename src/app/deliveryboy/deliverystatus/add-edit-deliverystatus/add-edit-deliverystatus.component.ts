import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Interval } from 'src/app/interfaces/interval';
import { Orderdetails } from 'src/app/interfaces/orderdetails';
import { TokenModel } from 'src/app/interfaces/token-model';
import { DeliverystatusService } from 'src/app/services/deliverystatus.service';
import { IntervalService } from 'src/app/services/interval.service';
import { ManagePasswordService } from 'src/app/services/manage-password.service';
import { OrderdetailsService } from 'src/app/services/orderdetails.service';

@Component({
  selector: 'app-add-edit-deliverystatus',
  templateUrl: './add-edit-deliverystatus.component.html',
  styleUrls: ['./add-edit-deliverystatus.component.css']
})
export class AddEditDeliverystatusComponent implements OnInit {

  default: boolean = false;
  default2: boolean = true;
  deliveryboyToken : TokenModel = {} as TokenModel;
  intervalList: Interval[] = [];
  orderList: Orderdetails[] = [];
  isAddMode: boolean = true;
  id: string = '';
  order : Orderdetails[] = []; 
  deliveryStatusData : any;


  constructor(
    private fb: FormBuilder,
    private deliverystatusService: DeliverystatusService,
    private router: Router,
    private intervalservice: IntervalService,
    private orderdetailsservice: OrderdetailsService,
    private route: ActivatedRoute,
    private managepasswordService : ManagePasswordService
  ) {
    this.deliveryStatusForm.controls['orderId'].setValue(
      'Please Select OrderId',
      {
        onlySelf: true,
      }
    );
    this.deliveryStatusForm.controls['isdeleted'].setValue(this.default, {
      onlySelf: true,
    });
    this.deliveryStatusForm.controls['status'].setValue(this.default2, {
      onlySelf: true,
    });
    this.deliveryStatusForm.controls['intervalId'].setValue(
      'Please Select Interval',
      {
        onlySelf: true,
      }
    );
  }

  deliveryStatusForm = this.fb.group({
    deliveryId: [''],
    orderId: ['',Validators.required],
    intervalId: ['', Validators.required],
    deliveryDate: ['', Validators.required],
    status: [''],
    isdeleted: [''],
  });

  ngOnInit(): void {
    this.deliveryboyToken = JSON.parse(localStorage.getItem('deliveryboyToken')!);
    this.deliveryboyToken.token = this.managepasswordService.decryptData(this.deliveryboyToken.token);

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.deliveryStatusForm.controls['deliveryId'].setValue(this.id, {
      onlySelf: true,
    });

    // get Interval
    this.intervalservice.getInterval().subscribe((data) => {
      this.intervalList = data;
    });

    // get OrderDetails
    this.orderdetailsservice.getOrderdetails(this.deliveryboyToken.token).subscribe((data) => {
      this.orderList = data;
    });

    // set forms value for update data

    if(this.isAddMode == false){
      this.deliverystatusService.getDeliveryStatusById(this.deliveryboyToken.token,Number.parseInt(this.id)).subscribe({
        next: (data) => {
          this.deliveryStatusData = data;
          this.deliveryStatusForm.patchValue(this.deliveryStatusData);
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
  }

  submit() {

    if (this.isAddMode) {
      this.createDeliveryStatus();
    } else {
      this.updateDeliveryStatus();
    }
  }

  createDeliveryStatus() {
    console.log(this.deliveryStatusForm.value);
    
    this.deliverystatusService.addDeliveryStatus(
      this.deliveryStatusForm.value,
      this.deliveryboyToken.token
    ).subscribe({
      error : (error)=>{
        if(error.status == 400){
          alert("Error-"+error.status+" : Please Enter Valid Data!!!!");
        }else{
          alert(error.statusText);
        }
      }
      });
      
    this.router.navigate(['../deliverystatus'], {
      relativeTo: this.route,
    });
  }

  updateDeliveryStatus() {
    this.deliverystatusService.updateDeliveryStatus(
      this.deliveryStatusForm.value,
      this.deliveryboyToken.token
    ).subscribe({
      error : (error)=>{
        if(error.status == 400){
          alert("Error-"+error.status+" : Please Enter Valid Data!!!!");
        }else{
          alert(error.statusText);
        }
      }
      });
    this.router.navigate(['../../deliverystatus'], {
      relativeTo: this.route,
    });
  }

  get orderId() {
    return this.deliveryStatusForm.get('orderId');
  }

  get deliveryDate() {                          
    return this.deliveryStatusForm.get('deliveryDate');
  }


}
