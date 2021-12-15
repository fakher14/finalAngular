import { facture } from "./facture";

export class Client {
  idClient : number ;
  categorieClient : string ;
  dateNaissance : string;
  email : string ;
  nom : string ;
  password : string ;
  prenom : string ;
  profession : string ;
  url: string;
  factures: facture[];
}
