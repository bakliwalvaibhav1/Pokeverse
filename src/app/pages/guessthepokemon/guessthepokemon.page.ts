import { Component, OnInit } from '@angular/core';
import { PokemonService } from './../../services/pokemon.service';
import { delay } from 'q';

@Component({
  selector: 'app-guessthepokemon',
  templateUrl: './guessthepokemon.page.html',
  styleUrls: ['./guessthepokemon.page.scss'],
})
export class GuessthepokemonPage implements OnInit {
  pokemonImg = '';
  pokemonId = 0;
  pokeName = '';
  answers = [];
  pokemonList = [];
  answerPosition = [];
  color = '';
  color0 = 'white';
  color1 = 'white';
  color2 = 'white';
  color3 = 'white';
  imgUrl = '';


  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.pokemonList = this.pokemonService.getPokemonList();
    this.getPokemon();
  }

  getPokemon(min= 1, max= 807) {
    this.color0 = 'white';
    this.color1 = 'white';
    this.color2 = 'white';
    this.color3 = 'white';

    this.pokemonId = Math.floor(Math.random() * (max - min + 1) + min);
    // this.pokemonId = this.testid;
    this.pokeName = this.pokemonService.pokemonList[this.pokemonId - 1];
    this.getImage(this.pokemonId);
    this.getAnswers(this.pokemonId);
    this.getAnswerPosition();
    return (this.pokemonId);
  }

  getAnswers(pokemonId, min= 1, max= 807) {
    this.answers = [];
    this.answers.push(this.pokemonList[pokemonId - 1]);
    for (let i = 0; i < 3; i++) {
      const num = Math.floor(Math.random() * (max - min + 1) + min);
      if (num !== pokemonId) {
        this.answers.push(this.pokemonList[num - 1]);
      }
    }
  }

  getImage(pokemonId) {

      if (this.pokeName === 'Wishiwashi') {
        this.pokeName = 'wishiwashi-solo';
      }
      if (this.pokeName === 'giratina') {
        this.pokeName = 'giratina-altered';
      }
      if (this.pokeName === 'shaymin') {
        this.pokeName = 'shaymin-land';
      }
      this.imgUrl = 'https://img.pokemondb.net/artwork/';
      this.imgUrl = this.imgUrl.concat((this.pokeName.toLowerCase()));
      this.imgUrl = this.imgUrl.concat('.jpg');
      this.pokemonImg = this.imgUrl;
  }

  getAnswerPosition() {
    this.answerPosition = [];
    while (this.answerPosition.length !== 4) {
      const randomNum = Math.floor(Math.random() * (4) + 1);
      if (this.answerPosition.indexOf(randomNum) === -1) {
        this.answerPosition.push(randomNum);
      }
    }
  }

  async checkAnswer(selected, selectedpos) {
    this.changeColor(selected, selectedpos);
    if (selected === this.pokemonList[this.pokemonId - 1]) {
      // console.log('Correct');
    }
    await delay(1500);
    this.getPokemon();
  }

  changeColor(selected, selectedpos) {
    if (selected !== this.pokemonList[this.pokemonId - 1]) {
      if (selectedpos === 0) {
        this.color0 = 'red';
      }
      if (selectedpos === 1) {
        this.color1 = 'red';
      }
      if (selectedpos === 2) {
        this.color2 = 'red';
      }
      if (selectedpos === 3) {
        this.color3 = 'red';
      }
    }
    if (this.answerPosition[0] === 1) {
      this.color0 = 'yellowgreen';
    }
    if (this.answerPosition[1] === 1) {
      this.color1 = 'yellowgreen';
    }
    if (this.answerPosition[2] === 1) {
      this.color2 = 'yellowgreen';
    }
    if (this.answerPosition[3] === 1) {
      this.color3 = 'yellowgreen';
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
