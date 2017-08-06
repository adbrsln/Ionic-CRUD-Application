import { Subscription } from 'rxjs/Subscription';
import { ShoppingItem } from './../../models/shopping-item/shopping-item.interface';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EditShoppingItemPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-shopping-item',
  templateUrl: 'edit-shopping-item.html',
})
export class EditShoppingItemPage {
  shoppingItemRef$ : FirebaseObjectObservable<ShoppingItem>
  shoppingItem = {} as ShoppingItem;
  shoppingItemSubscription:Subscription;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private database: AngularFireDatabase) 
  {
    const shoppingItemId = this.navParams.get('shoppingItemId');
    console.log(shoppingItemId);

    this.shoppingItemRef$ = this.database.object(`shopping-list/${shoppingItemId}`)
    
    //subscribe to the object and assign the result to this.shoppingItem
    this.shoppingItemSubscription =
      this.shoppingItemRef$.subscribe(
        shoppingItem => this.shoppingItem = shoppingItem)
  }
    editShoppingItem(shoppingitem:ShoppingItem){
      this.shoppingItemRef$.update(shoppingitem);
      //back to the shopping list page
      this.navCtrl.pop();
    }

  ionViewWillLeave() {
    //unsubscribe from the observable upon leaving the page
    this.shoppingItemSubscription.unsubscribe();
  }

}
