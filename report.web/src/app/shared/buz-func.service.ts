import { Injectable } from '@angular/core';


@Injectable()
export class BuzFunctionalityService {

    strToIntArr(str) {
        var intArr = [];
        var strArr = str.split(',');
        for (var i = 0; i < strArr.length; i++) {
            intArr.push(parseInt(strArr[i], 10));
        }
        return intArr;
    }
}