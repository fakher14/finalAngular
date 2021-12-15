import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { produit } from "../models/produit";
import { rayon } from "../models/rayon";

@Injectable({
  providedIn: "root",
})
export class RayonSService {
  url: string = "http://localhost:8089/SpringMVC/rayons";

  constructor(private http: HttpClient) {}

  addRayon(data: rayon): Observable<rayon> {
    return this.http.post<rayon>(this.url + "/add", data);
  }

  getAllRayon(): Observable<rayon[]> {
    return this.http.get<rayon[]>(this.url + "/get-all");
  }

  deleteRayon(id: number): Observable<rayon> {
    return this.http.delete<rayon>(this.url + `/remove/${id}`);
  }
  updateRayon(s: rayon): Observable<rayon> {
    return this.http.put<rayon>(this.url + `/modify`, s);
  }
  getProductsByRayon(id: number): Observable<produit[]> {
    return this.http.get<produit[]>(this.url + `/byRayon/${id}`);
  }
}
