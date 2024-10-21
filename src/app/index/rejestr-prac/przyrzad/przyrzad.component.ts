import {Component, inject} from '@angular/core';
import {PrzyrzadI, StatusyI} from '../../../interfaces/przyrzadI';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {loading} from '../../../services/loading';
import {ZapytajZapiszService} from '../../../services/zapytaj-zapisz.service';
import {StatusI} from '../../../interfaces/statusI';
import {NgClass} from '@angular/common';
declare let toastr: any;
declare let MCP: any;

@Component({
  selector: 'app-przyrzad',
  standalone: true,
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: './przyrzad.component.html',
  styleUrl: './przyrzad.component.css'
})
export class PrzyrzadComponent {
  private activeRoute = inject(ActivatedRoute);
  private serwis = inject(ZapytajZapiszService);

  MCP = MCP;
  id = 0;
  przyrzad: PrzyrzadI | undefined;
  status: StatusI | undefined;
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
      this.status = {
        autostatus: 0,
        id: 0,
        przyrzady_id: 0,
        status: '',
        uwaga: '',
        zaawansowanie: 0
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

  zapiszNowyStatus() {
    loading.set(true);
    this.status!.przyrzady_id = this.id;
    if (!this.status!.status ) {
      toastr.error('Status jest obowiązkowy');
      loading.set(false);
      return
    }
    this.serwis.zapisz('status', {status:  this.status})
      .subscribe({
        next: (d: any) => {
          this.przyrzad?.statusy.unshift(d.status);
          this.serwis.sledzenieZmianyNajnowszegoStatusu.next(d.status);
          loading.set(false);
        },
        error: (d: any) => {
          loading.set(false);
          this.serwis.errorhandler(d);
        }
      });
  }

  usunWybranyStatus(id: number) {
    loading.set(true);
    this.serwis.zapisz('usuniecieStatusu', {id: id})
      .subscribe({
        next: (d: any) => {
          this.przyrzad!.statusy = this.przyrzad!.statusy.filter((status: StatusyI) => status.id !== id);
          loading.set(false);
        },
        error: (d: any) => {
          loading.set(false);
          this.serwis.errorhandler(d);
        }

      });
  }
  zapiszPrzyrzad() {
    loading.set(true);

    this.serwis.zapisz('przyrzad', {przyrzad: this.przyrzad})
      .subscribe({
        next: (d: any) => {
          this.przyrzad = d.obiekt;
          this.serwis.sledzenieStatusuRozkroju.next(d.obiekt);
          loading.set(false);
        },
        error: (d: any) => {
          loading.set(false);
          this.serwis.errorhandler(d);
        }
      });
  }
}
