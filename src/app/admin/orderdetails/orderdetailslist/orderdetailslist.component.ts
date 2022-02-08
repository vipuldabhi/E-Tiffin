import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Orderdetails } from 'src/app/interfaces/orderdetails';
import { TokenModel } from 'src/app/interfaces/token-model';
import { ManagePasswordService } from 'src/app/services/manage-password.service';
import { OrderdetailsService } from 'src/app/services/orderdetails.service';

@Component({
  selector: 'app-orderdetailslist',
  templateUrl: './orderdetailslist.component.html',
  styleUrls: ['./orderdetailslist.component.css'],
})
export class OrderdetailslistComponent implements OnInit {
  orderList: Orderdetails[] = [];
  remove: number = 0;
  adminToken: string = '';
  sorting: number = 0;
  reference: number = 0;
  searchOrder: string = '';

  // pagination

  pageSize: number = 10;
  page: number = 1;
  count: number = this.orderList.length;

  handlePageChange(event: number): void {
    this.page = event;
  }

  constructor(
    private orderdetailsService: OrderdetailsService,
    private managepasswordService: ManagePasswordService
  ) {}

  ngOnInit(): void {
    this.adminToken = JSON.parse(localStorage.getItem('adminToken')!);
    this.adminToken = this.managepasswordService.decryptData(this.adminToken);

    // get Interval list
    this.orderdetailsService.getOrderdetails(this.adminToken).subscribe({
      next: (data) => {
        this.orderList = data;
        console.log(this.orderList);
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
    this.orderdetailsService
      .getSortedOrderdetails(this.adminToken, this.sorting, this.reference)
      .subscribe({
        next: (data) => (this.orderList = data),
        error: (error) => {
          if (error.status == 404) {
            alert('Error-' + error.status + ' : Data Not Found!!!!');
          } else {
            alert(error.statusText);
          }
        },
      });
  }

  deleteMenu(e: any) {
    this.remove = e.target.value;
    this.orderdetailsService
      .deleteOrder(this.adminToken, this.remove)
      .subscribe({
        error: (error) => {
          if (error.status == 400) {
            alert('Error-' + error.status + ' : Not Able to delete!!!!');
          } else {
            alert(error.statusText);
          }
        },
      });
    this.orderList = [];
    this.ngOnInit();
  }
}
