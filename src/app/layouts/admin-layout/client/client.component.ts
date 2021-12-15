import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientSService } from './client-s.service';
import { FactureSService } from '../facture/facture-s.service';
import { Client } from '../models/client';
import { facture } from '../models/facture';
// import { Login } from '../../../models/login';
import { User } from '../models/users';
// import { InvoicesService } from '../services/invoices.service';
// import { UserService } from '../../user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  providers: [FactureSService, ClientSService]
})
export class ClientComponent implements OnInit {

  prop1 = "test";
  prop2 = "test2";
  prop3 = "test3";
  searchVal = "";
  list: User[];
  listIn: User[];

  list1: Client[];
  listIn1: Client[];

  listFactures: facture[];

  showUpdate= true;

  constructor(private ac:ActivatedRoute,private route:Router, private cs: ClientSService, private fs: FactureSService) { }

  show=true;
  showAdd=false;

  test=false;

  newClient: User;

  userForm: FormGroup;

  clientObg: Client = new Client();

  confirmation = false;
  clientDeleted: number;

  listCopy:Client[];
  listClient:Client[];
  search="";

  //chiffre Affaire
  cat:string;
  date1:Date;
  date2:Date;
  myChiffre:FormGroup;
  chiffre:number;

  //nombre de factures
  count:number;

  //nombre clients par categorie
  nbr:number;
  nbrCat:string;
  nbrr:string;
  
  //best clients
  bestt: Client[];

  ngOnInit(): void {  //declancher automatiquement apres le constructeur
    
    //this.getAllClients();

    //this.getClientBySpring();
    this.changeCategory();
    
    this.userForm = new FormGroup({
      IdCustomer: new FormControl(''),
      firstName: new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z]{3,}?")]),
      lastName: new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z]{3,}?")]),
      birthDate: new FormControl('',[Validators.required]),
      email : new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z0-9._-]+@gmail.com")]),
      password : new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9]{8,}?")]),
      profession: new FormControl('',[Validators.required]),
      categorie: new FormControl(''),
      url: new FormControl('')
    })

    this.myChiffre = new FormGroup({
      d1: new FormControl(''),
      d2: new FormControl('')
    })
    
  };


  getAllClients(catt: string) {
    // this.cs.getAllClient().subscribe(res => {
    //   this.list1=res;
    //   this.listIn1 = this.list1;

      // this.ac.paramMap.subscribe(res => {
      //   //console.log(res.get('cat')),
        // this.list1 = this.listIn1.filter((user)=>{
        //   return user.categorieClient == catt;
        // })
        this.cs.getByCatgorie(catt)
        .subscribe(res => this.list1 = res);
        this.route.navigate(["/clients/" + catt])
        this.cat = catt;
        console.log(this.cat);
        this.nbrClientCat(this.cat);
        
      //})
  }

  //Best clients
  best(client: Client){
    this.cs.bestClients()
    .subscribe(res => this.bestt = res);
    if(this.bestt.indexOf(client) != -1)
      {
        return true;
      }
    else
      return false;
  }


  ///Nombre des clients par categorie
  nbrClientCat(cat: string){
    this.cs.nbrClientParCat(cat)
    .subscribe(res1 => this.nbr = res1);
    this.nbrr = this.nbr.toFixed(2)+"%";
    console.log(this.nbrr);
  }


  //Change Categorie Client par rapport à ses factures
    changeCategory(){
      this.cs.changeCategorie()
      .subscribe(res => {this.list1 = res; console.log(res)});
    }

  // getClientBySpring() {
  //   this.cs.getAllClient().subscribe(res => {
  //     this.list1=res;
  //     this.listIn1 = this.list1;

  //     this.ac.paramMap.subscribe(res => {
  //       //console.log(res.get('cat')),
  //       this.list1 = this.listIn1.filter((user)=>{
  //         return user.categorieClient == this.cat;
  //       })
        
  //     })
  //   })
  // }

  //Search By Name
  getClient(){
    this.cs.getAllClient().subscribe((res)=>{
    this.list1=res
  
    this.listIn1=this.list1;
    this.list1=this.listIn1.filter((client)=>
     {return client.nom.includes(this.search)});
     
    })
   }


   //Delete Client
  deleteClient(id: number){
    this.clientDeleted = id;
      if(this.confirmation){
        this.cs.deleteClient(id)
        .subscribe(res=>{
          //this.getClientBySpring();
          this.getAllClients(this.cat);
        })
       } 
  }

  //Confirm the deletion of the client 
  oui(){
    this.confirmation = true;
    this.deleteClient(this.clientDeleted);
  }

  //Set Form With data Of the Client
  updateClient(client: Client, id:number){
    this.clientObg.idClient = client.idClient;
  
     this.userForm.controls['IdCustomer'].setValue(client.idClient);
     this.userForm.controls['firstName'].setValue(client.prenom);
     this.userForm.controls['lastName'].setValue(client.nom);
     this.userForm.controls['email'].setValue(client.email);
     this.userForm.controls['password'].setValue(client.password);
     this.userForm.controls['birthDate'].setValue(client.dateNaissance);
     this.userForm.controls['profession'].setValue(client.profession);
     this.userForm.controls['url'].setValue(client.url);
     //this.userForm.controls['categorie'].setValue(client.categorieClient);
   }
  
  //Update Client
   update() {
    this.clientObg.prenom = this.userForm.value.firstName;
    this.clientObg.nom = this.userForm.value.lastName;
    this.clientObg.email = this.userForm.value.email;
    this.clientObg.categorieClient = this.userForm.value.categorie;
    this.clientObg.password = this.userForm.value.password;
    this.clientObg.dateNaissance = this.userForm.value.birthDate;
    this.clientObg.profession = this.userForm.value.profession;
    this.clientObg.url = this.userForm.value.url;
  
    this.cs.updateClient(this.clientObg)
    .subscribe(()=> {
    alert("Client edited");
       //this.getClientBySpring();
       this.getAllClients(this.cat);
    })
    //this.showUpdate = false;
   }

   //Liste de facture par client
   getFactures(client: Client){
      this.fs.getByClient(client.idClient)
      .subscribe(res => {
        //console.log(res);
        this.listFactures = res;
        this.getNbrFacture();
      })
   }

   //Nombre de factures par client 
   getNbrFacture(){
      this.cs.getNbrFactureByClient()
      .subscribe(res => this.count = res);
   }


  getUserCategory(c:string){
    if (c == 'Admin'){
      return true;
    }else{
      return false;
    }
 }


 changeValue(x:string){
   this.prop2=x;
 }


showForm(){
    this.showAdd=true;
    this.show=false;
}

// logg(o: Login){
//   for(let i of this.list){
//     if((i.email == o.email)&&(i.password == o.pwd)){
//       alert("You are loged in");
//       console.log("You are loged in");
//       this.test=true;
//     }
      
//     else{
//       alert("Wrong pwd");
//       console.log("Wrong pwd");
//     }
      
//   }
// }

  getChiffreAffaire(){
    //this.ac.paramMap.subscribe(res => {this.cat = res.get('category');});
    this.date1 = this.myChiffre.value.d1;
    this.date2 = this.myChiffre.value.d2;
    console.log(this.cat);
    this.cs.getChiffreAffaireParCategorieClient(this.cat,this.date1, this.date2)
    .subscribe(res => this.chiffre = res);
  }

}
