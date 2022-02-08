import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from 'src/app/interfaces/menu';
import { TokenModel } from 'src/app/interfaces/token-model';
import { ManagePasswordService } from 'src/app/services/manage-password.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menulist',
  templateUrl: './menulist.component.html',
  styleUrls: ['./menulist.component.css']
})
export class MenulistComponent implements OnInit {

  constructor(
    private menuService: MenuService,
    private managepasswordService : ManagePasswordService
  ) {}

  menuList: Menu[] = [];
  remove: number = 0;
  adminToken : string = "";
  searchMenu : string ="";

    // pagination

    pageSize: number = 10;
    page: number = 1;
    count: number = this.menuList.length;
  
    handlePageChange(event: number): void {
      this.page = event;
    }

  ngOnInit(): void {
    this.adminToken = JSON.parse(localStorage.getItem('adminToken')!);
    this.adminToken = this.managepasswordService.decryptData(this.adminToken);

    // get Interval list
    this.menuService.getAllMenu(this.adminToken).subscribe({
      next: (data) => {(this.menuList = data);console.log(this.menuList);
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

  deleteMenu(e: any) {
    this.remove = e.target.value;
    this.menuService.deleteMenu(this.adminToken, this.remove).subscribe({
      error: (error) => {
        if (error.status == 400) {
          alert(
            'Error-' +
              error.status +
              ' : Not Able to delete!!!!'
          );
        } else {
          alert(error.statusText);
        }
      },
    });
    this.menuList = [];
    this.ngOnInit();
  }
}
