import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Interval } from 'src/app/interfaces/interval';
import { TokenModel } from 'src/app/interfaces/token-model';
import { IntervalService } from 'src/app/services/interval.service';
import { ManagePasswordService } from 'src/app/services/manage-password.service';

@Component({
  selector: 'app-add-edit-interval',
  templateUrl: './add-edit-interval.component.html',
  styleUrls: ['./add-edit-interval.component.css']
})
export class AddEditIntervalComponent implements OnInit {

  default: boolean = false;
  adminToken : string = "";
  isAddMode: boolean = true;
  id: string = '';
  intervalData : Interval = {} as Interval;

  constructor(
    private fb: FormBuilder,
    private intervalService: IntervalService,
    private router: Router,
    private route: ActivatedRoute,
    private managepasswordService : ManagePasswordService

  ) {
    
    this.intervalForm.controls['isdeleted'].setValue(this.default, {
      onlySelf: true,
    });
  }

  intervalForm = this.fb.group({
    intervalId : [''],
    intervalName: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(9),Validators.pattern("^[A-Za-z]+$")]],
    isdeleted: [''],
  });

  ngOnInit(): void {
    this.adminToken = JSON.parse(localStorage.getItem('adminToken')!);
    this.adminToken = this.managepasswordService.decryptData(this.adminToken);

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.intervalForm.controls['intervalId'].setValue(this.id, {
      onlySelf: true,
    });

    // set forms value for update data

    if(this.isAddMode == false){
      this.intervalService.getIntervalById(Number.parseInt(this.id)).subscribe({
        next: (data) => {
          this.intervalData = data;
          this.intervalForm.patchValue(this.intervalData);
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
      this.createInterval();
    } else {
      this.updateInterval();
    }
  }

  createInterval(){
    console.log(this.intervalForm.value);
    this.intervalService.addInterval(this.intervalForm.value, this.adminToken).subscribe({
      error : (error)=>{
        if(error.status == 400){
          alert("Error-"+error.status+" : Please Enter Valid Data!!!!");
        }else{
          alert(error.statusText);
        }
      }
      });
    this.router.navigate(['../intervallist'], { relativeTo: this.route });
  }

  updateInterval(){
    console.log(this.intervalForm.value);
    this.intervalService.editInterval(this.intervalForm.value,this.adminToken).subscribe({
      error : (error)=>{
        if(error.status == 400){
          alert("Error-"+error.status+" : Please Enter Valid Data!!!!");
        }else{
          alert(error.statusText);
        }
      }
      });
    this.router.navigate(['../../intervallist'], { relativeTo: this.route });
  }

  get intervalName() {
    return this.intervalForm.get('intervalName');
  }


}
