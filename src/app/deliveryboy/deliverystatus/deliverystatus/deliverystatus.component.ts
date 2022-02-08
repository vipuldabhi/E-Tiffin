import { Component, OnInit } from '@angular/core';
import { Deliverystatus } from 'src/app/interfaces/deliverystatus';
import { TokenModel } from 'src/app/interfaces/token-model';
import { DeliverystatusService } from 'src/app/services/deliverystatus.service';
import { ManagePasswordService } from 'src/app/services/manage-password.service';

@Component({
  selector: 'app-deliverystatus',
  templateUrl: './deliverystatus.component.html',
  styleUrls: ['./deliverystatus.component.css'],
})
export class DeliverystatusComponent implements OnInit {

  deliverystatusList: Deliverystatus[] = [];
  remove: number = 0;
  deliveryboyToken: TokenModel = {} as TokenModel;
  searchStatus : string ="";
  // pagination

  pageSize: number = 10;
  page: number = 1;
  count: number = this.deliverystatusList.length;

  handlePageChange(event: number): void {
    this.page = event;
  }

  constructor(
    private deliverystatusService: DeliverystatusService,
    private managepasswordService: ManagePasswordService
  ) {}

  ngOnInit(): void {
    this.deliveryboyToken = JSON.parse(
      localStorage.getItem('deliveryboyToken')!
    );
    this.deliveryboyToken.token = this.managepasswordService.decryptData(
      this.deliveryboyToken.token
    );

    // get area list
    this.deliverystatusService
      .getDeliveryStatus(this.deliveryboyToken.token)
      .subscribe({
        next: (data) => (this.deliverystatusList = data),
        error: (error) => {
          if (error.status == 404) {
            alert('Error-' + error.status + ' : Data Not Found!!!!');
          } else {
            alert(error.statusText);
          }
        },
      });
  }

  deleteStatus(e: any) {
    this.remove = e.target.value;
    this.deliverystatusService
      .deleteDeliveryStatus(this.deliveryboyToken.token, this.remove)
      .subscribe({
        error: (error) => {
          if (error.status == 404) {
            alert('Error-' + error.status + ' : Data Not Found!!!!');
          } else {
            alert(error.statusText);
          }
        },
      });
    this.deliverystatusList = [];
    this.ngOnInit();
  }
}
