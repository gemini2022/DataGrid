import { Component, ElementRef, Renderer2, contentChildren, inject, input, output, viewChild } from '@angular/core';
import { DataGridHeaderColumnComponent } from '../data-grid-header-column/data-grid-header-column.component';
import { DataGridComponent } from '../data-grid/data-grid.component';
import { DataGridColumn } from '../data-grid-column';
import { CommonModule } from '@angular/common';
import { HeaderColumnResizer } from '../header-column-resizer';

@Component({
  selector: 'data-grid-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-grid-header.component.html',
  styleUrl: './data-grid-header.component.scss'
})
export class DataGridHeaderComponent {
  // Inputs
  public height = input<string>();
  public fontSize = input<string>();
  public fontFamily = input<string>();
  public borderWidth = input<string>();

  // Outputs
  public columnSelectedEvent = output<DataGridColumn>();
  public resizerHoveredEvent = output<HeaderColumnResizer>();
  public resizerMouseDownedEvent = output<HeaderColumnResizer>();

  // Private
  protected top!: string;
  protected borderTopWidth!: string;
  protected borderLeftWidth!: string;
  protected borderRightWidth!: string;
  protected borderBottomWidth!: string;
  private renderer = inject(Renderer2);
  protected borderRadiusValues!: string;
  protected borderTopLeftRadius!: string;
  private dataGrid = inject(DataGridComponent);
  private header = viewChild<ElementRef<HTMLElement>>('header');
  public columns = contentChildren(DataGridHeaderColumnComponent);



  private ngOnInit(): void {
    this.setBorderWidth();
    this.setBorderRadius();
    this.columns().forEach((column, i, columns) => {
      this.setLastColumn(column, i);
      this.setColumnBorderWidth(column);
      this.setColumnBorderRadius(column);
      this.setColumnMoveSubscription(column);
      this.initializeColumns(column, i, columns);
      this.setResizerHoverSubscription(column, i);
      this.setColumnSelectSubscription(column, i);
      this.setResizerMouseDownSubscription(column, i);
      this.setColumnHoverSubscription(column, i, columns);
    })
  }


  public setTop(top: string): void {
    this.top = top;
  }



  private setBorderWidth(): void {
    const borderWidth = this.borderWidth() ? this.borderWidth() : getComputedStyle(document.documentElement).getPropertyValue('--data-grid-header-border-width');
    this.renderer.setStyle(this.header()?.nativeElement, 'border-width', borderWidth);
    this.renderer.setStyle(this.header()?.nativeElement, 'border-right-width', '0');
    this.borderTopWidth = this.header()?.nativeElement.style.borderTopWidth!;
    this.borderRightWidth = this.header()?.nativeElement.style.borderRightWidth!;
    this.borderBottomWidth = this.header()?.nativeElement.style.borderBottomWidth!;
    this.borderLeftWidth = this.header()?.nativeElement.style.borderLeftWidth!;
  }



  private setBorderRadius(): void {
    this.borderRadiusValues = this.dataGrid.borderRadius() ? this.dataGrid.borderRadius()! : getComputedStyle(document.documentElement).getPropertyValue('--data-grid-border-radius');
    this.renderer.setStyle(this.header()?.nativeElement, 'border-radius', this.borderRadiusValues);
    this.renderer.setStyle(this.header()?.nativeElement, 'border-top-right-radius', '0');
    this.borderTopLeftRadius = this.header()?.nativeElement.style.borderTopLeftRadius!;
  }



  private setLastColumn(column: DataGridHeaderColumnComponent, i: number): void {
    if (i == this.columns().length - 1) column.setAsLast();
  }



  private setColumnBorderWidth(column: DataGridHeaderColumnComponent): void {
    column.setBorderWidth(this.borderTopWidth, this.borderRightWidth, this.borderBottomWidth, this.borderLeftWidth);
  }



  private setColumnBorderRadius(column: DataGridHeaderColumnComponent) {
    column.setBorderRadius(this.header()?.nativeElement.style.borderTopLeftRadius!);
  }



  private setColumnMoveSubscription(column: DataGridHeaderColumnComponent): void {
    column.movedEvent.subscribe(() => {
      this.columns().forEach(x => {
        x.updateLeft()
      })
    })
  }



  private initializeColumns(column: DataGridHeaderColumnComponent, i: number, columns: readonly DataGridHeaderColumnComponent[]): void {
    if (i === 0) {
      column.setAsFirst();
      column.setInitialLeft(11);

    } else {
      column.setInitialLeft(columns[i - 1].getInitialLeft() + parseFloat(columns[i - 1].initialWidth()));
    }
  }



  private setResizerHoverSubscription(column: DataGridHeaderColumnComponent, i: number): void {
    column.resizerHoveredEvent.subscribe((hovered: boolean) => this.resizerHoveredEvent.emit({ index: i, isHovered: hovered }));
  }



  private setColumnSelectSubscription(column: DataGridHeaderColumnComponent, i: number): void {
    column.selectedEvent.subscribe((column: DataGridHeaderColumnComponent) => {
      this.onColumnSelect(column, i);
    })
  }



  private setResizerMouseDownSubscription(column: DataGridHeaderColumnComponent, i: number): void {
    column.resizerMouseDownedEvent.subscribe((mouseDowned: boolean) => this.resizerMouseDownedEvent.emit({ index: i, mouseDowned: mouseDowned }));
  }



  private setColumnHoverSubscription(column: DataGridHeaderColumnComponent, i: number, columns: readonly DataGridHeaderColumnComponent[]) {
    column.hoveredEvent.subscribe((hovered: boolean) => {
      if (i === 0) {
        columns[i].setIndentHovered(hovered);
      } else if (i == this.columns().length - 1) {
        columns[i].updateResizerHoverStateOnColumnHover(hovered);
        columns[i - 1].updateResizerHoverStateOnColumnHover(hovered);
      } else {
        columns[i - 1].updateResizerHoverStateOnColumnHover(hovered);
      }
    })
  }



  private onColumnSelect(selectedColumn: DataGridHeaderColumnComponent, selectedColumnIndex: number): void {
    const columnIndex = this.columns().indexOf(selectedColumn);
    const isSortAscending = selectedColumn.isSortAscending;
    this.columnSelectedEvent.emit({ index: columnIndex, isSortAscending: isSortAscending });
    this.updateColumns(selectedColumn, selectedColumnIndex);
  }



  private updateColumns(selectedColumn: DataGridHeaderColumnComponent, selectedColumnIndex: number): void {
    this.columns().forEach(x => {
      if (x !== selectedColumn) x.isSortAscending = false;
      x.setSelectedColumn(selectedColumn, this.columns()[selectedColumnIndex - 1]);
    })
  }
}