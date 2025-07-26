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
  spinnerAction: 'save' | 'cancel' | null = null;

  constructor(private personService: PersonService) {

  }

  ngOnInit(): void {
    this.isMobile = window.innerWidth < 768;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 768;
    });
  }

  onPersonSelected(person: PersonViewModel): void {
    this.selectedPerson = person;
  }

  onSave(person: PersonViewModel) {
    this.spinnerAction = 'save';

    this.personService.savePerson(person).subscribe({
      next: () => {
        this.selectedPerson = null;
        alert('✅ Person saved successfully.')
        console.log('Saved person:', person);
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
