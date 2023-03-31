import { Component } from '@angular/core';
import { DataService } from "../services/data.service";
import { Note } from "../models/note.model";
import { AlertController, ModalController } from "@ionic/angular";
import { ModalPage } from "../modal/modal.page";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  notes: Note[] = [];

  constructor(private dataService: DataService, private alertCtrl: AlertController, private modalCtrl: ModalController) {
    this.dataService.getNotes().subscribe(res => {
      console.log(res);
      this.notes = res;
    });
  }

  async openNote(note: Note) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: { id: note.id },
      breakpoints: [ 0,0.5,0.8],
      initialBreakpoint: 0.5,
    });
    await modal.present();
  }

  async addNote() {
    const [alert] = await Promise.all([this.alertCtrl.create({
      header: 'New Crop',
      inputs: [
        {
          name: 'name',
          placeholder: 'Crop Name',
          type: 'text'
        },
        {
          name: 'title',
          placeholder: 'Crop Description',
          type: 'textarea'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },

        {
          text: 'Add',
          handler: (res) =>
            this.dataService.addNote({name: res.name, title: res.title})
        },
      ],
    })
    ]);
    await alert.present();
  }
}
