import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonListComponent } from './person-list.component';
import { PersonService } from '../../services/person.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PersonListComponent', () => {
  let component: PersonListComponent;
  let fixture: ComponentFixture<PersonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonListComponent],
      imports: [HttpClientTestingModule],
      providers: [
        PersonService,
        { provide: 'BASE_URL', useValue: '' }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // or add missing components to declarations
    }).compileComponents();

    fixture = TestBed.createComponent(PersonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
