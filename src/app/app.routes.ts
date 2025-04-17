import { Routes } from '@angular/router';
import {
  CompletedTaskListComponent,
  DailyTaskListComponent,
  IntroductionComponent,
  MainTaskListComponent,
  SingleTaskListComponent,
} from './pages';

export const routes: Routes = [
  {
    path: 'introduction',
    component: IntroductionComponent,
  },
  {
    path: 'main',
    component: MainTaskListComponent,
  },
  {
    path: 'complete',
    component: CompletedTaskListComponent,
  },
  {
    path: 'list',
    component: DailyTaskListComponent,
  },
  {
    path: 'list/:id',
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
