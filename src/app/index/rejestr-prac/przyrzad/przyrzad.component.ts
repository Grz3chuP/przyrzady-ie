import { Component } from '@angular/core';
import {PrzyrzadI, StatusyI} from '../../../interfaces/przyrzadI';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-przyrzad',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './przyrzad.component.html',
  styleUrl: './przyrzad.component.css'
})
export class PrzyrzadComponent {
  id = 0;
  przyrzad: PrzyrzadI;
  constructor() {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
    this.przyrzad = {
      created_at: '',
      id: 0,
      inne: '',
      nazwa: '',
      nr_przewodnika: '',
      osoba_id: 0,
      oznaczenie: '',
      rozkroj_status: '',
      rozkroj_termin: '',
      rozkroj_uwaga: '',
      statusy: [],
      termin_wykonania: formattedDate,
      updated_at: ''
      }

    };


}
