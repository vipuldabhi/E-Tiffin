import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from '../error/error.component';
import { AdminComponent } from './admin.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { AddEditAreaComponent } from './area/add-edit-area/add-edit-area.component';
import { ArealistComponent } from './area/arealist/arealist.component';
import { AddEditCancellationstatusComponent } from './cancellationstatus/add-edit-cancellationstatus/add-edit-cancellationstatus.component';
import { CancellationstatuslistComponent } from './cancellationstatus/cancellationstatuslist/cancellationstatuslist.component';
import { AddEditContactInfoComponent } from './contactInfo/add-edit-contact-info/add-edit-contact-info.component';
import { ContactinfoListComponent } from './contactInfo/contactinfo-list/contactinfo-list.component';
import { AddEditDeliveryboyComponent } from './deliveryboy/add-edit-deliveryboy/add-edit-deliveryboy.component';
import { DeliveryboylistComponent } from './deliveryboy/deliveryboylist/deliveryboylist.component';
import { AddEditDeliverychargesComponent } from './deliverycharges/add-edit-deliverycharges/add-edit-deliverycharges.component';
import { DeliverychargeslistComponent } from './deliverycharges/deliverychargeslist/deliverychargeslist.component';
import { AddEditDeliverystatusComponent } from './deliverystatus/add-edit-deliverystatus/add-edit-deliverystatus.component';
import { DeliverystatuslistComponent } from './deliverystatus/deliverystatuslist/deliverystatuslist.component';
import { AddEditDurationComponent } from './duration/add-edit-duration/add-edit-duration.component';
import { DurationlistComponent } from './duration/durationlist/durationlist.component';
import { AddEditFoodComponent } from './food/add-edit-food/add-edit-food.component';
import { FoodlistComponent } from './food/foodlist/foodlist.component';
import { AddEditFoodTypeComponent } from './foodType/add-edit-food-type/add-edit-food-type.component';
import { FoodTypeListComponent } from './foodType/food-type-list/food-type-list.component';
import { AddEditIntervalComponent } from './interval/add-edit-interval/add-edit-interval.component';
import { IntervallistComponent } from './interval/intervallist/intervallist.component';
import { AddEditMealchargesComponent } from './mealcharges/add-edit-mealcharges/add-edit-mealcharges.component';
import { MealchargeslistComponent } from './mealcharges/mealchargeslist/mealchargeslist.component';
import { AddEditMenuComponent } from './menu/add-edit-menu/add-edit-menu.component';
import { MenulistComponent } from './menu/menulist/menulist.component';
import { AddEditOrderdetailsComponent } from './orderdetails/add-edit-orderdetails/add-edit-orderdetails.component';
import { OrderdetailslistComponent } from './orderdetails/orderdetailslist/orderdetailslist.component';
import { AddEditRatingsComponent } from './ratings/add-edit-ratings/add-edit-ratings.component';
import { RatingslistComponent } from './ratings/ratingslist/ratingslist.component';
import { AddEditRestaurantsComponent } from './restaurant/add-edit-restaurants/add-edit-restaurants.component';
import { RestaurantslistComponent } from './restaurant/restaurantslist/restaurantslist.component';
import { AddEditUserComponent } from './user/add-edit-user/add-edit-user.component';
import { UserlistComponent } from './user/userlist/userlist.component';
import { AddEditWeekdaysComponent } from './weekdays/add-edit-weekdays/add-edit-weekdays.component';
import { WeekdayslistComponent } from './weekdays/weekdayslist/weekdayslist.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path : 'arealist', component : ArealistComponent },
      { path : 'addeditarea', component : AddEditAreaComponent },
      { path : 'addeditarea/:id', component : AddEditAreaComponent },

      { path : 'cancellationstatuslist', component : CancellationstatuslistComponent },
      { path : 'addeditcancellationstatus', component : AddEditCancellationstatusComponent },
      { path : 'addeditcancellationstatus/:id', component : AddEditCancellationstatusComponent },

      { path : 'contactinfolist', component : ContactinfoListComponent },
      { path : 'addeditcontactinfo', component : AddEditContactInfoComponent },
      { path : 'addeditcontactinfo/:id', component : AddEditContactInfoComponent },

      { path : 'deliveryboylist', component : DeliveryboylistComponent },
      { path : 'addeditdeliveryboy', component : AddEditDeliveryboyComponent },
      { path : 'addeditdeliveryboy/:id', component : AddEditDeliveryboyComponent },

      { path : 'deliverychargeslist', component : DeliverychargeslistComponent },
      { path : 'addeditdeliverycharges', component : AddEditDeliverychargesComponent },
      { path : 'addeditdeliverycharges/:id', component : AddEditDeliverychargesComponent },

      { path : 'deliverystatuslist', component : DeliverystatuslistComponent },
      { path : 'addeditdeliverystatus', component : AddEditDeliverystatusComponent },
      { path : 'addeditdeliverystatus/:id', component : AddEditDeliverystatusComponent },

      { path : 'durationlist', component : DurationlistComponent },
      { path : 'addeditduration', component : AddEditDurationComponent },
      { path : 'addeditduration/:id', component : AddEditDurationComponent },

      { path : 'foodlist', component : FoodlistComponent },
      { path : 'addeditfood', component : AddEditFoodComponent },
      { path : 'addeditfood/:id', component : AddEditFoodComponent },

      { path : 'foodtypelist', component : FoodTypeListComponent },
      { path : 'addeditfoodtype', component : AddEditFoodTypeComponent },
      { path : 'addeditfoodtype/:id', component : AddEditFoodTypeComponent },

      { path : 'intervallist', component : IntervallistComponent },
      { path : 'addeditinterval', component : AddEditIntervalComponent },
      { path : 'addeditinterval/:id', component : AddEditIntervalComponent },

      { path : 'mealchargeslist', component : MealchargeslistComponent },
      { path : 'addeditmealcharges', component : AddEditMealchargesComponent },
      { path : 'addeditmealcharges/:id', component : AddEditMealchargesComponent },

      { path : 'menulist', component : MenulistComponent },
      { path : 'addeditmenu', component : AddEditMenuComponent },
      { path : 'addeditmenu/:id', component : AddEditMenuComponent },

      { path : 'userlist', component : UserlistComponent },
      { path : 'addedituser', component : AddEditUserComponent },
      { path : 'addedituser/:id', component : AddEditUserComponent },

      { path : 'orderdetailslist', component : OrderdetailslistComponent },
      { path : 'addeditorderdetails', component : AddEditOrderdetailsComponent },
      { path : 'addeditorderdetails/:id', component : AddEditOrderdetailsComponent },

      { path : 'ratingslist', component : RatingslistComponent },
      { path : 'addeditratings', component : AddEditRatingsComponent },
      { path : 'addeditratings/:id', component : AddEditRatingsComponent },

      { path : 'restaurantlist', component : RestaurantslistComponent },
      { path : 'addeditrestaurant', component : AddEditRestaurantsComponent },
      { path : 'addeditrestaurant/:id', component : AddEditRestaurantsComponent },

      { path : 'weekdayslist', component : WeekdayslistComponent },
      { path : 'addeditweekdays', component : AddEditWeekdaysComponent },
      { path : 'addeditweekdays/:id', component : AddEditWeekdaysComponent },

      { path : 'analysis', component : AnalysisComponent },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],             
  exports: [RouterModule],
})
export class AdminRoutingModule {}
