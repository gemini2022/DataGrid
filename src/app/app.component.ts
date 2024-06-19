import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataGridComponent, DataGridHeaderComponent, DataGridHeaderColumnComponent } from 'data-grid';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DataGridComponent,
    DataGridHeaderComponent,
    DataGridHeaderColumnComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}