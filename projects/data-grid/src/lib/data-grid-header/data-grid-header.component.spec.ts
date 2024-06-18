import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGridHeaderComponent } from './data-grid-header.component';

describe('DataGridHeaderComponent', () => {
  let component: DataGridHeaderComponent;
  let fixture: ComponentFixture<DataGridHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataGridHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataGridHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
