import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.css']
})
export class InfoModalComponent implements OnInit,OnChanges {


  @Input() showInfoModal: boolean;
  @Input()infoDatas : {
    title ?: string;
    modalType?: string;
    formData ?: {
      label: string;
      value: string;
    }[]
  }
  // formInputs: {
  //   inputData1: string;
  //   inputData2: string;
  //   inputData3: string;
  //   inputData4: string;
  //   inputData5: string;
  //   inputData6: string;
  //   inputData7: string;
  //   inputData8: string;
  //   inputData9: string;
  // }
  inputData1: string;
  @Output() closeDialog = new EventEmitter();

  constructor() { 

    this.infoDatas = {};

   
  }

  ngOnInit(): void {


    // this.formInputs = {
    //   inputData1: '',
    //   inputData2: '',
    //   inputData3: '',
    //   inputData4: '',
    //   inputData5: '',
    //   inputData6: '',
    //   inputData7: '',
    //   inputData8: '',
    //   inputData9: ''
    // }
    console.log('this.infoDatas',this.infoDatas);

    // this.formInputs = {
    //   inputData1: this.infoData.formData[0]?.value|| '',
    //   inputData2: this.infoData.formData[1]?.value|| '',
    //   inputData3: this.infoData.formData[2]?.value|| '',
    //   inputData4: this.infoData.formData[3]?.value|| '',
    //   inputData5: this.infoData.formData[4]?.value|| '',
    //   inputData6: this.infoData.formData[5]?.value|| '',
    //   inputData7: this.infoData.formData[6]?.value|| '',
    //   inputData8: this.infoData.formData[7]?.value|| '',
    //   inputData9: this.infoData.formData[8]?.value|| ''
    // }
  }

  ngOnChanges() {

    console.log(this.infoDatas)

   
  }

  closeModal() {
    this.closeDialog.emit()
  }

}
