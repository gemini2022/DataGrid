import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGridHeaderColumnComponent } from './data-grid-header-column.component';

describe('DataGridHeaderColumnComponent', () => {
  let component: DataGridHeaderColumnComponent;
  let fixture: ComponentFixture<DataGridHeaderColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataGridHeaderColumnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataGridHeaderColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
