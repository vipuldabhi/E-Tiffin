import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { ManagePasswordService } from 'src/app/services/manage-password.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  userList: User[] = [];
  remove: number = 0;
  adminToken : string = "";
  searchUser : string = "";
  sorting : number = 1;
  reference : number = 3;

 // pagination

 pageSize: number = 10;
 page: number = 1;
 count: number = this.userList.length;

 handlePageChange(event: number): void {
   this.page = event;
 }

  constructor(
    private userService: UserService,
    private managepasswordService : ManagePasswordService
  ) {}

  ngOnInit(): void {
    this.adminToken = JSON.parse(localStorage.getItem('adminToken')!);
    this.adminToken = this.managepasswordService.decryptData(this.adminToken);

    // get Interval list
    this.userService.getUser(this.adminToken).subscribe({
      next: (data) => {(this.userList = data);console.log(this.userList);
      },
      error: (error) => {
        if (error.status == 400) {
          alert('Error-' + error.status + ' :Data Not Found!!!!');
        } else {
          alert(error.statusText);
        }
      },
    });
    
  }

  change(){
    this.userService.getSortedUsers(this.adminToken,this.sorting,this.reference).subscribe({
      next: (data) => (this.userList = data),
      error: (error) => {
        if (error.status == 404) {
          alert('Error-' + error.status + ' : Data Not Found!!!!');
        } else {
          alert(error.statusText);
        }
      },
    });
  }

  deleteUser(e: any) {
    this.remove = e.target.value;
    this.userService.deleteUser(this.adminToken, this.remove).subscribe({
      error: (error) => {
        if (error.status == 400) {
          alert(
            'Error-' +
              error.status +
              ' : Not Able to delete, because already have Order for this foodType!!!!'
          );
        } else {
          alert(error.statusText);
        }
      },
    });
    this.userList = [];
    this.ngOnInit();
  }

}
