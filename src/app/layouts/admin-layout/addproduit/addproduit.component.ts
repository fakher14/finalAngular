import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addproduit',
  templateUrl: './addproduit.component.html',
  styleUrls: ['./addproduit.component.css']
})
export class AddproduitComponent implements OnInit,OnChanges {
  @Input() addModal: boolean;
  @Output() emitter = new EventEmitter<any>();
  @ViewChild("buttonAdd") buttonAdd: ElementRef;
  Formadd:FormGroup;

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.firstChange) {
      console.log(this.addModal);
      if (this.addModal) {
        this.buttonAdd.nativeElement.click();
      }
    }
  }

  ngOnInit(): void {
    this.Formadd = new FormGroup({
      id: new FormControl(""),
      code: new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z0-9]{8,}?") ]),
      libelle: new FormControl("", [Validators.required,Validators.minLength(3)]),
      prixUnitaire: new FormControl("", [Validators.required,Validators.pattern("^[1-9][0-9]*")]),
      categorieProduit: new FormControl("", [Validators.required]),
      idRayon: new FormControl("", [Validators.required]),
      idStock: new FormControl("", [Validators.required]),
      url: new FormControl("", [Validators.required])
     
    });


  }

  addProduit() {
    this.emitter.emit(this.Formadd.value);
  }

}
