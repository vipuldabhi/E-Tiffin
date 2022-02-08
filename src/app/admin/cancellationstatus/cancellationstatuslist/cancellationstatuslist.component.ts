import { Component, OnInit } from '@angular/core';
import { Cancellationstatus } from 'src/app/interfaces/cancellationstatus';
import { TokenModel } from 'src/app/interfaces/token-model';
import { CancellationstatusService } from 'src/app/services/cancellationstatus.service';
import { ManagePasswordService } from 'src/app/services/manage-password.service';

@Component({
  selector: 'app-cancellationstatuslist',
  templateUrl: './cancellationstatuslist.component.html',
  styleUrls: ['./cancellationstatuslist.component.css']
})
export class CancellationstatuslistComponent implements OnInit {

  cancellationstatusList : Cancellationstatus[] = [];
  remove : number = 0;
  adminToken : string = "";
  sorting : number =0;
  searchStatus :string = "";

  // pagination 

  pageSize : number = 10;
  page : number = 1;
  count : number = this.cancellationstatusList.length;

  handlePageChange(event: number): void {
    this.page = event;
  }

  constructor(
    private cancellaitonstatusservice : CancellationstatusService,
    private managepasswordService : ManagePasswordService

    ) { }

  ngOnInit(): void {
    this.adminToken = JSON.parse(localStorage.getItem('adminToken')!);
    this.adminToken = this.managepasswordService.decryptData(this.adminToken);

    // get area list
    this.cancellaitonstatusservice.getStatus(this.adminToken).subscribe({
      next : data =>this.cancellationstatusList = data,
      error : (error)=>{
        console.log(error);
        if(error.status == 404){    
          alert("Error-"+error.status+" : Data Not Found!!!!");
        }else{
          alert(error.statusText);
        }
      }
      });
  }

  reset(){
    this.ngOnInit();
  }

  // get sorted data

  change(e:any){
    this.sorting = e.target.value;
    this.cancellaitonstatusservice.getSortedStatus(this.adminToken,this.sorting).subscribe({
      next: (data) => (this.cancellationstatusList = data),
      error: (error) => {
        if (error.status == 404) {
          alert('Error-' + error.status + ' : Data Not Found!!!!');
        } else {
          alert(error.statusText);
        }
      },
    });
  }
   
  deleteStatus(e:any){
    this.remove = e.target.value;
    this.cancellaitonstatusservice.deleteStatus(this.adminToken,this.remove).subscribe({
      error: (error) => {
        if (error.status == 404) {
          alert('Error-' + error.status + ' : Data Not Found!!!!');
        } else {
          alert(error.statusText);
        }
      },
    });
    this.cancellationstatusList = [];
    this.ngOnInit();
  }

}
                                                