import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ClientSService } from "../client/client-s.service";
import { Client } from "../models/client";
import { facture } from "../models/facture";
import { FactureSService } from "./facture-s.service";

@Component({
  selector: "app-facture",
  templateUrl: "./facture.component.html",
  styleUrls: ["./facture.component.css"],
})
export class FactureComponent implements OnInit {
  allFactures: facture[] = [];
  allClients: Client[] = [];
  updateFactureForm: FormGroup;
  factureToBeEdited: facture;
  factureClientToEdit: Client;
  rechercheFacture: number;
  factureFound: facture;
  factureFoundForm: FormGroup;
  getFacturesBetweenTwoDatesForm: FormGroup;
  chiffreAfterFunction: number = null;
  listClientAll: Client[] = [];
  assignForm: FormGroup;
  message: string = "";
  factureToAssign: facture;
  listDesChiffres: number[];
  constructor(
    private factureService: FactureSService,
    private clientService: ClientSService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getClients();
    this.getFactures();
    this.updateFactureForm = new FormGroup({
      idFacture: new FormControl(""),
      active: new FormControl("", [Validators.required]),
      dateFacture: new FormControl("", [Validators.required]),
      montantFacture: new FormControl("", [Validators.required]),
      montantRemise: new FormControl("", [Validators.required]),
    });
    this.factureFoundForm = new FormGroup({
      idFacture: new FormControl(""),
      active: new FormControl(""),
      dateFacture: new FormControl(""),
      montantFacture: new FormControl(""),
      montantRemise: new FormControl(""),
    });
    this.getFacturesBetweenTwoDatesForm = new FormGroup({
      date1: new FormControl("", [Validators.required]),
      date2: new FormControl("", [Validators.required]),
      categorieClient: new FormControl("", [Validators.required]),
      chiffre: new FormControl("0"),
    });
    this.assignForm = new FormGroup({
      facture: new FormControl("", [Validators.required]),
      client: new FormControl("", [Validators.required]),
    });
  }

  getClients() {
    this.clientService.getAllClient().subscribe((res) => {
      this.listClientAll = res;
      this.allClients = res.filter((c) => {
        return c.factures.length > 0;
      });
      console.log(this.allClients);
    });
  }
  getFactures() {
    this.factureService.getAllFactures().subscribe((res) => {
      this.allFactures = res;
    });
  }

  changeStatusFacture(f: facture, client: Client) {
    if (f.active) {
      f.active = false;
    } else {
      f.active = true;
    }
    this.factureService
      .updateFacture(f, client.idClient)
      .subscribe((res) => {});
  }

  editFacture(facture: facture, client: Client) {
    this.updateFactureForm.patchValue({
      idFacture: facture.idFacture,
      active: facture.active,
      dateFacture: facture.dateFacture,
      montantFacture: facture.montantFacture,
      montantRemise: facture.montantRemise,
    });
    console.log(facture);
    this.factureClientToEdit = client;
  }
  update() {
    this.factureToBeEdited = this.updateFactureForm.value;
    this.factureService
      .updateFacture(this.factureToBeEdited, this.factureClientToEdit.idClient)
      .subscribe((res) => {
        this.getClients();
        alert("facture with id : " + res.idFacture + "updated successfully");
      });
  }
  deleteFacture(facture: facture) {
    this.factureService.deleteFacture(facture.idFacture).subscribe((res) => {
      confirm("do u really want to delete : " + facture.idFacture);
      this.getClients();
    });
  }
  getFacture() {
    this.factureService
      .getOneFacture(this.rechercheFacture)
      .subscribe((res) => {
        this.factureFound = res;
        this.factureFoundForm.patchValue({
          idFacture: res.idFacture,
          active: res.active,
          dateFacture: res.dateFacture,
          montantFacture: res.montantFacture,
          montantRemise: res.montantRemise,
        });
      });
  }

  findChiffre() {
    let carecteristiques: any;
    carecteristiques = this.getFacturesBetweenTwoDatesForm.value;
    this.factureService
      .getChifreBetweenDates(
        carecteristiques.categorieClient,
        carecteristiques.date1,
        carecteristiques.date2
      )
      .subscribe((res) => {
        this.chiffreAfterFunction = res;
        this.getFacturesBetweenTwoDatesForm.patchValue({
          chiffre: res,
        });
      });
  }
  assignToClient() {
    console.log(this.assignForm.value);
    let idFacture = this.assignForm.value["facture"];
    let idClient = this.assignForm.value["client"];
    this.factureService.getOneFacture(idFacture).subscribe((res) => {
      this.factureService
        .assignToClient(idFacture, idClient, res)
        .subscribe((fAssigned) => {});
    });

    // this.factureService.assignToClient(this.assignForm.)
    this.message = "success !";
  }

  get up() {
    return this.updateFactureForm.controls;
  }
  get as() {
    return this.assignForm.controls;
  }

 

  get gfb() {
    return this.getFacturesBetweenTwoDatesForm.controls;
  }
}
