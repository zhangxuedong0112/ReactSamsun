import moment from 'moment';

export default class DateUtils {
    static getQuarter() {
        let quarter = moment().quarter();
        quarter -= 1;
        if (quarter == 0) {
            quarter = 4;
        }

        return quarter;
    }

    static getYear() {
        let q = this.getQuarter();
        let year = new Date().getFullYear();
        if (q == 4) {
            year--;
        }
        return year;
    }

    static initQuarter(quarterProp) {
        let quarter = parseInt(quarterProp);
        if (isNaN(quarter)) {
            quarterProp = quarterProp.substr(1);
            quarter = parseInt(quarterProp);
        }

        //1 季度 4，5，6
        //2 季度 7，8，9
        //3 季度 10，11，12
        //4 季度 1，2，3
        quarter += 1;

        if (quarter > 4) {
            quarter = 1;
        }

        return quarter;
    }

    /**
     * 获得本季度的起日期
     */

    static getStartDateByYearAndQuarter(year, quarter: any) {
        quarter = this.initQuarter(quarter);
        // console.log("@@@@@quarter", quarter)

        let startMonth: any = 3 * parseInt(quarter) - 2;

        /* 对月数进行格式化 */
        if (startMonth < 10) {
            startMonth = '0' + startMonth;
        } else {
            startMonth += '';
        }

        let startDays = year + '-' + startMonth + '-01'; //完整年月日整合
        if (quarter == 1) {
            startDays = parseInt(year) + 1 + '-' + startMonth + '-01'; //完整年月日整合
        }

        return moment(startDays);
        // return moment(moment(year + '-01-01').toDate()).quarter(quarter)
    }

    /**
     * 获得本季度的起日期
     */

    static getEndDateByYearAndQuarter(year, quarter: any) {
        quarter = this.initQuarter(quarter);
        // console.log("@@@@@quarter", quarter)
        let endMonth: any = 3 * parseInt(quarter); //当季度最后一个月
        /* 对月数进行格式化 */
        if (endMonth < 10) {
            endMonth = '0' + endMonth;
        } else {
            endMonth += '';
        }

        let endMonthDays = moment(year + '-' + endMonth).daysInMonth(); // 末尾月天数
        let endDays = year + '-' + endMonth + '-' + endMonthDays; //完整年月日整合
        if (quarter == 1) {
            endDays = parseInt(year) + 1 + '-' + endMonth + '-' + endMonthDays; //完整年月日整合
        }
        return moment(endDays); // 计算结果
        // return endDays
    }
}
