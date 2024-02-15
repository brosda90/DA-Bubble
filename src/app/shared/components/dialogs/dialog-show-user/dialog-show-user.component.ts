import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { User } from '../../../../models/user.class';
import { FormsModule } from '@angular/forms';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-dialog-show-user',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatInputModule, MatFormFieldModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose, FormsModule],
  templateUrl: './dialog-show-user.component.html',
  styleUrl: './dialog-show-user.component.scss'
})
export class DialogShowUserComponent {
  user: User;


  constructor(public dialogRef: MatDialogRef<DialogShowUserComponent>, public dialog: MatDialog) {
    this.user = new User();
  }

  sendMessage() {}

  closeDialog() {
    this.dialogRef.close();
  }

  openDialogEditUser() {
    this.dialog.open(DialogEditUserComponent);
  }
}