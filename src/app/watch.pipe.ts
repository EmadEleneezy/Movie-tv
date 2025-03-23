import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'watch',
  standalone: false
})
export class WatchPipe implements PipeTransform {

  transform(title:string): string {
    return `watch: ${title}`;
  }

}
