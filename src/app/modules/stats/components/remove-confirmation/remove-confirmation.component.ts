import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ModalService} from "../../../modal/services/modal.service";

@Component({
  selector: 'app-remove-confirmation',
  templateUrl: './remove-confirmation.component.html',
  styleUrls: ['./remove-confirmation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoveConfirmationComponent {

  constructor(private readonly modalService: ModalService) {
  }

  close(): void {
    this.modalService.closeModal();
  }

  confirm(): void {
    this.modalService.confirm();
  }
}
