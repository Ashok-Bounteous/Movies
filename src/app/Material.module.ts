import  { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({

        imports: [
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatSelectModule,
        MatDialogModule,
        MatIconModule,
        MatToolbarModule,
        MatDividerModule,
        MatListModule,
        MatGridListModule,
        MatSnackBarModule
        ],

        exports:[
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatSelectModule,
        MatDialogModule,
        MatIconModule,
        MatToolbarModule,
        MatDividerModule,
        MatListModule,
        MatGridListModule,
        MatSnackBarModule
        
    ]
})
export class MaterialModule{}