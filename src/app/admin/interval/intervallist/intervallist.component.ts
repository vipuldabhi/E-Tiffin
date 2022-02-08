import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Interval } from 'src/app/interfaces/interval';
import { TokenModel } from 'src/app/interfaces/token-model';
import { IntervalService } from 'src/app/services/interval.service';
import { ManagePasswordService } from 'src/app/services/manage-password.service';

@Component({
  selector: 'app-intervallist',
  templateUrl: './intervallist.component.html',
  styleUrls: ['./intervallist.component.css']
})
export class IntervallistComponent implements OnInit {

  constructor(
    private intervalService: IntervalService,
    private managepasswordService : ManagePasswordService

  ) {}

  intervalList: Interval[] = [];
  remove: number = 0;
  adminToken : string = "";

  ngOnInit(): void {
    this.adminToken = JSON.parse(localStorage.getItem('adminToken')!);
    this.adminToken = this.managepasswordService.decryptData(this.adminToken);
    
    // get Interval list
    this.intervalService.getInterval().subscribe({
      next: (data) => (this.intervalList = data),
      error: (error) => {
        if (error.status == 400) {
          alert('Error-' + error.status + ' :Data Not Found!!!!');
        } else {
          alert(error.statusText);
        }
      },
    });
  }

  deleteInterval(e: any) {
    this.remove = e.target.value;
    this.intervalService.deleteInterval(this.adminToken, this.remove).subscribe({
      error: (error) => {
        if (error.status == 400) {
          alert(
            'Error-' +
              error.status +
              ' : Not Able to delete, because already have Order for this interval!!!!'
          );
        } else {
          alert(error.statusText);
        }
      },
    });
    this.intervalList = [];
    this.ngOnInit();
  }

}
