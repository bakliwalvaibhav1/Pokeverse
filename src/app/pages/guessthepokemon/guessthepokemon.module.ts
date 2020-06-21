import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GuessthepokemonPage } from './guessthepokemon.page';

const routes: Routes = [
  {
    path: '',
    component: GuessthepokemonPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GuessthepokemonPage]
})
export class GuessthepokemonPageModule {}
