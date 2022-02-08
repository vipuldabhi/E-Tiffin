import { Component, OnInit } from '@angular/core';
import { Area } from 'src/app/interfaces/area';
import { AreaService } from 'src/app/services/area.service';
import { ManagePasswordService } from 'src/app/services/manage-password.service';

@Component({
  selector: 'app-arealist',
  templateUrl: './arealist.component.html',
  styleUrls: ['./arealist.component.css'],
})
export class ArealistComponent implements OnInit {
  constructor(
    private areaservice: AreaService,
    private managepasswordService : ManagePasswordService
  ) {}

  areaList: Area[] = [];
  remove: number = 0;
  adminToken:string ="";
  sorting :number = 0;
  searchArea : string = "";

  // pagination 

  pageSize : number = 10;
  page : number = 1;
  count : number = this.areaList.length;

  handlePageChange(event: number): void {
    this.page = event;
  }

  ngOnInit(): void {
    this.adminToken = JSON.parse(localStorage.getItem('adminToken')!);
    this.adminToken = this.managepasswordService.decryptData(this.adminToken);
    // get area list
    this.areaservice.getArea().subscribe({
      next: (data) => (this.areaList = data),
      error: (error) => {
        if (error.status == 404) {
          alert('Error-' + error.status + ' : Data Not Found!!!!');
        } else {
          alert(error.statusText);
        }
      },
    });
  }

  change(e:any){
    this.sorting = e.target.value;
    this.areaservice.getSortedArea(this.sorting).subscribe({
      next: (data) => (this.areaList = data),
      error: (error) => {
        if (error.status == 404) {
          alert('Error-' + error.status + ' : Data Not Found!!!!');
        } else {
          alert(error.statusText);
        }
      },
    });
  }

  reset(){
    this.ngOnInit();
  }

  deleteArea(e: any) {
    this.remove = e.target.value;
    this.areaservice.deleteArea(this.adminToken, this.remove).subscribe({
      error: (error) => {
        if (error.status == 400) {
          alert(
            'Error-' +
              error.status +
              ' : Not Able to delete, because already have order for this duration!!!!'
          );
        } else {
          alert(error.statusText);
        }
      },
    });
    this.areaList = [];
    this.ngOnInit();
  }
}
