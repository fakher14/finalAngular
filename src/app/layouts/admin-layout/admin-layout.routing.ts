import { Routes } from "@angular/router";
import { DashboardComponent } from "../../dashboard/dashboard.component";
import { UserProfileComponent } from "../../user-profile/user-profile.component";
import { TableListComponent } from "../../table-list/table-list.component";
import { NotificationsComponent } from "../../notifications/notifications.component";
import { StockComponent } from "./stock/stock.component";
import { RayonComponent } from "./rayon/rayon.component";
import { FactureComponent } from "./facture/facture.component";
import { ClientComponent } from "./client/client.component";
import { ProduitComponent } from "./produit/produit.component";
import { FournisseurComponent } from "./fournisseur/fournisseur.component";
import { DetailStockComponent } from "./detail-stock/detail-stock.component";
import { ClientShopComponent } from "./client-shop/client-shop.component";
import { CartComponent } from "./cart/cart.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "user-profile", component: UserProfileComponent },
  { path: "table-list", component: TableListComponent },
  { path: "notifications", component: NotificationsComponent },
  {
    path: "stocks",
    component: StockComponent,
  },
  { path: "stocks/:id", component: DetailStockComponent, pathMatch: "full" },
  { path: "rayons", component: RayonComponent },
  { path: "factures", component: FactureComponent },
  { path: "fournisseurs", component: FournisseurComponent },
  { path: "clients", component: ClientComponent},
  { path: "clients/:category", component: ClientComponent},

  // {path: "clients", component:ClientComponent, children:[
  //   //{path:'category/:category',component :ListUserComponent}
  //   {path:"/:category", component:ClientComponent}
  // ]},
  { path: "produits", component: ProduitComponent },
  { path: "client-shop", component: ClientShopComponent },
  { path: "cart", component: CartComponent },

];
