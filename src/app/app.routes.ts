import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageComponent } from './page/page.component';
import { TaComponent } from './ta/ta.component';
import { OpdBillComponent } from './opd-bill/opd-bill.component';

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
        path: 'opd-bill',
        component: OpdBillComponent,
      },
      {
        path: 'service-wise-collection',
        loadComponent: () => import('../app/service-wise-collection/service-wise-collection.component').then(m =>m.ServiceWiseCollectionComponent)
      }
    ],
  },
];
