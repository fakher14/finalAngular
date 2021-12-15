import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: "/dashboard", title: "Dashboard", icon: "design_app", class: "" },
  { path: "/produits", title: "Produits", icon: "education_atom", class: "" },
  {
    path: "/factures",
    title: "Factures",
    icon: "education_paper",
    class: "",
  },
  { path: "/stocks", title: "Stocks", icon: "shopping_box", class: "" },
  { path: "/rayons", title: "Rayons", icon: "shopping_basket", class: "" },
  {
    path: "/fournisseurs",
    title: "Fournisseurs",
    icon: "transportation_bus-front-12",
    class: "",
  },
  { path: "/clients", title: "Clients", icon: "users_single-02", class: "" },
  {
    path: "/notifications",
    title: "Notifications",
    icon: "ui-1_bell-53",
    class: "",
  },

  {
    path: "/user-profile",
    title: "User Profile",
    icon: "users_single-02",
    class: "",
  },
  {
    path: "/table-list",
    title: "Table List",
    icon: "design_bullet-list-67",
    class: "",
  },

  {
    path: "/client-shop",
    title: "client shop",
    icon: "education_paper",
    class: "",
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
