module.exports = {
  env: {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  extends: "eslint:recommended",
  globals: {
    "$": true,
    "process": true,
    "__dirname": true
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: "module",
    ecmaVersion: 7
  },
  plugins: [
    "react"
  ],
  // check if imports actually resolve
  //设置允许的全局变量
  globals:{
    "$": true,
    "layer":true,
    "request":true,
    "url":true,
    "storage":true,
    "tool":true,
  },
  // add your custom rules here
  rules: {
    "class-methods-use-this":'off',//观赏static和this
    "linebreak-style":'off',
    "import/no-dynamic-require": 'off',
    "global-require": "off",
    "guard-for-in": "off",
    // "class-methods-use-this": "off",// static
    "no-eval":0,
    "no-param-reassign": 0,//禁止给参数重新赋值
    "no-console": 0,//禁止使用console
    "indent": [2, 4],//缩进风格空格两格缩进
    "no-constant-condition": 2,//禁止在条件中使用常量表达式 if(true) if(1)
    "no-debugger": 2,//禁止使用debugger
    "no-dupe-args": 2,//函数参数不能重复
    "no-eq-null": 2,//禁止对null使用==或!=运算符
    "no-mixed-spaces-and-tabs": [2, false],//禁止混用tab和空格
    "no-multi-str": 2,//字符串不能用\换行
    "no-new-func": 2,//禁止使用new Function
    "no-new-object": 2,//禁止使用new Object()
    "no-new-require": 2,//禁止使用new require
    "no-new-wrappers": 2,//禁止使用new创建包装实例，new String new Boolean new Number
    "no-obj-calls": 2,//不能调用内置的全局对象，比如Math() JSON()
    "no-path-concat": 2,//node中不能使用__dirname或__filename做路径拼接
    "no-script-url": 2,//禁止使用javascript:void(0)
    "no-self-compare": 2,//不能比较自身
    "no-sparse-arrays": 2,//禁止稀疏数组， [1,,2]
    "no-trailing-spaces": 2,//一行结束后面不要有空格
    "no-undefined": 2,//不能使用undefined
    "no-unused-expressions": 2,//禁止无用的表达式
    "no-unused-vars": [0, {"vars": "all", "args": "after-used"}],//不能有声明后未被使用的变量或参数
    "no-use-before-define": 2,//未定义前不能使用
    "no-void": 2,//禁用void操作符
    "no-var": 2,//禁用var，用let和const代替
    "consistent-this": [2, "self"],//this别名
    "curly": [2, "all"],//必须使用 if(){} 中的{}
    "default-case": 2,//switch语句最后必须有default
    "eqeqeq": 2,//必须使用全等
    "func-names": 0,//函数表达式必须有名字
    "quotes": [2, "double", { "avoidEscape": true, "allowTemplateLiterals": true }],//引号类型 `` "" ''
    "camelcase": 2,//强制驼峰法命名
    "semi": [2, "always"],//语句强制分号结尾
    "no-restricted-syntax": 0,//可以使用for in
  }
}
