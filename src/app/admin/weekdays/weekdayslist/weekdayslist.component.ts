import { Component, OnInit } from '@angular/core';
import { Weekdays } from 'src/app/interfaces/weekdays';
import { ManagePasswordService } from 'src/app/services/manage-password.service';
import { WeekdaysService } from 'src/app/services/weekdays.service';

@Component({
  selector: 'app-weekdayslist',
  templateUrl: './weekdayslist.component.html',
  styleUrls: ['./weekdayslist.component.css']
})
export class WeekdayslistComponent implements OnInit {


  constructor(private weekdaysService : WeekdaysService,
    private managepasswordService : ManagePasswordService
) { }

  weekdaysList : Weekdays[] = [];
  remove : number = 0;
  adminToken : string = "";

  ngOnInit(): void {
    this.adminToken = JSON.parse(localStorage.getItem('adminToken')!);
    this.adminToken = this.managepasswordService.decryptData(this.adminToken);

    // get duration list
    this.weekdaysService.getDays().subscribe({
      next : data =>this.weekdaysList = data,
      error : (error)=>{
        if(error.status == 404){    
          alert("Error-"+error.status+" : Data Not Found!!!!");
        }else{
          alert(error.statusText);
        }
      }
      });
  }

  deleteWeekDay(e:any){
    this.remove = e.target.value;
    this.weekdaysService.deleteWeekday(this.adminToken,this.remove).subscribe({
      error : (error)=>{
        if(error.status == 400){    
          alert("Error-"+error.status+" : Not Able to delete, because already have order for this day!!!!");
        }else{
          alert(error.statusText);
        }
      }
      });;
    this.weekdaysList = [];
    this.ngOnInit();
  }

}
