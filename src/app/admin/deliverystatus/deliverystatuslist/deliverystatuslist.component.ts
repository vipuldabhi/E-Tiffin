import { Component, OnInit } from '@angular/core';
import { Deliverystatus } from 'src/app/interfaces/deliverystatus';
import { TokenModel } from 'src/app/interfaces/token-model';
import { DeliverystatusService } from 'src/app/services/deliverystatus.service';
import { ManagePasswordService } from 'src/app/services/manage-password.service';

@Component({
  selector: 'app-deliverystatuslist',
  templateUrl: './deliverystatuslist.component.html',
  styleUrls: ['./deliverystatuslist.component.css'],
})
export class DeliverystatuslistComponent implements OnInit {
  deliverystatusList: Deliverystatus[] = [];
  remove: number = 0;
  adminToken: string = '';
  searchDeliveryStatus: string = '';

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
    this.adminToken = JSON.parse(localStorage.getItem('adminToken')!);
    this.adminToken = this.managepasswordService.decryptData(this.adminToken);

    // get area list
    this.deliverystatusService.getDeliveryStatus(this.adminToken).subscribe({
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
      .deleteDeliveryStatus(this.adminToken, this.remove)
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
