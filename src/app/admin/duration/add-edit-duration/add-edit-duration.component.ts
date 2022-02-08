import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Duration } from 'src/app/interfaces/duration';
import { TokenModel } from 'src/app/interfaces/token-model';
import { DurationService } from 'src/app/services/duration.service';
import { ManagePasswordService } from 'src/app/services/manage-password.service';

@Component({
  selector: 'app-add-edit-duration',
  templateUrl: './add-edit-duration.component.html',
  styleUrls: ['./add-edit-duration.component.css']
})
export class AddEditDurationComponent implements OnInit {

  default: boolean = false;
  adminToken : string = "";
  isAddMode: boolean = true;
  id: string = '';
  durationData : Duration = {} as Duration;

  constructor(
    private fb: FormBuilder,
    private durationService: DurationService,
    private router: Router,
    private route: ActivatedRoute,
    private managepasswordService : ManagePasswordService

  ) {
    
    this.durationForm.controls['isdeleted'].setValue(this.default, {
      onlySelf: true,
    });
  }

  durationForm = this.fb.group({
    durationId : [''],
    durationTime: ['', [Validators.required]],
    isdeleted: [''],
  });

  ngOnInit(): void {
    this.adminToken = JSON.parse(localStorage.getItem('adminToken')!);
    this.adminToken = this.managepasswordService.decryptData(this.adminToken);
    
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.durationForm.controls['durationId'].setValue(this.id, {
      onlySelf: true,
    });

    // set forms value for update data

    if(this.isAddMode == false){
      this.durationService.getDurationById(Number.parseInt(this.id)).subscribe({
        next: (data) => {
          this.durationData = data;
          this.durationForm.patchValue(this.durationData);
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
      this.createDuration();
    } else {
      this.updateDuration();
    }
  }

  createDuration(){
    console.log(this.durationForm.value);
    this.durationService.addDuration(this.durationForm.value, this.adminToken).subscribe({
      error : (error)=>{
        if(error.status == 400){
          alert("Error-"+error.status+" : Please Enter Valid Data!!!!");
        }else{
          alert(error.statusText);
        }
      }
      });
    this.router.navigate(['../durationlist'], { relativeTo: this.route });
  }

  updateDuration(){
    console.log(this.durationForm.value);
    this.durationService.editDuration(this.durationForm.value,this.adminToken).subscribe({
      error : (error)=>{
        if(error.status == 400){
          alert("Error-"+error.status+" : Please Enter Valid Data!!!!");
        }else{
          alert(error.statusText);
        }
      }
      });
    this.router.navigate(['../../durationlist'], { relativeTo: this.route });
  }

  get durationTime() {
    return this.durationForm.get('durationTime');
  }

}
