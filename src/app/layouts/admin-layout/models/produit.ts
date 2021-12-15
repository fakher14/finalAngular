import { detailProduit } from "./detailProduit";
import { fournisseur } from "./fournisseur";
import { ProductImage } from "./ProductImage";
import { rayon } from "./rayon";
import { stock } from "./stock";


export class produit{
  idProduit : number ;
  code : string ;
  libelle :string ;
  prixUnitaire :number ;
  remise?:number;
  quantite?:number;
  rayon : rayon ;
  stock : stock ;
  detailProduit ?: detailProduit ;
  fournisseurs : fournisseur[];
  url?: string;
}
