import {
  Component,
  Input,
  Output,
  forwardRef,
  EventEmitter,
  AfterViewInit,
  ViewChild,
  ElementRef,
  HostListener
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  Validator,
  FormControl,
  NG_VALIDATORS
} from '@angular/forms';


@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    }
  ]
})
export class CustomInputComponent
  implements ControlValueAccessor, Validator, AfterViewInit {
  @Input() maxLength: {
    rule?: number;
    msg?: string;
    allowCharacter?: string;
  };
  @Input() className = '';
  @Input() optional: string;
  @Input() minLength: {
    rule?: number;
    msg?: string;
  };
  @Input() type = 'text';
  @Input() labelName: string;
  @Input() labelClass: string;
  @Input() placeHolder = ''
  @Input() id: string;
  @Input() patternCheck: {
    rule?: string;
    msg?: string;
  };
  @Input() custom: {
    rule?: Function;
    msg?: string;
  }[];
  @Input() qdeValue;
  @Output() change = new EventEmitter();
  @Input() isRequired: string;

  @Input() inputClass: string = '';

  @Input() dynamicDataBinding: boolean;

  @Input() isDisabledInp: boolean;

  @Input() mandatoryField: boolean;

  @Input() optionalField: boolean;

  htmlInputElement: any;

  @Input() set isDirty(value) {
    if (value) {
      this.checkIsFirst = false;
      this.checkValidation(this.data);
      //this.propagateChange(this.data);
    }else {
      this.inputError = false;
    }
  }

  @ViewChild('customInput', {static:false}) customInput: ElementRef;

  errorMsg: string;
  inputError = false;
  allowCharacterError = false;
  allowChartErrorMsg:string;
  isDisabled: boolean;
  isNonEmpty: boolean;
  private data: any;

  private checkIsFirst = true;
  private propagateChange = event => {
    // this.change.emit(event);
  };

  ngAfterViewInit() {
    this.htmlInputElement = this.customInput;
  }

  // this is the initial value set to the component
  writeValue(obj: any) {

    if(this.dynamicDataBinding) {
      this.checkIsFirst = false;
    }
    this.data = obj;
    this.inputValue = this.data;
    this.checkValidation(this.data);
    this.propagateChange(this.data);
  }

  set inputValue(value) {
    this.data = value;
  }

  get inputValue() {
    return this.data;
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  validate(c?: FormControl) {
    return !this.inputError
      ? null
      : {
          customError: {
            valid: false
          }
        };
  }

  // not used, used for touch input
  public registerOnTouched() {}

  updateChanges() {
    this.checkValidation(this.data);
    this.propagateChange(this.data);
  }

  checkValidation(value) {
    const newValue = value;
    if (!newValue && !this.isRequired) {
      this.inputError = false;
      return;
    }

    if ((newValue === null || newValue == undefined || newValue === "") && this.isRequired) {
      this.displayError(this.checkIsFirst ? '' : this.isRequired);
      this.checkIsFirst = false;
      return;
    }


    // if (!newValue && this.isRequired) {
    //   this.displayError(!this.checkIsFirst ? '' : this.isRequired);
    //   this.checkIsFirst = true;
    //   return;
    // }
    // this.isNonEmpty = true;

    if (this.patternCheck) {
      let toLower = String(newValue);
      if (this.inputClass === 'text-uppercase') {
        toLower = toLower.toUpperCase();
      }
      if (!RegExp(this.patternCheck.rule).test(toLower)) {
        this.displayError(this.patternCheck.msg);
        return;
      }
    }

    if (
      this.minLength &&
      newValue.length < this.minLength.rule &&
      this.minLength.msg
    ) {
      this.displayError(this.minLength.msg);
      return;
    }

    if (
      this.maxLength &&
      newValue.length < this.maxLength.rule &&
      this.maxLength.msg
    ) {
      this.displayError(this.maxLength.msg);
      return;
    }

    if (this.maxLength) {
      if(String(newValue).length > this.maxLength.rule) {
        const value = String(newValue);
        this.inputValue = value.substring(0,this.maxLength.rule)
        this.allowCharacterError = true;
        this.allowChartErrorMsg = this.maxLength.allowCharacter;
        setTimeout(()=> {
          this.allowCharacterError = false;
        },3000)
        
      }
    }
    

    if (this.custom) {
      for (let i = 0; i < this.custom.length; i++) {
        const customVal = this.custom[i].rule;
        if (customVal(newValue)) {
          console.log(
            'this.custom[i].msg',
            this.custom[i].msg,
            'i',
            i,
            'custom',
            this.custom
          );
          this.displayError(this.custom[i].msg);
          return;
        }
      }
    }
    this.inputError = false;
  }

  onBlurMethod(event) {
    const newValue = event.target.value;

    if (!newValue && this.isRequired) {
      this.displayError(this.isRequired);
      return;
    }
  }

  displayError(msg: string) {
    this.errorMsg = msg;
    this.inputError = true;
  }

  setDisabledState(disabled: boolean) {
    this.isDisabled = disabled;
  }


  valuePatternCheck(event, pattern) {
    const initialValue = event.target.value;
    this.inputValue = initialValue.replace(pattern, '');
   }

   allowCharacterCheck(event) {
    const initialValue = event.target.value;

    if(String(initialValue).length > this.maxLength.rule) {
      const value = String(initialValue);
      const substrValue = value.substring(0,(this.maxLength.rule - 1))
      this.inputValue = initialValue.replace(initialValue,String(substrValue))
    }

   }

  @HostListener('input', ['$event']) onInputChange(event) {
    switch (this.type) {
      case 'number':
        this.valuePatternCheck(event, /[^0-9]*/g);
        // this.allowNumberOnly(event);
        break;
      case 'alpha-numeric':
        this.valuePatternCheck(event, /[^a-zA-Z0-9 ]/g);
        // this.allowAlphaNumericOnly(event);
        break;
      case 'alpha':
        this.valuePatternCheck(event, /[^a-zA-Z ]/g);
        // this.allowAlphaOnly(event);
        break;
      case 'allow-character': 
        this.allowCharacterCheck(event)

    }

    this.checkValidation(this.inputValue);
    this.propagateChange(this.inputValue);
  }
}
