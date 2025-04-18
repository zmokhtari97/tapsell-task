import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarLayoutComponent } from './layout';
import { List, ListService, SharedService } from './shared';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'tapsell-task';
  sharedService = inject(SharedService);
  listService = inject(ListService);

  ngOnInit(): void {
    this.listService.getMainList().subscribe((data: List) => {
      this.sharedService.mainListId = data._id;
    });
  }
}
