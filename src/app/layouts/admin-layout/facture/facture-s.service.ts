import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { facture } from "../models/facture";

@Injectable({
  providedIn: "root",
})
export class FactureSService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);

  public count: number;

  url: string = "http://localhost:8089/SpringMVC/factures";

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private http: HttpClient) {}

  getOneFacture(id: number): Observable<facture> {
    return this.http.get<facture>(this.url + "/get-one/" + `${id}`);
  }

  getAllFactures(): Observable<facture[]> {
    return this.http.get<facture[]>(this.url + "/get-all");
  }

  deleteFacture(id: number): Observable<facture> {
    return this.http.delete(this.url + "/remove" + `/${id}`);
  }
  addFacture(data: facture, idClient: number): Observable<facture> {
    return this.http.post<facture>(
      this.url + "/add" + `/${idClient}`,
      data,
      this.httpOptions
    );
  }

  getByClient(idClient: number): Observable<facture[]> {
    return this.http.get<facture[]>(this.url + "/getByClient" + `/${idClient}`);
  }

  getChifreBetweenDates(
    categorie: string,
    date1: Date,
    date2: Date
  ): Observable<number> {
    return this.http.get<number>(
      this.url +
        "/getChiffreDaffaire" +
        `/${categorie}` +
        `/${date1}` +
        `/${date2}`
    );
  }
  cancelFacture(id: number, data: facture): Observable<any> {
    return this.http.put(this.url + "/cancel" + `/${id}`, data);
  }

  updateFacture(facture: facture, id: number): Observable<facture> {
    return this.http.put<facture>(this.url + "/modify/" + `${id}`, facture);
  }

  assignToClient(
    idFacture: number,
    idClient: number,
    facture: facture
  ): Observable<facture> {
    return this.http.put<facture>(
      this.url + `/${idFacture}/assignToClient/${idClient}`,
      facture
    );
  }

  getFacturesOfThisMonth(month: number): Observable<facture> {
    return this.http.get<facture>(this.url + `/getFactureByMonth/${month}`);
  }

  getChiffreByMonth(month: number): Observable<facture> {
    return this.http.get<facture>(this.url + `/getChiffreByMonth/${month}`);
  }

  getDataByMonth(): Observable<number[]> {
    return this.http.get<number[]>(this.url + `/getDataByMonth`);
  }

  getChiffreOfAllProfessions(): Observable<any> {
    return this.http.get<any>(this.url + "/getChiffreOfProfesions");
  }
}
