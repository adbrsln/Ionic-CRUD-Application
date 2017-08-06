import { EditShoppingItemPage } from './../edit-shopping-item/edit-shopping-item';
import { AngularFireDatabase,FirebaseListObservable } from 'angularfire2/database';
import { ShoppingItem } from './../../models/shopping-item/shopping-item.interface';
import { AddShoppingPage } from './../add-shopping/add-shopping';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-shoppinglist',
  templateUrl: 'shoppinglist.html',
})
export class ShoppinglistPage {
  shoppingListRef$:FirebaseListObservable<ShoppingItem[]>

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private database: AngularFireDatabase,
    private actionSheetCtrl : ActionSheetController 
  ) {
    //pointing shoppinglistref at firebase -> 'shopping-list' node
    this.shoppingListRef$ = this.database.list('shopping-list');
    
    
  }
  selectShoppingItem(shoppingItem : ShoppingItem){
    /*display an actionsheeet that gives the user the following options:
      1.edit the shoppingItem
      2.Delete the shoppingItem
      3.Cancel the Selection
    */
    this.actionSheetCtrl.create({
      title: `${shoppingItem.itemName}`,
      buttons: [{
        text: 'Edit',
        handler: () =>{
          //send the user to the edit shoppingitempage and pass the key as parameter
          this.navCtrl.push(EditShoppingItemPage,{ shoppingItemId: shoppingItem.$key});
          /*
            navigation stack:
            ['shoppinglistPage',
              'editShoppingItemPage',
              { shoppingItemId: 'KqoyMlXKhGQ4h7H3tLd'}

            ]
          */
        }
      },
      {
        text: 'Delete',
        role: 'destructive',
        handler:() =>{
          //delete the current shoppingitem
          this.shoppingListRef$.remove(shoppingItem.$key);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler:() =>{
          //cancel
          console.log("The User has selected the cancel button")
        }
      }
    ]
    }).present();
  }
  navigateToAddShoppingPage(){
    //navigate user to the AddShoppingPage
    this.navCtrl.push(AddShoppingPage);
    //change push to setroot will give no back page to the page
    
  }

}
