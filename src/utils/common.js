/*
 * @Description: 方法
 * @Author: jinxiaoshan
 * @Date: 2022-06-10 15:58:48
 */
// 日期计算
export function DateAdd(interval, number, date) {
    // 时间格式化
    if (typeof date == "string" || typeof date == "number") {
        date = new Date(date);
    }
    switch (interval) {
        case "y": {
            date.setFullYear(date.getFullYear() + number);
            return date;
        }
        case "q": {
            date.setMonth(date.getMonth() + number * 3);
            return date;
        }
        case "M": {
            date.setMonth(date.getMonth() + number);
            return date;
        }
        case "w": {
            date.setDate(date.getDate() + number * 7);
            return date;
        }
        case "d": {
            date.setDate(date.getDate() + number);
            return date;
        }
        case "H": {
            date.setHours(date.getHours() + number);
            return date;
        }
        case "m": {
            date.setMinutes(date.getMinutes() + number);
            return date;
        }
        case "s": {
            date.setSeconds(date.getSeconds() + number);
            return date;
        }
        default: {
            date.setDate(d.getDate() + number);
            return date;
        }
    }
}

// 获取几天后的日期
export function getDateStr(AddDayCount) {
    var now = new Date();
    now.setDate(now.getDate() + AddDayCount); //获取AddDayCount天后的日期
    var year = now.getFullYear(); //得到年份
    var month = now.getMonth(); //得到月份
    var date = now.getDate(); //得到日期
    var day = now.getDay(); //得到周几
    var hour = now.getHours(); //得到小时
    var minu = now.getMinutes(); //得到分钟
    var sec = now.getSeconds(); //得到秒
    month = month + 1;
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    if (hour < 10) hour = "0" + hour;
    if (minu < 10) minu = "0" + minu;
    if (sec < 10) sec = "0" + sec;

    var time = "";
    return (time = year + "-" + month + "-" + date + " " + " " + hour + ":" + minu + ":" + sec);
}
/* 计算相差几分钟 */
export function dateDifference(sDate1, sDate2) {
    sDate1 = Date.parse(sDate1);
    sDate2 = Date.parse(sDate2);
    let dateSpan = Math.abs(sDate2 - sDate1);
    let iDays = Math.floor(dateSpan / (60 * 1000));
    return iDays + 1;
}

// 颜色转换，rgba转16进制
export function hexify(color) {
    var values = color
        .replace(/rgba?\(/, "")
        .replace(/\)/, "")
        .replace(/[\s+]/g, "")
        .split(",");
    var a = parseFloat(values[3] || 1),
        r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
        g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
        b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);
    return "#" + ("0" + r.toString(16)).slice(-2) + ("0" + g.toString(16)).slice(-2) + ("0" + b.toString(16)).slice(-2);
}
// 颜色转换，16进制转rgba
export function hexToRgba(hex, opacity) {
    return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")";
}

/* 动态获取动画方向 */
export function getFadeClass(type, direction) {
    let str = "";
    if (direction === "left") {
        if (type == "in") {
            str = " fadeInLeft";
        } else {
            str = " fadeOutLeft";
        }
    } else if (direction === "right") {
        if (type == "in") {
            str = " fadeInRight";
        } else {
            str = " fadeOutRight";
        }
    } else {
        if (type == "in") {
            str = " fadeIn";
        } else {
            str = " fadeOut";
        }
    }
    return str;
}
