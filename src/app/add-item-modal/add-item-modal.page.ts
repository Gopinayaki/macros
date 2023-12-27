import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-item-modal',
  templateUrl: './add-item-modal.page.html',
  styleUrls: ['./add-item-modal.page.scss'],
})
export class AddItemModalPage implements OnInit {

  constructor(private modalController: ModalController) { }


  closeModal() {
    this.modalController.dismiss();
  }

  ngOnInit() {
  }

}
