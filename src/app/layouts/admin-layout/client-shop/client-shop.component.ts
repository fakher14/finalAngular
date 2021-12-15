import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { FournisseurSService } from "../fournisseur/fournisseur-s.service";
import { detailProduit } from "../models/detailProduit";
import { fournisseur } from "../models/fournisseur";
import { produit } from "../models/produit";
import { rayon } from "../models/rayon";
import { stock } from "../models/stock";
import { ClientShopSService } from "./client-shop-s.service";
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'app-client-shop',
  templateUrl: './client-shop.component.html',
  styleUrls: ['./client-shop.component.scss'],
  
})
export class ClientShopComponent implements OnInit {
  Listproduit: produit[];
  Listproduit1: produit[];
  Listproduit2: produit[];
  Listcopy: produit[];
  p7: produit;
  p:string;
  revenebrut1: number;
  count: number;
  iss: boolean = false;
  isShowing: boolean = false;
  formProduct: FormGroup;
  formasign: FormGroup;
  listfourni: fournisseur[];
  listrevenue: number[];
  revenue1: number;
  revenue6: number = 0;
  count1: number = 0;
  p9: produit = {
    idProduit: 0,
    code: "",
    libelle: "",
    prixUnitaire: 0,
    rayon: new rayon(),
    stock: new stock(),
    detailProduit: new detailProduit(),
    fournisseurs: []
   
  };
  c: number = 0;
  search = "";
  url: string = "";
  Produit: produit = {
    idProduit: 0,
    code: "",
    libelle: "",
    prixUnitaire: 0,
    rayon: new rayon(),
    stock: new stock(),
    detailProduit: new detailProduit(),
    fournisseurs: [],
    quantite : 1
   
  };
  p3: produit = {
    idProduit: 0,
    code: "",
    libelle: "",
    prixUnitaire: 0,
    rayon: new rayon(),
    stock: new stock(),
    detailProduit: new detailProduit(),
    fournisseurs: []
    
  };
  p1: produit = {
    idProduit: 0,
    code: "",
    libelle: "",
    prixUnitaire: 0,
    rayon: new rayon(),
    stock: new stock(),
    detailProduit: new detailProduit(),
    fournisseurs: [],
    url:null
  };
  p2: produit = {
    idProduit: 0,
    code: "",
    libelle: "",
    prixUnitaire: 0,
    rayon: new rayon(),
    stock: new stock(),
    detailProduit: new detailProduit(),
    fournisseurs: [],
    
  };
  confirmation = false;
  libelle5: string;
  lib: any;
  constructor(
    private sanitizer: DomSanitizer,
    private clientShopSService: ClientShopSService,
    private fs: FournisseurSService,
    private router: Router, private rout: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.cartItemFunction();
    this.getproduit();
    this.formProduct = new FormGroup({
      id: new FormControl(""),
      code: new FormControl("", [Validators.required]),
      libelle: new FormControl("", [Validators.required]),
      prixUnitaire: new FormControl("", [Validators.required]),
      categorieProduit: new FormControl("", [Validators.required]),
      idRayon: new FormControl("", [Validators.required]),
      idStock: new FormControl("", [Validators.required]),
     
    });
    //this.getproducts();
    this.formasign = new FormGroup({
      idproduit: new FormControl(""),
      idFournisseur: new FormControl(""),
    });
  }

  cartItem:number = 0;
  cartItemFunction(){
    if(localStorage.getItem('localCart') != null){
      var cartCount = JSON.parse(localStorage.getItem('localCart'));
      this.cartItem = cartCount.length;
    }
  }
  
