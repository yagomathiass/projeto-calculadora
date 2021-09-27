import { Component, OnInit } from '@angular/core';
import { CalculadoraCientificaService } from '../services';

@Component({
  selector: 'app-calculadora-cientifica',
  templateUrl: './calculadora-cientifica.component.html',
  styleUrls: ['./calculadora-cientifica.component.css']
})

export class CalculadoraCientificaComponent implements OnInit {
  private numero1!: string;
  private numero2!: string;
  private resultado!: string;
  private operacao!: string;

  constructor(private calculadoraCientificaService: CalculadoraCientificaService) { }

  ngOnInit(): void {
    this.limpar()
  }
  
  limpar(): void{
    this.numero1 = '0';
    this.numero2 = null;
    this.resultado = null;
    this.operacao = null;
  }


  concatenaNumero(numAtual:string, numConcat:string):string{
    if(numAtual === '0' || numAtual === null){
      numAtual = '';
    }

    if(numConcat === '.' && numAtual === '') {
      return '0.';
    }

    if(numConcat === '.' && numAtual.indexOf('.') > -1) {
      return numAtual;
    }
    return numAtual + numConcat;
  }

  adicionaNumero(numero:string):void{
    if(this.operacao === null){
      this.numero1 = this.concatenaNumero(this.numero1, numero)
    }else{
      this.numero2 = this.concatenaNumero(this.numero2, numero)
    }
  }

  definirOperacao(operacao:string):void{
    if(this.operacao === null){
      this.operacao = operacao
      return;
    }
    if(this.numero2 !== null){
      this.resultado = this.calculadoraCientificaService.calcular(
        parseFloat(this.numero1),
        parseFloat(this.numero2),
        this.operacao
      ).toString();
      this.operacao = operacao;
      this.numero1 = this.resultado.toString();
      this.numero2 = null;
      this.resultado = null;
    }
  }


  calcular():void{
    if(this.numero2 === null){
      let op = this.operacao
      if(op === 'x2' || op === 'x3' || op === 'raiz' || op === 'pi' || '%'){
        this.resultado = this.calculadoraCientificaService.calcular(
          parseFloat(this.numero1),
          parseFloat(this.numero2),
          this.operacao
        ).toString();
      }
      else{
        return;
      }
    }
    this.resultado = this.calculadoraCientificaService.calcular(
      parseFloat(this.numero1),
      parseFloat(this.numero2),
      this.operacao
    ).toString();
    this.numero1 = this.resultado;
    this.operacao = null;
    this.numero2 = null;
  }


  get display(): string{
    if(this.resultado != null){
      return this.resultado.toString();
    }

    if(this.numero2 != null){
      return this.numero2.toString();
    }

    return this.numero1.toString();
  }
} 
