import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AddItemModalPage } from '../add-item-modal/add-item-modal.page'
import { ActionSheetService } from '../action-sheet.service';
import { EditModalPage } from '../edit-modal/edit-modal.page';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  @Input() modalData: any;

  
  todoItems: { id: number; text: string; completed: boolean }[] = [];
  newItem: { text: string; completed: boolean } = { text: '', completed: false };
  editingItem: { id: number; text: string; completed: boolean } | null = null;
  actionSheetController: any;

  constructor(private modalController: ModalController,
    private actionSheetService: ActionSheetService,
    private alertController: AlertController) {
      // Retrieve data from local storage on component initialization
      const storedItems = localStorage.getItem('todoItems');
      if (storedItems) {
        this.todoItems = JSON.parse(storedItems);
      }
    }

  ngOnInit() {}

  // addItem() {
  //   if (this.newItem.text.trim() !== '') {
  //     const newItem = { id: this.todoItems.length + 1, ...this.newItem, completed: false };
  //     this.todoItems.push(newItem);
  //     this.newItem.text = '';
  //   }
  // }


  openAddItemActionSheet() {
    this.actionSheetService.presentAddItemActionSheet();
  }


  async addItem() {
    const modal = await this.modalController.create({
      component: AddItemModalPage, // Make sure to replace with the actual path
    });
  
    await modal.present();
  }



  // toggleItemCompletion(item: { id: number; text: string; completed: boolean }) {
  //   item.completed = !item.completed;
  // }


  toggleItemCompletion(item: { completed: boolean; }) {
    // No need for explicit logic here, just toggle the completion state
    item.completed = !item.completed;
    this.saveToLocalStorage(); // Save changes to local storage
  }

  editItem(item: any) {
    // Set the item being edited
    this.editingItem = item;
  
    // Copy the text to the newItem for editing in the input field
    this.newItem.text = item.text;
  }
  

  
  

  clearCompletedItems() {
    console.log('Before clearing completed items:', this.todoItems);
  
   
  
    console.log('After clearing completed items:', this.todoItems);
  }
  

  public actionSheetButtons = [

    {
      text: 'Input Box',
      cssClass: 'input',
      handler: () => {
        this.presentInputBox();
      },
    },                                                                       
    {
      text: 'Delete',
      role: 'destructive',
      cssClass: 'input',

      data: {
        action: 'delete',
      },
    },
    {
      text: 'Share',
      cssClass: 'input',

      data: {
        action: 'share',
      },
    },
   
    {
      text: 'Cancel',
      cssClass: 'input',

      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];
  
  async presentInputBox() {
    const alert = await this.alertController.create({
      header: 'Enter Text',
      cssClass: 'custom-alert',
      inputs: [
        {
          name: 'input',
          type: 'text',
          placeholder: 'Type something...',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
        {
          text: 'OK',
          handler: (data) => {
            const enteredText = data.input;
            if (enteredText && enteredText.trim() !== '') {
              // Add the entered text to your to-do list or perform any other logic
              this.todoItems.push({
                text: enteredText, completed: false,
                id: 0
              });
            }

            this.saveToLocalStorage();
          },
        },
      ],
    });
  
    await alert.present();
  }

  deleteItem(item: { id: number; text: string; completed: boolean }) {
    if (item.completed) {
      // Only delete the item if the checkbox is checked
      this.todoItems = this.todoItems.filter(i => i !== item);
      // this.saveToLocalStorage(); // Save changes to local storage
    }
  }
  
  
  private saveToLocalStorage() {
    // Save the updated to-do items to local storage
    localStorage.setItem('todoItems', JSON.stringify(this.todoItems));  
    console.log('local')
  }


// In your card component
async openModal(item: any) {
  const modal = await this.modalController.create({
    component:  EditModalPage,
    componentProps: {
      modalData: item, // Pass the item data to the modal page
    },
  });
  return await modal.present();
}


  
}
