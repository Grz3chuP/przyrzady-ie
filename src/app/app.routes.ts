import { Routes } from '@angular/router';
import {IndexComponent} from './index/index.component';
import {RejestrPracComponent} from './index/rejestr-prac/rejestr-prac.component';
import {PrzyrzadComponent} from './index/rejestr-prac/przyrzad/przyrzad.component';

export const routes: Routes = [
  {path:'index', component: IndexComponent, children: [
      {path:'rejestr-prac', component: RejestrPracComponent, children: [
          {path: 'przyrzad/:id' , component: PrzyrzadComponent}
        ]}
    ] }
];
