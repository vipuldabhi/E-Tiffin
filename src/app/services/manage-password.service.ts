import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class ManagePasswordService {

  encryptSecretKey : string = "abcd@123456";

  constructor() { }

  encryptData(password : any) {
      try {
        return CryptoJS.AES.encrypt(JSON.stringify(password), this.encryptSecretKey).toString();
      } catch (e) {
        return e;
      }
    }
  
    decryptData(password : any) {
  
      try {
        const bytes = CryptoJS.AES.decrypt(password, this.encryptSecretKey);
        if (bytes.toString()) {
          return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }
        return password;
      } catch (e) {
        console.log(e);
      }
    }
}
