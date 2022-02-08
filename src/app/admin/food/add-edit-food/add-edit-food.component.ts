import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from 'src/app/interfaces/food';
import { TokenModel } from 'src/app/interfaces/token-model';
import { FoodService } from 'src/app/services/food.service';
import { ManagePasswordService } from 'src/app/services/manage-password.service';

@Component({
  selector: 'app-add-edit-food',
  templateUrl: './add-edit-food.component.html',
  styleUrls: ['./add-edit-food.component.css']
})
export class AddEditFoodComponent implements OnInit {
  
  default: boolean = false;
  adminToken : string = "";
  isAddMode: boolean = true;
  id: string = '';
  foodData : Food = {} as Food;

  constructor(
    private fb: FormBuilder,
    private foodService: FoodService,
    private router: Router,
    private route: ActivatedRoute,
    private managepasswordService : ManagePasswordService

  ) {
    
    this.foodForm.controls['isdeleted'].setValue(this.default, {
      onlySelf: true,
    });
  }

  foodForm = this.fb.group({
    foodId : [''],
    foodName: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(9),Validators.pattern("^[A-Za-z ]+$")]],
    isdeleted: [''],
  });

  ngOnInit(): void {
    this.adminToken = JSON.parse(localStorage.getItem('adminToken')!);
    this.adminToken = this.managepasswordService.decryptData(this.adminToken);

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.foodForm.controls['foodId'].setValue(this.id, {
      onlySelf: true,
    });

    // set forms value for update data

    if(this.isAddMode == false){
      this.foodService.getFoodById(this.adminToken,Number.parseInt(this.id)).subscribe({
        next: (data) => {
          this.foodData = data;
          this.foodForm.patchValue(this.foodData);
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
      this.createFood();
    } else {
      this.updateFood();
    }
  }

  createFood(){
    console.log(this.foodForm.value);
    this.foodService.addFood(this.foodForm.value, this.adminToken).subscribe({
      error : (error)=>{
        if(error.status == 400){
          alert("Error-"+error.status+" : Please Enter Valid Data!!!!");
        }else{
          alert(error.statusText);
        }
      }
      });
    this.router.navigate(['../foodlist'], { relativeTo: this.route });
  }

  updateFood(){
    console.log(this.foodForm.value);
    this.foodService.editFood(this.foodForm.value,this.adminToken).subscribe({
      error : (error)=>{
        if(error.status == 400){
          alert("Error-"+error.status+" : Please Enter Valid Data!!!!");
        }else{
          alert(error.statusText);
        }
      }
      });
    this.router.navigate(['../../foodlist'], { relativeTo: this.route });
  }

  get foodName() {
    return this.foodForm.get('foodName');
  }

}
