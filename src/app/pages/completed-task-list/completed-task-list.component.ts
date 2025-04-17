import { Component, inject, OnInit } from '@angular/core';
import { Task, TaskCardComponent, TaskService } from '../../shared';

@Component({
  selector: 'app-completed-task-list',
  imports: [TaskCardComponent],
  templateUrl: './completed-task-list.component.html',
  styleUrl: './completed-task-list.component.scss',
})
export class CompletedTaskListComponent implements OnInit {
  taskService = inject(TaskService);
  completeTasks: Task[] = [];

  ngOnInit(): void {
    this.taskService.getCompleteTasks().subscribe((data) => {
      this.completeTasks = data;
    });
  }
}
