import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private fb : FormBuilder) { 
    this.contactInfoForm.controls['isSolved'].setValue(false);
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
  }

  submit(){

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
