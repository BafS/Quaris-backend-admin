import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MaterialModule } from '@angular/material';

import { ComponentsModule } from './components';

// Effects
import { AuthenticationEffects } from './effects/authentication';
import { RuleEffects } from './effects/rule';
import { UserEffects } from './effects/user';
import { BadgeEffects } from './effects/badge';
import { ScaleEffects } from './effects/scale';

// Components & Containers
import { AppComponent } from './containers/app';
import { DashboardPageComponent } from './containers/dashboard-page';
import { NotFoundPageComponent } from './containers/not-found-page';
import { LoginPageComponent } from './containers/login-page';
import { RulePageComponent } from './containers/rule-page';
import { UserPageComponent } from './containers/user-page';
import { BadgePageComponent } from './containers/badge-page';
import { ScalePageComponent } from './containers/scale-page';

import { AddBadgeDialogComponent } from './components/add-badge-dialog';

// Services
import { AuthenticationService } from './services/authentication';
import { RuleService } from './services/rule';
import { UserService } from './services/user';
import { BadgeService } from './services/badge';
import { ScaleService } from './services/scale';
import { HttpClient } from './services/http-client';

import { routes } from './routes';
import { reducer } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    MaterialModule.forRoot(),
    ComponentsModule,
    RouterModule.forRoot(routes, { useHash: true }),

    /**
     * StoreModule.provideStore is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.provideStore(reducer),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store and uses
     * the store as the single source of truth for the router's state.
     */
    RouterStoreModule.connectRouter(),

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    StoreDevtoolsModule.instrumentOnlyWithExtension(),

    /**
     * EffectsModule.run() sets up the effects class to be initialized
     * immediately when the application starts.
     *
     * See: https://github.com/ngrx/effects/blob/master/docs/api.md#run
     */
    EffectsModule.run(AuthenticationEffects),
    EffectsModule.run(RuleEffects),
    EffectsModule.run(UserEffects),
    EffectsModule.run(BadgeEffects),
    EffectsModule.run(ScaleEffects),
  ],
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardPageComponent,
    RulePageComponent,
    UserPageComponent,
    BadgePageComponent,
    ScalePageComponent,
    NotFoundPageComponent,
    AddBadgeDialogComponent
  ],
  entryComponents: [
    AddBadgeDialogComponent
  ],
  providers: [
    AuthenticationService,
    RuleService,
    UserService,
    BadgeService,
    ScaleService,
    HttpClient
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
