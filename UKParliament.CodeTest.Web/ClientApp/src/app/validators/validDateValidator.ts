import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) return null;

    const date = typeof value === 'string' || typeof value === 'number'
      ? new Date(value)
      : value;

    const isValid = date instanceof Date && !isNaN(date.getTime());

    return isValid ? null : { invalidDate: true };
  };
}
