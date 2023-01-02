import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  constructor() { }

  downloadCSV(array: any, nome: string) {
    var data = JSON.parse(JSON.stringify(array)); //realiza deep-copy do array

    var csvData = this.ConvertToCSV(data);
    var a = document.createElement('a');
    a.setAttribute('style', 'display: none;');
    document.body.appendChild(a);

    var blob = new Blob([csvData], { type: 'text/csv' });
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = `${nome}.csv`;

    a.click();
    document.body.removeChild(a);
  }

  private ConvertToCSV(objArray: any): string {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var row = '';

    for (var index in objArray[0]) {
      //Now convert each value to string and comma-separated
      row += index + ';';
    }

    row = row.slice(0, -1);

    //append Label row with line break
    str += row + '\r\n';

    for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
        if (line != '') line += ';'
        line += array[i][index];
      }
      str += line + '\r\n';
    }
    return str;
  }
}
