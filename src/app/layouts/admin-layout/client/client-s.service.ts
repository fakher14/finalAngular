import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Client } from "../models/client";

@Injectable({
  providedIn: "root",
})
export class ClientSService {
  url: string = "http://localhost:8089/SpringMVC/clients";

  httpOptions = { headers: new HttpHeaders({
    'Content-Type': 'application/json'})}

  constructor(private http: HttpClient) { }

  getAllClient():Observable<Client[]>{
    return this.http.get<Client[]>(this.url + "/get-all");
  }

  addClient(client: Client):Observable<Client>{
    return this.http.post<Client>(this.url + "/add", client, this.httpOptions);
  }

  deleteClient(id: number){
    return this.http.delete<Client>(this.url + "/remove/" + id);
  }

  updateClient(data: Client){
    return this.http.put<Client>(this.url + "/modify" , data, this.httpOptions);
  }

  changeCategorie(){
    return this.http.get<Client[]>(this.url + "/changeCat");
  }

  getByCatgorie(cat:string){
    return this.http.get<Client[]>(this.url + `/categories/${cat}`);
  }

  getOneById(id:number):Observable<Client>{
    return this.http.get<Client>(this.url+`/client/${id}`);
  }

  nbrClientParCat(cat: string):Observable<number>{
    return this.http.get<number>(this.url + `/nombre/${cat}`);
  }

  getNbrFactureByClient(){
    return this.http.get<number>(this.url + "/getNbrFactureByClient");
  }

  bestClients():Observable<Client[]>{
    return this.http.get<Client[]>(this.url + "/best");
  }

  getChiffreAffaireParCategorieClient(cat:string, d1:Date, d2:Date):Observable<number>{
    return this.http.get<number>(this.url+`/getTotal/${cat}/${d1}/${d2}`);
  }
}
