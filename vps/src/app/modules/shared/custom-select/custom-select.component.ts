import {
  Component,
  OnInit,
  Input,
  forwardRef,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true,
    },
  ],
})
export class CustomSelectComponent
  implements OnInit, OnChanges, ControlValueAccessor, Validator {
  @Input() className = 'form-control mandatory brd_radius';
  @Input() placeholder = '-- Select Options --'
  @Input() defaultOption = {
    key: '',
    value: '-- Select One --',
  };
  @Input() isDisabled: boolean;
  @Input('selectedOption') val: any;
  @Input() values: any[];
  @Input() isRequired: string;
  @Input() keyField = 'key';
  @Input() valueField = 'value';
  @Input() isDefaultDisabled = true;
  @Input() controlName: any;

  @Output() valueChange = new EventEmitter();
  @Output() scrollEndEvent = new EventEmitter();

  inputError: boolean;
  isFirst: boolean = true;
  isChecked: boolean = false;

  onChange: any = () => { };
  onTouch: any = () => { };
  size: number

  dropdownList = [];
    selectedItems = [];
    dropdownSettings = {};

  @Input() set isDirty(val) {
    if (val) {
      this.checkValidation();
    }
  }

  set selectedOption(val) {
    this.val = val;
    this.onChange(this.val);
    if (!val) {
      return;
    }
    const selectedValue = this.getSelectedObject();
    this.isChecked = this.val?.length == this.values?.length ? true : false; 
    //console.log('selectedValue', selectedValue)
    this.valueChange.emit(selectedValue);
    this.checkValidation();
  }

  getSelectedObject() {
    return this.values && Array.isArray(this.values)
      ? this.values.find(
        (value) => String(value[this.keyField]) === String(this.selectedOption)
      )
      : {};

  }

  get selectedOption() {
    return this.val ? this.val : null;
  }

  @Input() loading: boolean;

  constructor() { }

  ngOnInit() {
    this.selectedOption = this.selectedOption || this.defaultOption.key;
  }

  checkValidation() {
    if (this.val) {
      this.inputError = false;
      return;
    }
    if (this.isRequired) {
      this.inputError = true;
    } else {
      this.inputError = false;
    }
  }

  ngOnChanges() {
    console.log(this.values.length);  
    if (this.selectedOption) {
      this.onChange(this.val);
      
    }
  }

  writeValue(val) {
    this.val = val;
    if ((!val && this.isFirst) || this.isFirst) {
      this.isFirst = false;
      this.inputError = false;
      return;
    }
    if (!this.val) {
      this.checkValidation();
      this.isFirst = false;
      // this.inputError = false;
    } else {
      this.inputError = false;
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouch = fn;
  }
  setDisabledState(state: boolean) {
    this.isDisabled = state;
  }

  validate(c) {
    return !this.inputError
      ? null
      : {
        customError: {
          valid: true,
        },
      };
  }
  onBlurMethod(event) {
    const newValue = this.selectedOption;
    if (!newValue && this.isRequired) {
      this.displayError(this.isRequired);
      return;
    }
  }
  displayError(msg: string) {
    this.isRequired = msg;
    this.inputError = true;
  }
  onClear() {
    this.selectedOption = '';
    this.valueChange.emit(null);
  }

  onScrollEnd() {
    console.log('Scroll End')
    this.scrollEndEvent.emit()
    
  }selectAllItems() {
    const newList = this.values.map((x) => x.key);
    
    this.selectedOption = newList;
    console.log('newlist', this.selectedOption, this.val)
    this.onChange(this.val);
  }

  unselectAllItems() {
    this.selectedOption = [];
    this.onChange('');
  }
  toggleCheckAll(values: any) {
    
    if (values.currentTarget.checked) {
      this.selectAllItems();
    } else {
      this.unselectAllItems();
    }
    // this.isChecked = this.val?.length == this.values?.length ? true : false; 
  }

  // selectAll() {
  //   const newList = this.values.map((x) => x.key);
    
  //   this.selectedOption = [...newList];
  //   this.onChange([...newList]);
  // }

  // unselectAll() {
  //   this.selectedOption = [];
  //   this.onChange([]);
  // }
}




