// notification.service.ts
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string, duration: number = 3000) {
    this.showNotification(
      message,
      'check_circle',
      'success-snackbar',
      duration,
    );
  }

  error(message: string, duration: number = 3000) {
    this.showNotification(message, 'error', 'error-snackbar', duration);
  }

  private showNotification(
    message: string,
    icon: string,
    panelClass: string,
    duration: number,
  ) {
    this.snackBar.open(message, 'Close', {
      duration,
      panelClass: [panelClass],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
