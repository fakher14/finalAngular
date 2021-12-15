import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { produit } from "../models/produit";
import { stock } from "../models/stock";

@Injectable({
  providedIn: "root",
})
export class StockSService {
  url: string = "http://localhost:8089/SpringMVC/stocks";
  constructor(private http: HttpClient) {}

  addStock(data: stock): Observable<stock> {
    return this.http.post<stock>(this.url + "/add", data);
  }

  getAllStocks(): Observable<stock[]> {
    return this.http.get<stock[]>(this.url + "/get-all");
  }

  getProductsByStock(id: number): Observable<produit[]> {
    return this.http.get<produit[]>(this.url + `/byStock/${id}`);
  }

  deleteStock(id: number): Observable<stock> {
    return this.http.delete<stock>(this.url + `/remove/${id}`);
  }
  updateStock(s: stock): Observable<stock> {
    return this.http.put<stock>(this.url + `/modify`, s);
  }
  getStocksWithWarnings(): Observable<stock[]> {
    return this.http.get<stock[]>(this.url + "/warnings");
  }
}
