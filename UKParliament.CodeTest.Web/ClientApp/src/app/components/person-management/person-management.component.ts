import { Component, ViewChild } from '@angular/core';
import { PersonViewModel } from '../../models/person-view-model';
import { PersonEditorComponent } from '../person-editor/person-editor.component';
import { PersonService } from '../../services/person.service';
import { PersonListComponent } from '../person-list/person-list.component';

@Component({
  selector: 'app-person-management',
  templateUrl: './person-management.component.html',
  styleUrls: ['./person-management.component.scss']
})

export class PersonManagementComponent {
  @ViewChild(PersonEditorComponent) personEditor!: PersonEditorComponent;
  @ViewChild(PersonListComponent) personList!: PersonListComponent;
  selectedPerson: PersonViewModel | null = null;
  isMobile = false;
  spinnerAction: 'save' | 'cancel' | 'add' | null = null;
  mode: 'add' | 'edit' | null = null;

  constructor(private personService: PersonService) {

  }

  ngOnInit(): void {
    this.isMobile = window.innerWidth < 768;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 768;
    });
  }


  onPersonSelected(selection: { person: PersonViewModel, mode: 'add' | 'edit' }): void {
    this.selectedPerson = selection.person;
    this.mode = selection.mode;
  }

  onSave(person: PersonViewModel) {
    this.spinnerAction = 'save';

    this.personService.savePerson(person).subscribe({
      next: () => {
        this.selectedPerson = null;
        alert('✅ Person saved successfully.')
      },
      error: () => {
        alert('❌ Failed to save person. Please try again.')
          this.spinnerAction = null;
      },
        complete: () => {
          this.spinnerAction = null;
          this.personList.getListOfPeople();
        }
      });
  }

  onAdd(person: PersonViewModel) {
    this.spinnerAction = 'add';
    person.id = 0;

    this.personService.addPerson(person).subscribe({
      next: () => {
        this.selectedPerson = null;
        alert('✅ Person added successfully.')
      },
      error: () => {
        alert('❌ Failed to add person. Please try again.')
        this.spinnerAction = null;
      },
      complete: () => {
        this.spinnerAction = null;
        this.personList.getListOfPeople();
      }
    });
  }

  onCancel() {
    this.spinnerAction = 'cancel';
    this.personEditor.resetForm();

    setTimeout(() => {
      this.spinnerAction = null;
      this.selectedPerson = null;
    }, 500);
  }

  //addNewPerson(): void {
  //  this.personEditor.resetForm();
  //  this.selectedPerson = null;
  //}
}
