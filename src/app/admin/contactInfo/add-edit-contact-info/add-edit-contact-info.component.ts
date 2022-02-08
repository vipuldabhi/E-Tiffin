import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenModel } from 'src/app/interfaces/token-model';
import { ContactinfoService } from 'src/app/services/contactinfo.service';
import { ManagePasswordService } from 'src/app/services/manage-password.service';

@Component({
  selector: 'app-add-edit-contact-info',
  templateUrl: './add-edit-contact-info.component.html',
  styleUrls: ['./add-edit-contact-info.component.css']
})
export class AddEditContactInfoComponent implements OnInit {

  default: boolean = false;
  adminToken : string = "";
  isAddMode: boolean = true;
  id: string = '';
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private contactinfoService : ContactinfoService,
    private managepasswordService : ManagePasswordService

  ) {
    this.contactInfoForm.controls['isSolved'].setValue(
      this.default,
      {
        onlySelf: true,
      }
    );
  }

  contactInfoForm = this.fb.group({
    contactId: [''],
    fullName: ['', [Validators.required, Validators.pattern("^[A-Za-z ]+$"),Validators.minLength(5)]],
    email: ['', [Validators.required,Validators.email]],
    contactNo: ['', [Validators.required,Validators.pattern("^[0-9]{10}$")]],
    subject: ['',[Validators.required,Validators.minLength(10)]],
    isSolved: [''],
  });

  ngOnInit(): void {
    this.adminToken = JSON.parse(localStorage.getItem('adminToken')!);
    this.adminToken = this.managepasswordService.decryptData(this.adminToken);

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.contactInfoForm.controls['contactId'].setValue(this.id, {
      onlySelf: true,
    });
    if(this.isAddMode == false){
      this.contactinfoService.getContactInfoById(this.adminToken,Number.parseInt(this.id)).subscribe({
        next: (data) => this.contactInfoForm.setValue(data),
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
      this.createContact();
    } else {
      this.updateContact();
    }
  }

  createContact() {
    this.contactinfoService.addContactInfo(this.contactInfoForm.value,this.adminToken).subscribe({
    error : (error)=>{
      if(error.status == 400){
        alert("Error-"+error.status+" : Please Enter Valid Data!!!!");
      }else{
        alert(error.statusText);
      }
    }
    });

    this.router.navigate(['../contactinfolist'], {
      relativeTo: this.route,
    });
  }

  updateContact() {
    this.contactinfoService.updateContactInfo(                                                                                                  
      this.contactInfoForm.value,                                                                              
      this.adminToken
    ).subscribe({
      error : (error)=>{
        if(error.status == 400){
          alert("Error-"+error.status+" : Please Enter Valid Data!!!!");
        }else{
          alert(error.statusText);
        }
      }
      });

    this.router.navigate(['../../contactinfolist'], {
      relativeTo: this.route,
    });
  }

  get fullName() {
    return this.contactInfoForm.get('fullName');
  }
  get email() {
    return this.contactInfoForm.get('email');
  }
  get contactNo() {
    return this.contactInfoForm.get('contactNo');
  }
  get subject() {
    return this.contactInfoForm.get('subject');
  }

}
