import { Component, OnInit } from '@angular/core';
import { Cancellationstatus } from 'src/app/interfaces/cancellationstatus';
import { TokenModel } from 'src/app/interfaces/token-model';
import { CancellationstatusService } from 'src/app/services/cancellationstatus.service';
import { ManagePasswordService } from 'src/app/services/manage-password.service';

@Component({
  selector: 'app-cancellationstatus',
  templateUrl: './cancellationstatus.component.html',
  styleUrls: ['./cancellationstatus.component.css'],
})
export class CancellationstatusComponent implements OnInit {
  cancellationstatusList: Cancellationstatus[] = [];
  remove: number = 0;
  deliveryboyToken: TokenModel = {} as TokenModel;
  sorting: number = 0;
  searchStatus: string = '';

  // pagination

  pageSize: number = 10;
  page: number = 1;
  count: number = this.cancellationstatusList.length;

  handlePageChange(event: number): void {
    this.page = event;
  }

  constructor(
    private cancellaitonstatusservice: CancellationstatusService,
    private managepasswordService: ManagePasswordService
  ) {}

  ngOnInit(): void {
    this.deliveryboyToken = JSON.parse(
      localStorage.getItem('deliveryboyToken')!
    );
    this.deliveryboyToken.token = this.managepasswordService.decryptData(
      this.deliveryboyToken.token
    );

    // get area list
    this.cancellaitonstatusservice
      .getStatus(this.deliveryboyToken.token)
      .subscribe({
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

  reset() {
    this.ngOnInit();
  }

  // get sorted data

  change(e: any) {
    this.sorting = e.target.value;
    this.cancellaitonstatusservice
      .getSortedStatus(this.deliveryboyToken.token, this.sorting)
      .subscribe({
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

  deleteStatus(e: any) {
    this.remove = e.target.value;
    this.cancellaitonstatusservice
      .deleteStatus(this.deliveryboyToken.token, this.remove)
      .subscribe({
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
