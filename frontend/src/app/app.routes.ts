import { Routes } from '@angular/router';
import { ItemList } from './components/item-list/item-list';
import { AddItem } from './components/add-item/add-item';
import {Stats} from './components/stats/stats'

export const routes: Routes = [
  {path :"items", component:ItemList},
  {path: "add-item", component:AddItem},
  {
    path: '',
    redirectTo: 'items',
    pathMatch: 'full'
  },
    {path: "stats", component:Stats},


];