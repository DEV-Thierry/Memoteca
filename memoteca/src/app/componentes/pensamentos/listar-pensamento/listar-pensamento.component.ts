import { PensamentoService } from './../pensamento.service';
import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

  listaPensamentos: Pensamento[] = [];
  paginaAtual = 1;
  haMaisPensamento: boolean = true;
  filtro: string = ''
  favoritos : boolean = false
  listafavoritos : Pensamento[]= [];
  constructor(private service: PensamentoService) { }

  ngOnInit(): void {
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos
    })
  }

  carregarMaisPensamentos(){
    this.service.listar(++this.paginaAtual, this.filtro, this.favoritos).subscribe(listaPensamentos =>{
      this.listaPensamentos.push(...listaPensamentos);
      if(!listaPensamentos.length){
        this.haMaisPensamento = false;
      }
    })
  }

  pesquisarPensamentos(){
    this.haMaisPensamento = true
    this.paginaAtual = 1;
    this.service.listar(this.paginaAtual, this.filtro,this.favoritos)
    .subscribe(listaPensamentos =>{
      this.listaPensamentos = listaPensamentos
    })
  }

  listarFavoritos(){
    this.haMaisPensamento =
    this.favoritos =true;
    this.paginaAtual = 1;
    this.service.listar(this.paginaAtual,this.filtro, this.favoritos)
    .subscribe(listaPensamentosFavoritos => {
      this.listaPensamentos = listaPensamentosFavoritos
      this.listafavoritos = listaPensamentosFavoritos
    })
  }
}

