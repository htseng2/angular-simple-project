import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() text: string = 'default text';
  @Input() color: string = 'gray';
  @Output() btnClick = new EventEmitter();

  onClick() {
    this.btnClick.emit();
  }
}
