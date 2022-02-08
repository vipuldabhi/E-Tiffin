import { Component, OnInit } from '@angular/core';
import { Contactinfo } from 'src/app/interfaces/contactinfo';
import { TokenModel } from 'src/app/interfaces/token-model';
import { ContactinfoService } from 'src/app/services/contactinfo.service';
import { ManagePasswordService } from 'src/app/services/manage-password.service';

@Component({
  selector: 'app-contactinfo-list',
  templateUrl: './contactinfo-list.component.html',
  styleUrls: ['./contactinfo-list.component.css'],
})
export class ContactinfoListComponent implements OnInit {
  contactInfoList: Contactinfo[] = [];
  remove: number = 0;
  adminToken: string = '';
  sorting : number = 0;
  searchContactInfo: string = '';

  // pagination

  pageSize: number = 10;
  page: number = 1;
  count: number = this.contactInfoList.length;

  handlePageChange(event: number): void {
    this.page = event;
  }

  constructor(
    private contactinfoService: ContactinfoService,
    private managepasswordService: ManagePasswordService
  ) {}

  ngOnInit(): void {
    this.adminToken = JSON.parse(localStorage.getItem('adminToken')!);
    this.adminToken = this.managepasswordService.decryptData(this.adminToken);

    // get ContactInfo list
    this.contactinfoService.getContactInfo(this.adminToken).subscribe({
      next: (data) => (this.contactInfoList = data),
      error: (error) => {
        if (error.status == 404) {
          alert('Error-' + error.status + ' : Data Not Found!!!!');
        } else {
          alert(error.statusText);
        }
      },
    });
  }

  // get sorted data

  change(e:any){
    this.sorting = e.target.value;
    this.contactinfoService.getSortedContactData(this.adminToken,this.sorting).subscribe({
      next: (data) => (this.contactInfoList = data),
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

  deleteContactInfo(e: any) {
    this.remove = e.target.value;
    this.contactinfoService.deleteContactInfo(this.adminToken, this.remove);
    this.contactInfoList = [];
    this.ngOnInit();
  }
}
