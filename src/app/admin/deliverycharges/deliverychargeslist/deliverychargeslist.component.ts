import { Component, OnInit } from '@angular/core';
import { Deliverycharges } from 'src/app/interfaces/deliverycharges';
import { TokenModel } from 'src/app/interfaces/token-model';
import { DeliverychargesService } from 'src/app/services/deliverycharges.service';
import { ManagePasswordService } from 'src/app/services/manage-password.service';

@Component({
  selector: 'app-deliverychargeslist',
  templateUrl: './deliverychargeslist.component.html',
  styleUrls: ['./deliverychargeslist.component.css']
})
export class DeliverychargeslistComponent implements OnInit {

  deliverychargesList: Deliverycharges[] = [];
  remove: number = 0;
  adminToken: string = "";

   // pagination

   pageSize: number = 10;
   page: number = 1;
   count: number = this.deliverychargesList.length;
 
   handlePageChange(event: number): void {
     this.page = event;
   }

  constructor(
    private deliverychargesService: DeliverychargesService,
    private managepasswordService : ManagePasswordService

  ) {}

 

  ngOnInit(): void {
    this.adminToken = JSON.parse(localStorage.getItem('adminToken')!);
    this.adminToken = this.managepasswordService.decryptData(this.adminToken);

    // get Interval list
    this.deliverychargesService.getDeliveryCharges().subscribe({
      next: (data) => (this.deliverychargesList = data),
      error: (error) => {
        if (error.status == 400) {
          alert('Error-' + error.status + ' :Data Not Found!!!!');
        } else {
          alert(error.statusText);
        }
      },
    });
  }

  deleteDeliveryCharges(e: any) {
    this.remove = e.target.value;
    this.deliverychargesService.deleteDeliveryCharge(this.adminToken, this.remove).subscribe({
      error: (error) => {
        if (error.status == 400) {
          alert(
            'Error-' +
              error.status +
              ' : Not Able to delete!!!!'
          );
        } else {
          alert(error.statusText);
        }
      },
    });
    this.deliverychargesList = [];
    this.ngOnInit();
  }
}
