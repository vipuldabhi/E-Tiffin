import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Area } from 'src/app/interfaces/area';
import { Duration } from 'src/app/interfaces/duration';
import { Foodtype } from 'src/app/interfaces/foodtype';
import { Interval } from 'src/app/interfaces/interval';
import { Mealcharges } from 'src/app/interfaces/mealcharges';
import { Orderdetails } from 'src/app/interfaces/orderdetails';
import { Restaurants } from 'src/app/interfaces/restaurants';
import { TokenModel } from 'src/app/interfaces/token-model';
import { User } from 'src/app/interfaces/user';
import { AreaService } from 'src/app/services/area.service';
import { DeliverychargesService } from 'src/app/services/deliverycharges.service';
import { DurationService } from 'src/app/services/duration.service';
import { FoodtypeService } from 'src/app/services/foodtype.service';
import { IntervalService } from 'src/app/services/interval.service';
import { ManagePasswordService } from 'src/app/services/manage-password.service';
import { MealchargesService } from 'src/app/services/mealcharges.service';
import { OrderdetailsService } from 'src/app/services/orderdetails.service';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-edit-orderdetails',
  templateUrl: './add-edit-orderdetails.component.html',
  styleUrls: ['./add-edit-orderdetails.component.css'],
})
export class AddEditOrderdetailsComponent implements OnInit {
  default: boolean = false;
  adminToken : string = "";
  isAddMode: boolean = true;
  id: string = '';
  restaurantList: Restaurants[] = [];
  intervalList: Interval[] = [];
  userList: User[] = [];
  foodtypeList: Foodtype[] = [];
  durationList: Duration[] = [];
  areaList: Area[] = [];
  currentDate: Date = new Date();
  paymentId: string = 'hhchdbchbdhcb6565sdahgd66asdhv';
  mealChargesList: Mealcharges[] = [];
  totalChargeData: Mealcharges[] = [];
  Charge: number = 0;
  restaurantId: number = 0;
  intervalId: number = 0;
  totalChargeCalculated: boolean = false;
  orderData: Orderdetails = {} as Orderdetails;
  deliveryCharge : number = 0;

  constructor(
    private fb: FormBuilder,
    private mealchargesService: MealchargesService,
    private router: Router,
    private route: ActivatedRoute,
    private restaurantService: RestaurantsService,
    private intervalService: IntervalService,
    private userService: UserService,
    private foodtypeService: FoodtypeService,
    private durationService: DurationService,
    private areaService: AreaService,
    private orderdetailsService: OrderdetailsService,
    private deliverychargesService : DeliverychargesService,
    private managepasswordService : ManagePasswordService
  ) {
    this.orderForm.controls['isDeleted'].setValue(this.default, {
      onlySelf: true,
    });

    this.orderForm.controls['restaurantsId'].setValue(
      'Please Select Restaurant',
      {
        onlySelf: true,
      }
    );

    this.orderForm.controls['userId'].setValue('Please Select UserId', {
      onlySelf: true,
    });

    this.orderForm.controls['intervalId'].setValue('Please Select Interval', {
      onlySelf: true,
    });

    this.orderForm.controls['typeId'].setValue('Please Select FoodType', {
      onlySelf: true,
    });

    this.orderForm.controls['durationId'].setValue(
      'Please Select DurationTime',
      {
        onlySelf: true,
      }
    );

    this.orderForm.controls['areaId'].setValue('Please Select Area', {
      onlySelf: true,
    });

    //set orderplacedate
    this.orderForm.controls['orderPlaceDate'].setValue(this.currentDate, {
      onlySelf: true,
    });

    //set paymentId
    this.orderForm.controls['paymentId'].setValue(this.paymentId, {
      onlySelf: true,
    });
  }

