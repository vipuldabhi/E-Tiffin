import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Duration } from 'src/app/interfaces/duration';
import { TokenModel } from 'src/app/interfaces/token-model';
import { DurationService } from 'src/app/services/duration.service';
import { ManagePasswordService } from 'src/app/services/manage-password.service';

@Component({
  selector: 'app-durationlist',
  templateUrl: './durationlist.component.html',
  styleUrls: ['./durationlist.component.css']
})
export class DurationlistComponent implements OnInit {

  
  constructor(private durationService : DurationService,
    private managepasswordService : ManagePasswordService
) { }

  durationList : Duration[] = [];
  remove : number = 0;
  adminToken : string = "";

  ngOnInit(): void {
    this.adminToken = JSON.parse(localStorage.getItem('adminToken')!);
    this.adminToken = this.managepasswordService.decryptData(this.adminToken);

    // get duration list
    this.durationService.getDuration().subscribe({
      next : data =>this.durationList = data,
      error : (error)=>{
        if(error.status == 404){    
          alert("Error-"+error.status+" : Data Not Found!!!!");
        }else{
          alert(error.statusText);
        }
      }
      });
  }

  deleteDuration(e:any){
    this.remove = e.target.value;
    this.durationService.deleteDuration(this.adminToken,this.remove).subscribe({
      error : (error)=>{
        if(error.status == 400){    
          alert("Error-"+error.status+" : Not Able to delete, because already have order for this duration!!!!");
        }else{
          alert(error.statusText);
        }
      }
      });
    this.durationList = [];
    this.ngOnInit();
  }
}
