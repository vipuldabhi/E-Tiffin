import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Area } from 'src/app/interfaces/area';
import { TokenModel } from 'src/app/interfaces/token-model';
import { AreaService } from 'src/app/services/area.service';
import { ManagePasswordService } from 'src/app/services/manage-password.service';

@Component({
  selector: 'app-add-edit-area',
  templateUrl: './add-edit-area.component.html',
  styleUrls: ['./add-edit-area.component.css'],
})
export class AddEditAreaComponent implements OnInit {
  default: boolean = false;
  adminToken : string = "";
  isAddMode: boolean = true;
  id: string = '';
  area : Area = {} as Area;


  constructor(
    private fb: FormBuilder,
    private areaservice: AreaService,
    private router: Router,
    private route: ActivatedRoute,
    private managepasswordService : ManagePasswordService

  ) {
    this.areaForm.controls['isDeleted'].setValue(this.default, {
      onlySelf: true,
    });
  }

  areaForm = this.fb.group({
    areaId: [''],
    areaName: ['', [Validators.required, Validators.minLength(2)]],
    isDeleted: [''],
  });

  ngOnInit(): void {
    this.adminToken = JSON.parse(localStorage.getItem('adminToken')!);
    this.adminToken = this.managepasswordService.decryptData(this.adminToken);

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.areaForm.controls['areaId'].setValue(this.id, {
      onlySelf: true,
    });
    if(this.isAddMode == false){
      this.areaservice.getAreaById(Number.parseInt(this.id)).subscribe({
        next: (data) => {
          this.area = data;
          this.areaForm.patchValue(this.area);
        },
        error: (error) => {
          // this.router.navigate(['../../error'],{})
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
      this.createArea();
    } else {
      this.updateArea();
    }
  }

  createArea() {
    this.areaservice.addArea(this.areaForm.value, this.adminToken).subscribe({
      error: (error) => {
        if (error.status == 400) {
          alert('Error-' + error.status + ' : Please Enter Valid Data!!!!');
        } else {
          alert(error.statusText);
        }
      },
    });
    this.router.navigate(['../arealist'], { relativeTo: this.route });
  }

  updateArea() {
    console.log(this.areaForm.value);
    this.areaservice.editArea(this.areaForm.value, this.adminToken).subscribe({
      error: (error) => {
        if (error.status == 400) {
          alert('Error-' + error.status + ' : Please Enter Valid Data!!!!');
        } else {
          alert(error.statusText);
        }
      },
    });
    this.router.navigate(['../../arealist'], { relativeTo: this.route });
  }

  get areaName() {
    return this.areaForm.get('areaName');
  }
}
