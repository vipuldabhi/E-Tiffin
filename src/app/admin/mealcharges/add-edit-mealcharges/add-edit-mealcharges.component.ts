import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Interval } from 'src/app/interfaces/interval';
import { Mealcharges } from 'src/app/interfaces/mealcharges';
import { Restaurants } from 'src/app/interfaces/restaurants';
import { TokenModel } from 'src/app/interfaces/token-model';
import { IntervalService } from 'src/app/services/interval.service';
import { ManagePasswordService } from 'src/app/services/manage-password.service';
import { MealchargesService } from 'src/app/services/mealcharges.service';
import { RestaurantsService } from 'src/app/services/restaurants.service';

@Component({
  selector: 'app-add-edit-mealcharges',
  templateUrl: './add-edit-mealcharges.component.html',
  styleUrls: ['./add-edit-mealcharges.component.css'],
})
export class AddEditMealchargesComponent implements OnInit {
  default: boolean = false;
  adminToken : string = "";
  isAddMode: boolean = true;
  id: string = '';
  restaurantList: Restaurants[] = [];
  intervalList: Interval[] = [];
  mealChargesData : Mealcharges = {} as Mealcharges;

  constructor(
    private fb: FormBuilder,
    private mealchargesService: MealchargesService,
    private router: Router,
    private route: ActivatedRoute,
    private restaurantService: RestaurantsService,
    private intervalService: IntervalService,
    private managepasswordService : ManagePasswordService

  ) {
    this.mealchargesForm.controls['isDeleted'].setValue(this.default, {
      onlySelf: true,
    });

    this.mealchargesForm.controls['restaurantsId'].setValue(
      'Please Select Restaurant',
      {
        onlySelf: true,
      }
    );

    this.mealchargesForm.controls['intervalId'].setValue(
      'Please Select Interval',
      {
        onlySelf: true,
      }
    );
  }

  mealchargesForm = this.fb.group({
    chargeId: [''],
    intervalId: ['', Validators.required],
    restaurantsId: ['', Validators.required],
    charge: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    isDeleted: [''],
  });

  ngOnInit(): void {
    this.adminToken = JSON.parse(localStorage.getItem('adminToken')!);
    this.adminToken = this.managepasswordService.decryptData(this.adminToken);

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.mealchargesForm.controls['chargeId'].setValue(this.id, {
      onlySelf: true,
    });

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

    // set forms value for update data

    if (this.isAddMode == false) {
      this.mealchargesService
        .getMealChargesById(this.adminToken, Number.parseInt(this.id))
        .subscribe({
          next: (data) => {
            this.mealChargesData = data;
            this.mealchargesForm.patchValue(this.mealChargesData);
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
  }

  submit() {
    if (this.isAddMode) {
      this.createMealcharge();
    } else {
      this.updateMealcharge();
    }
  }

  createMealcharge() {
    console.log(this.mealchargesForm.value);
    this.mealchargesService
      .addMealCharge(this.mealchargesForm.value, this.adminToken)
      .subscribe({
        error: (error) => {
          if (error.status == 400) {
            alert('Error-' + error.status + ' : Please Enter Valid Data!!!!');
          } else {
            alert(error.statusText);
          }
        },
      });

    this.router.navigate(['../mealchargeslist'], { relativeTo: this.route });
  }

  updateMealcharge() {
    console.log(this.mealchargesForm.value);
    this.mealchargesService
      .editMealCharge(this.mealchargesForm.value, this.adminToken)
      .subscribe({
        error: (error) => {
          if (error.status == 400) {
            alert('Error-' + error.status + ' : Please Enter Valid Data!!!!');
          } else {
            alert(error.statusText);
          }
        },
      });
    this.router.navigate(['../../mealchargeslist'], { relativeTo: this.route });
  }

  get restaurantsId() {
    return this.mealchargesForm.get('restaurantsId');
  }

  get intervalId() {
    return this.mealchargesForm.get('intervalId');
  }

  get charge() {
    return this.mealchargesForm.get('charge');
  }
}
