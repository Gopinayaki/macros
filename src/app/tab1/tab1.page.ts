import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';
import { NavController, ToastController } from '@ionic/angular';
import { IonTabs } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';




@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
 
  userList:any=[];
  array:any=[];
  userDetails: any;
  searchQuery: string = '';
  filteredUserList: User[] = [];
  selectedItem: any;
  searchResults: string[] = []; 
  filteredData: User[] = [];

  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here


      this.userList = this.userService.getUsers();

      this.presentRefreshToast(); // Display toast message
      event.target.complete();
    }, 2000);
  }



  onCheckboxChange(event: { detail: { checked: any; }; }) {

    console.log('Checkbox changed:', event.detail.checked);
    }


  ngOnInit() {
    // Retrieve the userList from the UserService
    this.userList = this.userService.getUsers();
    console.log(this.userList);

    // Retrieve the data from localStorage
    this.array = localStorage.getItem('userList');
    // this.userList = JSON.parse(this.array);
    console.log(this.userList);
  }


search() {
  this.searchResults = this.userList.filter((user: User) =>
    user.macroTitle.toLowerCase().includes(this.searchQuery.toLowerCase())
  );
}

clearSearch() {
  this.searchQuery = '';
  this.searchResults = [];
}

isSearchActive(): boolean {
  return this.searchResults.length > 0;
}



handleInput(event:any) {

  const query = event.target.value.toLowerCase();
  this.userList = this.userList.filter((d:any) => d.toLowerCase().indexOf(query) > -1);
}

constructor(private router: Router,
    private userService: UserService,
    private navCtrl: NavController, 
    private authService: AuthService,
    private ionTabs: IonTabs,
    private toastController: ToastController)
    
    
    { // Subscribe to the ionTabsDidChange event
      this.ionTabs.ionTabsDidChange.subscribe((tab: string) => {
        if (tab === 'tab1') {
           // Fetch the userList from the UserService whenever the page is about to be entered
        this.userList = this.userService.getUsers();
        console.log(this.userList);
        }
      });}



  
    editItem(item:any) {
      console.log(item);
      this.selectedItem = item; // Store the selected item for editing
      this.router.navigate(['/page1'], {
        queryParams: {
          id: item.id
        }
      });
 }


 tableData: any[] = [
  { sno: 1, click: 'Click 1', macroNames: 'Macro Name 1', edit: 'Edit 1' },
  { sno: 2, click: 'Click 2', macroNames: 'Macro Name 2', edit: 'Edit 2' },
  { sno: 3, click: 'Click 3', macroNames: 'Macro Name 3', edit: 'Edit 3' },
  { sno: 4, click: 'Click 4', macroNames: 'Macro Name 4', edit: 'Edit 4' },
  { sno: 5, click: 'Click 5', macroNames: 'Macro Name 5', edit: 'Edit 5' }
];

   goToEditPage(user: User) {
      this.router.navigate(['/page1'], { state: { editUserId: user.id } });
    }


    ionViewWillEnter() {
      // Fetch the userList from the UserService whenever the page is about to be entered
      this.userList = this.userService.getUsers();
      console.log(this.userList);
    }

  goToPage(pageName: string) {
    
   // Use relative URL fragment to navigate to "page1"
   this.router.navigateByUrl('/page1' );
  
  }

deleteSelectedRows() {
  // Filter out the rows that are not selected
  this.userList = this.userList.filter((item: User) => !item.isSelected);

   // Update the serial numbers of the remaining rows
   this.userList.forEach((item: User, idx: number) => {
    item.id = idx + 1;
  });

  // Save the updated userList to localStorage
  localStorage.setItem('userList', JSON.stringify(this.userList));

  window.location.reload();
}

isAnyCheckboxSelected(): boolean {
  // Check if userList is defined before using it
  return this.userList && this.userList.some((user: User) => user.isSelected);
}

deleteUser(userId: number) {
  // Filter out the user with the specified userId
  this.userList = this.userList.filter((user: { id: number; }) => user.id !== userId);

  // Update the data in localStorage
  localStorage.setItem('userList', JSON.stringify(this.userList));
}

// Function to display the toast message
async presentRefreshToast() {
  const toast = await this.toastController.create({
    message: 'Data has been refreshed.',
    duration: 2000,
    position: 'bottom'
  });


  toast.present();
}


  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('GroupId')
    localStorage.removeItem('UserId')
    localStorage.removeItem('query')
    localStorage.removeItem('imei')
    localStorage.removeItem('userName')
    if(localStorage.getItem('remberMe') == 'false') {
      localStorage.removeItem('password')
      localStorage.removeItem('remberMe')
      localStorage.removeItem('userName')
    }
    this.router.navigateByUrl('/login')
  }
}