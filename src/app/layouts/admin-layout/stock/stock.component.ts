import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { produit } from "../models/produit";
import { stock } from "../models/stock";

import { StockSService } from "./stock-s.service";

@Component({
  selector: "app-stock",
  templateUrl: "./stock.component.html",
  styleUrls: ["./stock.component.css"],
})
export class StockComponent implements OnInit {
  stockToUpdate: stock;
  addStockForm: FormGroup;
  updateStockForm: FormGroup;
  listStock: stock[] = [];
  imgAlimentaire: string = "/assets/stocksImages/food.jpg";
  imgElectromenager: string = "/assets/stocksImages/electro.jpg";
  imgQui: string = "/assets/stocksImages/qui.jpg";
  imgDefault: string = "/assets/stocksImages/cart.jpg";
  stockDetails: any;
  listOfProducts: produit[] = [];
  rechercheStock: string = "";
  validatingForm: FormGroup;
  stocksCopy: stock[];

  stocksWithWarnings: stock[] = [];
  constructor(private http: StockSService, private route: Router) {}

  ngOnInit(): void {
    this.getAllStocks();
    this.getStocksWithWarnings();
    setInterval(() => {
      this.getStocksWithWarnings();
    }, 10000);

    this.validatingForm = new FormGroup({
      loginFormModalEmail: new FormControl("", Validators.email),
      loginFormModalPassword: new FormControl("", Validators.required),
    });
    //
    this.addStockForm = new FormGroup({
      qte: new FormControl("", [Validators.required]),
      qteMin: new FormControl("", [Validators.required]),
      libelleStock: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-zA-Z]"),
      ]),
      categorieStock: new FormControl("", [Validators.required]),
    });

    this.updateStockForm = new FormGroup({
      idStock: new FormControl("", [Validators.required]),
      qte: new FormControl("", [Validators.required]),
      qteMin: new FormControl("", [Validators.required]),
      libelleStock: new FormControl("", [Validators.required]),
      categorieStock: new FormControl("", [Validators.required]),
    });
  }

  filterStocks() {
    this.http.getAllStocks().subscribe((res) => {
      this.stocksCopy = res;
    });
    this.listStock = this.stocksCopy.filter((s) => {
      return s.libelleStock
        .toLowerCase()
        .includes(this.rechercheStock.toLowerCase());
    });
  }
  getAllStocks() {
    this.http.getAllStocks().subscribe((res) => {
      this.listStock = res.filter((res) => {
        return res.qte >= res.qteMin;
      });
      this.listStock.forEach((element) => {
        console.log(element);

        if (element?.categorieStock == "All") {
          element.img = this.imgDefault;
        } else if (element.categorieStock == "Electromenager") {
          element.img = this.imgElectromenager;
        } else if (element.categorieStock == "Quicaillerie") {
          element.img = this.imgQui;
        } else {
          element.img = this.imgAlimentaire;
        }
      });
    });
  }

  addStock() {
    this.http.addStock(this.addStockForm.value).subscribe((res) => {
      console.log(res);
      alert("stock" + res.libelleStock + " added");
      this.addStockForm.reset();
      this.getAllStocks();
    });
  }

  deleteStock(s: stock) {
    console.log(s);
    if (
      confirm(
        "are u sure that u want to delete this " +
          s.libelleStock +
          " stock from db ?"
      )
    ) {
      this.http.deleteStock(s.idStock).subscribe((res) => this.getAllStocks());
    }
  }

  updateStock(s: stock) {
    this.updateStockForm.patchValue({
      idStock: s.idStock,
      qte: s.qte,
      qteMin: s.qteMin,
      libelleStock: s.libelleStock,
      categorieStock: s.categorieStock,
    });
  }
  update() {
    this.stockToUpdate = this.updateStockForm.value;
    this.http.updateStock(this.stockToUpdate).subscribe(() => {
      this.getAllStocks();
    });
  }

  findThisOne(data: stock) {
    this.http.getProductsByStock(data.idStock).subscribe((res) => {
      this.listOfProducts = res;
    });
  }

  getStocksWithWarnings() {
    this.http.getStocksWithWarnings().subscribe((res) => {
      this.stocksWithWarnings = res;
      console.log(res);

      this.stocksWithWarnings.forEach((element) => {
        if (element?.categorieStock == "All") {
          element.img = this.imgDefault;
        } else if (element.categorieStock == "Electromenager") {
          element.img = this.imgElectromenager;
        } else if (element.categorieStock == "Quicaillerie") {
          element.img = this.imgQui;
        } else {
          element.img = this.imgAlimentaire;
        }
      });
    });
  }

  get add() {
    return this.addStockForm.controls;
  }
  get upd() {
    return this.updateStockForm.controls;
  }
}
