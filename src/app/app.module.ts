import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptHttpClientModule, NativeScriptModule } from '@nativescript/angular'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ItemsComponent } from './item/items.component'
import { ItemDetailComponent } from './item/item-detail.component'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { HttpCancelService } from './shared/httpcancel.service'
import { ManageHttpInterceptor } from './shared/managehttp.interceptor'

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, AppRoutingModule, NativeScriptHttpClientModule],
  declarations: [AppComponent, ItemsComponent, ItemDetailComponent],
  providers: [
    HttpCancelService,
    { provide: HTTP_INTERCEPTORS, useClass: ManageHttpInterceptor, multi: true }
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
