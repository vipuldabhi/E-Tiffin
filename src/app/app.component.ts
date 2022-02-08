import { Component, OnInit } from '@angular/core';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faGem } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  filmIcon = faFilm;
  facebook = faFacebook;
  twitter = faTwitter;
  instagram = faInstagram;
  linkedin = faLinkedin;
  github = faGithub;
  google = faGoogle;
  gem = faGem;
  home = faHome;
  envelop = faEnvelope;
  phone = faPhone;
  print = faPrint;
  whatsapp = faWhatsapp;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
  
  }

  logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('deliveryboyToken');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('Token');
    localStorage.removeItem('userEmail');
  }

  get isLogin(){
    return this.authService.isLogin();
  }

  // get isAdmin(){
  //   return this.authService.isAdmin();
  // }

  // get isDeliveryBoy(){
  //   return this.authService.isDeliveryBoy();
  // }

  get isUser(){
    return this.authService.isUser();
  }

}
