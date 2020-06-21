import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessthepokemonPage } from './guessthepokemon.page';

describe('GuessthepokemonPage', () => {
  let component: GuessthepokemonPage;
  let fixture: ComponentFixture<GuessthepokemonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuessthepokemonPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuessthepokemonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
