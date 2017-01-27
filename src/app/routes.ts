import { Routes } from '@angular/router';

import { LoginPageComponent } from './containers/login-page';
import { DashboardPageComponent } from './containers/dashboard-page';
import { RulePageComponent } from './containers/rule-page';
import { UserPageComponent } from './containers/user-page';
import { BadgePageComponent } from './containers/badge-page';
import { ScalePageComponent } from './containers/scale-page';
import { NotFoundPageComponent } from './containers/not-found-page';

export const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent
  },
  {
    path: 'rules',
    component: RulePageComponent
  },
  {
    path: 'badges',
    component: BadgePageComponent
  },
  {
    path: 'scales',
    component: ScalePageComponent
  },
  {
    path: 'users',
    component: UserPageComponent
  },
  // {
  //   path: 'book/:id',
  //   canActivate: [ BookExistsGuard ],
  //   component: ViewBookPageComponent
  // },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];
