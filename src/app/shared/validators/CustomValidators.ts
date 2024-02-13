import { AbstractControl, ValidatorFn } from '@angular/forms';

export function zeroOrMoreValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value === null || value === undefined || value > 0) {
        return null;
      } else {
        return { 'zeroOrMore': { value: control.value } }; // El valor es cero o menor que cero, se devuelve un error
      }
    };
  }
