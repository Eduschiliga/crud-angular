import { Injectable } from '@angular/core';
import { UntypedFormGroup, FormGroup, UntypedFormControl, UntypedFormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  constructor() { }

  public validateAllFormFields(formGroup: UntypedFormGroup | UntypedFormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      const CONTROL = formGroup.get(field);
      if (CONTROL instanceof UntypedFormControl) {
        CONTROL.markAsTouched({ onlySelf: true });
      } else if (CONTROL instanceof UntypedFormGroup || CONTROL instanceof UntypedFormArray) {
        CONTROL.markAsTouched({ onlySelf: true });
        this.validateAllFormFields(CONTROL);
      }
    });
  }

  public getErrorMessage(formGroup: UntypedFormGroup, fieldName: string): string {
    const FIELD = formGroup.get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFromField(FIELD);
  }

  public getErrorMessageFromField(field: UntypedFormControl) {
    if (field?.hasError('required')) {
      return 'This field is required';
    }

    if (field?.hasError('minlength')) {
      const REQUIRED_LENGTH = field?.errors ? field?.errors['minlength']['requiredLength'] : 3;
      return `Minimum length is ${REQUIRED_LENGTH} characters`;
    }

    if (field?.hasError('maxlength')) {
      const REQUIRED_LENGTH = field?.errors ? field?.errors['maxlength']['requiredLength'] : 3;
      return `Max length is ${REQUIRED_LENGTH} characters`;
    }

    return 'Check the field';
  }

  public getFormArrayFieldErrorMessage(formGroup: UntypedFormGroup, formArrayName: string, fieldName: string, index: number) {
    const FORM_ARRAY = formGroup.get(formArrayName) as UntypedFormGroup;
    const FIELD = FORM_ARRAY.controls[index].get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFromField(FIELD);
  }

  public isFormArrayRequired(formGroup: UntypedFormGroup, formArrayName: string) {
    const FORM_ARRAY = formGroup.get(formArrayName) as UntypedFormArray;
    return !FORM_ARRAY.valid && FORM_ARRAY.hasError('required') && FORM_ARRAY.touched;
  }
}
