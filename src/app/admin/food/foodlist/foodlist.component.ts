import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from 'src/app/interfaces/food';
import { TokenModel } from 'src/app/interfaces/token-model';
import { FoodService } from 'src/app/services/food.service';
import { ManagePasswordService } from 'src/app/services/manage-password.service';

@Component({
  selector: 'app-foodlist',
  templateUrl: './foodlist.component.html',
  styleUrls: ['./foodlist.component.css']
})
export class FoodlistComponent implements OnInit {

  foodList : Food[] = [];
  remove : number = 0;
  adminToken : string = "";
  searchDeliveryStatus: string = '';

  // pagination

  pageSize: number = 10;
  page: number = 1;
  count: number = this.foodList.length;

  handlePageChange(event: number): void {
    this.page = event;
  }

  constructor(private foodService : FoodService,
    private managepasswordService : ManagePasswordService
) { }

  ngOnInit(): void {
    this.adminToken = JSON.parse(localStorage.getItem('adminToken')!);
    this.adminToken = this.managepasswordService.decryptData(this.adminToken);

    // get Food list
    this.foodService.getFood(this.adminToken).subscribe({
      next : data =>this.foodList = data,
      error : (error)=>{
        if(error.status == 400){    
          alert("Error-"+error.status+" :Data Not Found!!!!");
        }else{
          alert(error.statusText);
        }
      }
      });
  }

  deleteFood(e:any){
    this.remove = e.target.value;
    this.foodService.deleteFood(this.adminToken,this.remove).subscribe({
      error : (error)=>{
        if(error.status == 400){    
          alert("Error-"+error.status+" : Not Able to delete, because already have this food in Menu!!!!");
        }else{
          alert(error.statusText);
        }
      }
      });
    this.foodList = [];
    this.ngOnInit();
  }

}
