import { AfterViewInit, Component } from '@angular/core';
import { HttpClient, HttpClientJsonpModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './shared/services/authService';

declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements AfterViewInit {
  title = 'Angular13, DotNet Core 6 API, Google Auth';

  //Shopping List
  item!: string;
  shoppingList: any[] = [];

  //Previously Bought List
  previouslyBoughtItem!: string;
  previouslyBoughtshoppingList: any[] = []

  constructor(private http: HttpClient, public authService: AuthService) { 
    this.authService.checkToken();
  }

  ngAfterViewInit(): void {
    google.accounts.id.initialize({
      client_id: '493860766794-llv1fkopcb3ag4vk8fara82jtagger1p.apps.googleusercontent.com', // Your client id
      callback: this.authService.handleCredentialResponse.bind(this.authService)
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"), // Points to the button in the front end
      { size: "large", type: "icon", shape: "pill" } // Change the Google button's look
    );
  }

  //onClick method adds item to shoppingList array
  onClick() {
    const idValue = this.shoppingList.length + 1;  //idValue is the length of the array + 1 as array starts from 0, this count begins at 1
    var shoppingItem = new ShoppingListItem(idValue, this.item, false)
    this.shoppingList.push(shoppingItem);
  }

  //Empties Array
  clear() {
    this.shoppingList.length = 0; //Sets array length to 0
  }

   //Empties Previously Bought Array
   clearArray() {
    this.previouslyBoughtshoppingList.length = 0; //Sets array length to 0
  }

  //Deletes item from array
  deleteItem(itemName: string) {
    const index = this.shoppingList.findIndex(shoppingItem => shoppingItem.itemName === itemName); //Finds index is shoppingItem in array via its class property name. Allows for specific item deletion
    console.log(index);
    if (index > -1) { 
      this.shoppingList.splice(index, 1);
    }
  }

  markAsImportant(itemName: string) {
    const index = this.shoppingList.findIndex(shoppingItem => shoppingItem.itemName === itemName); //Finds index is shoppingItem in array via its class property name.
    if (this.shoppingList[index].important === true) window.alert("Item is already important"); //Alerts the users if they try to make an existing item important again
    this.shoppingList[index].important = true; //Finds the object at index x which is the item selected on front end and sets the boolean value of important to true
    this.shoppingList.unshift(this.shoppingList.splice(index, 1)[0]) //Adds new copy item to front of array and removes old item - thus marking it as imoportant
  }

  moveItemToPreviouslyBought(itemName: string) {
    const index = this.shoppingList.findIndex(shoppingItem => shoppingItem.itemName === itemName); //Finds index is shoppingItem in array via its class property name.
    var prevBoughtItem = this.shoppingList[index]; //Sets var preBoughtItem to the object at specific index
    if (prevBoughtItem.important === true) prevBoughtItem.important = false;  //Removes important status if true 
    this.shoppingList.splice(index, 1); //Removes item from shoppingList array 
    this.previouslyBoughtshoppingList.push(prevBoughtItem); //Pushes item to previosulyBoughtList
  }
}

//Class for ShoppingList Item
class ShoppingListItem {

  id: number;
  itemName: string;
  important: boolean;
  
  constructor(id: number, itemName: string, important: boolean ) {
    this.id = id;
    this.itemName = itemName;
    this.important = important;
  }
}
