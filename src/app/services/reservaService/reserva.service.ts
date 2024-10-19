import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private reservaData: any = {};
  private userData: any = {};

  setReservaData(data: any) {
    this.reservaData = data;
  }

  getReservaData() {
    return this.reservaData;
  }

  setUserData(data: any) {
    this.userData = data;
  }

  getUserData() {
    return this.userData;
  }

  clearAllData() {
    this.reservaData = {};
    this.userData = {};
  }
  clearUserData() {
    this.userData = {};
  }
}
