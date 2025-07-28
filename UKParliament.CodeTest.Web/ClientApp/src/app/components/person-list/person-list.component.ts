import { Component, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
import { PersonViewModel } from '../../models/person-view-model';
import { PersonService } from '../../services/person.service';
import { DepartmentViewModel } from '../../models/department-view-model';
import { ViewChild } from '@angular/core';
import { PersonEditorComponent } from '../person-editor/person-editor.component';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})

export class PersonListComponent {
  @ViewChild(PersonEditorComponent) personEditor!: PersonEditorComponent;
  @Output() select = new EventEmitter<{ person: PersonViewModel, mode: 'add' | 'edit' }>();
  @Input() spinnerAction: 'add' | null = null;
  @Input() selectedPerson: PersonViewModel | null = null;

  listOfPeople: PersonViewModel[] = [];
  searchText = '';
  departments: DepartmentViewModel[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.getListOfPeople();
  }

  constructor(private personService: PersonService) {
    this.getListOfPeople();
  }

  getListOfPeople(): void {
    this.personService.getListOfPeople().subscribe({
      next: (result) => {
        this.listOfPeople = result
},
      error: (e) => console.error('Error loading people', e)
    });
  }

  filteredPeople(): PersonViewModel[] {
    return this.listOfPeople.filter(p =>
      `${p.firstName} ${p.lastName}`.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  onSelect(person: PersonViewModel): void {
    this.select.emit({ person, mode: 'edit' });
  }

  addNewPerson(): void {
    const emptyPerson: PersonViewModel = {
      id: 0,
      firstName: '',
      lastName: '',
      dob: '',
      email: '',
      department: null!
    };

    this.select.emit({ person: emptyPerson, mode: 'add' });
  }
}
