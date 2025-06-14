import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageComponent } from './page/page.component';
import { TaComponent } from './ta/ta.component';

export const routes: Routes = [
    {
        path:'',
        component: HomeComponent,
        children: [
            {
                path: 'page',
                component: PageComponent,
            },
            {
                path: 'ta',
                component: TaComponent,
            }
        ]
    }
];

