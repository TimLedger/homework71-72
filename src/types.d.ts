export interface Dish {
    name: string;
    price: string;
    photo: string;
}

export interface Dishes extends Dish {
    id: string;
}

export interface ApiDish {
    [id: string]: Dish;
}

export interface CounterBasket extends Dishes{
    amount: number;
}

export interface OrderDish {
    [id: string]: number;
}

export interface OrdersInBasket {
    id: string;
    dishes: CounterBasket[];
}