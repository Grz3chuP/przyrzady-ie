import {Component, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AgGridAngular} from 'ag-grid-angular';
import {ColDef, ColGroupDef, GridOptions} from 'ag-grid-community';
import {Router, RouterOutlet} from '@angular/router';
import { AG_GRID_LOCALE_PL } from '@appiec/ag-grid-locale-pl';
import {loading} from '../../services/loading';
import {ZapytajZapiszService} from '../../services/zapytaj-zapisz.service';
import {Subscription} from 'rxjs';
import {StatusI} from '../../interfaces/statusI';
import {PrzyrzadI} from '../../interfaces/przyrzadI';

@Component({
  selector: 'app-rejestr-prac',
  standalone: true,
  imports: [
    AgGridAngular,
    RouterOutlet
  ],
  templateUrl: './rejestr-prac.component.html',
  styleUrl: './rejestr-prac.component.css'
})
export class RejestrPracComponent implements OnInit, OnDestroy {
  @ViewChild('agGrid') grid!: AgGridAngular;

  private serwis = inject(ZapytajZapiszService);
  private router = inject(Router);

  gridOptions: GridOptions | undefined;
  columnDefs: (ColDef|ColGroupDef)[] | undefined;

  subskrypcjaZmianyStatusu$: Subscription | undefined;
  subskrypcjaZmianyStatusuRozkroju$: Subscription | undefined;



  constructor() {
    this.subskrypcjaZmianyStatusu$ = this.serwis.sledzenieZmianyNajnowszegoStatusu.subscribe(
      (status: StatusI) => {
        //szukamy w ag-grid wiersza z id = status.przyrzady_id
        let wiersz = this.grid.api.getRowNode(status.przyrzady_id.toString());
        if (wiersz) {
          let dane = wiersz.data;
          dane.status_najnowszy = status;
          this.grid.api.refreshCells({rowNodes: [wiersz], force: true});
        }
      });
    this.subskrypcjaZmianyStatusuRozkroju$ = this.serwis.sledzenieStatusuRozkroju.subscribe(
      (status: PrzyrzadI) => {
        //szukamy w ag-grid wiersza z id = status.przyrzady_id
        let wiersz = this.grid.api.getRowNode(status.id.toString());
        if (wiersz) {
          let dane = wiersz.data;
          dane.rozkroj_status = status.rozkroj_status;
          this.grid.api.refreshCells({rowNodes: [wiersz], force: true});
        }
      });
  }

  ngOnDestroy(): void {
    this.subskrypcjaZmianyStatusu$?.unsubscribe();
  }

  ngOnInit(): void {

    const progressBarRenderer = (params: any)=>  {
      // console.log(params.data.status_najnowszy.zaawansowanie)
      const progressBar = `
        <div style="width: 120px;  background-color: #f3f3f3; border-radius: 4px; height: 23px; position: relative">
            <div style="width: ${params.data.status_najnowszy.zaawansowanie}%; position: absolute; top: -4px; background-color: #76c7c0; height: 23px; border-radius: 4px; margin-top: 5px">  ${params.data.status_najnowszy.zaawansowanie}%</div>
        </div></div>
    `;
      return progressBar;
    }


    this.columnDefs = [
      { headerName: "lp", width: 45, cellRenderer: (params: any) => (+params.node.id + 1).toString(), sortable: false, suppressHeaderMenuButton: true},
      { headerName: 'id', field: 'id', filter: 'agNumberColumnFilter', width: 80, hide: false },
      {
        headerName: 'Oznaczenie',
        field: 'oznaczenie',
        filter: 'agTextColumnFilter',  // Text, Number, Set, Date
        width: 140
      },
      {
        headerName: 'Nazwa',
        filter: 'agTextColumnFilter',  // Text, Number, Set, Date
        field: 'nazwa',
        width: 140,
      },
      {
        headerName: "Nr przewodnika",
        field: "nr_przewodnika",
        filter: "agTextColumnFilter",
        width: 120
      },
      {
        headerName: 'Termin wykonania',
        filter: 'agTextColumnFilter',  // Text, Number, Set, Date
        field: 'termin_wykonania',
        width: 130,

      },
      {
        headerName: "Ostatni status (zwykły)",
        field: "status_najnowszy.status",
        filter: "agTextColumnFilter",
        width: 260
      },
      {
        headerName: "Zaawansowanie",
        //  field: "status_najnowszy.zaawansowanie",
        filter: "agTextColumnFilter",
        width: 150,
        cellRenderer:   progressBarRenderer

      },
      {
        headerName: 'Inne',
        field: 'inne',
        filter: 'agTextColumnFilter',
        width: 150
      },
      {
        headerName: "Rozkrój termin",
        field: "rozkroj_termin",
        filter: "agTextColumnFilter",
        width: 130

      },
      {
        headerName: "Rozkrój status",
        field: "rozkroj_status",
        filter: "agTextColumnFilter",
        width: 130,
        cellStyle: params => {
          if (params.value !== 'zakonczony'){
            if (!params.value) {
              return null; // No style if condition isn't met
            }
            return { color: 'red', backgroundColor: '#ffcccc' }; // Text color red, background light red
          }
          return null; // No style if condition isn't met
        }
      },
      {
        headerName: "Rozkrój uwaga",
        field: "rozkroj_uwaga",
        filter: "agTextColumnFilter",
        width: 180
      },
      {
        headerName: "Utworzono wpis",
        field: "created_at",
        filter: "agTextColumnFilter",
        width: 140
      },
      {
        headerName: "Aktualizowano",
        field: "updated_at",
        filter: "agTextColumnFilter",
        width: 140
      }
    ];

    // ../..//metchem/production/przyrzady/rejestr/index/dane/1281

    let selectionChange = (params: any) => {
      let zaznaczonyWiersz = this.grid.api.getSelectedRows();
      if (zaznaczonyWiersz.length === 1) {
        this.router.navigate(['index/rejestr-prac/przyrzad/', zaznaczonyWiersz[0].id]).then();
      } else {
        this.router.navigate(['index/rejestr-prac']).then();
      }
    }

    this.gridOptions = {
      localeText: AG_GRID_LOCALE_PL,
      columnDefs: this.columnDefs,
      rowSelection: 'single',
      defaultColDef: {
        sortable: true,
        resizable: true,
        floatingFilter: true
      },
      onGridReady: (params: any) => {
        this.wczytajRejestrProjektowPrzyrzadow();
      },
      onRowClicked: selectionChange,
      //  onSelectionChanged: selectionChange,
      // getRowNodeId: item => item.id,
      animateRows: true,
      onCellValueChanged: null,
      getRowStyle: null,
      getRowId: (item :any) => item.data.id
    } as unknown as GridOptions;





  }




  private wczytajRejestrProjektowPrzyrzadow() {
    loading.set(true);
    this.serwis.zapytaj_o('przyrzady', {})
      .subscribe({
        next: (dane: any) => {

          this.grid.api.setGridOption('rowData', dane.przyrzady);
          this.grid.api.hideOverlay();
          loading.set(false);
        },
        error: (error) => {
          this.serwis.errorhandler(error);
          loading.set(false);
        }

      })


  }

  refresh() {
    this.wczytajRejestrProjektowPrzyrzadow();
  }
  dodajNowyWpis() {
    this.router.navigate(['index/rejestr-prac/przyrzad/0']).then();
  }
}
