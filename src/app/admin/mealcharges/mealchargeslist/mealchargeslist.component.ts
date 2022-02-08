import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mealcharges } from 'src/app/interfaces/mealcharges';
import { TokenModel } from 'src/app/interfaces/token-model';
import { ManagePasswordService } from 'src/app/services/manage-password.service';
import { MealchargesService } from 'src/app/services/mealcharges.service';

@Component({
  selector: 'app-mealchargeslist',
  templateUrl: './mealchargeslist.component.html',
  styleUrls: ['./mealchargeslist.component.css']
})
export class MealchargeslistComponent implements OnInit {

  mealchargesList: Mealcharges[] = [];
  remove: number = 0;
  adminToken : string = "";
  intervalid : number = 0;
  sorting : number = 0;
  searchMealCharge: string = '';

  // pagination

  pageSize: number = 10;
  page: number = 1;
  count: number = this.mealchargesList.length;

  handlePageChange(event: number): void {
    this.page = event;
  }

  constructor(
    private mealchargesService: MealchargesService,
    private managepasswordService : ManagePasswordService,
  ) {}

  ngOnInit(): void {
    this.adminToken = JSON.parse(localStorage.getItem('adminToken')!);
    this.adminToken = this.managepasswordService.decryptData(this.adminToken);

    // get Interval list
    this.mealchargesService.getmealcharges().subscribe({
      next: (data) => (this.mealchargesList = data),
      error: (error) => {
        if (error.status == 400) {
          alert('Error-' + error.status + ' :Data Not Found!!!!');
        } else {
          alert(error.statusText);
        }
      },
    });
  }

  sortedmealchargesdata(){
    this.mealchargesService.getsorteddata(this.sorting,this.intervalid).subscribe(data => {
      this.mealchargesList = data;
    });
  }

  deleteMealcharge(e: any) {
    this.remove = e.target.value;
    this.mealchargesService.deleteMealCharge(this.adminToken, this.remove).subscribe({
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
    this.mealchargesList = [];
    this.ngOnInit();
  }


}
