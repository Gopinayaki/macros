import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, NgForm, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { User } from '../user';
import { ApiService } from '../api.service';




@Component({
  selector: 'app-page1',
  templateUrl: './page1.page.html',
  styleUrls: ['./page1.page.scss'],
})
export class Page1Page  implements OnInit{

  @ViewChild('MySelectForm', { static: false })
  isFormSubmitted = false;
 

  selectedTagsForSecondDropdown: string[] = [];

  mySelectForm!: NgForm;
  isFormDisabled = false;
  mySelectModel: number[] = [];
  checklist:any;
  checkedList:any;
  array:any = [];

  // Declare the FormGroup
  myForm: FormGroup | undefined; 
  
// Component class
macroTitle: string = '';
opcServer: string = '';
selectedTags: string[] = [];
textareaValue: string = '';


 
 ID:any ;
 isedit: boolean= false ;

  checkboxValue = false;
  selectedOptions: string[] = [];
 
  isAddConditionSelected = false;
  isAddConditionEnabled = false;
  conditionType: string = '';
  operator: string = '';
  conditionValue: string = '';
  selectedConditions: Condition[] = [];

  tagSearchQuery: string = '';
  browseTagsFiltered: string[] = [];
  masterSelected: any;
 formvalue : any;
  // lt
 
  formData: any = {
    id: 0, // The id will be assigned by the UserService //
    macroTitle: '',
    opcServer: '',
    selectedTags: [],
    textareaValue:[]
    
    // ... other form fields
  };


  
  userList: any;
  isSaving: boolean | undefined;
  isEditMode: any;
pageNumber=1;
count=100;

updateSelectedTagsForSecondDropdown() {
  this.selectedTagsForSecondDropdown = [...this.formData.selectedTags];
}


  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      if (this.isEditMode) {
        const selectedUser = this.array.find((value: any) => value.id == this.ID);
        if (selectedUser) {
          this.formData = {
            id: selectedUser.id,
            macroTitle: selectedUser.macroTitle,
            opcServer: selectedUser.opcServer,
            selectedTags: [...selectedUser.selectedTags],
            textareaValue: selectedUser.textareaValue,
            selectedConditions: selectedUser.selectedConditions,
          };

          this.selectedConditions = this.formData.selectedConditions;
        } else {
          this.formData = {
            macroTitle: '',
            opcServer: '',
            selectedTags: [],
            textareaValue:[],
            selectedConditions:[]
          }
        }
      }
      this.presentRefreshToast(); // Display toast message

        event.target.complete();
    }, 2000);
  }




