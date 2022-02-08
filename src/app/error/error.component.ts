import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  errorcode : number = 0;
  errortext : string = ""; 

  constructor(private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.errorcode = this.route.snapshot.params['errorcode'];
    this.errortext = this.route.snapshot.params['errortext'];
  }

}
