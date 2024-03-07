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