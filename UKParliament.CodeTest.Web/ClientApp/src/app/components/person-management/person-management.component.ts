import { Component, ViewChild } from '@angular/core';
import { PersonViewModel } from '../../models/person-view-model';
import { PersonEditorComponent } from '../person-editor/person-editor.component';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-person-management',
  templateUrl: './person-management.component.html',
  styleUrls: ['./person-management.component.scss']
})

export class PersonManagementComponent {
  @ViewChild(PersonEditorComponent) personEditor!: PersonEditorComponent;
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
        console.log('Saved person:', person);
      },
      error: () => {
        // handle error
      },
      complete: () => {
        this.spinnerAction = null;
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
