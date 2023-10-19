import { Interface } from "readline"

export interface NamePrice{

    price:string,
    name:string
}

export interface QuantitySelected{

    totalQuantity:string,
    cartIconCount:string
}

export interface LoginAlert{

    isAlrtIconDisplayed:boolean,
    isAlertHeaderDisplayed:boolean,
    isAlertMessage:boolean;
}