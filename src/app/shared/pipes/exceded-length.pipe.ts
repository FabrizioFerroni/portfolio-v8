import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'exceedsLength', standalone: true })
export class ExceedsLengthPipe implements PipeTransform {
  transform(comment: string, truncateLength: number): boolean {
    return comment.length > truncateLength;
  }
}
