import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.scss']
})
export class ModalConfirmationComponent implements OnInit {

  constructor(private modalRef: NgbActiveModal) { }

  ngOnInit(): void {
  }

  close(value: boolean) {
    this.modalRef.close(value)
  }
}
