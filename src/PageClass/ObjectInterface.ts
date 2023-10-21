import { Interface } from "readline"

export interface NamePrice{

    price:number,
    name:string
}

export interface QuantitySelected{

    totalQuantity:number,
    cartIconCount:string
}

export interface LoginAlert{

    isAlrtIconDisplayed:boolean,
    isAlertHeaderDisplayed:boolean,
    isAlertMessage:boolean;
}