  orderForm = this.fb.group({
    orderId: [''],
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

  ngOnInit(): void {
    this.adminToken = JSON.parse(localStorage.getItem('adminToken')!);
    this.adminToken = this.managepasswordService.decryptData(this.adminToken);

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.orderForm.controls['orderId'].setValue(this.id, {
      onlySelf: true,
    });

    // set forms value for update data

    if (this.isAddMode == false) {
      this.orderdetailsService
        .getOrderdetailsById(this.adminToken, Number.parseInt(this.id))
        .subscribe({
          next: (data) => {
            this.orderData = data;
            this.orderForm.patchValue(this.orderData);
          },
          error: (error) => {
            if (error.status == 400) {
              alert('Error-' + error.status + ' : Please Enter Valid Data!!!!');
            } else {
              alert(error.statusText);
            }
          },
        });
    }

    //this method fetch restaurant list data from database and store in restaurantList

    this.restaurantService.getRestaurants().subscribe({
      next: (data) => (this.restaurantList = data),
      error: (error) => {
        if (error.status == 400) {
          alert('Error-' + error.status + ' :Data Not Found!!!!');
        } else {
          alert(error.statusText);
        }
      },
    });

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

    //this method fetch user list data from database and store in userList
    this.userService.getUser(this.adminToken).subscribe({
      next: (data) => (this.userList = data),
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

    //this method fetch area list data from database and store in areaList
    this.areaService.getArea().subscribe({
      next: (data) => (this.areaList = data),
      error: (error) => {
        if (error.status == 400) {
          alert('Error-' + error.status + ' :Data Not Found!!!!');
        } else {
          alert(error.statusText);
        }
      },
    });
  }

  calculateTotalCharge() {
    //set totalcahrge
    this.restaurantId = this.orderForm.value.restaurantsId;
    this.intervalId = this.orderForm.value.intervalId;

    this.mealchargesService
      .getMealChargesByResIdandIntervalId(this.restaurantId, this.intervalId)
      .subscribe({
        next: (data) => {
          var duration = this.orderForm.value.durationId;
          this.deliverychargesService.getDeliveryChargeById(duration).subscribe(data=>{
            this.deliveryCharge = data.charge;
          })
          if (duration == 1) {
            this.Charge = data * 1 + this.deliveryCharge;
          } else if (duration == 2) {
            this.Charge = data * 7 + this.deliveryCharge;
          } else if (duration == 3) {
            this.Charge = data * 30 + this.deliveryCharge;
          } else if (duration == 4) {
            this.Charge = data * 90 + this.deliveryCharge;
          }

          this.totalChargeCalculated = true;
          console.log(this.Charge);
        },
        error: (error) => {
          if (error.status == 400) {
            alert('Error-' + error.status + ' :Data Not Found!!!!');
          } else {
            alert(error.statusText);
          }
        },
      });

    // this.orderForm.controls['totalCharge'].setValue(this.totalCharge, {
    //   onlySelf: true,
    // });
  }

  submit() {
    if (this.isAddMode) {
      if (this.totalChargeCalculated == true) {
        this.orderForm.controls['totalCharge'].patchValue(this.Charge);
        this.createOrder();
      } else {
        alert('Please Calculate TotalCharge!!!');
      }
    } else {
      this.updateOrder();
    }
  }

  createOrder() {
    this.orderdetailsService
      .addOrder(this.orderForm.value, this.adminToken)
      .subscribe({
        error: (error) => {
          if (error.status == 400) {
            alert('Error-' + error.status + ' : Please Enter Valid Data!!!!');
          } else {
            alert(error.statusText);
          }
        },
      });
    this.totalChargeCalculated = false;
    this.router.navigate(['../orderdetailslist'], { relativeTo: this.route });
  }

  updateOrder() {
    this.orderdetailsService
      .editOrder(this.orderForm.value, this.adminToken)
      .subscribe({
        error: (error) => {
          if (error.status == 400) {
            alert('Error-' + error.status + ' : Please Enter Valid Data!!!!');
          } else {
            alert(error.statusText);
          }
        },
      });
    this.router.navigate(['../../orderdetailslist'], {
      relativeTo: this.route,
    });
  }

  get orderPlaceDate() {
    return this.orderForm.get('orderPlaceDate');
  }

  get orderDate() {
    return this.orderForm.get('orderDate');
  }

  get address() {
    return this.orderForm.get('address');
  }

  get totalCharge() {
    return this.orderForm.get('totalCharge');
  }
}
