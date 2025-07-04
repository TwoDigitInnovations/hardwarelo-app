import { Injectable } from '@angular/core';
// import { CommonService } from '../common.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    private common: CommonService,
    private http: HttpClient,
  ) { }

  login(data: any) {
    const url = `${environment.url}login`;
    return this.http.post(url, data);
  }

  signUp(data: any) {
    const url = `${environment.url}signUp`;
    return this.http.post(url, data);
  }

  sendOTP(data: any) {
    const url = `${environment.url}sendOTP`;
    return this.http.post(url, data);
  }

  sendOTPForForgetPassword(data: any) {
    const url = `${environment.url}sendOTPForSignUp`;
    return this.http.post(url, data);
  }

  verifyOtp(data: any) {
    const url = `${environment.url}verifyOTP`;
    return this.http.post(url, data);
  }

  changePassword(data: any) {
    const url = `${environment.url}changePassword`;
    return this.http.post(url, data);
  }

  profileChangePassword(data: any) {
    const url = `profile/changePassword`;
    return this.common.post(url, data);
  }

  // updateProfile(data: any) {
  //   const url = `updateProfile`;
  //   return this.common.post(url, data);
  // }

  getProduct() {
    let userDetail: any = localStorage.getItem('userDetail')
    if (userDetail) {
      userDetail = JSON.parse(userDetail)
    }
    let pinCode = localStorage.getItem('pinCode')
    const url = `getProduct?pincode=${userDetail?.pincode || pinCode}`;
    return this.common.get(url,);
  }

  getorderId(data: any) {
    const url = `payment`;
    return this.common.post(url, data);
  }

  getCategory() {
    let userDetail: any = localStorage.getItem('userDetail')
    if (userDetail) {
      userDetail = JSON.parse(userDetail)
    }
    let pinCode = localStorage.getItem('pinCode')
    const url = `getCategory?pincode=${userDetail?.pincode || pinCode}`;
    return this.common.get(url);
  }

  getCategoryBySearch(key: any) {
    let userDetail: any = localStorage.getItem('userDetail')
    if (userDetail) {
      userDetail = JSON.parse(userDetail)
    }
    let pinCode = localStorage.getItem('pinCode')
    // const url = `getCategoryBySearch`;
    const url = `getCategoryBySearch?pincode=${userDetail?.pincode || pinCode}&key=${key}`;
    return this.common.get(url);
  }

  getsetting() {
    const url = `getsetting`;
    return this.common.get(url,);
  }

  getPopularCategory() {
    const url = `getPopularCategory`;
    return this.common.get(url,);
  }

  getProductByCatrgoryId(data: any) {

    const url = `getProductBycategoryId`;
    return this.common.get(url, data);
  }

  getProductById(id: any) {
    const url = `getProductById/${id}`;
    return this.common.get(url);
  }

  updateProfile(data: any) {
    const url = `updateProfile`;
    return this.common.post(url, data);
  }

  getProfile() {
    const url = `getProfile`;
    return this.common.get(url,);
  }

  fileupload(data: any) {
    const url = 'user/fileupload';
    return this.common.post(url, data);
  }

  createProductRquest(data: any) {
    const url = `createProductRquest`;
    return this.common.post(url, data);
  }

  checkqty(data: any) {
    const url = `checkqty`;
    return this.common.post(url, data);
  }

  getProductRequestbyUser() {
    const url = `getProductRequestbyUser`;
    return this.common.get(url,);
  }

  productsearch(text: any) {
    const url = `productsearch?key=${text}`;
    return this.common.get(url,);
  }

  getProductRequest(id: any) {
    const url = `getProductRequest/${id}`;
    return this.common.get(url);
  }

  getSuperCategory() {
    const url = `getSuperCategory`;
    return this.common.get(url,);
  }

  getCategoryBysuperCategoryId(id: any) {
    const url = `getCategoryBysuperCategoryId/${id}`;
    return this.common.get(url);
  }

  getAllSuperCategoryWithCategory() {
    const url = `getAllSuperCategoryWithCategory`;
    return this.common.get(url,);
  }

  getCoupon() {
    const url = `getCoupon`;
    return this.common.get(url,);
  }

  couponByCouponCode(data: any) {
    const url = `couponByCouponCode`;
    return this.common.post(url, data);
  }

  sendOTPForSignUp(data: any) {
    const url = `${environment.url}sendOTPForSignUp`;
    return this.http.post(url, data);
  }

  getBrand() {
    const url = `getBrand`;
    return this.common.get(url,);
  }

  getProductByBrandId(id: any) {
    const url = `getProductByBrandId/${id}`;
    return this.common.get(url);
  }

  getAllProductWithBrand() {
    const url = `getAllProductWithBrand`;
    return this.common.get(url,);
  }
}
