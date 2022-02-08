import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ratings } from 'src/app/interfaces/ratings';
import { TokenModel } from 'src/app/interfaces/token-model';
import { ManagePasswordService } from 'src/app/services/manage-password.service';
import { RatingsService } from 'src/app/services/ratings.service';

@Component({
  selector: 'app-ratingslist',
  templateUrl: './ratingslist.component.html',
  styleUrls: ['./ratingslist.component.css']
})
export class RatingslistComponent implements OnInit {

    
  constructor(private ratingsService : RatingsService,
    private router : Router,
    private route : ActivatedRoute,
    private managepasswordService : ManagePasswordService
) { }

  ratingsList : Ratings[] = [];
  remove : number = 0;
  adminToken : string = "";

  searchRating: string = '';

  // pagination

  pageSize: number = 10;
  page: number = 1;
  count: number = this.ratingsList.length;

  handlePageChange(event: number): void {
    this.page = event;
  }

  ngOnInit(): void {
    this.adminToken = JSON.parse(localStorage.getItem('adminToken')!);
    this.adminToken = this.managepasswordService.decryptData(this.adminToken);

    // get duration list
    this.ratingsService.getRatings().subscribe({
      next : data =>this.ratingsList = data,
      error : (error)=>{
        if(error.status == 404){    
          alert("Error-"+error.status+" : Data Not Found!!!!");
        }else{
          alert(error.statusText);
        }
      }
      });
      
  }

  deleteRatings(e:any){
    this.remove = e.target.value;
    this.ratingsService.deleteRatings(this.adminToken,this.remove).subscribe({
      error : (error)=>{
        if(error.status == 400){    
          alert("Error-"+error.status+" : Not Able to delete!!!!");
        }else{
          alert(error.statusText);
        }
      }
      });;
    this.ratingsList = [];
    this.ngOnInit();
  }

}
                                                                                                                                                     