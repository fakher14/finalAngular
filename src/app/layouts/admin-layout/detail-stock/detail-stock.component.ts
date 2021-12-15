import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { produit } from "../models/produit";
import { StockSService } from "../stock/stock-s.service";

@Component({
  selector: "app-detail-stock",
  templateUrl: "./detail-stock.component.html",
  styleUrls: ["./detail-stock.component.css"],
})
export class DetailStockComponent implements OnInit {
  products: produit[];
  productsCopy: produit[] = [];
  stockId: number;
  rechercheStock: string = "";
  constructor(
    private http: StockSService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getStockDetail();
  }
  getStockDetail() {
    let params;
    this.activatedRoute.paramMap.subscribe((res) => {
      params = res.get("id");
      this.stockId = params;
    });
    this.http.getProductsByStock(params).subscribe((res) => {
      this.products = res;
    });
  }

  filterProducts() {
    console.log(this.rechercheStock);

    this.http.getProductsByStock(this.stockId).subscribe((res) => {
      this.productsCopy = res;
    });

    this.products = this.productsCopy.filter((p) => {
      return p.libelle
        .toLowerCase()
        .includes(this.rechercheStock.toLowerCase());
    });
  }

  
}
