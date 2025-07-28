import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonManagementComponent } from './person-management.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DepartmentService } from '../../services/department.service';
import { PersonService } from '../../services/person.service';
import { of } from 'rxjs';

describe('PersonManagementComponent', () => {
  let component: PersonManagementComponent;
  let fixture: ComponentFixture<PersonManagementComponent>;

  beforeEach(async () => {
    const departmentSpy = jasmine.createSpyObj('DepartmentService', ['getDepartments']);

    await TestBed.configureTestingModule({
      declarations: [PersonManagementComponent],
      imports: [HttpClientTestingModule],
      providers: [
        PersonService,
        { provide: DepartmentService, useValue: departmentSpy },
        { provide: 'BASE_URL', useValue: '' }
      ]
    }).compileComponents();

    departmentSpy.getDepartments.and.returnValue(of([]));

    fixture = TestBed.createComponent(PersonManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
