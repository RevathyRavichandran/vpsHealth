import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {


  @Input() showConfirmModal: boolean;
  
  @Input() data: {
    title: string;
    content: string;
  }
  
  @Output() submitModal = new EventEmitter();

  @Output() closeModal = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }


  submitConfirmModal() {

    this.submitModal.emit()
  }

  closeConfirmModal() {

    this.closeModal.emit()
  }

}
