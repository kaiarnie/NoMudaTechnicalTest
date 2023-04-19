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
  item!: string;
  shoppingList: any[] = [];
  
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
    console.log(this.item);
    console.log(this.shoppingList);
  }

  //Empties Array
  clear() {
    this.shoppingList.length = 0;
    console.log(this.shoppingList);
  }

  //Deletes item from array
  deleteItem(itemName: string) {
    const index = this.shoppingList.findIndex(shoppingItem => shoppingItem.itemName === itemName); //Finds index is shoppingItem in array via its class property name. Allows for specific item deletion
    console.log(index);
    if (index > -1) {
      this.shoppingList.splice(index, 1);
    }
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
