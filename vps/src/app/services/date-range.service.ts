import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../../environments/environment';
import { ApiIdsService } from './api-ids.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DateRangeService {
    getWhichDay(dayAgo: number, optional?: boolean) {
        let date = new Date()
        const yesterday = new Date(date)
        yesterday.setDate(date.getDate() - dayAgo)
        let day = yesterday.getDate().toString();
        day = Number(day) < 10 ? '0' + day : '' + day;

        let month = (yesterday.getMonth() + 1).toString();
        month = +month < 10 ? '0' + month : month;

        let year = yesterday.getFullYear();
        let output = `${year}-${month}-${day}`

        if (optional) {
            return output;
        }

        let finalResult = new Date(output);
        return finalResult;
    }

    getLastTweleveMonthDate() {
        const twelevemonth = new Date();
        var date = twelevemonth.getFullYear() - 1
        let monthA = twelevemonth.setFullYear(date);
        let monthB = twelevemonth.getMonth() + 1

        twelevemonth.setMonth(monthB);
        return twelevemonth;
    }

    getMaxdate(){
        const todayDate = new Date();
        var date = todayDate.getFullYear() 
        let monthA = todayDate.setFullYear(date);
        let monthB = todayDate.getMonth() 

        todayDate.setMonth(monthB);
        return todayDate;
    }
    getTicketDateFormat(dateValue) {
        let date = new Date(dateValue)
        let day = date.getDate().toString();
        day = Number(day) < 10 ? '0' + day : '' + day;

        let month = (date.getMonth() + 1).toString();
        month = +month < 10 ? '0' + month : month;

        let year = date.getFullYear();
        let output = `${year}-${month}-${day}`;
        return output;
    }

    getDuration(duration) {
        let index;
        if (duration == 'week') {
          index = 6;
        } else if (duration == 'month') {
          index = 29;
        }
        else if (duration == 'year') {
          index = 11;
        }
        var result = [];
        for (; index >= 0; index--) {
          var d = new Date();
          if (duration == 'year') {
            d.setMonth(d.getMonth() - index);
          } else {
            d.setDate(d.getDate() - index);
          }
    
          result.push(this.formatDate(d, duration))
        }
        return (result.join(','));
      }
    
      formatDate(date, duration?) {
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        // var yyyy = date.getFullYear();
    
    
        if (duration == 'year') {
          let month;
          switch (mm) {
            case 1:
              month = "Jan";
              break;
            case 2:
              month = "Feb";
              break;
            case 3:
              month = "Mar";
              break;
            case 4:
              month = "Apr";
              break;
            case 5:
              month = "May";
              break;
            case 6:
              month = "Jun";
              break;
            case 7:
              month = "Jul";
              break;
            case 8:
              month = "Aug";
              break;
            case 9:
              month = "Sep";
              break;
            case 10:
              month = "Oct";
              break;
            case 11:
              month = "Nov";
              break;
            case 12:
              month = "Dec";
    
          }
          return month
        }
    
        const dates = `${dd}/${mm}`;
        return dates;
    
      }
}
