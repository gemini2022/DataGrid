import { Component, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataGridComponent, DataGridHeaderComponent, DataGridHeaderColumnComponent } from 'data-grid';
import { ListComponent, ListItemComponent, ListItemTextComponent } from 'list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ListComponent,
    ListItemComponent,
    DataGridComponent,
    ListItemTextComponent,
    DataGridHeaderComponent,
    DataGridHeaderColumnComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private dataGrid = viewChild(DataGridComponent);

  private ngOnInit():void {
    this.dataGrid()?.columnSelectedEvent.subscribe(column => {
      this.dataGrid()?.sortData(this.sampleData, column.index, column.isSortAscending);
    })
  }

  protected sampleData: Array<SampleData> = [
    {
      column1: 'Column 1-1',
      column2: 'Column 2-1',
      column3: 'Column 3-1',
      column4: 'Column 4-1',
      column5: 'Column 5-1'
    },
    {
      column1: 'Column 1-2',
      column2: 'Column 2-2',
      column3: 'Column 3-2',
      column4: 'Column 4-2',
      column5: 'Column 5-2'
    },
    {
      column1: 'Column 1-3',
      column2: 'Column 2-3',
      column3: 'Column 3-3',
      column4: 'Column 4-3',
      column5: 'Column 5-3'
    },
    {
      column1: 'Column 1-4',
      column2: 'Column 2-4',
      column3: 'Column 3-4',
      column4: 'Column 4-4',
      column5: 'Column 5-4'
    },
    {
      column1: 'Column 1-5',
      column2: 'Column 2-5',
      column3: 'Column 3-5',
      column4: 'Column 4-5',
      column5: 'Column 5-5'
    },
    {
      column1: 'Column 1-6',
      column2: 'Column 2-6',
      column3: 'Column 3-6',
      column4: 'Column 4-6',
      column5: 'Column 5-6'
    },
    {
      column1: 'Column 1-7',
      column2: 'Column 2-7',
      column3: 'Column 3-7',
      column4: 'Column 4-7',
      column5: 'Column 5-7'
    },
    {
      column1: 'Column 1-8',
      column2: 'Column 2-8',
      column3: 'Column 3-8',
      column4: 'Column 4-8',
      column5: 'Column 5-8'
    },
    {
      column1: 'Column 1-9',
      column2: 'Column 2-9',
      column3: 'Column 3-9',
      column4: 'Column 4-9',
      column5: 'Column 5-9'
    },
    {
      column1: 'Column 1-10',
      column2: 'Column 2-10',
      column3: 'Column 3-10',
      column4: 'Column 4-10',
      column5: 'Column 5-10'
    },
    {
      column1: 'Column 1-11',
      column2: 'Column 2-11',
      column3: 'Column 3-11',
      column4: 'Column 4-11',
      column5: 'Column 5-11'
    },
    {
      column1: 'Column 1-12',
      column2: 'Column 2-12',
      column3: 'Column 3-12',
      column4: 'Column 4-12',
      column5: 'Column 5-12'
    },
    {
      column1: 'Column 1-13',
      column2: 'Column 2-13',
      column3: 'Column 3-13',
      column4: 'Column 4-13',
      column5: 'Column 5-13'
    },
    {
      column1: 'Column 1-14',
      column2: 'Column 2-14',
      column3: 'Column 3-14',
      column4: 'Column 4-14',
      column5: 'Column 5-14'
    },
    {
      column1: 'Column 1-15',
      column2: 'Column 2-15',
      column3: 'Column 3-15',
      column4: 'Column 4-15',
      column5: 'Column 5-15'
    },
    {
      column1: 'Column 1-16',
      column2: 'Column 2-16',
      column3: 'Column 3-16',
      column4: 'Column 4-16',
      column5: 'Column 5-16'
    },
    {
      column1: 'Column 1-17',
      column2: 'Column 2-17',
      column3: 'Column 3-17',
      column4: 'Column 4-17',
      column5: 'Column 5-17'
    },
    {
      column1: 'Column 1-18',
      column2: 'Column 2-18',
      column3: 'Column 3-18',
      column4: 'Column 4-18',
      column5: 'Column 5-18'
    },
    {
      column1: 'Column 1-19',
      column2: 'Column 2-19',
      column3: 'Column 3-19',
      column4: 'Column 4-19',
      column5: 'Column 5-19'
    },
    {
      column1: 'Column 1-20',
      column2: 'Column 2-20',
      column3: 'Column 3-20',
      column4: 'Column 4-20',
      column5: 'Column 5-20'
    },
    {
      column1: 'Column 1-21',
      column2: 'Column 2-21',
      column3: 'Column 3-21',
      column4: 'Column 4-21',
      column5: 'Column 5-21'
    },
    {
      column1: 'Column 1-22',
      column2: 'Column 2-22',
      column3: 'Column 3-22',
      column4: 'Column 4-22',
      column5: 'Column 5-22'
    },
    {
      column1: 'Column 1-23',
      column2: 'Column 2-23',
      column3: 'Column 3-23',
      column4: 'Column 4-23',
      column5: 'Column 5-23'
    },
    {
      column1: 'Column 1-24',
      column2: 'Column 2-24',
      column3: 'Column 3-24',
      column4: 'Column 4-24',
      column5: 'Column 5-24'
    },
    {
      column1: 'Column 1-25',
      column2: 'Column 2-25',
      column3: 'Column 3-25',
      column4: 'Column 4-25',
      column5: 'Column 5-25'
    },
    {
      column1: 'Column 1-26',
      column2: 'Column 2-26',
      column3: 'Column 3-26',
      column4: 'Column 4-26',
      column5: 'Column 5-26'
    },
    {
      column1: 'Column 1-27',
      column2: 'Column 2-27',
      column3: 'Column 3-27',
      column4: 'Column 4-27',
      column5: 'Column 5-27'
    },
    {
      column1: 'Column 1-28',
      column2: 'Column 2-28',
      column3: 'Column 3-28',
      column4: 'Column 4-28',
      column5: 'Column 5-28'
    },
    {
      column1: 'Column 1-29',
      column2: 'Column 2-29',
      column3: 'Column 3-29',
      column4: 'Column 4-29',
      column5: 'Column 5-29'
    },
    {
      column1: 'Column 1-30',
      column2: 'Column 2-30',
      column3: 'Column 3-30',
      column4: 'Column 4-30',
      column5: 'Column 5-30'
    },
    {
      column1: 'Column 1-31',
      column2: 'Column 2-31',
      column3: 'Column 3-31',
      column4: 'Column 4-31',
      column5: 'Column 5-31'
    },
    {
      column1: 'Column 1-32',
      column2: 'Column 2-32',
      column3: 'Column 3-32',
      column4: 'Column 4-32',
      column5: 'Column 5-32'
    },
    {
      column1: 'Column 1-33',
      column2: 'Column 2-33',
      column3: 'Column 3-33',
      column4: 'Column 4-33',
      column5: 'Column 5-33'
    },
    {
      column1: 'Column 1-34',
      column2: 'Column 2-34',
      column3: 'Column 3-34',
      column4: 'Column 4-34',
      column5: 'Column 5-34'
    },
    {
      column1: 'Column 1-35',
      column2: 'Column 2-35',
      column3: 'Column 3-35',
      column4: 'Column 4-35',
      column5: 'Column 5-35'
    },
    {
      column1: 'Column 1-36',
      column2: 'Column 2-36',
      column3: 'Column 3-36',
      column4: 'Column 4-36',
      column5: 'Column 5-36'
    },
    {
      column1: 'Column 1-37',
      column2: 'Column 2-37',
      column3: 'Column 3-37',
      column4: 'Column 4-37',
      column5: 'Column 5-37'
    },
    {
      column1: 'Column 1-38',
      column2: 'Column 2-38',
      column3: 'Column 3-38',
      column4: 'Column 4-38',
      column5: 'Column 5-38'
    },
    {
      column1: 'Column 1-39',
      column2: 'Column 2-39',
      column3: 'Column 3-39',
      column4: 'Column 4-39',
      column5: 'Column 5-39'
    },
    {
      column1: 'Column 1-40',
      column2: 'Column 2-40',
      column3: 'Column 3-40',
      column4: 'Column 4-40',
      column5: 'Column 5-40'
    },
    {
      column1: 'Column 1-41',
      column2: 'Column 2-41',
      column3: 'Column 3-41',
      column4: 'Column 4-41',
      column5: 'Column 5-41'
    },
    {
      column1: 'Column 1-42',
      column2: 'Column 2-42',
      column3: 'Column 3-42',
      column4: 'Column 4-42',
      column5: 'Column 5-42'
    },
    {
      column1: 'Column 1-43',
      column2: 'Column 2-43',
      column3: 'Column 3-43',
      column4: 'Column 4-43',
      column5: 'Column 5-43'
    },
    {
      column1: 'Column 1-44',
      column2: 'Column 2-44',
      column3: 'Column 3-44',
      column4: 'Column 4-44',
      column5: 'Column 5-44'
    },
    {
      column1: 'Column 1-45',
      column2: 'Column 2-45',
      column3: 'Column 3-45',
      column4: 'Column 4-45',
      column5: 'Column 5-45'
    },
    {
      column1: 'Column 1-46',
      column2: 'Column 2-46',
      column3: 'Column 3-46',
      column4: 'Column 4-46',
      column5: 'Column 5-46'
    },
    {
      column1: 'Column 1-47',
      column2: 'Column 2-47',
      column3: 'Column 3-47',
      column4: 'Column 4-47',
      column5: 'Column 5-47'
    },
    {
      column1: 'Column 1-48',
      column2: 'Column 2-48',
      column3: 'Column 3-48',
      column4: 'Column 4-48',
      column5: 'Column 5-48'
    },
    {
      column1: 'Column 1-49',
      column2: 'Column 2-49',
      column3: 'Column 3-49',
      column4: 'Column 4-49',
      column5: 'Column 5-49'
    },
    {
      column1: 'Column 1-50',
      column2: 'Column 2-50',
      column3: 'Column 3-50',
      column4: 'Column 4-50',
      column5: 'Column 5-50'
    }
  ]
}



export class SampleData {
  column1!: string;
  column2!: string;
  column3!: string;
  column4!: string;
  column5!: string;
}