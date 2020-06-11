import { AuthService } from '../providers/auth/auth.service';
import { ContactsService } from '../providers/contacts/contacts.service'
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Element} from './contact'
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})

export class ContactsComponent implements OnInit {
  editedContact : Element;
  newContactForm: FormGroup;
  user = localStorage.getItem('user');
  isFormSubmitted  =  false;
  editFlag = -1;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  displayedColumns = ['name','phone','address','notes','actions'];

  constructor(
    private authService: AuthService,
    private contactService:ContactsService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildForms();
    this.getContacts();
  }
  checkForLock(row){
    if(row['user'] && row['user'] !=  localStorage.getItem('user')){
      return false;
    }
    else {
      return true;
    }
  }
  getContacts(){
    setInterval(() => {
      this.contactService.getAllContacts().subscribe(res=>{
        this.dataSource.data = res;
      })
    }, 10000); 
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  buildForms(){
    this.contactService.getAllContacts().subscribe(res=>{
      this.dataSource.data = res;
    })
    this.newContactForm  =  this.formBuilder.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      notes: [''],
      phone: ['', [Validators.required]]
    });
  }

  addNewContact(){
    this.isFormSubmitted = true;
    if(this.newContactForm.invalid){
      return;
    }
    let contact = this.newContactForm.value ;
    this.contactService.addContact(contact).subscribe(data=>{      
      if(data['message']=='Success'){        
        this.toastr.success('Contact added Successfully');
        // location.reload();
      }
      else this.toastr.error('Something wrong happened!');
    }) 
  }

  delete(id){
    var r = confirm("Delete this Contact ?");
    if(r){
          this.contactService.deleteContact(id).subscribe(data=>{
            if(data['message']='Success'){
              this.toastr.success('Contact removed successfuly');
              // location.reload();
            }
           else this.toastr.error('Something wrong happened ')
          });
      }
  }

  logout(){
    this.authService.logout();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string,field: string) {
    if('name' == field)this.dataSource.filterPredicate = (data: Element, filter: string) => data.name.indexOf(filter) != -1;
    if('phone' == field)this.dataSource.filterPredicate = (data: Element, filter: string) => data.phone.indexOf(filter) != -1;
    if('address' == field)this.dataSource.filterPredicate = (data: Element, filter: string) => data.address.indexOf(filter) != -1;
    // if('notes' == field)this.dataSource.filterPredicate = (data: Element, filter: string) => data.notes.indexOf(filter) != -1;
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue;
  }

  edit(i,row){
    this.editFlag = i;
    this.editedContact=row;
  }
  cancel(){
    this.editedContact =  {
      name:'',
      phone:'',
      address:'',
      notes: ''
     }
    this.editFlag = -1;
  }
  saveEdit(){
    if(this.editedContact.name == '' || this.editedContact.phone =='' || this.editedContact.address == ''){
      this.toastr.error('Yoy need to enter all vlues');
      return;
    }
    this.editedContact.user=localStorage.getItem('user');
    this.contactService.editContact(this.editedContact).subscribe(data=>{
      if(data['message']=='Success'){        
        this.toastr.success('Contact Edited Successfully');
        // location.reload();
      }
      else this.toastr.error('Something wrong happened!');
    })
  }
}
