import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryboyRoutingModule } from './deliveryboy-routing.module';
import { DeliveryboyComponent } from './deliveryboy.component';
import { CancellationstatusComponent } from './cancellationstatus/cancellationstatus/cancellationstatus.component';
import { AddEditCancellationstatusComponent } from './cancellationstatus/add-edit-cancellationstatus/add-edit-cancellationstatus.component';
import { AddEditDeliverystatusComponent } from './deliverystatus/add-edit-deliverystatus/add-edit-deliverystatus.component';
import { DeliverystatusComponent } from './deliverystatus/deliverystatus/deliverystatus.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditdeliveryboyComponent } from './editdeliveryboy/editdeliveryboy.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    DeliveryboyComponent,
    CancellationstatusComponent,
    AddEditCancellationstatusComponent,
    AddEditDeliverystatusComponent,
    DeliverystatusComponent,
    EditdeliveryboyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    DeliveryboyRoutingModule
  ]
})
export class DeliveryboyModule { }
