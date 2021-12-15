import { Client } from "./client";
import { detailFacture } from "./detailFacture";

export class facture {
  idFacture?: number;
  active?: boolean;
  dateFacture?: Date;
  montantFacture?: number;
  montantRemise?: number;

  detailFactures?: detailFacture[];
}