handleCheckboxClick(event: Event, option: string) {
  const checkbox = event.target as HTMLInputElement;
  if (checkbox.checked) {
    if (!this.selectedOptions.includes(option)) {
      this.selectedOptions.push(option);
    }
  } else {
    const index = this.selectedOptions.indexOf(option);
    if (index !== -1) {
      this.selectedOptions.splice(index, 1);
    }
  }
}

  onTagSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    const tag = target.value;
    if (tag && !this.selectedTags.includes(tag)) {
      this.selectedTags.push(tag);
    }
  }

  


  onBrowseTagSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    const tag = target.value;
    
    if (tag && !this.selectedOptions.includes(tag)) {
      this.selectedOptions.push(tag);
    } else if (!tag && this.selectedOptions.includes(tag)) {
      const index = this.selectedOptions.indexOf(tag);
      this.selectedOptions.splice(index, 1);
    }
  }
  

  
  toggleAddCondition() {
    this.isAddConditionSelected = !this.isAddConditionSelected;
    this.clearAddConditionFields();
    this.updateAddConditionButton();
  }

  updateAddConditionButton() {
    this.isAddConditionEnabled =
      this.conditionType && this.operator && this.conditionValue ? true : false;
  }

  onAddConditionClick() {
    if (this.isAddConditionEnabled) {
      const condition: Condition = {
        type: this.conditionType,
        operator: this.operator,
        value: this.conditionValue,
        relationship: '',
      };
      this.selectedConditions.push(condition);
      this.clearAddConditionFields();
      this.updateTextareaValue(); // Update the textarea value
      this.isAddConditionEnabled = false;
    }
  }

  clearAddConditionFields() {
    this.conditionType = '';
    this.operator = '';
    this.conditionValue = '';
  }

  removeSelectedTag(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index !== -1) {
      this.selectedTags.splice(index, 1);
    }
  }

  removeSelectedOption(option: string) {
    const index = this.selectedOptions.indexOf(option);
    if (index !== -1) {
      this.selectedOptions.splice(index, 1);
    }
  }

  removeSelectedCondition(condition: Condition) {
    const index = this.selectedConditions.indexOf(condition);
    if (index !== -1) {
      this.selectedConditions.splice(index, 1);
      this.updateTextareaValue(); // Update the textarea value
    }
  }

  updateTextareaValue() {
    let text = '\n';
    for (const tag of this.selectedTags) {
      text += tag + '\n';
    }
    text += '\n\n';
  
    if (this.selectedConditions.length > 0) {
      for (let i = 0; i < this.selectedConditions.length; i++) {
        const condition = this.selectedConditions[i];
        text += '(' + condition.type + ' ' + condition.operator + ' ' + condition.value + ')';
  
        if (i !== this.selectedConditions.length - 1) {
          const nextCondition = this.selectedConditions[i + 1];
  
          if (condition.relationship) {
            text += ' ' + condition.relationship + ' ';
          } else {
            text += ' AND ';
          }
        }
      }
    }
    this.formData.selectedConditions = this.selectedConditions;

    this.textareaValue = text;
   console.log(this.textareaValue ,"ta")
    this.formData.textareaValue = this.textareaValue;
    console.log(this.formData.textareaValue,"val")
  }
  

  selectOptions = [
    
  ]

  constructor(

    private userService: UserService,
    private apiService: ApiService,

    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private toastController: ToastController,
    private alertController: AlertController


  ) { 
    this.mySelectModel = [];
    
  }
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.ID = params['id'];
      this.isEditMode = !!this.ID;
      // this.userList = this.userService.getUsers();
      console.log(this.userList);
  
      const storedData = localStorage.getItem('userList');
  
      if (storedData !== null) {
        const parsedData = JSON.parse(storedData);
  
        if (Array.isArray(parsedData)) {
          this.array = parsedData;
  
          if (this.isEditMode) {
            const selectedUser = this.array.find((value: any) => value.id == this.ID);
            if (selectedUser) {
              this.formData = {
                id: selectedUser.id,
                macroTitle: selectedUser.macroTitle,
                opcServer: selectedUser.opcServer,
                selectedTags: [...selectedUser.selectedTags],
                textareaValue: selectedUser.textareaValue,
                selectedConditions: selectedUser.selectedConditions,
              };
  
              this.selectedConditions = this.formData.selectedConditions;
              if (!this.selectedConditions || this.selectedConditions.length === 0) {
                this.selectedConditions = [
                 
                ];
              }
              console.log(this.selectedConditions);
            } else {
              console.error('Selected user not found.');
            }
          }
        } else {
          console.error('Stored data is not an array.');
        }
      } else {
        console.error('No data stored in localStorage.');
      }

      
    });

    this.apiService.GetTagsOnly(this.pageNumber,this.count,'').subscribe((resFormApi:any) => {
      this.selectOptions=JSON.parse(resFormApi);
      console.log(resFormApi);
    });
  }
  
  
  save() {
    

    // Mark the form as submitted
    this.isFormSubmitted = true;

    // Check if all mandatory fields are filled
    if (!this.formData.macroTitle || !this.formData.opcServer || this.formData.selectedTags.length === 0) {
      console.log('Please fill all the mandatory fields.');
      return;
    }

    // Form is valid, proceed to save the data
    console.log('Form Data:', this.formData);

    // Your existing save logic..
  
    // Form is valid, proceed to save the data
    console.log('Form Data:', this.formData);
  
    if (this.isEditMode) {
      // Update the existing user data
      const index = this.userList.findIndex((user: User) => user.id === this.formData.id);
      if (index !== -1) {
        this.userList[index] = this.formData;
      }
    } else {
      // Add the form data to the userList array in UserService
      this.userService.addUser(this.formData);
    }
  
    // Save the updated userList to localStorage
    localStorage.setItem('userList', JSON.stringify(this.userList));
  
    console.log('userList', this.userList);
  
    // Display a toast indicating the successful save
    this.presentToast();
  
    // Reset the form fields for the next entry
    this.formData = {
      id: this.isEditMode ? this.formData.id : 0,
      macroTitle: '',
      opcServer: '',
      selectedTags: [],
      textareaValue: '',
      condition:[],
      type:'',
      operator:'',
      value:'',
      selectedConditions:[]

    };
  
    // Redirect to the "tab1" page
    this.router.navigateByUrl('/tabs/tab1');
  }
    


  cancel() {
    // Add your cancel logic here
    console.log('Cancel clicked!');
// Redirect to the "tab1" page
this.router.navigateByUrl('/tabs/tab1');
   
  }


  onFormSubmit(): boolean {
    Object.values(this.mySelectForm.controls).forEach(control => {
      control.markAsTouched();
    });
  
    if (this.mySelectForm.invalid) {
      console.log('Please fill valid details!');
      return false;
    }
  
    console.log('Form Submitted!');
    return true;
  }
  

  // The master checkbox will check/ uncheck all items
  checkUncheckAll() {
    for (var i = 0; i < this.checklist.length; i++) {
      this.checklist[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }

  // Check All Checkbox Checked
  isAllSelected() {
    this.masterSelected = this.checklist.every(function(item:any) {
        return item.isSelected == true;
      })
    this.getCheckedItemList();
  }



  // Get List of Checked Items
  getCheckedItemList(){
    this.checkedList = [];
    for (var i = 0; i < this.checklist.length; i++) {
      if(this.checklist[i].isSelected)
      this.checkedList.push(this.checklist[i]);
    }
    this.checkedList = JSON.stringify(this.checkedList);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Successfully Saved!!',
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
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
}

interface Condition {
  type: string;
  operator: string;
  value: string;
  relationship: string;   
}