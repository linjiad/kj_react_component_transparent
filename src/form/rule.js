class ValidateRules {
    // 循环校验全部的规则
    validate(rules, value) {
        const self = this;
        // 定义返回的信息是“”
        let message = "";
        for (const rule of rules) {
            // 判断规则是否为必填
            if (rule.must) {
                message = self.validateMust(rule, value);
                // 如果返回的message不为空，即验证没通过，这直接返回信息，如果验证通过进行下一步
                if (!(!message || message === "")) {
                    break;
                }
            }
            // 如果包含max最大字符串限制
            if (rule.max) {
                message = self.validateMax(rule, value);
                // 如果返回的message不为空，即验证没通过，这直接返回信息，如果验证通过进行下一步
                if (!(!message || message === "")) {
                    break;
                }
            }
            // 如果包含min最小字符串限制
            if (rule.max) {
                message = self.validateMin(rule, value);
                // 如果返回的message不为空，即验证没通过，这直接返回信息，如果验证通过进行下一步
                if (!(!message || message === "")) {
                    break;
                }
            }
            // 如果是端口号
            if (rule.port) {
                message = self.validatePort(rule, value);
                // 如果返回的message不为空，即验证没通过，这直接返回信息，如果验证通过进行下一步
                if (!(!message || message === "")) {
                    break;
                }
            }
            // 如果是html
            if (rule.http) {
                message = self.validateHttp(rule, value);
                // 如果返回的message不为空，即验证没通过，这直接返回信息，如果验证通过进行下一步
                if (!(!message || message === "")) {
                    break;
                }
            }
            // 匹配全英文
            if (rule.en) {
                message = self.validateEn(rule, value);
                // 如果返回的message不为空，即验证没通过，这直接返回信息，如果验证通过进行下一步
                if (!(!message || message === "")) {
                    break;
                }
            }
            // 匹配电话号码
            if (rule.phone) {
                message = self.validatePhone(rule, value);
                // 如果返回的message不为空，即验证没通过，这直接返回信息，如果验证通过进行下一步
                if (!(!message || message === "")) {
                    break;
                }
            }
            // 匹配电话号码
            if (rule.email) {
                message = self.validateEmail(rule, value);
                // 如果返回的message不为空，即验证没通过，这直接返回信息，如果验证通过进行下一步
                if (!(!message || message === "")) {
                    break;
                }
            }
            // 以某字符串开头
            if (rule.begin) {
                message = self.validateBegin(rule, value);
                // 如果返回的message不为空，即验证没通过，这直接返回信息，如果验证通过进行下一步
                if (!(!message || message === "")) {
                    break;
                }
            }
            // 只能输入数字
            if (rule.num) {
                message = self.validateNum(rule, value);
                // 如果返回的message不为空，即验证没通过，这直接返回信息，如果验证通过进行下一步
                if (!(!message || message === "")) {
                    break;
                }
            }
        }
        // 如果通过了所有认证
        return message;
    }
    // 校验必须(规则，值)
    validateMust(rule, value) {
        if (!value || value === "") {
            return rule.message;
        }
        return "";
    }
    // 校验最大长度()
    validateMax(rule, value) {
        if (value.length > rule.max) {
            return rule.message;
        }
        return "";
    }
    // 校验最小长度()
    validateMin(rule, value) {
        if (value.length < rule.min) {
            return rule.message;
        }
        return "";
    }
    // 校验端口号
    validatePort(rule, value) {
        const zhengze = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{4}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
        if (!zhengze.test(value) && value !== "") {
            return rule.message;
        }
        return "";
    }
    // 校验html
    validateHttp(rule, value) {
        const zhengze = /^http[s]?:\/\/.*/;
        if (!zhengze.test(value) && value !== "") {
            return rule.message;
        }
        return "";
    }
    // 校验html
    validateEn(rule, value) {
        const zhengze = /[\u4e00-\u9fa5]/;
        if (zhengze.test(value) && value !== "") {
            return rule.message;
        }
        return "";
    }
    // 校验电话
    validatePhone(rule, value) {
        const zhengze = /^1[0-9]{10}$/;
        if (!zhengze.test(value) && value !== "") {
            return rule.message;
        }
        return "";
    }
    // 校验电话
    validateEmail(rule, value) {
        const zhengze = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (!zhengze.test(value) && value !== "") {
            return rule.message;
        }
        return "";
    }
    // 校验以某字符开头
    validateBegin(rule, value) {
        const zhengze = new RegExp(`^${rule.begin}.*`);
        if (!zhengze.test(value) && value !== "") {
            return rule.message;
        }
        return "";
    }
    validateNum(rule, value) {
        const zhengze = /^[0-9]*$/;
        if (!zhengze.test(value) && value !== "") {
            return rule.message;
        }
        return "";
    }
}

export default { ValidateRules };
