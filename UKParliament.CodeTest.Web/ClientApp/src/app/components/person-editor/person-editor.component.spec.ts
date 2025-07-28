import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonEditorComponent } from './person-editor.component';
import { DepartmentService } from '../../services/department.service';
import { of } from 'rxjs';

describe('PersonEditorComponent', () => {
  let component: PersonEditorComponent;
  let fixture: ComponentFixture<PersonEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonEditorComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: DepartmentService,
          useValue: {
            getListOfDepartment: () => of([])
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate the form when required fields are missing', () => {
    component.personForm.patchValue({
      firstName: '',
      lastName: '',
      dob: '',
      email: '',
      department: null
    });
    expect(component.personForm.valid).toBeFalse();
  });

  it('should mark firstName as invalid when it contains special characters', () => {
    component.personForm.patchValue({ firstName: 'invalid-(*&^%$£-firstName' });
    expect(component.personForm.get('firstName')?.valid).toBeFalse();
  });

  it('should mark firstName as valid when it contains only letters', () => {
    component.personForm.patchValue({ firstName: 'Fernando' });
    expect(component.personForm.get('firstName')?.valid).toBeTrue();
  });

  it('should mark lastName as invalid when it contains special characters', () => {
    component.personForm.patchValue({ lastName: 'invalid-(*&^%$£-lastName' });
    expect(component.personForm.get('lastName')?.valid).toBeFalse();
  });

  it('should mark lastName as valid when it contains only letters', () => {
    component.personForm.patchValue({ lastName: 'Magrina' });
    expect(component.personForm.get('lastName')?.valid).toBeTrue();
  });

  it('should mark random string as invalid date of birth', () => {
    component.personForm.patchValue({ dob: 'not-a-real-date' });
    expect(component.personForm.get('dob')?.valid).toBeFalse();
  });

  it('should mark date of birthday as valid', () => {
    component.personForm.patchValue({ dob: '1976-12-17' });
    expect(component.personForm.get('dob')?.valid).toBeTrue();
  });

  it('should validate the email format', () => {
    component.personForm.patchValue({ email: 'invalid-email' });
    expect(component.personForm.get('email')?.valid).toBeFalse();

    component.personForm.patchValue({ email: 'valid@email.com' });
    expect(component.personForm.get('email')?.valid).toBeTrue();
  });

  it('should set selected department in the form', () => {
    const dept = { id: 2, name: 'HR' };
    component.departments = [dept];
    fixture.detectChanges();

    component.personForm.get('department')?.setValue(dept);
    expect(component.personForm.get('department')?.value).toEqual(dept);
    expect(component.personForm.valid).toBeFalse();
  });

  it('should mark department as invalid if not selected', () => {
    component.personForm.patchValue({ department: null });
    expect(component.personForm.get('department')?.valid).toBeFalse();
  });

  it('should render all department options in the dropdown', () => {
    component.departments = [
      { id: 1, name: 'Sales' },
      { id: 2, name: 'Marketing' },
      { id: 3, name: 'HR' },
      { id: 4, name: 'Finance' }
    ];
    fixture.detectChanges();

    const select: HTMLSelectElement = fixture.nativeElement.querySelector('#department');
    const options = select.querySelectorAll('option');

    expect(options.length).toBe(5);
    expect(options[1].textContent).toContain('Sales');
    expect(options[2].textContent).toContain('Marketing');
    expect(options[3].textContent).toContain('HR');
    expect(options[4].textContent).toContain('Finance');
  });

  it('should enable the form when all fields are valid', () => {
    component.personForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      dob: '2000-01-01',
      email: 'test@example.com',
      department: { id: 1, name: 'HR' }
    });
    expect(component.personForm.valid).toBeTrue();
  });
});
