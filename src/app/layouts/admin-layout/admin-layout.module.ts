import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../dashboard/dashboard.component";
import { UserProfileComponent } from "../../user-profile/user-profile.component";
import { TableListComponent } from "../../table-list/table-list.component";
import { NotificationsComponent } from "../../notifications/notifications.component";
import { ChartsModule } from "ng2-charts";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastrModule } from "ngx-toastr";
import { StockComponent } from "./stock/stock.component";
import { RayonComponent } from "./rayon/rayon.component";
import { ProduitComponent } from "./produit/produit.component";
import { FactureComponent } from "./facture/facture.component";
import { FournisseurComponent } from "./fournisseur/fournisseur.component";
import { ClientComponent } from "./client/client.component";
import { HttpClientModule } from "@angular/common/http";
import { DetailStockComponent } from "./detail-stock/detail-stock.component";
import { CartComponent } from './cart/cart.component';
import { ClientShopComponent } from './client-shop/client-shop.component';
import { AddproduitComponent } from './addproduit/addproduit.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    NotificationsComponent,
    StockComponent,
    RayonComponent,
    ProduitComponent,
    FactureComponent,
    FournisseurComponent,
    ClientComponent,
    DetailStockComponent,
    CartComponent,
    ClientShopComponent,
    AddproduitComponent,
  ],
})
export class AdminLayoutModule {}
