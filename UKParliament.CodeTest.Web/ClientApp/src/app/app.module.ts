import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PersonManagementComponent } from './components/person-management/person-management.component';
import { PersonEditorComponent } from './components/person-editor/person-editor.component';
import { PersonListComponent } from './components/person-list/person-list.component';

@NgModule({ declarations: [
        AppComponent,
        PersonManagementComponent,
        PersonEditorComponent,
        PersonListComponent
    ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    ReactiveFormsModule,
      FormsModule,
        RouterModule.forRoot([
            { path: '', component: PersonManagementComponent, pathMatch: 'full' },
            { path: '', component: PersonEditorComponent, pathMatch: 'full' },
            { path: '', component: PersonListComponent, pathMatch: 'full' }
        ])], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
