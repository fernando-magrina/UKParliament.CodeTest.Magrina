import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonViewModel } from '../../models/person-view-model';
import { DepartmentViewModel } from '../../models/department-view-model';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-person-editor',
  templateUrl: './person-editor.component.html',
  styleUrls: ['./person-editor.component.scss']
})
export class PersonEditorComponent implements OnChanges {
  @Input() selectedPerson: PersonViewModel | null = null;
  @Output() save = new EventEmitter<PersonViewModel>();
  @Output() cancel = new EventEmitter<void>();
  @Input() departments: DepartmentViewModel[] = [];

  personForm!: FormGroup;
  private departmentsLoaded = false;

  constructor(private fb: FormBuilder, private departmentService: DepartmentService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getDepartments();
  }

  getDepartments(): void {
    this.departmentService.getListOfDepartment().subscribe({
      next: (result) => {
        console.log("-------------------------------------: " + JSON.stringify(result));
        this.departments = result;
        this.departmentsLoaded = true;
        this.tryPatchForm();
      },
      error: (e) => console.error('Error loading departments', e)
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedPerson && this.selectedPerson) {
      this.tryPatchForm();
    }
  }

  tryPatchForm(): void {
    if (!this.personForm || !this.selectedPerson || !this.departmentsLoaded) return;

    this.personForm.patchValue({
      firstName: this.selectedPerson.firstName,
      lastName: this.selectedPerson.lastName,
      dob: this.selectedPerson.dob,
      department: this.departments.find(d => d.id === this.selectedPerson?.department?.id)
    });
  }

  initForm(): void {
    this.personForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      department: [null, Validators.required]
    });

    if (this.selectedPerson) {
      this.patchForm();
    }
  }

  patchForm(): void {
    this.personForm.patchValue({
      firstName: this.selectedPerson?.firstName || '',
      lastName: this.selectedPerson?.lastName || '',
      dob: this.selectedPerson?.dob || '',
      department: this.departments.find(d => d.id === this.selectedPerson?.department?.id) || null
    });
  }

  onSubmit(): void {
    if (this.personForm.valid) {
      const updatedPerson: PersonViewModel = {
        ...this.selectedPerson,
        ...this.personForm.value
      };
      this.save.emit(updatedPerson);
    }
  }

  clear(): void {
    this.resetForm(); 
    this.cancel.emit();
  }

  resetForm(): void {
    this.personForm.reset({
      firstName: '',
      lastName: '',
      dob: '',
      department: null
    });
  }
}
