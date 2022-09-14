import { Component, OnInit,Input,Output,EventEmitter, OnDestroy, OnChanges } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router'
@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit,OnDestroy,OnChanges {

  @Input() data: {
    title: string;
    content: string;
    okLabel: string;
    cancelLabel: string;
  }

  @Input() showModal: boolean;

  @Output('okay') okay = new EventEmitter()

  @Output('cancel') cancel = new EventEmitter()

  constructor(private activatedRoute: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {

    this.data = {
      title:'Title',
      content: 'Content',
      okLabel: 'OK',
      cancelLabel: 'Cancel'
    }
  }

  ngOnChanges() {

    console.log(this.data)
  }

  okBtn() {

    this.router.navigateByUrl('pages/dashboard')
    this.okay.emit();
  }

  cancelBtn() {
    this.router.navigateByUrl('pages/dashboard')
    this.cancel.emit()
  }

  ngOnDestroy() {

    this.data['title'] = null;
  }

  




}
