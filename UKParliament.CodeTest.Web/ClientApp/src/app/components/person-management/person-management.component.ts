import { Component, ViewChild } from '@angular/core';
import { PersonViewModel } from '../../models/person-view-model';
import { PersonEditorComponent } from '../person-editor/person-editor.component';

@Component({
  selector: 'app-person-management',
  templateUrl: './person-management.component.html',
  styleUrls: ['./person-management.component.scss']
})

export class PersonManagementComponent {
  @ViewChild(PersonEditorComponent) personEditor!: PersonEditorComponent;
  selectedPerson: PersonViewModel | null = null;
  isMobile = false;

  ngOnInit(): void {
    this.isMobile = window.innerWidth < 768;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 768;
    });
  }

  onPersonSelected(person: PersonViewModel): void {
    this.selectedPerson = person;
  }

  onSave(person: PersonViewModel): void {
    console.log('Saved person:', person);
    this.selectedPerson = null;
  }

  onCancel(): void {
    this.personEditor.resetForm();
    this.selectedPerson = null;
  }

  //addNewPerson(): void {
  //  this.personEditor.resetForm();
  //  this.selectedPerson = null;
  //}
}
