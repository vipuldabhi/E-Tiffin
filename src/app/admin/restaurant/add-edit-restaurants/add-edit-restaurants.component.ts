import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Area } from 'src/app/interfaces/area';
import { Restaurants } from 'src/app/interfaces/restaurants';
import { TokenModel } from 'src/app/interfaces/token-model';
import { AreaService } from 'src/app/services/area.service';
import { ManagePasswordService } from 'src/app/services/manage-password.service';
import { RestaurantsService } from 'src/app/services/restaurants.service';

@Component({
  selector: 'app-add-edit-restaurants',
  templateUrl: './add-edit-restaurants.component.html',
  styleUrls: ['./add-edit-restaurants.component.css']
})
export class AddEditRestaurantsComponent implements OnInit {

  default: boolean = false;
  adminToken : string = "";
  isAddMode: boolean = true;
  id: string = '';
  areaList : Area[] = [];
  restaurantData : Restaurants = {} as Restaurants;

  constructor(
    private fb: FormBuilder,
    private restaurantService : RestaurantsService,
    private areaService: AreaService,
    private router: Router,
    private route: ActivatedRoute,
    private managepasswordService : ManagePasswordService
  ) {
    
    this.restaurantForm.controls['isdeleted'].setValue(this.default, {
      onlySelf: true,
    });

    this.restaurantForm.controls['areaId'].setValue("Please Select Area", {
      onlySelf: true,
    });
  }

  restaurantForm = this.fb.group({
    id : [''],
    restaurantName: ['', [Validators.required]],
    areaId : [''],
    isdeleted: [''],
  });

  ngOnInit(): void {
    this.adminToken = JSON.parse(localStorage.getItem('adminToken')!);
    this.adminToken = this.managepasswordService.decryptData(this.adminToken);

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.restaurantForm.controls['id'].setValue(this.id, {
      onlySelf: true,
    });

    // set forms value for update data

    if (this.isAddMode == false) {
      this.restaurantService
        .getRestaurantById(Number.parseInt(this.id))
        .subscribe({
          next: (data) => {
            this.restaurantData = data;
            this.restaurantForm.patchValue(this.restaurantData);
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
     this.areaService.getArea().subscribe({
      next : data =>this.areaList = data,
      error : (error)=>{
        if(error.status == 404){    
          alert("Error-"+error.status+" : Data Not Found!!!!");
        }else{
          alert(error.statusText);
        }
      }
      });
  }

  submit() {
    if (this.isAddMode) {
      this.createRestaurant();
    } else {
      this.updateRestaurant();
    }
  }

  createRestaurant(){
    console.log(this.restaurantForm.value);
    this.restaurantService.addRestaurant(this.restaurantForm.value, this.adminToken).subscribe({
      error : (error)=>{
        if(error.status == 400){
          alert("Error-"+error.status+" : Please Enter Valid Data!!!!");
        }else{
          alert(error.statusText);
        }
      }
      });
    this.router.navigate(['../restaurantlist'], { relativeTo: this.route });
  }

  updateRestaurant(){
    console.log(this.restaurantForm.value);
    this.restaurantService.editRestaurant(this.restaurantForm.value,this.adminToken).subscribe({
      error : (error)=>{
        if(error.status == 400){
          alert("Error-"+error.status+" : Please Enter Valid Data!!!!");
        }else{
          alert(error.statusText);
        }
      }
      });
    this.router.navigate(['../../restaurantlist'], { relativeTo: this.route });
  }

  get restaurantName() {
    return this.restaurantForm.get('restaurantName');
  }


}
