import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonViewModel } from '../../models/person-view-model';
import { DepartmentViewModel } from '../../models/department-view-model';
import { DepartmentService } from '../../services/department.service';
import { pastDateValidator, validDateValidator } from '../../validators/validDateValidator';

@Component({
  selector: 'app-person-editor',
  templateUrl: './person-editor.component.html',
  styleUrls: ['./person-editor.component.scss']
})

export class PersonEditorComponent implements OnChanges {
  @Output() save = new EventEmitter<PersonViewModel>();
  @Output() add = new EventEmitter<PersonViewModel>();
  @Output() cancel = new EventEmitter<void>();
  @Input() selectedPerson: PersonViewModel | null = null;
  @Input() departments: DepartmentViewModel[] = [];
  @Input() spinnerAction: 'save' | 'cancel' | 'add' | null = null;
  @Input() person!: PersonViewModel;
  @Input() mode: 'add' | 'edit' | null = null;

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
      id: this.selectedPerson.id,
      firstName: this.selectedPerson.firstName,
      lastName: this.selectedPerson.lastName,
      dob: this.selectedPerson.dob,
      email: this.selectedPerson.email,
      department: this.departments.find(d => d.id === this.selectedPerson?.department?.id)
    });
  }

  initForm(): void {
    this.personForm = this.fb.group({
      id: [0],
      firstName: ['', [
        Validators.required,
        Validators.pattern('^[A-Za-zÀ-ÖØ-öø-ÿ\\s\'-]{2,50}$'),
        Validators.minLength(2)]],
      lastName: ['', [
        Validators.required,
        Validators.pattern('^[A-Za-zÀ-ÖØ-öø-ÿ\\s\'-]{2,50}$'),
        Validators.minLength(2)]],
      dob: [null, [Validators.required, validDateValidator(), pastDateValidator]],
      email: ['', [
        Validators.required,
        Validators.pattern(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)]],
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
      email: this.selectedPerson?.email || '',
      department: this.departments.find(d => d.id === this.selectedPerson?.department?.id) || null
    });
  }

  onSubmit(): void {
    const personData = this.personForm.value as PersonViewModel;

    if (this.mode === 'add') {
      this.add.emit(personData);
    } else if (this.mode === 'edit') {
      this.save.emit(personData);
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
      email: '',
      department: null
    });
  }
}
