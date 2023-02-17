import rulesConfig from "@/utils/rules/rulesConfig"; // 导入接口域名列表

// >0整数
export function nonzeroPass(rule, value, callback) {
    if (value != "" && value != null) {
        if (!rulesConfig.nonzero.reg.test(value)) {
            callback(new Error(rulesConfig.nonzero.msg));
        } else {
            callback();
        }
    } else {
        callback();
    }
}
// >=12整数
export function min12Pass(rule, value, callback) {
    if (value != "" && value != null) {
        if (parseInt(value) < 12) {
            callback(new Error("最小字号12"));
        } else {
            callback();
        }
    } else {
        callback();
    }
}
// >0 <5000整数
export function nonzeroPass2(rule, value, callback) {
    if (value != "" && value != null) {
        if (!rulesConfig.nonzero.reg.test(value)) {
            callback(new Error(rulesConfig.nonzero.msg));
        } else if (Number(value) > 5000) {
            callback(new Error("输入范围1-5000"));
        } else {
            callback();
        }
    } else {
        callback();
    }
}
// 正负整数
export function integerPass(rule, value, callback) {
    if (value != "" && value != null) {
        if (!rulesConfig.integer.reg.test(value)) {
            callback(new Error(rulesConfig.integer.msg));
        } else {
            callback();
        }
    } else {
        callback();
    }
}
// >=0整数
export function numberPass(rule, value, callback) {
    if (value != "" && value != null) {
        if (!rulesConfig.number.reg.test(value)) {
            callback(new Error(rulesConfig.number.msg));
        } else {
            callback();
        }
    } else {
        callback();
    }
}
// 正负无限制小数
export function floatPass(rule, value, callback) {
    if (value != "" && value != null) {
        if (!rulesConfig.float.reg.test(value)) {
            callback(new Error(rulesConfig.float.msg));
        } else {
            callback();
        }
    } else {
        callback();
    }
}
// 正无限制小数
export function justfloatPass(rule, value, callback) {
    if (value != "" && value != null) {
        if (!rulesConfig.justfloat.reg.test(value)) {
            callback(new Error(rulesConfig.justfloat.msg));
        } else {
            callback();
        }
    } else {
        callback();
    }
}
// 2位小数
export function float2Pass(rule, value, callback) {
    if (value != "" && value != null) {
        if (!rulesConfig.float.reg.test(value)) {
            callback(new Error(rulesConfig.float.msg));
        } else if (!rulesConfig.float2.reg.test(value)) {
            callback(new Error(rulesConfig.float2.msg));
        } else {
            callback();
        }
    } else {
        callback();
    }
}
// 月份
export function monthPass(rule, value, callback) {
    if (value != "" && value != null) {
        if (!rulesConfig.number.reg.test(value)) {
            callback(new Error(rulesConfig.number.msg));
        } else {
            if (value > 12) {
                callback(new Error("请输入月份"));
            } else {
                callback();
            }
        }
    } else {
        callback();
    }
}

// 用户名
export function usernamePass(rule, value, callback) {
    if (value != "" && value != null) {
        if (!rulesConfig.userStart.reg.test(value)) {
            callback(new Error(rulesConfig.userStart.msg));
        } else if (!rulesConfig.userText.reg.test(value)) {
            callback(new Error(rulesConfig.userText.msg));
        } else if (!rulesConfig.userLen.reg.test(value)) {
            callback(new Error(rulesConfig.userLen.msg));
        } else {
            callback();
        }
    } else {
        callback();
    }
}

// 密码
export function passwordPass(rule, value, callback) {
    if (value != "" && value != null) {
        if (!rulesConfig.userText.reg.test(value)) {
            callback(new Error(rulesConfig.userText.msg));
        } else if (!rulesConfig.userStart.reg.test(value)) {
            callback(new Error(rulesConfig.userStart.msg));
        } else if (!rulesConfig.pwdLen.reg.test(value)) {
            callback(new Error(rulesConfig.pwdLen.msg));
        } else {
            callback();
        }
    } else {
        callback();
    }
}
/* 确认密码 */
/* 
var checkPass = (rule, value, callback) => {
    if (value === "") {
        callback(new Error("请再次输入密码"));
    } else if (value !== this.winForm.password) {
        callback(new Error("两次输入密码不一致!"));
    } else {
        callback();
    }
};
*/

// 电话
export function phonePass(rule, value, callback) {
    if (value != "" && value != null) {
        if (!rulesConfig.phone.reg.test(value)) {
            callback(new Error(rulesConfig.phone.msg));
        } else {
            callback();
        }
    } else {
        callback();
    }
}

// 手机号
export function telPass(rule, value, callback) {
    if (value != "" && value != null) {
        if (!rulesConfig.tel.reg.test(value)) {
            callback(new Error(rulesConfig.tel.msg));
        } else {
            callback();
        }
    } else {
        callback();
    }
}

// 邮箱
export function emailPass(rule, value, callback) {
    if (value != "" && value != null) {
        if (!rulesConfig.email.reg.test(value)) {
            callback(new Error(rulesConfig.email.msg));
        } else {
            callback();
        }
    } else {
        callback();
    }
}

// 链接地址
export function httpPass(rule, value, callback) {
    if (value != "" && value != null) {
        if (!rulesConfig.http.reg.test(value)) {
            callback(new Error(rulesConfig.http.msg));
        } else {
            callback();
        }
    } else {
        callback();
    }
}

// 链接地址
export function httpPass2(rule, value, callback) {
    if (value.url == "" || value.url == null) {
        callback(new Error("请输入或上传"));
    }

    if (!rulesConfig.http.reg.test(value.url)) {
        callback(new Error(rulesConfig.http.msg));
    } else {
        callback();
    }
}

// 端口
export function portPass(rule, value, callback) {
    if (value != "" && value != null) {
        if (!rulesConfig.port.reg.test(value)) {
            callback(new Error(rulesConfig.port.msg));
        } else {
            callback();
        }
    } else {
        callback();
    }
}

// 数据表ID验证
export function dbPass(rule, value, callback) {
    if (value != "" && value != null) {
        if (!rulesConfig.dbName.reg.test(value)) {
            callback(new Error(rulesConfig.dbName.msg));
        } else {
            callback();
        }
    } else {
        callback();
    }
}

// 昵称
export function fullNamePass(rule, value, callback) {
    if (value != "" && value != null) {
        if (!rulesConfig.fullName.reg.test(value)) {
            callback(new Error(rulesConfig.fullName.msg));
        } else {
            callback();
        }
    } else {
        callback();
    }
}

// 角色名
export function rolePass(rule, value, callback) {
    if (value != "" && value != null) {
        if (!rulesConfig.letterText.reg.test(value)) {
            callback(new Error(rulesConfig.letterText.msg));
        } else {
            callback();
        }
    } else {
        callback();
    }
}
