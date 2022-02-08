import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Foodtype } from 'src/app/interfaces/foodtype';
import { TokenModel } from 'src/app/interfaces/token-model';
import { FoodtypeService } from 'src/app/services/foodtype.service';
import { ManagePasswordService } from 'src/app/services/manage-password.service';

@Component({
  selector: 'app-add-edit-food-type',
  templateUrl: './add-edit-food-type.component.html',
  styleUrls: ['./add-edit-food-type.component.css']
})
export class AddEditFoodTypeComponent implements OnInit {

  default: boolean = false;
  adminToken : string = "";
  isAddMode: boolean = true;
  id: string = '';
  foodTypeData : Foodtype = {} as Foodtype;

  constructor(
    private fb: FormBuilder,
    private foodtypeService: FoodtypeService,
    private router: Router,
    private route: ActivatedRoute,
    private managepasswordService : ManagePasswordService

  ) {
    
    this.foodtypeForm.controls['isDeleted'].setValue(this.default, {
      onlySelf: true,
    });
  }

  foodtypeForm = this.fb.group({
    typeId : [''],
    typeName: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(9),Validators.pattern("^[A-Za-z]+$")]],
    isDeleted: [''],
  });

  ngOnInit(): void {
    this.adminToken = JSON.parse(localStorage.getItem('adminToken')!);
    this.adminToken = this.managepasswordService.decryptData(this.adminToken);

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.foodtypeForm.controls['typeId'].setValue(this.id, {
      onlySelf: true,
    });

    // set forms value for update data

    if(this.isAddMode == false){
      this.foodtypeService.getFoodTypeById(Number.parseInt(this.id)).subscribe({
        next: (data) => {
          console.log(data);
          this.foodTypeData = data;
          this.foodtypeForm.patchValue(this.foodTypeData);
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
      this.createFoodType();
    } else {
      this.updateFoodType();
    }
  }

  createFoodType(){
    console.log(this.foodtypeForm.value);
    this.foodtypeService.addFoodType(this.foodtypeForm.value, this.adminToken).subscribe({
      error : (error)=>{
        if(error.status == 400){
          alert("Error-"+error.status+" : Please Enter Valid Data!!!!");
        }else{
          alert(error.statusText);
        }
      }
      });
    this.router.navigate(['../foodtypelist'], { relativeTo: this.route });
  }

  updateFoodType(){
    console.log(this.foodtypeForm.value);
    this.foodtypeService.editFoodType(this.foodtypeForm.value,this.adminToken).subscribe({
      error : (error)=>{
        if(error.status == 400){
          alert("Error-"+error.status+" : Please Enter Valid Data!!!!");
        }else{
          alert(error.statusText);
        }
      }
      });
    this.router.navigate(['../../foodtypelist'], { relativeTo: this.route });
  }

  get typeName() {
    return this.foodtypeForm.get('typeName');
  }

}
