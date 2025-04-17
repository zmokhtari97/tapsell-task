import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services';
import { Task } from '../../models';
@Component({
  selector: 'app-task-modal',
  imports: [
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss',
})
export class TaskModalComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  readonly dialogRef = inject(MatDialogRef);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  listId: string = '';
  taskId: string | null = null;
  activatedRoute = inject(ActivatedRoute);
  taskService = inject(TaskService);

  taskForm = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    description: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {
    this.listId = this.data?.listId;
    this.taskId = this.data?.taskId ?? null;
    if (this.taskId) {
      const task = this.data?.task ?? {};
      this.fillForm(task);
    }
  }

  fillForm(task: object) {
    this.taskForm.patchValue({ ...task });
  }

  onSubmit() {
    let model = {
      ...this.taskForm.value,
      list: this.listId,
    };
    if (this.taskId) {
      this.updateTask(model);
    } else {
      this.addTask(model);
    }
  }

  addTask(model: Partial<Task>) {
    this.taskService.insertTask(model).subscribe(() => {
      this.dialogRef.close({ success: true });
    });
  }

  updateTask(model: Partial<Task>) {
    this.taskService.updateTaskById(this.taskId!, model).subscribe(() => {
      this.dialogRef.close({ success: true });
    });
  }
}
