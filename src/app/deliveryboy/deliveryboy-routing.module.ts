import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditCancellationstatusComponent } from './cancellationstatus/add-edit-cancellationstatus/add-edit-cancellationstatus.component';
import { AddEditDeliverystatusComponent } from './deliverystatus/add-edit-deliverystatus/add-edit-deliverystatus.component';
import { CancellationstatusComponent } from './cancellationstatus/cancellationstatus/cancellationstatus.component';
import { DeliverystatusComponent } from './deliverystatus/deliverystatus/deliverystatus.component';
import { DeliveryboyComponent } from './deliveryboy.component';
import { EditdeliveryboyComponent } from './editdeliveryboy/editdeliveryboy.component';

const routes: Routes = [
  { path: '', component: DeliveryboyComponent ,
    children : [
      {
        path : 'cancellationstatus' , component : CancellationstatusComponent
      },
      {
        path : 'add-edit-cancellationstatus' , component : AddEditCancellationstatusComponent
      },
      {
        path : 'add-edit-cancellationstatus/:id' , component : AddEditCancellationstatusComponent
      },
      {
        path : 'deliverystatus' , component : DeliverystatusComponent
      },
      {
        path : 'add-edit-deliverystatus' , component : AddEditDeliverystatusComponent
      },
      {
        path : 'add-edit-deliverystatus/:id' , component : AddEditDeliverystatusComponent
      },
      {
        path : 'editdeliveryboy/:id' , component : EditdeliveryboyComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryboyRoutingModule { }
