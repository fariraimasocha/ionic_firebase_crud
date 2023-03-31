import {Component, Input, OnInit} from '@angular/core';
import {ModalController, ToastController} from "@ionic/angular";
import {DataService,Note} from '../services/data.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() id: string = '';
  note: Note = {name: '', title: ''}; // Initialize to an empty object
  constructor(private dataService: DataService, private modalCtrl:ModalController, private toastCtrl: ToastController) {
    this.id = '';
  }

  ngOnInit() {
    this.dataService.getNoteById(this.id).subscribe(res => {
      this.note = res;
    });
  }

 updateNote() {
    this.dataService.updateNote(this.note);
    this.toastCtrl.create({
      message: 'Note updated!',
      duration: 1000
    }).then(toast => {
      toast.present();
    });
  }

  async deleteNote() { // add async keyword here
    await this.dataService.deleteNote(this.note);
    this.modalCtrl.dismiss();
  }
}

