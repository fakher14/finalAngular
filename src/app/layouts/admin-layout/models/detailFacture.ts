import { facture } from "./facture";
import { produit } from "./produit";

export class detailFacture {
  idDetailFacture? : number ;
  montantRemise ?: number ;
  pourcentageRemise? : number ;
  prixTotale ?: number ;
  qte? : number ;
  facture ?: facture ;
  produit ?: produit ;
}
