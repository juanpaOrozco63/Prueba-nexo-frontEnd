import { Routes } from "@angular/router";
import { MercanciasComponent } from './components/mercancias/mercancias.component';

export const ROUTES:Routes=[
    {path:'mercancia',component:MercanciasComponent},
    { path:'',pathMatch:'full',redirectTo:'mercancia' },
    { path:'**',pathMatch:'full',redirectTo:'mercancia'}
]