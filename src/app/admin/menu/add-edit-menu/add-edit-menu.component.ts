import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from 'src/app/interfaces/food';
import { Interval } from 'src/app/interfaces/interval';
import { Menu } from 'src/app/interfaces/menu';
import { Restaurants } from 'src/app/interfaces/restaurants';
import { TokenModel } from 'src/app/interfaces/token-model';
import { Weekdays } from 'src/app/interfaces/weekdays';
import { FoodService } from 'src/app/services/food.service';
import { IntervalService } from 'src/app/services/interval.service';
import { ManagePasswordService } from 'src/app/services/manage-password.service';
import { MealchargesService } from 'src/app/services/mealcharges.service';
import { MenuService } from 'src/app/services/menu.service';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { WeekdaysService } from 'src/app/services/weekdays.service';

@Component({
  selector: 'app-add-edit-menu',
  templateUrl: './add-edit-menu.component.html',
  styleUrls: ['./add-edit-menu.component.css']
})
export class AddEditMenuComponent implements OnInit {

  
  default: boolean = false;
  adminToken : string = "";
  isAddMode: boolean = true;
  id: string = '';
  restaurantList : Restaurants[] = [];
  intervalList : Interval[]=[];
  dayList : Weekdays[] = [];
  foodList : Food[] = [];
  menuData : Menu = {} as Menu;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private restaurantService : RestaurantsService,
    private intervalService : IntervalService,
    private weekdayService : WeekdaysService,
    private foodService : FoodService,
    private menuService : MenuService,
    private managepasswordService : ManagePasswordService
  ) {
    
    this.menuForm.controls['isDeleted'].setValue(this.default, {
      onlySelf: true,
    });

    this.menuForm.controls['restaurantsId'].setValue("Please Select Restaurant", {
      onlySelf: true,
    });

    this.menuForm.controls['intervalId'].setValue("Please Select Interval", {
      onlySelf: true,
    });

    this.menuForm.controls['dayId'].setValue("Please Select Day", {
      onlySelf: true,
    });

    this.menuForm.controls['foodId'].setValue("Please Select Food", {
      onlySelf: true,
    });
  }

  menuForm = this.fb.group({
    menuId : ['',Validators.required],
    dayId : ['',Validators.required],
    foodId : ['',Validators.required],
    intervalId : ['',Validators.required],
    restaurantsId : ['',Validators.required],
    isDeleted: [''],
  });

  ngOnInit(): void {
    this.adminToken = JSON.parse(localStorage.getItem('adminToken')!);
    this.adminToken = this.managepasswordService.decryptData(this.adminToken);

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.menuForm.controls['menuId'].setValue(this.id, {
      onlySelf: true,
    });

    // set forms value for update data

    if (this.isAddMode == false) {
      this.menuService
        .getMenuById(this.adminToken, Number.parseInt(this.id))
        .subscribe({
          next: (data) => {
            this.menuData = data;
            this.menuForm.patchValue(this.menuData);
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

    //this method fetch day list data from database and store in dayList

    this.weekdayService.getDays().subscribe({
      next: (data) => (this.dayList = data),
      error: (error) => {
        if (error.status == 400) {
          alert('Error-' + error.status + ' :Data Not Found!!!!');
        } else {
          alert(error.statusText);
        }
      },
    });

    //this method fetch food list data from database and store in foodList
    this.foodService.getFood(this.adminToken).subscribe({
      next: (data) => (this.foodList = data),
      error: (error) => {
        if (error.status == 400) {
          alert('Error-' + error.status + ' :Data Not Found!!!!');
        } else {
          alert(error.statusText);
        }
      },
    });

  }

  submit() {
    console.log(this.menuForm.value);
    
    if (this.isAddMode) {
      this.createMenu();
    } else {
      this.updateMenu();
    }
  }

  createMenu(){
    this.menuService.addMenu(this.menuForm.value, this.adminToken).subscribe({
      error : (error)=>{
        if(error.status == 400){
          alert("Error-"+error.status+" : Please Enter Valid Data!!!!");
        }else{
          alert(error.statusText);
        }
      }
      });
      
    this.router.navigate(['../menulist'], { relativeTo: this.route });
  }

  updateMenu(){
    this.menuService.editMenu(this.menuForm.value,this.adminToken).subscribe({
      error : (error)=>{
        if(error.status == 400){
          alert("Error-"+error.status+" : Please Enter Valid Data!!!!");
        }else{
          alert(error.statusText);
        }
      }
      });
    this.router.navigate(['../../menulist'], { relativeTo: this.route });
  }


  get restaurantsId() {
    return this.menuForm.get('restaurantsId');
  }

  get intervalId() {
    return this.menuForm.get('intervalId');
  }

  get dayId() {
    return this.menuForm.get('dayId');
  }

  get foodId() {
    return this.menuForm.get('foodId');
  }
}
