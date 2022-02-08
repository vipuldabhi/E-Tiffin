import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Foodtype } from 'src/app/interfaces/foodtype';
import { TokenModel } from 'src/app/interfaces/token-model';
import { FoodtypeService } from 'src/app/services/foodtype.service';
import { ManagePasswordService } from 'src/app/services/manage-password.service';

@Component({
  selector: 'app-food-type-list',
  templateUrl: './food-type-list.component.html',
  styleUrls: ['./food-type-list.component.css'],
})
export class FoodTypeListComponent implements OnInit {
  constructor(
    private foodtypeService: FoodtypeService,
    private managepasswordService : ManagePasswordService

  ) {}

  foodtypeList: Foodtype[] = [];
  remove: number = 0;
  adminToken : string = "";

  ngOnInit(): void {
    this.adminToken = JSON.parse(localStorage.getItem('adminToken')!);
    this.adminToken = this.managepasswordService.decryptData(this.adminToken);

    // get FoodType list
    this.foodtypeService.getFoodType().subscribe({
      next: (data) => (this.foodtypeList = data),
      error: (error) => {
        if (error.status == 400) {
          alert('Error-' + error.status + ' :Data Not Found!!!!');
        } else {
          alert(error.statusText);
        }
      },
    });
  }

  deleteFoodType(e: any) {
    this.remove = e.target.value;
    this.foodtypeService.deleteFoodType(this.adminToken, this.remove).subscribe({
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
    this.foodtypeList = [];
    this.ngOnInit();
  }
}
