import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ToastController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  onCheckboxChange(event: { detail: { checked: any; }; }) {
    console.log('Checkbox changed:', event.detail.checked);
    this.changeDetectorRef.markForCheck();
  }
  userList:any=[];
  array:any=[];
  searchQuery: string='';
  searchResults: string[] = []; // Array to store search results
  filteredData: any;
  tableData: any[] = [];
  
  constructor(private router: Router,    private userService: UserService,
    private toastController: ToastController,private changeDetectorRef: ChangeDetectorRef

    ) {}

    handleRefresh(event:any) {
      setTimeout(() => {
        // Any calls to load data go here
        this.userList = this.userService.getUsers();
        this.presentRefreshToast();
        event.target.complete();
      }, 2000);
    }

  ngOnInit() {
    // Retrieve the userList from the UserService
    this.userList = this.userService.getUsers();
    console.log(this.userList);

    // Retrieve the data from localStorage
    this.array = localStorage.getItem('userList');
    this.userList = JSON.parse(this.array);
    console.log(this.userList);

  }

  async presentRefreshToast() {
    const toast = await this.toastController.create({
      message: 'Data has been refreshed.',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}