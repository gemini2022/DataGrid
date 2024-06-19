import { Component, ElementRef, Renderer2, contentChild, inject, input, output, viewChild } from '@angular/core';
import { DataGridHeaderComponent } from '../data-grid-header/data-grid-header.component';
import { CommonModule } from '@angular/common';
import { DataGridColumn } from '../data-grid-column';
import { DataGridHeaderColumnComponent } from '../data-grid-header-column/data-grid-header-column.component';

@Component({
  selector: 'data-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.scss'
})
export class DataGridComponent {
  // Inputs
  public height = input<string>();
  public rowHeight = input<string>();
  public borderWidth = input<string>();
  public borderRadius = input<string>();

  // Output
  public columnSelectedEvent = output<DataGridColumn>();

  // Private
  protected rows = [];
  protected divScroll!: HTMLElement;
  protected rowHeightValue!: string;
  protected borderWidthValue!: string;
  private renderer = inject(Renderer2);
  protected borderRadiusValues!: string;
  protected selectedColumnIndex!: number;
  protected borderTopLeftRadius!: string;
  private computedStyleRowHeight!: number;
  private removeScrollListener!: () => void;
  protected borderBottomLeftRadius!: string;
  protected headerColumnResizerIndex!: number;
  protected headerColumnResizerHovered!: boolean;
  protected scrollviewScrollbarWidth: string = '0px';
  protected headerColumnResizerMouseDowned!: boolean;
  private row = viewChild<ElementRef<HTMLElement>>('row');
  protected header = contentChild(DataGridHeaderComponent);
  // protected scrollview = contentChild(ScrollviewComponent);
  private rowsContainer = viewChild<ElementRef<HTMLElement>>('rowsContainer');
  private columnsContainer = viewChild<ElementRef<HTMLElement>>('columnsContainer');
  private dataGridContainer = viewChild<ElementRef<HTMLElement>>('dataGridContainer');
  private scrollviewContainer = viewChild<ElementRef<HTMLElement>>('scrollviewContainer');



  private ngOnInit(): void {
    this.setRowHeight();
    this.setScrollType();
    this.setBorderWidth();
    this.setBorderRadius();
    this.rows.length = screen.height;
    this.setHeaderColumnSelectSubscription();
    this.setHeaderResizerHoverSubscription();
    this.setHeaderResizerMouseDownSubscription();
  }



  private ngAfterViewInit(): void {
    if (this.row()) this.computedStyleRowHeight = parseInt(getComputedStyle(this.row()?.nativeElement!).getPropertyValue('height'));
  }



  private setRowHeight(): void {
    this.rowHeightValue = this.rowHeight() ? this.rowHeight()! : getComputedStyle(document.documentElement).getPropertyValue('--data-grid-row-height');
  }



  private setScrollType(): void {
    // if (this.scrollview()) {
    //   this.scrollview()?.scrolledEvent.subscribe(() => this.onScroll(this.scrollview()!));
    //   this.scrollview()?.verticalOverflowedEvent.subscribe((verticalOverflow: boolean) => this.onVerticalOverflow(verticalOverflow));

    // } else {
      this.divScroll = this.scrollviewContainer()?.nativeElement.firstChild as HTMLElement;
      this.removeScrollListener = this.renderer.listen(this.divScroll, 'scroll', () => this.onScroll(this.divScroll));
    // }
  }



  private setBorderWidth(): void {
    this.borderWidthValue = this.borderWidth() ? this.borderWidth()! : getComputedStyle(document.documentElement).getPropertyValue('--data-grid-border-width');
  }



  private setBorderRadius(): void {
    this.borderRadiusValues = this.borderRadius() ? this.borderRadius()! : getComputedStyle(document.documentElement).getPropertyValue('--data-grid-border-radius');
    this.renderer.setStyle(this.dataGridContainer()?.nativeElement, 'border-radius', this.borderRadiusValues);
    this.borderTopLeftRadius = this.dataGridContainer()?.nativeElement.style.borderTopLeftRadius!;
    this.borderBottomLeftRadius = this.dataGridContainer()?.nativeElement.style.borderBottomLeftRadius!;
  }



