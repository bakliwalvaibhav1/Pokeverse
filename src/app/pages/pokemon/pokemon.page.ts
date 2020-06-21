import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from './../../services/pokemon.service';
import { Observable } from 'rxjs';
// import { AdmobService } from 'src/app/services/admob.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.page.html',
  styleUrls: ['./pokemon.page.scss'],
})
export class PokemonPage implements OnInit {
  sliderConfig = {
    spaceBetween: 10,
    centeredSlides: false,
    slidesPerView: 2.5
  };

  pokemonId = '';
  data = new Observable<any>();
  sprites = [];
  spritesImg = [];
  frontDefault = '';
  pokeName = '';
  noImg = 0;
  description = '';
  types = [];
  height = 0;
  weight = 0;
  category = '';
  abilities = [];
  abilitiesDesc = [];
  abUrl = '';
  evolutions = [];
  evolveImg = [];
  evoLevels = [];
  statistics = [];
  imgUrl = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokemonService: PokemonService,
    // private admobService: AdmobService
    ) { }


  ngOnInit() {
    this.loadPoke();
  }

  getNestedChildren(arr) {
    // var out = [];
    for (let i in arr) {
        if (arr[i].evolves_to !== []) {
            this.evolutions.push(arr[i].species.name);
            this.evoLevels.push(arr[i].evolution_details[0].min_level);
            this.getNestedChildren(arr[i].evolves_to);
        }
    }
    // return out;
}


  loadPoke() {
    this.pokemonId = this.activatedRoute.snapshot.paramMap.get('pokemon');
    // console.log(this.pokemonId);

    this.pokemonService.poke(this.pokemonId).subscribe((data: any) => {
      // this.data = data;
      this.statistics = data.stats;
      this.pokeName = data.name;
      this.sprites = Object.entries(data.sprites);
      this.imgUrl = 'https://img.pokemondb.net/artwork/';
      this.imgUrl = this.imgUrl.concat((this.pokeName));
      this.imgUrl = this.imgUrl.concat('.jpg');
      this.frontDefault = this.imgUrl;
      this.sprites = this.sprites.filter(function(el) {
        if (el[1] !== null) {
          return el;
        }
      });
      data.types.forEach(element => {
        this.types.push(element.type.name);
      });
      this.height = data.height;
      this.weight = data.weight;
      data.abilities.forEach(element => {
        this.abilities.push(element.ability.name);
        this.pokemonService.abilityDesc(element.ability.url).subscribe((dat: any) => {
          this.abilitiesDesc.push(dat.effect_entries[0].short_effect);
        });
      });
    });


    // *********************************************
    // Pokemon Description
    this.pokemonService.pokeDesc(this.pokemonId).subscribe((data: any) => {
      for(var i = 0; i < data.flavor_text_entries.length; i++) {
        if (data.flavor_text_entries[i].language.name === 'en') {
          this.description = data.flavor_text_entries[i].flavor_text;
          break;
        }
      }
      for(var i = 0; i < data.genera.length; i++) {
        if (data.genera[i].language.name === 'en') {
          this.category = data.genera[i].genus;
          const cat = this.category.split(' ');
          this.category = cat[0];
          break;
        }
      }
    });

    // *********************************************
    // Pokemon Evolution-Chain
    this.pokemonService.pokeDesc(this.pokemonId).subscribe((data: any) => {
      // console.log(data.evolution_chain.url);
      this.pokemonService.getData(data.evolution_chain.url).subscribe((dat: any) => {
        this.evolutions.push(dat.chain.species.name);
        this.evoLevels.push(null);
        this.getNestedChildren(dat.chain.evolves_to);
        this.evolutions.forEach(element => {
          this.pokemonService.poke(element).subscribe((da: any) => {
            this.evolveImg.push(da.sprites.front_default);
          });
        });
      });
    });

    // this.admobService.bannerAd();

  }
}
