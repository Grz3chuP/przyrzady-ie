import {Component, inject} from '@angular/core';
import {PrzyrzadI, StatusyI} from '../../../interfaces/przyrzadI';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {loading} from '../../../services/loading';
import {ZapytajZapiszService} from '../../../services/zapytaj-zapisz.service';

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
  private activeRoute = inject(ActivatedRoute);
  private serwis = inject(ZapytajZapiszService);

  id = 0;
  przyrzad: PrzyrzadI | undefined;
  statusyRozkroju: string[] = ['null', 'Rozkrój nie rozpoczęty', 'Rozkrój rozpoczęty', 'zakonczony']
  constructor() {
    this.activeRoute.paramMap.subscribe(params => {
      this.id = +params.get('id')!;
      if (this.id !== 0) {
        this.wczytajPrzyrzad();
      } else {
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
          rozkroj_status: 'null',
          rozkroj_termin: '',
          rozkroj_uwaga: '',
          statusy: [],
          termin_wykonania: formattedDate,
          updated_at: ''
        }
      }
    });



    };


  private wczytajPrzyrzad() {
    loading.set(true);
    this.serwis.zapytaj_o('przyrzad', {id: this.id})
      .subscribe({
        next: (d: any) => {
          this.przyrzad = d.przyrzad;
          loading.set(false);
        },
        error: (d: any) => {
          loading.set(false);
          this.serwis.errorhandler(d);
        }
      });
      }

}
