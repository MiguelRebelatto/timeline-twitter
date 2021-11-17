import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.scss']
})
export class ModalConfirmationComponent {

  text: string = "Deseja realmente remover este post?";

  constructor(private modalRef: NgbActiveModal) { }

  close(value: boolean) {
    this.modalRef.close(value)
  }
}
