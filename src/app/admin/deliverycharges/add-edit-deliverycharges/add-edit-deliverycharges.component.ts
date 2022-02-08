import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Deliverycharges } from 'src/app/interfaces/deliverycharges';
import { Duration } from 'src/app/interfaces/duration';
import { TokenModel } from 'src/app/interfaces/token-model';
import { DeliverychargesService } from 'src/app/services/deliverycharges.service';
import { DurationService } from 'src/app/services/duration.service';
import { ManagePasswordService } from 'src/app/services/manage-password.service';

@Component({
  selector: 'app-add-edit-deliverycharges',
  templateUrl: './add-edit-deliverycharges.component.html',
  styleUrls: ['./add-edit-deliverycharges.component.css']
})
export class AddEditDeliverychargesComponent implements OnInit {

  default: boolean = false;
  adminToken: string = "";
  isAddMode: boolean = true;
  id: string = '';
  durationList: Duration[] = [];
  deliveryChargesData : Deliverycharges = {} as Deliverycharges;

  constructor(
    private fb: FormBuilder,
    private deliverychargesService: DeliverychargesService,
    private router: Router,
    private route: ActivatedRoute,
    private durationService: DurationService,
    private managepasswordService : ManagePasswordService

  ) {
    this.deliverychargesForm.controls['isDeleted'].setValue(this.default, {
      onlySelf: true,
    });

    this.deliverychargesForm.controls['durationId'].setValue(
      'Please Select Duration',
      {
        onlySelf: true,
      }
    );
  }

  deliverychargesForm = this.fb.group({
    id: [''],
    durationId: ['', Validators.required],
    charge: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    isDeleted: [''],
  });

  ngOnInit(): void {
    this.adminToken = JSON.parse(localStorage.getItem('adminToken')!);
    this.adminToken = this.managepasswordService.decryptData(this.adminToken);

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.deliverychargesForm.controls['id'].setValue(this.id, {
      onlySelf: true,
    });

    //this method fetch interval list data from database and store in intervalList

    this.durationService.getDuration().subscribe({
      next: (data) => {
        (this.durationList = data);
        console.log(data)
      },
      error: (error) => {
        if (error.status == 400) {
          alert('Error-' + error.status + ' :Data Not Found!!!!');
        } else {
          alert(error.statusText);
        }
      },
    });

    // set forms value for update data

    if (this.isAddMode == false) {
      this.deliverychargesService
        .getDeliveryChargeById(Number.parseInt(this.id))
        .subscribe({
          next: (data) => {
            this.deliveryChargesData = data;
            this.deliverychargesForm.patchValue(this.deliveryChargesData);
          },
          error: (error) => {
            if (error.status == 400) {
              alert('Error-' + error.status + ' : Please Enter Valid Data!!!!');
            } else {
              alert(error.statusText);
            }
          },
        });
    }
  }

  submit() {
    if (this.isAddMode) {
      this.createDeliveryCharge();
    } else {
      this.updateDeliveryCharge();
    }
  }

  createDeliveryCharge() {
    this.deliverychargesService
      .addDeliveryCharge(this.deliverychargesForm.value, this.adminToken)
      .subscribe({
        error: (error) => {
          if (error.status == 400) {
            alert('Error-' + error.status + ' : Please Enter Valid Data!!!!');
          } else {
            alert(error.statusText);
          }
        },
      });

    this.router.navigate(['../deliverychargeslist'], { relativeTo: this.route });
  }

  updateDeliveryCharge() {
    this.deliverychargesService
      .updateDeliveryCharge(this.deliverychargesForm.value, this.adminToken)
      .subscribe({
        error: (error) => {
          if (error.status == 400) {
            alert('Error-' + error.status + ' : Please Enter Valid Data!!!!');
          } else {
            alert(error.statusText);
          }
        },
      });
    this.router.navigate(['../../deliverychargeslist'], { relativeTo: this.route });
  }


  get durationId() {
    return this.deliverychargesForm.get('durationId');
  }

  get charge() {
    return this.deliverychargesForm.get('charge');
  }
}
