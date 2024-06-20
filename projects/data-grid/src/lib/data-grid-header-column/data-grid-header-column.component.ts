import { Component, ElementRef, input, output, signal, viewChild } from '@angular/core';
import { ColumnResizerDirective } from '../column-resizer.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'data-grid-header-column',
  standalone: true,
  imports: [CommonModule, ColumnResizerDirective],
  templateUrl: './data-grid-header-column.component.html',
  styleUrl: './data-grid-header-column.component.scss'
})
export class DataGridHeaderColumnComponent {
  // Input
  public initialWidth = input('0');

  // Outputs
  public movedEvent = output();
  public hoveredEvent = output<boolean>();
  public resizerHoveredEvent = output<boolean>();
  public resizerMouseDownedEvent = output<boolean>();
  public selectedEvent = output<DataGridHeaderColumnComponent>();

  // Public
  public left = signal(0);
  public width = signal(0);
  public isSortAscending!: boolean;

  // Private
  protected _left!: number;
  protected last: boolean = false;
  protected first: boolean = false;
  protected borderTopWidth!: string;
  protected borderLeftWidth!: string;
  protected borderRightWidth!: string;
  protected resizerMouseDown!: boolean;
  protected borderBottomWidth!: string;
  protected borderTopLeftRadius!: string;
  protected indentHovered: boolean = false;
  protected resizerHoveredColumn: boolean = false;
  private resizer = viewChild(ColumnResizerDirective);
  protected selectedColumn!: DataGridHeaderColumnComponent;
  private column = viewChild<ElementRef<HTMLElement>>('column');
  protected resizerSelectedColumn!: DataGridHeaderColumnComponent;



  private ngOnInit(): void {
    this.resizer()?.movedEvent.subscribe((width: number) => this.onResizerMove(width));
    this.resizer()?.mouseDownedEvent.subscribe((mouseDown: boolean) => this.onResizerMouseDown(mouseDown));
  }



  private onResizerMove(width: number): void {
    this.movedEvent.emit();
    this.width.set(this.first ? width + 1 : this.last ? width + 11 : width);
  }



  private onResizerMouseDown(mouseDown: boolean): void {
    this.resizerMouseDown = mouseDown;
    this.resizerMouseDownedEvent.emit(mouseDown);
  }



  public setAsFirst(): void {
    this.first = true;
  }



  public setAsLast(): void {
    this.last = true;
  }



  public getInitialLeft(): number {
    return this._left;
  }



  public setInitialLeft(left: number): void {
    this._left = left;
  }



  protected getWidth(): number {
    return parseFloat(this.initialWidth());
  }



  public setIndentHovered(hovered: boolean): void {
    this.indentHovered = hovered;
  }



  public updateResizerHoverStateOnColumnHover(hovered: boolean): void {
    this.resizerHoveredColumn = hovered;
  }



  protected onMouseDown(): void {
    this.isSortAscending = !this.isSortAscending;
    this.selectedEvent.emit(this);
  }



  public setSelectedColumn(column: DataGridHeaderColumnComponent, resizer: DataGridHeaderColumnComponent): void {
    this.selectedColumn = column;
    this.resizerSelectedColumn = resizer;
  }



  public setBorderWidth(top: string, right: string, bottom: string, left: string): void {
    this.borderTopWidth = top;
    this.borderRightWidth = right;
    this.borderBottomWidth = bottom;
    this.borderLeftWidth = left;
  }



  public setBorderRadius(topLeft: string): void {
    this.borderTopLeftRadius = topLeft;
  }



  public updateLeft(): void {
    this.left.set(this.column()?.nativeElement.offsetLeft! - (this.first ? 11 : 10));
  }
}