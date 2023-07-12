import { Component } from '@angular/core';
import { CausesService } from '../causes.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hotallogin',
  templateUrl: './hotallogin.component.html',
  styleUrls: ['./hotallogin.component.css']
})
export class HotalloginComponent {
  tableData: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'base_price', 'edit', 'update'];
  newCause: any = {};
  editMode: boolean = false; // Add a flag for edit mode
  editedCauseId: number | null = null; // Store the ID of the cause being edited

  constructor(private causesService: CausesService) {}

  ngOnInit(): void {
    this.getCausesData();
  }

  t1: any;

  show() {
    this.t1 = document.querySelector('.t1');
    const t1DisplayStyle = window.getComputedStyle(this.t1).getPropertyValue('display');
    if (t1DisplayStyle === 'none') {
      this.t1.style.display = 'block';
    } else {
      this.t1.style.display = 'none';
    }
  }

  getCausesData(): void {
    this.causesService.getCausesData().subscribe(
      (data) => {
        this.tableData = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  insertData(cause: any) {
    if (this.editMode) {
      // Perform update if in edit mode
      this.updateData(cause);
    } else {
      // Perform insert if not in edit mode
      this.causesService.insertCause(cause).subscribe(
        (response) => {
          // Handle the successful insert
          console.log(response);
          this.getCausesData(); // Refresh the data after insertion
          this.resetForm();
        },
        (error) => {
          // Handle the error
          console.error(error);
        }
      );
    }
  }

  updateData(cause: any) {
    this.causesService.updateCause(cause).subscribe(
      (response) => {
        // Handle the successful update
        console.log(response);
        this.getCausesData(); // Refresh the data after update
        this.resetForm();
      },
      (error) => {
        // Handle the error
        console.error(error);
      }
    );
  }

  deleteData(id: number) {
    this.causesService.deleteCause(id).subscribe(
      (response) => {
        // Handle the successful deletion
        console.log(response);
        this.getCausesData();
      },
      (error) => {
        // Handle the error
        console.error(error);
      }
    );
  }

  editData(cause: any) {
    // Enable edit mode and set the edited cause
    this.editMode = true;
    this.editedCauseId = cause[0];
    this.newCause.id = cause[0];
    this.newCause.name = cause[1];
    this.newCause.base_price = cause[2];
    this.show();
  }

  resetForm() {
    this.newCause = {};
    this.editMode = false; // Reset edit mode flag
    this.editedCauseId = null; // Reset edited cause ID
    this.t1.style.display = 'none';
  }
}
