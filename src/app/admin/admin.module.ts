import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ArealistComponent } from './area/arealist/arealist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CancellationstatuslistComponent } from './cancellationstatus/cancellationstatuslist/cancellationstatuslist.component';
import { AddEditAreaComponent } from './area/add-edit-area/add-edit-area.component';
import { AddEditCancellationstatusComponent } from './cancellationstatus/add-edit-cancellationstatus/add-edit-cancellationstatus.component';
import { ContactinfoListComponent } from './contactInfo/contactinfo-list/contactinfo-list.component';
import { AddEditContactInfoComponent } from './contactInfo/add-edit-contact-info/add-edit-contact-info.component';
import { AddEditDeliverystatusComponent } from './deliverystatus/add-edit-deliverystatus/add-edit-deliverystatus.component';
import { DeliverystatuslistComponent } from './deliverystatus/deliverystatuslist/deliverystatuslist.component';
import { DurationlistComponent } from './duration/durationlist/durationlist.component';
import { AddEditDurationComponent } from './duration/add-edit-duration/add-edit-duration.component';
import { AddEditFoodComponent } from './food/add-edit-food/add-edit-food.component';
import { FoodlistComponent } from './food/foodlist/foodlist.component';
import { AddEditFoodTypeComponent } from './foodType/add-edit-food-type/add-edit-food-type.component';
import { FoodTypeListComponent } from './foodType/food-type-list/food-type-list.component';
import { IntervallistComponent } from './interval/intervallist/intervallist.component';
import { AddEditIntervalComponent } from './interval/add-edit-interval/add-edit-interval.component';
import { AddEditMealchargesComponent } from './mealcharges/add-edit-mealcharges/add-edit-mealcharges.component';
import { MealchargeslistComponent } from './mealcharges/mealchargeslist/mealchargeslist.component';
import { MenulistComponent } from './menu/menulist/menulist.component';
import { AddEditMenuComponent } from './menu/add-edit-menu/add-edit-menu.component';
import { AddEditUserComponent } from './user/add-edit-user/add-edit-user.component';
import { UserlistComponent } from './user/userlist/userlist.component';
import { OrderdetailslistComponent } from './orderdetails/orderdetailslist/orderdetailslist.component';
import { AddEditOrderdetailsComponent } from './orderdetails/add-edit-orderdetails/add-edit-orderdetails.component';
import { RatingslistComponent } from './ratings/ratingslist/ratingslist.component';
import { AddEditRatingsComponent } from './ratings/add-edit-ratings/add-edit-ratings.component';
import { RestaurantslistComponent } from './restaurant/restaurantslist/restaurantslist.component';
import { AddEditRestaurantsComponent } from './restaurant/add-edit-restaurants/add-edit-restaurants.component';
import { WeekdayslistComponent } from './weekdays/weekdayslist/weekdayslist.component';
import { AddEditWeekdaysComponent } from './weekdays/add-edit-weekdays/add-edit-weekdays.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { DeliverychargeslistComponent } from './deliverycharges/deliverychargeslist/deliverychargeslist.component';
import { AddEditDeliverychargesComponent } from './deliverycharges/add-edit-deliverycharges/add-edit-deliverycharges.component';
import { AddEditDeliveryboyComponent } from './deliveryboy/add-edit-deliveryboy/add-edit-deliveryboy.component';
import { DeliveryboylistComponent } from './deliveryboy/deliveryboylist/deliveryboylist.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    AdminComponent,
    ArealistComponent,
    CancellationstatuslistComponent,
    AddEditAreaComponent,
    AddEditCancellationstatusComponent,
    ContactinfoListComponent,
    AddEditContactInfoComponent,
    AddEditDeliverystatusComponent,
    DeliverystatuslistComponent,
    DurationlistComponent,
    AddEditDurationComponent,
    AddEditFoodComponent,
    FoodlistComponent,
    FoodTypeListComponent,
    AddEditFoodTypeComponent,
    IntervallistComponent,
    AddEditIntervalComponent,
    AddEditMealchargesComponent,
    MealchargeslistComponent,
    MenulistComponent,
    AddEditMenuComponent,
    AddEditUserComponent,
    UserlistComponent,
    OrderdetailslistComponent,
    AddEditOrderdetailsComponent,
    RatingslistComponent,
    AddEditRatingsComponent,
    RestaurantslistComponent,
    AddEditRestaurantsComponent,
    WeekdayslistComponent,
    AddEditWeekdaysComponent,
    AnalysisComponent,
    DeliverychargeslistComponent,
    AddEditDeliverychargesComponent,
    AddEditDeliveryboyComponent,
    DeliveryboylistComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
