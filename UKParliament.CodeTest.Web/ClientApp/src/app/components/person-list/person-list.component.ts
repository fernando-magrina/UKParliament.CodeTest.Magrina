import { Component, EventEmitter, Output } from '@angular/core';
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
  @Output() select = new EventEmitter<PersonViewModel>();
  listOfPeople: PersonViewModel[] = [];
  searchText = '';
  departments: DepartmentViewModel[] = [];

  constructor(private personService: PersonService) {
    this.getListOfPeople();
  }

  getListOfPeople(): void {
    this.personService.getListOfPeople().subscribe({
      next: (result) => this.listOfPeople = result,
      error: (e) => console.error('Error loading people', e)
    });
  }

  filteredPeople(): PersonViewModel[] {
    return this.listOfPeople.filter(p =>
      `${p.firstName} ${p.lastName}`.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  onSelect(person: PersonViewModel): void {
    this.select.emit(person);
  }

  addNewPerson(): void {
    //this.personEditor.selectedPerson = null;
    this.personEditor.resetForm();
    this.select.emit();
  }

  onAdd(person: PersonViewModel): void {
    console.log('Adding new person ---------------------------- : ', person);
    //this.personService.addPerson(person).subscribe({
    //  next: () => {
    //    this.getListOfPeople(); // refresh list
    //    this.closeAddModal();
    //  },
    //  error: err => console.error('Add failed', err)
    //});
  }
}