  getproduit() {
    this.clientShopSService.getAllProducts().subscribe((res) => {
      console.log(res);
      this.Listproduit = res;
      
    });
    //this.clientShopSService.getallRevenueBrutact().subscribe((res)=>{
    //this.listrevenue=res;})
  }
  getproducts() {
    this.clientShopSService.getAllProducts().subscribe((res) => {
      //this.Listproduit1=res;
      this.Listcopy = res;
      
      this.Listproduit = this.Listcopy.filter((produit) => {
        return produit.libelle
          .toUpperCase()
          .includes(this.search.toUpperCase());
      });
    });
  }
  getrevenuebrut(id: number, date: Date) {
    this.clientShopSService.getRevenueBrutact(id, date).subscribe((res) => {
      alert("Revenu Brut of Product " + id + " = " + res);
    });
  }
  countByLibelle(lib: string) {
    //this.ListProduct = [];
    //this.ListProduct.push(this.productService.getNbProductsByLibelle(lib));
    //products = this.ListProduct;
    this.clientShopSService.getAllProducts().subscribe((res) => {
      this.Listproduit2 = res;
    });
    if (this.count1 == 0) {
      for (let i of this.Listproduit2) {
        if (i.libelle == lib) this.count1++;
        else this.count1;
      }
    }
    this.c = this.count1;
    this.count1 = 0;
    return this.c;
  }
  b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };
  ConvertToSrc(data: any) {
    let b64 = this.b64toBlob(data);
    let objectURL = URL.createObjectURL(b64);
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }
  getp(id: number, date: Date) {
    this.clientShopSService.getOneProductById(id).subscribe((res) => {
      this.p9 = res;
    });
    this.clientShopSService.getRevenueBrutact(id, date).subscribe((res) => {
      this.revenue6 = res;
    });
  }
  addproduit() {
    this.p1.code = this.formProduct.value["code"];
    this.p1.libelle = this.formProduct.value["libelle"];
    this.p1.prixUnitaire = this.formProduct.value["prixUnitaire"];
    this.p1.detailProduit.categorieProduit =
      this.formProduct.value["categorieProduit"];
    this.clientShopSService
      .addProduct(
        this.p1,
        this.formProduct.value.idRayon,
        this.formProduct.value.idStock
      )
      .subscribe((res) => {
        alert("Product added successfully");
        this.getproduit();
        this.formProduct.reset();
      }),
      (err) => alert("Something went wrong");
  }
  assignftop() {
    this.fs
      .getOneFournisseur(this.formasign.value.idFournisseur)
      .subscribe((res1) => (this.lib = res1.libelle));
    this.clientShopSService
      .assignfournisseurtoproduit(
        this.formasign.value.idFournisseur,
        this.formasign.value.idproduit
      )
      .subscribe((res) => {
        this.clientShopSService
          .getOneProductById(this.formasign.value.idproduit)
          .subscribe((res) => {
            this.libelle5 = res.libelle;
            alert(
              " Le produit " +
                res.libelle +
                " est ajouter au fournisseur " +
                this.lib
            );
          });
        this.libelle5 = "";
      });
  }
  
  
  getfournisseurs(id: number) {
    this.clientShopSService.getlistfournisseurbyproduit(id).subscribe((res) => {
      this.listfourni = res;
    });
  }
  
  show() {
    if (this.isShowing == true) this.isShowing = false;
    else this.isShowing = true;
  }


  navigate(){
    this.rout.paramMap.subscribe(res => {this.p = res.get('ClientConnecte');});
    this.router.navigate(['/facture/'+this.p]);
  }


  inc(c){
    if(c.quantite != 5){
      c.quantite += 1;
    }
    
  }

  dec(c){
    if(c.quantite != 1){
      c.quantite -= 1;
    }
  }

  itemsCart:any = [];
  addCart(category){
    console.log(category);
    let cartDataNull = localStorage.getItem('localCart');
    if(cartDataNull == null){
      let storeDataGet:any = [];
      storeDataGet.push(category);
      localStorage.setItem('localCart', JSON.stringify(storeDataGet));
    }
    else{
      var id = category.idProduit;
      let index:number = -1;
      this.itemsCart = JSON.parse(localStorage.getItem('localCart'));
      for(let i=0; i<this.itemsCart.length; i++){
        if(parseInt(id) === parseInt(this.itemsCart[i].idProduit)){
          this.itemsCart[i].quantite = category.quantite;
          index = i;
          break;
        }
        if(index == -1){
          this.itemsCart.push(category);
          localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
        }
        else{
          localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
        }
      }
    }
  }
}
