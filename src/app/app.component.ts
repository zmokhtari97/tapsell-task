import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarLayoutComponent } from './layout';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'tapsell-task';
}
