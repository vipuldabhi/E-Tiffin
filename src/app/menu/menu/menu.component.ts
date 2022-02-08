import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Avgratings } from 'src/app/interfaces/avgratings';
import { Daywisemenu } from 'src/app/interfaces/daywisemenu';
import { Mealcharges } from 'src/app/interfaces/mealcharges';
import { Restaurants } from 'src/app/interfaces/restaurants';
import { Weekdays } from 'src/app/interfaces/weekdays';
import { AvgratingsService } from 'src/app/services/avgratings.service';
import { MealchargesService } from 'src/app/services/mealcharges.service';
import { MenuService } from 'src/app/services/menu.service';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { WeekdaysService } from 'src/app/services/weekdays.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private menuservice: MenuService,
    private weekdayservice: WeekdaysService,
    private restaurantservice: RestaurantsService,
    private avgratingsservice : AvgratingsService,
    private mealchargesservice : MealchargesService
  ) {}

  form = new FormGroup({
    interval: new FormControl(''),
    day: new FormControl(''),
    restaurant: new FormControl(''),
  });

  //variables

  interval: string = '';
  restaurant: string = '';
  day: number = 0;
  daywisemenu: Daywisemenu[] = [];
  weekdaysList: Weekdays[] = [];
  restaurantList: Restaurants[] = [];
  restaurantRatings : Avgratings[] = [];
  sorting : number = 1;
  mealCharges : Mealcharges[] = [];
  intervalid : number = 1;

  DiaplayRestaurant : boolean = false;
  DiaplayMealcharges : boolean = false;


  // pagination 

  pageSize : number = 10;
  page : number = 1;
  count : number = this.mealCharges.length;

  handlePageChange(event: number): void {
    this.page = event;
  }

  //searching

  searchText : string = "";
  searchRestaurant : string = "";

  ngOnInit(): void {
    console.log(this.page)
    //this method fetch weekdays data from database and store in weekdaysList

    this.weekdayservice.getDays().subscribe(data => {
      this.weekdaysList = data;
    });

    //this method fetch restaurant list data from database and store in restaurantList

    this.restaurantservice.getRestaurants().subscribe((data) => {
      this.restaurantList = data;
    });

    //get restaurants ratings

    this.avgratingsservice.getAvgRatings().subscribe(data => {
      this.restaurantRatings = data;
    });

    //Get Meal Charges

    this.mealchargesservice.getmealcharges().subscribe({
      next: (data) => (this.mealCharges = data),
      error: (error) => {
        if (error.status == 400) {
          alert('Error-' + error.status + ' : Data Not Found!!!!');
        } else {
          alert(error.statusText);
        }
      },
    });

  }

  //this methods fetch values of interval,restaurantname nad dayid from menu page

  changeInterval(e : any) {
    this.interval = e.target.value;
  }
  changeRestaurant(e: any) {
    this.restaurant = e.target.value;
  }
  changeDay(e: any) {
    this.day = e.target.value;
  }


  changeRestaurantDiaplay(){
    this.DiaplayRestaurant = true;
    this.DiaplayMealcharges = false;
  }

  changeMealChargesDiaplay(){
    this.DiaplayRestaurant = false;
    this.DiaplayMealcharges = true;
  }



  //this method fetch required menu as per users need from database

  submit() {
    this.menuservice
      .getMenu(this.interval, this.day, this.restaurant)
      .subscribe((data) => {
        this.daywisemenu = data;
      });
  }

  //Get sorted restaurant List

  sortedRestaurantOnRating(){
    this.avgratingsservice.getsorteddata(this.sorting).subscribe(data => {
      this.restaurantRatings = data;
    });
  }

  sortedmealchargesdata(){
    this.mealchargesservice.getsorteddata(this.sorting,this.intervalid).subscribe(data => {
      this.mealCharges = data;
    });
  }

}
