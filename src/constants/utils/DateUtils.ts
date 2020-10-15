import moment from "moment-timezone"
import { DEFAULT_TIME_ZONE, HYPHEN_UYYYY_UMM_UDD, HYPHEN_UYYYY_UMM_UDD_UHH_MM_SS, SLASH_UMM_UDD_UYYYY } from "../DateFormatConst"


/*
    * export const getNowString() -> "2019-02-21 04:39:07"
    * export const getNowString("DD//MM/YYYY") -> "21/02/2019"
   */
export const getNowString = function (format?: string) {
    let formatDate = !!format ? format : HYPHEN_UYYYY_UMM_UDD_UHH_MM_SS
    return moment.tz(DEFAULT_TIME_ZONE).format(formatDate)
}
/*
 * export const getYMDString() -> "2019-02-21 04:39:07"
 * export const getYMDString("DD//MM/YYYY") -> "21/02/2019"
*/
export const getYMDString = function (format?: string) {
    let formatDate = !!format ? format : HYPHEN_UYYYY_UMM_UDD
    return getNowString(formatDate)
}
/*
 * export const getNow() -> Thu Feb 21 2019 05:07:21
*/
export const getNow = function () {
    return getMoment(getNowString()).toDate()
}
/*
 * export const getYearGTMMinus4() -> 2019
*/
// export const getYear = function () {
//     return parseInt(getNowString("YYYY", DEFAULT_TIME_ZONE))
// }
/*
 * export const getDateTimeTypeLong() -> 1550701244000
*/
export const getDateTimeTypeLong = function () {
    return getMoment(getNow()).tz(DEFAULT_TIME_ZONE).valueOf()
}
/*
 * export const getYMDTomorrow() -> "2019-02-22"
 * export const getYMDTomorrow(DD-MM-YYYY HH:mm:ss) -> "22-02-2019 05:22:30"
*/
export const getYMDTomorrow = function (format: string) {
    let formatDate = !!format ? format : HYPHEN_UYYYY_UMM_UDD_UHH_MM_SS
    return moment().tz(DEFAULT_TIME_ZONE).add(1, 'days').format(formatDate)
}
/*
 * export const getYMDYesterday() -> "2019-02-20"
 * export const getYMDYesterday("DD-MM-YYYY HH:mm:ss") -> "20-02-2019 05:22:30"
*/
export const getYMDYesterday = function (format: string) {
    let formatDate = !!format ? format : HYPHEN_UYYYY_UMM_UDD
    return moment().tz(DEFAULT_TIME_ZONE).subtract(1, 'days').format(formatDate)
}
/*
 * export const getYMDOfLastMonth() -> "2019-01-21"
 * export const getYMDOfLastMonth("DD-MM-YYYY HH:mm:ss") ->  "20-01-2019 05:22:30"
*/
export const getYMDOfLastMonth = function (format: string) {
    let formatDate = !!format ? format : HYPHEN_UYYYY_UMM_UDD
    return moment().tz(DEFAULT_TIME_ZONE).subtract(1, 'month').format(formatDate)
}

export const getLastWeek = function () {
    return moment().tz(DEFAULT_TIME_ZONE).subtract(1, 'week')
}

