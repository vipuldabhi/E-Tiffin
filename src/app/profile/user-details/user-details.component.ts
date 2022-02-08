import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Orderdetails } from 'src/app/interfaces/orderdetails';
import { TokenModel } from 'src/app/interfaces/token-model';
import { User } from 'src/app/interfaces/user';
import { ManagePasswordService } from 'src/app/services/manage-password.service';
import { OrderdetailsService } from 'src/app/services/orderdetails.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  userData: User = {} as User;
  email: string = '';
  userToken: TokenModel = {} as TokenModel;
  orderData: Orderdetails = {} as Orderdetails;
  hasOrder: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private orderdetailsService: OrderdetailsService,
    private managepasswordService : ManagePasswordService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('adminToken')) {
      this.router.navigate(['../admin'], { relativeTo: this.route });
    } else if (localStorage.getItem('deliveryboyToken')) {
      this.router.navigate(['../deliveryboy'], { relativeTo: this.route });
    } else if (localStorage.getItem('userToken')) {
      this.userToken = JSON.parse(localStorage.getItem('userToken')!);
      this.userToken.token = this.managepasswordService.decryptData(this.userToken.token);
      console.log(this.userToken);
      // this.email = localStorage.getItem('userEmail')!;
      this.userService.getUserById(this.userToken.token, this.userToken.id).subscribe({
        next: (data) => {
          this.userData = data;
          this.orderdetailsService
            .getOrderdetailsByUserId(this.userToken.token, this.userData.userId)
            .subscribe({
              next: (data) => {
                this.orderData = data;
                this.hasOrder = true;
              },
              error: (error) => {
                // this.error = error.message;
                // if (error.status == 400) {
                //   alert('Error-' + error.status + ' : Data Not Found!!!!');
                // } else {
                //   alert(this.error);
                // }
                this.hasOrder = false;
              },
            });
        },
        error: (error) => {
          if (error.status == 400) {
            alert('Error-' + error.status + ' : Data Not Found!!!!');
          } else {
            alert(error.statusText);
          }
        },
      });
    }
  }

  navigateToEditUserDetails() {
    this.router.navigate(['../edituserdetails', this.userData.userId], {
      relativeTo: this.route,
    });
  }
}
