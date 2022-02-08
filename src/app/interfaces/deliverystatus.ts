export interface Deliverystatus {
    deliveryId : number;
    orderId : number ;
    intervalId : number;
    status : boolean;
    isDeleted : boolean;
    deliveryDate : Date;
    intervalName : string;
}
