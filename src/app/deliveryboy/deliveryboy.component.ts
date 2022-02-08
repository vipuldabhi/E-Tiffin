import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Deliveryboy } from '../interfaces/deliveryboy';
import { TokenModel } from '../interfaces/token-model';
import { DeliveryboyService } from '../services/deliveryboy.service';
import { ManagePasswordService } from '../services/manage-password.service';

@Component({
  selector: 'app-deliveryboy',
  templateUrl: './deliveryboy.component.html',
  styleUrls: ['./deliveryboy.component.css'],
})
export class DeliveryboyComponent implements OnInit {
  deliveryboyData: Deliveryboy = {} as Deliveryboy;
  deliveryboyToken: TokenModel = {} as TokenModel;

  constructor(
    private deliveryboyService: DeliveryboyService,
    private router: Router,
    private route: ActivatedRoute,
    private managepasswordService : ManagePasswordService
  ) {}

  ngOnInit(): void {
    this.deliveryboyToken = JSON.parse(
      localStorage.getItem('deliveryboyToken')!
    );
    this.deliveryboyToken.token = this.managepasswordService.decryptData(this.deliveryboyToken.token);


    this.deliveryboyService
      .getDeliveryBoyById(this.deliveryboyToken.token, this.deliveryboyToken.id)
      .subscribe({
        next: (data) => {
          this.deliveryboyData = data;
          console.log(data);
        },
        error: (error) => {
          alert(error.statusText);
        },
      });
  }

  navigateToEditDeliveryBoyDetails() {
    this.router.navigate(['editdeliveryboy', this.deliveryboyData.id], {
      relativeTo: this.route,
    });
  }
}
