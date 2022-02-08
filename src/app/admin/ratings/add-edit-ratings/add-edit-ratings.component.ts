import { TokenizeOptions } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ratings } from 'src/app/interfaces/ratings';
import { Restaurants } from 'src/app/interfaces/restaurants';
import { TokenModel } from 'src/app/interfaces/token-model';
import { User } from 'src/app/interfaces/user';
import { ManagePasswordService } from 'src/app/services/manage-password.service';
import { RatingsService } from 'src/app/services/ratings.service';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-edit-ratings',
  templateUrl: './add-edit-ratings.component.html',
  styleUrls: ['./add-edit-ratings.component.css'],
})
export class AddEditRatingsComponent implements OnInit {
  default: boolean = false;
  adminToken : string = "";
  isAddMode: boolean = true;
  id: string = '';
  restaurantList: Restaurants[] = [];
  userList: User[] = [];
  ratingData: Ratings = {} as Ratings;

  constructor(
    private fb: FormBuilder,
    private ratingService: RatingsService,
    private router: Router,
    private route: ActivatedRoute,
    private restaurantService: RestaurantsService,
    private userService: UserService,
    private managepasswordService : ManagePasswordService
  ) {
    this.ratingsForm.controls['isdeleted'].setValue(this.default, {
      onlySelf: true,
    });

    this.ratingsForm.controls['restaurantId'].setValue(
      'Please Select Restaurant',
      {
        onlySelf: true,
      }
    );

    this.ratingsForm.controls['userId'].setValue('Please Select UserId', {
      onlySelf: true,
    });
  }

  ratingsForm = this.fb.group({
    ratindId: [''],
    restaurantId: [''],
    userId: [''],
    rating1: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9.]+$'),
        Validators.maxLength(3),
      ],
    ],
    isdeleted: [''],
  });

  ngOnInit(): void {
    this.adminToken = JSON.parse(localStorage.getItem('adminToken')!);
    this.adminToken = this.managepasswordService.decryptData(this.adminToken);

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.ratingsForm.controls['ratindId'].setValue(this.id, {
      onlySelf: true,
    });

    // set forms value for update data

    if (this.isAddMode == false) {
      this.ratingService
        .getRatingById(this.adminToken, Number.parseInt(this.id))
        .subscribe({
          next: (data) => {
            this.ratingData = data;
            this.ratingsForm.patchValue(this.ratingData);
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

    // get restaurantList
    this.restaurantService.getRestaurants().subscribe({
      next: (data) => (this.restaurantList = data),
      error: (error) => {
        if (error.status == 404) {
          alert('Error-' + error.status + ' : Data Not Found!!!!');
        } else {
          alert(error.statusText);
        }
      },
    });

    // get restaurantList
    this.userService.getUser(this.adminToken).subscribe({
      next: (data) => (this.userList = data),
      error: (error) => {
        if (error.status == 404) {
          alert('Error-' + error.status + ' : Data Not Found!!!!');
        } else {
          alert(error.statusText);
        }
      },
    });
  }

  submit() {
    if (this.ratingsForm.value.rating1 > 5) {
      alert('please enter valid rating, rating is not more than 5!!!');
    } else {
      if (this.isAddMode) {
        this.createRatings();
      } else {
        this.updateRatings();
      }
    }
  }

  createRatings() {
    this.ratingService
      .addRatings(this.ratingsForm.value, this.adminToken)
      .subscribe({
        error: (error) => {
          if (error.status == 400) {
            alert('Error-' + error.status + ' : Please Enter Valid Data!!!!');
          } else {
            alert(error.statusText);
          }
        },
      });
    this.router.navigate(['../ratingslist'], { relativeTo: this.route });
  }

  updateRatings() {
    this.ratingService
      .editRatings(this.ratingsForm.value, this.adminToken)
      .subscribe({
        error: (error) => {
          if (error.status == 400) {
            alert('Error-' + error.status + ' : Please Enter Valid Data!!!!');
          } else {
            alert(error.statusText);
          }
        },
      });
    this.router.navigate(['../../ratingslist'], { relativeTo: this.route });
  }

  get rating1() {
    return this.ratingsForm.get('rating1');
  }
}
