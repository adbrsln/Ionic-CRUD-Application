export interface ShoppingItem{
    $key?: string; //? means optional its not necessarly required when inserting new data
    itemName: string;
    itemNumber: number;
}