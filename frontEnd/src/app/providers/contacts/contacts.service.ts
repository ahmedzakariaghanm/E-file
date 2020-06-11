import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  url = 'http://localhost:5000';
  constructor(private http: HttpClient,private toastr: ToastrService) { }

  addContact(contact){
    // console.log(contact)
    return this.http.post(`${this.url}/addContact`,contact)
    .pipe(
      catchError(e => {
        this.toastr.error(e.error.msg);
        throw new Error(e);
      })
    ); 
  }
  getAllContacts(){
    return this.http.get<any[]>(`${this.url}/getContacts`)
    .pipe(
      catchError(e => {
        this.toastr.error(e.error.msg);
        throw new Error(e);
      })
    );
  }

  deleteContact(id){
    return this.http.delete<any[]>(`${this.url}/deleteContact/${id}`)   
    .pipe(
      catchError(e => {
        this.toastr.error(e.error.msg);
        throw new Error(e);
      })
    );
  }
  editContact(contact){
    return this.http.post(`${this.url}/editContact`,contact)
    .pipe(
      catchError(e => {
        this.toastr.error(e.error.msg);
        throw new Error(e);
      })
    );

  }
}
