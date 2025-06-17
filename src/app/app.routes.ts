import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageComponent } from './page/page.component';
import { TaComponent } from './ta/ta.component';
import { UhidComponent } from './uhid/uhid.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'page',
        component: PageComponent,
      },
      {
        path: 'ta',
        component: TaComponent,
      },
      {
        path: 'uhid',
        component: UhidComponent,
      },
    ],
  },
];
