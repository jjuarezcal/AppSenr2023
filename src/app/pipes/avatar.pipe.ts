import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatar'
})
export class AvatarPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return this.capitalize(value);
  }

  capitalize(string) {
    return string.charAt(0);
  }

}
