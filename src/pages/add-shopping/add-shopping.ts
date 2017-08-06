import { ShoppingItem } from './../../models/shopping-item/shopping-item.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase,FirebaseListObservable } from "angularfire2/database";

@IonicPage()
@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage {
  //creating a new object
  shoppingItem = {} as ShoppingItem
  shoppingItemRef$: FirebaseListObservable<ShoppingItem[]>

  constructor(public navCtrl: NavController, public navParams: NavParams, private database:AngularFireDatabase) {
    this.shoppingItemRef$ = this.database.list('shopping-list');
    
    /*
    shopping list:
      0:
        itemName: 'Pizza',
        itemNumber: 1
      1:
        itemName: 'Cheesecake',
        itemNumber: 5
    
    */
  
  }

  addShoppingItem(shoppingItem: ShoppingItem){
    /* 
      create a new anonymous object and convert itemNumber to Number
      push this to our firebase database under 'shopping-list' node
    */
    this.shoppingItemRef$.push({
      itemName: this.shoppingItem.itemName,
      itemNumber: Number(this.shoppingItem.itemNumber)
    });
    
    //reset our shopping item array
    this.shoppingItem = {} as ShoppingItem;
    
    //navigate the user back to the shoppinglistPage
    this.navCtrl.pop();
  }

}