  private setHeaderColumnSelectSubscription(): void {
    this.header()?.columnSelectedEvent.subscribe((column: DataGridColumn) => {
      this.columnSelectedEvent.emit(column);
      this.selectedColumnIndex = column.index;
    })
  }



  private setHeaderResizerHoverSubscription(): void {
    // this.header()?.resizerHoveredEvent.subscribe((headerColumnResizer: HeaderColumnResizer) => {
    //   this.headerColumnResizerIndex = headerColumnResizer.index;
    //   this.headerColumnResizerHovered = headerColumnResizer.isHovered!;
    // })
  }



  private setHeaderResizerMouseDownSubscription(): void {
    // this.header()?.resizerMouseDownedEvent.subscribe((headerColumnResizer: HeaderColumnResizer) => {
    //   this.headerColumnResizerIndex = headerColumnResizer.index;
    //   this.headerColumnResizerMouseDowned = headerColumnResizer.mouseDowned!;
    // })
  }



  private onScroll(scrollview: HTMLElement): void { // | ScrollviewComponent
    this.setRowsLength(scrollview);
    this.header()?.setTop(scrollview?.scrollTop + 'px');
    this.columnsContainer()!.nativeElement.scrollLeft = scrollview?.scrollLeft;
    this.rowsContainer()!.nativeElement.style.top = -scrollview?.scrollTop + 'px';
  }



  private onVerticalOverflow(verticalOverflow: boolean): void {
    // this.scrollviewScrollbarWidth = verticalOverflow ? this.scrollview()?.getScrollbarWidth()! : '0px';
  }



  private setRowsLength(scrollview: HTMLElement): void { // | ScrollviewComponent
    if (this.computedStyleRowHeight > 0) {
      const rows = Math.floor(scrollview.scrollHeight / this.computedStyleRowHeight);
      this.rows.length = rows < screen.height / this.computedStyleRowHeight ? screen.height / this.computedStyleRowHeight : rows;
    }
  }



  public selectColumn(columnIndex: number): void {
    if (this.header()?.columns()[columnIndex]) {
      if (this.header()) this.header()!.columns()[columnIndex].isSortAscending = !this.header()?.columns()[columnIndex].isSortAscending;
      this.updateColumns(this.header()?.columns()[columnIndex]!, columnIndex);
      this.selectedColumnIndex = columnIndex;
      this.columnSelectedEvent.emit({ index: columnIndex, isSortAscending: this.header()?.columns()[columnIndex].isSortAscending! });
    }
  }



  private updateColumns(selectedColumn: DataGridHeaderColumnComponent, selectedColumnIndex: number): void {
    this.header()?.columns().forEach(x => {
      if (x !== selectedColumn) x.isSortAscending = false;
      x.setSelectedColumn(selectedColumn, this.header()?.columns()[selectedColumnIndex - 1]!);
    })
  }



  public sortData(array: Array<any>, columnIndex: number, isSortAscending: boolean): void {
    array.sort((a, b) => {
      const key = Object.keys(a)[columnIndex];
      const valA = a[key];
      const valB = b[key];

      if (valA instanceof Date && valB instanceof Date) {
        return isSortAscending ? valA.getTime() - valB.getTime() : valB.getTime() - valA.getTime();
      }

      if (typeof valA === 'string' && typeof valB === 'string') {
        return isSortAscending ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return isSortAscending ? (valA < valB ? -1 : (valA > valB ? 1 : 0)) : (valB < valA ? -1 : (valB > valA ? 1 : 0));
    });
  }



  private ngOnDestroy(): void {
    if (this.removeScrollListener) this.removeScrollListener();
  }
}