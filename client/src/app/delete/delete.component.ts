import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {

  constructor(){}
  @Input() item : string | undefined;
  @Output() Oncancel = new EventEmitter();
  @Output() OnDelete = new EventEmitter();

  cancel(){
    this.Oncancel.emit();
  }

  delete(){
    this.OnDelete.emit(this.item);
  }
}
