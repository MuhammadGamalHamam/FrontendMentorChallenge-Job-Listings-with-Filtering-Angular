import { Component } from '@angular/core';
import { jobsJson } from '../assets/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title: String = 'job-listings';

  items: any = jobsJson;
  itemsSelected: {role: String[], level: String[], languages: String[], tools: String[]} = {
    role: [],
    level: [],
    languages: [],
    tools: []
  };

  addItemToFilter(event: any, type: string) {
    let item = event.target.innerText;
    // Agrego el elemento en caso de no estar añadido
    if ( !this.itemsSelected[type].includes(item) ) {
      this.itemsSelected[type].push(item);
    }
  }

  removeItemFromFilter(item: string, type: string) {
    let index = this.itemsSelected[type].indexOf(item, 0);
    this.itemsSelected[type].splice(index, 1);
  }

  clearFilter() {
    for (const type in this.itemsSelected) {
      this.itemsSelected[type].length = 0;
    }
  }

  getNumItems() {
    let numItems: number = 0;
    for (const type in this.itemsSelected) {
      if (this.itemsSelected[type].length > 0) {
        numItems++;
      }
    }
    return numItems;
  }

  isVisible(item: any) {
    let numItems: number = this.getNumItems();

    if (numItems > 0) {
      let isInList = true;
      for (const type in this.itemsSelected) {
        for (let index = 0; index < this.itemsSelected[type].length; index++) {
          const element = this.itemsSelected[type][index];
          if (
            (typeof item[type] === 'string' && item[type] !== element) ||
            (Array.isArray(item[type]) && !item[type].includes(element)) ) {
            isInList = false;
          }
        }
      }
      return isInList;
    } else {
      return true;
    }
  }
}
