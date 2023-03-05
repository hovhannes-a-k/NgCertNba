import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameStatsFiltersComponent } from './game-stats-filters.component';

describe('GameStatsFiltersComponent', () => {
  let component: GameStatsFiltersComponent;
  let fixture: ComponentFixture<GameStatsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameStatsFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameStatsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
