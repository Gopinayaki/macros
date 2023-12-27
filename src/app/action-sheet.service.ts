// action-sheet.service.ts
import { Injectable } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

interface ActionSheetData {
  itemText: string;
}

@Injectable({
  providedIn: 'root',
})
export class ActionSheetService {
  constructor(private actionSheetController: ActionSheetController) {}

  async presentAddItemActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Add Item',
     
      buttons: [
        {
          text: 'Add To-Do Item',
          handler: () => {
            // Handle the action (e.g., open the modal)
            console.log('Add To-Do Item clicked');
            // You can open your modal or perform any other action here
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
      cssClass: 'add-item-action-sheet', // Add this line
      
    });

    await actionSheet.present();
  }
}
