import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cancellationstatus } from 'src/app/interfaces/cancellationstatus';
import { Interval } from 'src/app/interfaces/interval';
import { Orderdetails } from 'src/app/interfaces/orderdetails';
import { TokenModel } from 'src/app/interfaces/token-model';
import { CancellationstatusService } from 'src/app/services/cancellationstatus.service';
import { IntervalService } from 'src/app/services/interval.service';
import { ManagePasswordService } from 'src/app/services/manage-password.service';
import { OrderdetailsService } from 'src/app/services/orderdetails.service';

@Component({
  selector: 'app-add-edit-cancellationstatus',
  templateUrl: './add-edit-cancellationstatus.component.html',
  styleUrls: ['./add-edit-cancellationstatus.component.css'],
})
export class AddEditCancellationstatusComponent implements OnInit {
  default: boolean = false;
  default2: boolean = true;
  adminToken : string = "";
  intervalList: Interval[] = [];
  orderList: Orderdetails[] = [];
  isAddMode: boolean = true;
  id: string = '';
  order: Orderdetails[] = [];
  currentDate = new Date();
  expiryDate: Date = new Date();
  days: number = 0;
  orderData: Orderdetails = {} as Orderdetails;
  diffDays : number = 0;
  status : Cancellationstatus = {} as Cancellationstatus;

  constructor(
    private fb: FormBuilder,
    private cancellationstatusservice: CancellationstatusService,
    private router: Router,
    private intervalservice: IntervalService,
    private orderdetailsservice: OrderdetailsService,
    private route: ActivatedRoute,
    private managepasswordService : ManagePasswordService

  ) {
    this.cancellationStatusForm.controls['orderId'].setValue(
      'Please Select OrderId',
      {
        onlySelf: true,
      }
    );
    this.cancellationStatusForm.controls['isdeleted'].setValue(this.default, {
      onlySelf: true,
    });
    this.cancellationStatusForm.controls['status'].setValue(this.default2, {
      onlySelf: true,
    });
    this.cancellationStatusForm.controls['intervalId'].setValue(
      'Please Select Interval',
      {
        onlySelf: true,
      }
    );
  }

  cancellationStatusForm = this.fb.group({
    cancellationId: [''],
    orderId: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    cancellationDate: ['', Validators.required],
    intervalId: ['', Validators.required],
    status: [''],
    isdeleted: [''],
  });

  ngOnInit(): void {
    this.adminToken = JSON.parse(localStorage.getItem('adminToken')!);
    this.adminToken = this.managepasswordService.decryptData(this.adminToken);
    
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.cancellationStatusForm.controls['cancellationId'].setValue(this.id, {
      onlySelf: true,
    });

    // get Interval
    this.intervalservice.getInterval().subscribe((data) => {
      this.intervalList = data;
    });

    // get OrderDetails
    this.orderdetailsservice.getOrderdetails(this.adminToken).subscribe((data) => {
      this.orderList = data;
    });

    // set form value for update

    if(this.isAddMode == false){
      this.cancellationstatusservice.getStatusById(this.adminToken,Number.parseInt(this.id)).subscribe({
        next: (data) => {
          this.status = data;
          this.cancellationStatusForm.patchValue(this.status);                
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
    // getorder details
    this.orderdetailsservice
      .getOrderById(this.adminToken, this.cancellationStatusForm.value.orderId)
      .subscribe({
        next: (data) => {
          this.orderData = data;
          if (this.orderData.durationId! == 1) {
            this.days = 1;
          } else if (this.orderData.durationId! == 2) {
            this.days = 7;
          } else if (this.orderData.durationId! == 3) {
            this.days = 30;
          } else if (this.orderData.durationId! == 4) {
            this.days = 90;
          }
          // console.log(this.orderData[0].orderDate);
          
          // this.expiryDate = this.orderData[0].orderDate;
          // this.expiryDate = this.addDays(this.days);
          // console.log(this.cancellationStatusForm.value.cancellationDate);
          
          // var diff = Math.abs(this.cancellationStatusForm.value.cancellationDate.getTime() - this.orderData[0].orderDate.getTime());
          // this.diffDays = Math.ceil(diff / (1000 * 3600 * 24));

          // this.diffDays = this.cancellationStatusForm.value.cancellationDate.getDays() - this.orderData[0].orderDate.getDays();

          console.log(this.diffDays);
          
        },
        error: (error) => {
          if (error.status == 404) {
            alert('Error-' + error.status + ' : Data Not Found!!!!');
          } else {
            alert(error.statusText);
          }
        },
      });
      

    if (this.diffDays > this.days) {
      alert("Please Enter Valida Date!!!!!");
    }else{
      if (this.isAddMode) {
        this.createStatus();
      } else {
        this.updateStatus();
      }
    }
  }

  createStatus() {
    this.cancellationstatusservice
      .addCancellationStatus(this.cancellationStatusForm.value, this.adminToken)
      .subscribe({
        error: (error) => {
          if (error.status == 400) {
            alert('Error-' + error.status + ' : Please Enter Valid Data!!!!');
          } else {
            alert(error.statusText);
          }
        },
      });

    this.router.navigate(['../cancellationstatuslist'], {
      relativeTo: this.route,
    });
  }

  updateStatus() {
    this.cancellationstatusservice
      .updateCancellationStatus(this.cancellationStatusForm.value, this.adminToken)
      .subscribe({
        error: (error) => {
          if (error.status == 400) {
            alert('Error-' + error.status + ' : Please Enter Valid Data!!!!');
          } else {
            alert(error.statusText);
          }
        },
      });
    this.router.navigate(['../../cancellationstatuslist'], {
      relativeTo: this.route,
    });
  }        

    
  // // add days to date
  // addDays(days : number): Date{
  //   var futureDate = this.expiryDate;
  //   futureDate.setDate(futureDate.getDate() + days);
  //   return futureDate;
  // }

  get orderId() {
    return this.cancellationStatusForm.get('orderId');
  }

  get cancellationDate() {
    return this.cancellationStatusForm.get('cancellationDate');
  }
}
