import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Area } from '../interfaces/area';
import { Duration } from '../interfaces/duration';
import { Foodtype } from '../interfaces/foodtype';
import { Interval } from '../interfaces/interval';
import { Restaurants } from '../interfaces/restaurants';
import { TokenModel } from '../interfaces/token-model';
import { AreaService } from '../services/area.service';
import { DeliverychargesService } from '../services/deliverycharges.service';
import { DurationService } from '../services/duration.service';
import { FoodtypeService } from '../services/foodtype.service';
import { IntervalService } from '../services/interval.service';
import { ManagePasswordService } from '../services/manage-password.service';
import { MealchargesService } from '../services/mealcharges.service';
import { OrderdetailsService } from '../services/orderdetails.service';
import { RestaurantsService } from '../services/restaurants.service';

@Component({
  selector: 'app-ordertiffin',
  templateUrl: './ordertiffin.component.html',
  styleUrls: ['./ordertiffin.component.css'],
})
export class OrdertiffinComponent implements OnInit {
  mealfor: boolean = false;
  type: boolean = false;
  duration: boolean = false;
  area: boolean = false;
  restaurant: boolean = false;
  date: Date = new Date();
  paymentId: string = 'jbdhfb76766dfjdf';
  email: string = '';
  userId: number = 0;
  totalcharge: number = 0;
  areaList: Area[] = [];
  restaurantList: Restaurants[] = [];
  intervalList: Interval[] = [];
  foodtypeList: Foodtype[] = [];
  durationList: Duration[] = [];
  userToken : TokenModel = {} as TokenModel;
  deliveryCharge : number = 0;


  // variables for orderSummery


  Interval : string ="";
  Type : string = "";
  Duration : string ="";
  OrderDate : string ="";
  Area : string ="";
  Address : string ="";
  Restaurant : string = "";


  constructor(
    private areaService: AreaService,
    private restaurantService: RestaurantsService,
    private fb: FormBuilder,
    private mealchargesService: MealchargesService,
    private intervalService: IntervalService,
    private foodtypeService: FoodtypeService,
    private durationService: DurationService,
    private orderdetailsService : OrderdetailsService,
    private deliverychargesService:DeliverychargesService,
    private managepasswordService : ManagePasswordService
  ) {
    this.userToken = JSON.parse(localStorage.getItem('userToken')!);
    this.userId = this.userToken.id;
    this.orderForm.controls['userId'].setValue(this.userId);
    this.orderForm.controls['orderPlaceDate'].setValue(this.date);
    this.orderForm.controls['paymentId'].setValue(this.paymentId);
    this.orderForm.controls['isDeleted'].setValue(false);
  }

  ngOnInit(): void {
    this.userToken = JSON.parse(localStorage.getItem('userToken')!);
    this.userToken = this.managepasswordService.decryptData(this.userToken.token);
              
    this.mealfor = false;
    this.type = false;
    this.duration = false;
    this.area = false;
    this.restaurant = false;

    //this method fetch interval list data from database and store in intervalList

    this.intervalService.getInterval().subscribe({
      next: (data) => (this.intervalList = data),
      error: (error) => {
        if (error.status == 400) {
          alert('Error-' + error.status + ' :Data Not Found!!!!');
        } else {
          alert(error.statusText);
        }
      },
    });

    //this method fetch foodtype list data from database and store in foodtypeList
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

    //this method fetch duration list data from database and store in durationList
    this.durationService.getDuration().subscribe({
      next: (data) => (this.durationList = data),
      error: (error) => {
        if (error.status == 400) {
          alert('Error-' + error.status + ' :Data Not Found!!!!');
        } else {
          alert(error.statusText);
        }
      },
    });

    this.areaService.getArea().subscribe({
      next: (data) => (this.areaList = data),
      error: (error) => alert(error.message),
    });

    this.restaurantService.getRestaurants().subscribe({
      next: (data) => (this.restaurantList = data),
      error: (error) => alert(error.message),
    });
  }

  orderForm = this.fb.group({
    userId: ['', Validators.required],
    intervalId: ['', Validators.required],
    typeId: ['', Validators.required],
    durationId: ['', Validators.required],
    orderPlaceDate: ['', Validators.required],
    orderDate: ['', Validators.required],
    areaId: ['', Validators.required],
    address: ['', Validators.required],
    paymentId: ['', Validators.required],
    totalCharge: [''],
    restaurantsId: ['', Validators.required],
    isDeleted: [''],    
  });

  changemealfor() {
    this.mealfor = true;
    this.intervalService.getIntervalById(this.orderForm.value.intervalId).subscribe(data => {
      this.Interval = data.intervalName;
    });
    this.calculateTotalCharge();                                                     
  }

  changetype() {
    this.foodtypeService.getFoodTypeById(this.orderForm.value.typeId).subscribe(data => {
      this.Type = data.typeName;
    });
    this.type = true;
  }

  changeduration() {
    this.durationService.getDurationById(this.orderForm.value.durationId).subscribe(data => {
      this.Duration = data.durationTime;
    });
    this.duration = true;
    this.calculateTotalCharge();
  }

  changeorderdate() {
    this.OrderDate = this.orderForm.value.orderDate;
  }

  changeArea() {
    this.areaService.getAreaById(this.orderForm.value.areaId).subscribe(data => {
      this.Area = data.areaName;
    });
    this.Area = this.orderForm.value.areaId;
    this.area = true;
  }

  changeaddress(e:any){
    this.Address = e.target.value;
  }

  changeRestaurant() {
    this.restaurantService.getRestaurantById(this.orderForm.value.restaurantsId).subscribe(data => {
      this.Restaurant = data.restaurantName;
    });
    this.restaurant = true;
    this.calculateTotalCharge();
  }

  calculateTotalCharge() {
    if (this.mealfor && this.duration && this.restaurant) {
      //set totalcahrge
      this.mealchargesService
        .getMealChargesByResIdandIntervalId(
          this.orderForm.value.restaurantsId,
          this.orderForm.value.intervalId
        )
        .subscribe({
          next: (data1) => {
            var duration = this.orderForm.value.durationId;
            this.deliverychargesService.getDeliveryChargeById(duration).subscribe(data=>{
              this.deliveryCharge = data.charge;
              if (duration == 1) {
                this.totalcharge = (data1 * 1) + this.deliveryCharge;
              } else if (duration == 2) {
                this.totalcharge = (data1 * 7) + this.deliveryCharge;
              } else if (duration == 3) {
                this.totalcharge = (data1 * 30) + this.deliveryCharge;
              } else if (duration == 4) {
                this.totalcharge = (data1 * 90) + this.deliveryCharge;
              }
            })
          },
          error: (error) => {
            if (error.status == 404) {
              alert(
                'Error-' + error.status + ' :Data Not Found for mealCharges!!!!'
              );
            } else {
              alert(error.statusText);
            }
          },
        });
    }
  }

  submit() {
    this.orderForm.controls['totalCharge'].setValue(this.totalcharge);
    console.log(this.orderForm.value);
    this.orderdetailsService.addOrder(this.orderForm.value,this.userToken.token).subscribe({
      error : error => {
        if (error.status == 400) {
        alert(
          'Error-' + error.status + ' : Bad Request, Please Enter Valid Data!!!!'
        );
      } else {
        alert(error.statusText);
      }
    }
    });
  }
}
