import { Pipe, PipeTransform } from '@angular/core';
//https://stackoverflow.com/a/38554580/5517161
@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {

  transform(value): Object {
    console.log(value);
    return Object.keys(value).filter(e => !isNaN(+e)).map(o => { return { index: +o, name: value[o] } });
  }

}
