import { Routes } from '@angular/router';
import {
  AllTaskListComponent,
  CompletedTaskListComponent,
  DailyTaskListComponent,
  IntroductionComponent,
  SingleTaskListComponent,
} from './pages';

export const routes: Routes = [
  {
    path: 'introduction',
    component: IntroductionComponent,
  },
  {
    path: 'main',
    component: AllTaskListComponent,
  },
  {
    path: 'completed',
    component: CompletedTaskListComponent,
  },
  {
    path: 'daily',
    component: DailyTaskListComponent,
  },
  {
    path: ':id',
    component: SingleTaskListComponent,
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'main',
  },
];
