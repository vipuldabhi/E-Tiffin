import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Orderdetails } from 'src/app/interfaces/orderdetails';
import { TokenModel } from 'src/app/interfaces/token-model';
import { ManagePasswordService } from 'src/app/services/manage-password.service';
import { OrderdetailsService } from 'src/app/services/orderdetails.service';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {

  startdate : Date = new Date();
  enddate : Date = new Date();
  adminToken : string = "";
  orderList : Orderdetails[] = [];
  month : number = 0;
  year : number = 0;
  revenue : number = 0;
  totalRevenue : number = 0;

  constructor(
    private orderdetailsService : OrderdetailsService,
    private router : Router,
    private route : ActivatedRoute,
    private managepasswordService : ManagePasswordService
    ) { }

  ngOnInit(): void {
    this.adminToken = JSON.parse(localStorage.getItem('adminToken')!);
    this.adminToken = this.managepasswordService.decryptData(this.adminToken);

  }

  getOrders(){
    this.orderdetailsService.getOrderBetweenTwoDates(this.adminToken,this.startdate,this.enddate).subscribe({
      next: (data) => (this.orderList = data),
      // error: (error) => {
      //   console.log(error);
      //   this.router.navigate(['../../error',{'errorcode':error.status,'errortext':error.statusText}],{relativeTo : this.route})
      // },
      error: (error) => {
        if (error.status == 404) {
          alert('Error-' + error.status + ' : Data Not Found!!!!');
        } else {
          alert(error.statusText);
        }
      },
    });
  }

  getOrderOfTheMonth(){
    this.orderdetailsService.getOrderOfTheMonth(this.adminToken,this.month,this.year).subscribe({
      next: (data) => (this.orderList = data),
        // console.log(error);
        // this.router.navigate(['../../error',{'errorcode':error.status,'errortext':error.statusText}],{relativeTo : this.route})
        error: (error) => {
          if (error.status == 404) {
            alert('Error-' + error.status + ' : Data Not Found!!!!');
          } else {
            alert(error.statusText);
          }
        },
    });
  }

  getRevenue(){
    this.orderdetailsService.getRevenueBetweenTwoDates(this.adminToken,this.startdate,this.enddate).subscribe({
      next: (data) => {
        console.log(data[0].totalRevenueFromOrder);
        this.revenue = data[0].totalRevenueFromOrder;
      },
        error: (error) => {
          if (error.status == 404) {
            alert('Error-' + error.status + ' : Data Not Found!!!!');
          } else {
            alert(error.statusText);
          }
        },
    });
  }

  getTotalRevenue(){
    this.orderdetailsService.getTotalRevenue(this.adminToken).subscribe({
      next: (data) => {
        console.log(data);
        this.totalRevenue = data[0].totalRevenue1;
      },
        error: (error) => {
          if (error.status == 404) {
            alert('Error-' + error.status + ' : Data Not Found!!!!');
          } else {
            alert(error.statusText);
          }
        },
    });
  }

}
