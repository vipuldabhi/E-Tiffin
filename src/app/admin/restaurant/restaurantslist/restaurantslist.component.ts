import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurants } from 'src/app/interfaces/restaurants';
import { TokenModel } from 'src/app/interfaces/token-model';
import { ManagePasswordService } from 'src/app/services/manage-password.service';
import { RestaurantsService } from 'src/app/services/restaurants.service';

@Component({
  selector: 'app-restaurantslist',
  templateUrl: './restaurantslist.component.html',
  styleUrls: ['./restaurantslist.component.css']
})
export class RestaurantslistComponent implements OnInit {

  constructor(private restaurantService : RestaurantsService,
    private router : Router,
    private route : ActivatedRoute,
    private managepasswordService : ManagePasswordService
) { }

  restaurantList : Restaurants[] = [];
  remove : number = 0;
  adminToken : string = "";
  sorting : number = 0;

  searchRestaurant: string = '';

  // pagination

  pageSize: number = 10;
  page: number = 1;
  count: number = this.restaurantList.length;

  handlePageChange(event: number): void {
    this.page = event;
  }

  ngOnInit(): void {
    this.adminToken = JSON.parse(localStorage.getItem('adminToken')!);
    this.adminToken = this.managepasswordService.decryptData(this.adminToken);

    // get duration list
    this.restaurantService.getRestaurants().subscribe({
      next : data =>this.restaurantList = data,
      error : (error)=>{
        if(error.status == 404){    
          alert("Error-"+error.status+" : Data Not Found!!!!");
        }else{
          alert(error.statusText);
        }
      }
      });
  }

  change(e:any){
    this.sorting = e.target.value;
    this.restaurantService.getSortedRestaurant(this.sorting).subscribe({
      next: (data) => (this.restaurantList = data),
      error: (error) => {
        if (error.status == 404) {
          alert('Error-' + error.status + ' : Data Not Found!!!!');
        } else {
          alert(error.statusText);
        }
      },
    });
  }

  deleteRestaurant(e:any){
    this.remove = e.target.value;
    this.restaurantService.deleteRestaurant(this.adminToken,this.remove).subscribe({
      error : (error)=>{
        if(error.status == 400){    
          alert("Error-"+error.status+" : Not Able to delete, because already have order for this restaurant!!!!");
        }else{
          alert(error.statusText);
        }
      }
      });;
    this.restaurantList = [];
    this.ngOnInit();
  }
}
