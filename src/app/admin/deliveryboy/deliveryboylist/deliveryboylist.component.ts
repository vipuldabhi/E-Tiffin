import { Component, OnInit } from '@angular/core';
import { Deliveryboy } from 'src/app/interfaces/deliveryboy';
import { TokenModel } from 'src/app/interfaces/token-model';
import { DeliveryboyService } from 'src/app/services/deliveryboy.service';
import { ManagePasswordService } from 'src/app/services/manage-password.service';

@Component({
  selector: 'app-deliveryboylist',
  templateUrl: './deliveryboylist.component.html',
  styleUrls: ['./deliveryboylist.component.css']
})
export class DeliveryboylistComponent implements OnInit {

  deliveryboyList: Deliveryboy[] = [];
  remove: number = 0;
  adminToken: string = "";
  sorting : number = 0;
  reference : number = 0;
  searchDeliveryBoy : string = "";

   // pagination

   pageSize: number = 10;
   page: number = 1;
   count: number = this.deliveryboyList.length;
 
   handlePageChange(event: number): void {
     this.page = event;
   }

  constructor(
    private deliveryboyService: DeliveryboyService,
    private managepasswordService : ManagePasswordService

  ) {}


  ngOnInit(): void {
    this.adminToken = JSON.parse(localStorage.getItem('adminToken')!);
    this.adminToken = this.managepasswordService.decryptData(this.adminToken);

    // get Interval list
    this.deliveryboyService.getDeliveryBoy(this.adminToken).subscribe({
      next: (data) => {(this.deliveryboyList = data);
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

    //get sorted data

    change() {
      this.deliveryboyService
        .getSortedData(this.adminToken, this.sorting, this.reference)
        .subscribe({
          next: (data) => (this.deliveryboyList = data),
          error: (error) => {
            if (error.status == 404) {
              alert('Error-' + error.status + ' : Data Not Found!!!!');
            } else {
              alert(error.statusText);
            }
          },
        });
    }

    reset(){
      this.ngOnInit();
    }


  deleteDeliveryBoy(e: any) {
    this.remove = e.target.value;
    this.deliveryboyService.deleteDeliveryBoy(this.adminToken, this.remove).subscribe({
      error: (error) => {
        if (error.status == 400) {
          alert(
            'Error-' +
              error.status +
              ' : Not Able to delete, because already have Order for this foodType!!!!'
          );
        } else {
          alert(error.statusText);
        }
      },
    });
    this.deliveryboyList = [];
    this.ngOnInit();
  }


}
