//@ts-nocheck

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceLineBreak'
})
export class LineBreakPipe implements PipeTransform {

  transform(value: string | undefined): string {
    return value.replace(/\n/g, '<br/>');
  }

}
