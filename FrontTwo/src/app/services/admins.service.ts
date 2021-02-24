import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
//import 'rxjs';
import 'rxjs/Rx';

import { Worker } from '../model/worker';

@Injectable({
  providedIn: 'root',
})
export class AdminsService {
  private url1: string = 'http://localhost:8080/full';
  private url: string = 'http://localhost:8080/full/accounts';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });
  private worker!: Worker;

  constructor(private _http: Http) {}

  addItem(worker: Worker) {
    // 1
    return this._http
      .post(this.url1 + '/accounts', JSON.stringify(worker), this.options)
      .map((res: { json: () => any }) => res.json())
      .catch(this.errorPost);
  }

//  saveOrUpdateItem(worker: Worker) {
    saveOrUpdateItemX(worker: any) {
    //  3
    console.log(worker)
    const zed=worker.id;
    console.log(zed);
    return this._http
      .put(this.url1 + '/accounts/'+zed, JSON.stringify(worker), this.options)
      //.post(this.url1 + '/accounts/'+zed, JSON.stringify(worker), this.options)
      .map((res: { json: () => any }) => {res.json(), console.log(res)})
      .catch(this.errorPost);
  }

  saveOrUpdateItem(id: number, productx: Worker): Observable<any> {
    console.log(productx);
    const url = `${this.url}/${id}`;
    return this._http.put(url, productx, this.options);
    // return this._http.put(url, productx, { responseType: 'json' });
  }

  getItems() {
    // 2 A
    return this._http
      .get(this.url1 + '/accounts', this.options)
      .map((res: { json: () => any }) => res.json())
      .catch(this.errorPost);
  }

  getItem(id: Number) {
    // 2 B
    return this._http
      .get(this.url1 + '/accounts/' + id, this.options)
      .map((res: { json: () => any }) => res.json())
      .catch(this.errorPost);
  }


  deleteItem(id: Number) {
    // 4
    return this._http
      .delete(this.url1 + '/accounts/' + id, this.options)
      .map((res: { json: () => any }) => res.json())
      .catch(this.errorPost);
  }

  errorPost(error: any) {
    return Observable.throwError(error || 'SERVER ERROR');
  }

  setter(worker: Worker) {
    this.worker = worker;
  }
  getter() {
    return this.worker;
  }
}