/*
 * export const getYMDOfLastWeek() -> "2019-02-14"
 * export const getYMDOfLastWeek("DD-MM-YYYY HH:mm:ss") -> "14-02-2019 04:39:07"
*/
export const getYMDOfLastWeek = function (format: string) {
    let formatDate = !!format ? format : HYPHEN_UYYYY_UMM_UDD
    return getLastWeek().format(formatDate)
}
/*
 * export const getYMDOfNextMonth() -> "2019-03-21"
 * export const getYMDOfNextMonth("DD-MM-YYYY HH:mm:ss") -> "21-03-2019 04:39:07"
*/
export const getYMDOfNextMonth = function (format: string) {
    let formatDate = !!format ? format : HYPHEN_UYYYY_UMM_UDD
    return moment().tz(DEFAULT_TIME_ZONE).add(1, 'month').format(formatDate)
}
/*
 * export const getYMDOfNextWeek() -> "2019-02-28"
 * export const getYMDOfNextWeek("DD-MM-YYYY HH:mm:ss") -> "28-02-2019 04:39:07"
*/
export const getYMDOfNextWeek = function (format: string) {
    let formatDate = !!format ? format : HYPHEN_UYYYY_UMM_UDD
    return moment().tz(DEFAULT_TIME_ZONE).add(1, 'week').format(formatDate)
}
/*
 * export const getYMDOfNextYear() -> "2020-02-28"
 * export const getYMDOfNextYear("DD-MM-YYYY HH:mm:ss") -> "28-02-2020 04:39:07"
*/
export const getYMDOfNextYear = function (format: string) {
    let formatDate = !!format ? format : HYPHEN_UYYYY_UMM_UDD
    return moment().tz(DEFAULT_TIME_ZONE).add(1, 'year').format(formatDate)
}
/*
 * export const getYMDOfLastYear() -> "2018-02-28"
 * export const getYMDOfLastYear("DD-MM-YYYY HH:mm:ss") -> "28-02-2018 04:39:07"
*/
export const getYMDOfLastYear = function (format: string) {
    let formatDate = !!format ? format : HYPHEN_UYYYY_UMM_UDD
    return moment().tz(DEFAULT_TIME_ZONE).subtract(1, 'year').format(formatDate)
}
/*
 * export const stringToDate() -> Thu Feb 21 2019 05:07:21
 * export const stringToDate("2019-02-21 04:30:00") -> Thu Feb 21 2019 04:30:00
*/
export const stringToDate = function (date: any) {
    return !!date ? getMoment(date).toDate() : getMoment(getNowString()).toDate()
}
/*
 * let newDate = value type datetime or date from component
 * newexport const customFormatYMD() -> "2019-02-21"
 * newexport const customFormatYMD("DD/MM/YYYY HH:mm:ss") -> "21-02-2019 05:07:21"
*/
// export const prototype.customFormatYMD = function (format: string) {
//     let formatDate = !!format ? format : UYYYY_H_UMM_H_UDD
//     return getMoment(this).format(formatDate)
// }
/*
 * Note need first parameter is datetime or date or null with format mm-dd-yyyy or yyyy-mm-dd
 * export const customFormatYMD() -> "2019-02-21"
 * export const customFormatYMD("DD/MM/YYYY HH:mm:ss") -> "Invalid date"
 * export const customFormatYMD("2018-02-22") -> "2018-02-22"
 * export const customFormatYMD("02-22-2018","YYYY-DD-MM") -> "2018-22-02"
*/
export const customFormatYMD = function (date: any, format?: string) {
    let formatDate = !!format ? format : HYPHEN_UYYYY_UMM_UDD
    return !!date ? getMoment(date).format(formatDate) : moment().format(formatDate)
}
export const customFormatTzYMD = function (date: any, format?: string, tz?: string) {
    let formatDate = !!format ? format : HYPHEN_UYYYY_UMM_UDD
    let timeZone = !!tz ? tz : DEFAULT_TIME_ZONE
    return !!date ? getMoment(date).tz(timeZone).format(formatDate) : moment().format(formatDate)
}
/*
 * Note need first parameter is datetime or date or null with format mm-dd-yyyy or yyyy-mm-dd
 * export const getDateOfPreviousMonth() -> "2019-07-16"
 * export const getDateOfPreviousMonth("DD/MM/YYYY HH:mm:ss") -> "Invalid date"
 * export const getDateOfPreviousMonth("2018-02-22") -> "2018-02-22"
 * export const getDateOfPreviousMonth(1,"YYYY-DD-MM") -> "2019-06-16" (Now = "2019-07-16")
*/
export const getDateOfPreviousMonth = function (date: any, format: string) {
    let formatDate = !!format ? format : HYPHEN_UYYYY_UMM_UDD
    let iDate = parseInt(date) ? date : 0
    return moment().tz(DEFAULT_TIME_ZONE).subtract(iDate, 'month').format(formatDate)
}
/*
 * Note this function use to check string is invalid date format type MM/DD/YYYY
 * "2019/01/13".isDateTime() -> false
 * "2019/13/11".isDateTime() -> false
 * "13/12/2019".isDateTime() -> false
 * "02/28/2019".isDateTime() -> true
 * "02/29/2019".isDateTime() -> false
*/
// String.prototype.isDateTime = function () {
//     return /^(((((0?[13578]\/|1[02]\/)(0?[1-9]|[12]\d|3[01])|(0?[13456789]\/|1[012]\/)(0?[1-9]|[12]\d|30)|0?2\/(0?[1-9]|[1-9]|1\d|2[0-8])))|((([02468][048]|[13579][26])00|\d{2}([13579][26]|0[48]|[2468][048])))\/0?2\/29)\/\d{4})$/.test(this)
// }
/*
 * Note this function use to get date with time zone
*/
export const getMoment = function (date: any) {
    return !!date ? moment(date) : moment()
}
/*
 * Note this function use to get true value of fromDate
 * export const validationFromDate("") -> false
 * export const validationFromDate("2018-02-22") -> false
 * export const validationFromDate("2018-02-22") -> true
 * export const validationFromDate("2018-02-22") -> false
*/
export const validationFromDate = function (fromDate: any, toDate: any) {
    return stringToDate(fromDate) <= stringToDate(toDate) ?
        customFormatYMD(fromDate, SLASH_UMM_UDD_UYYYY) : customFormatYMD(toDate, SLASH_UMM_UDD_UYYYY)
}
/*
 * Note this function use to get true value of toDate
 * export const validationToDate("07/15/2019","07/14/2019") => "07/15/2019" (NOW = "07/16/2019")
 * export const validationToDate("","07/19/2019") -> "07/16/2019" (NOW = "07/16/2019")
 * export const validationToDate("07/14/2019","07/15/2019") -> "07/15/2019" (NOW = "07/16/2019")
*/
// export const validationToDate = function (fromDate: any, toDate: any) {
//     let nowDateString = getNowString(formatMDY)
//     let valueToDate = stringToDate(toDate)
//     return fromexport const isDateTime() && valueToDate <= stringToDate(fromDate) ?
//         customFormatYMD(fromDate, formatMDY)
//         : valueToDate >= getNow() ?
//             nowDateString : customFormatYMD(toDate, formatMDY)
//
// }
export const getMinDate = function (dateOne: any, dateTwo: any) {
    return stringToDate(dateOne) <= stringToDate(dateTwo) ?
        customFormatYMD(dateOne, SLASH_UMM_UDD_UYYYY) : customFormatYMD(dateTwo, SLASH_UMM_UDD_UYYYY)

}
export const getMaxDate = function (dateOne: any, dateTwo: any) {
    return stringToDate(dateOne) >= stringToDate(dateTwo) ?
        customFormatYMD(dateOne, SLASH_UMM_UDD_UYYYY) : customFormatYMD(dateTwo, SLASH_UMM_UDD_UYYYY)
}
