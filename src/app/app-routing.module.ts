import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'pokedex', pathMatch: 'full' },
  { path: 'pokedex', loadChildren: './pages/pokedex/pokedex.module#PokedexPageModule' },
  { path: 'pokemon/:pokemon', loadChildren: './pages/pokemon/pokemon.module#PokemonPageModule' },
  { path: 'guessthepokemon', loadChildren: './pages/guessthepokemon/guessthepokemon.module#GuessthepokemonPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
