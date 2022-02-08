import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenModel } from 'src/app/interfaces/token-model';
import { Weekdays } from 'src/app/interfaces/weekdays';
import { ManagePasswordService } from 'src/app/services/manage-password.service';
import { WeekdaysService } from 'src/app/services/weekdays.service';

@Component({
  selector: 'app-add-edit-weekdays',
  templateUrl: './add-edit-weekdays.component.html',
  styleUrls: ['./add-edit-weekdays.component.css']
})
export class AddEditWeekdaysComponent implements OnInit {

  
  default: boolean = false;
  adminToken : string = "";
  isAddMode: boolean = true;
  id: string = '';
  weekDayData : Weekdays = {} as Weekdays;

  constructor(
    private fb: FormBuilder,
    private weekdaysService: WeekdaysService,
    private router: Router,
    private route: ActivatedRoute,
    private managepasswordService : ManagePasswordService
  ) {
    
    this.weekdayForm.controls['isdeleted'].setValue(this.default, {
      onlySelf: true,
    });
  }

  weekdayForm = this.fb.group({
    dayId : [''],
    weekDayName: ['', [Validators.required,Validators.pattern("^[a-zA-Z]+$"),Validators.minLength(6),Validators.maxLength(9)]],
    isdeleted: [''],
  });

  ngOnInit(): void {
    this.adminToken = JSON.parse(localStorage.getItem('adminToken')!);
    this.adminToken = this.managepasswordService.decryptData(this.adminToken);

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.weekdayForm.controls['dayId'].setValue(this.id, {
      onlySelf: true,
    });

    // set forms value for update data

    if (this.isAddMode == false) {
      this.weekdaysService
        .getWeekdayById(this.adminToken, Number.parseInt(this.id))
        .subscribe({
          next: (data) => {
            this.weekDayData = data;
            this.weekdayForm.patchValue(this.weekDayData);
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
      this.createWeekDay();
    } else {
      this.updateWeekDay();
    }
  }

  createWeekDay(){
    console.log(this.weekdayForm.value);
    this.weekdaysService.addWeekday(this.weekdayForm.value, this.adminToken).subscribe({
      error : (error)=>{
        if(error.status == 400){
          alert("Error-"+error.status+" : Please Enter Valid Data!!!!");
        }else{
          alert(error.statusText);
        }
      }
      });
    this.router.navigate(['../weekdayslist'], { relativeTo: this.route });
  }

  updateWeekDay(){
    console.log(this.weekdayForm.value);
    this.weekdaysService.editWeekday(this.weekdayForm.value,this.adminToken).subscribe({
      error : (error)=>{
        if(error.status == 400){
          alert("Error-"+error.status+" : Please Enter Valid Data!!!!");
        }else{
          alert(error.statusText);
        }
      }
      });
    this.router.navigate(['../../weekdayslist'], { relativeTo: this.route });
  }

  get weekDayName() {
    return this.weekdayForm.get('weekDayName');
  }


}
