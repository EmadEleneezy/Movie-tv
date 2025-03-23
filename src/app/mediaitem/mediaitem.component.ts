import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mediaitem',
  standalone: false,
  templateUrl: './mediaitem.component.html',
  styleUrl: './mediaitem.component.css'
})
export class MediaitemComponent {

  @Input() item:any;
}
