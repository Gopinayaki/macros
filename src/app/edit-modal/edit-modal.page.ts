import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.page.html',
  styleUrls: ['./edit-modal.page.scss'],
})
export class EditModalPage implements OnInit {

  @Input() modalData: any;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }


  closeModal() {
    this.modalController.dismiss();
  }
}
