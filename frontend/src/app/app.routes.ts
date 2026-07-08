import { Routes } from '@angular/router';
import { ItemList } from './components/item-list/item-list';
import { AddItem } from './components/add-item/add-item';

export const routes: Routes = [
  {path :"items", component:ItemList},
  {path: "add-item", component:AddItem},
  {
    path: '',
    redirectTo: 'items',
    pathMatch: 'full'
  }
];