(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

      // 需要对value属性重新定义
      if (Array.isArray(value)) ; else {
        this.walk(value);
      }
    }

    _createClass(Observer, [{
      key: "walk",
      value: function walk(data) {
        Object.keys(data).forEach(function (key) {
          defineReactive(data, key, data[key]);
        });
      }
    }]);

    return Observer;
  }();

  function defineReactive(data, key, value) {
    observe(value); // 对结果递归拦截

    Object.defineProperty(data, key, {
      get: function get() {
        return value;
      },
      set: function set(newValue) {
        if (newValue == value) return;
        observe(newValue);
        value = newValue;
      }
    });
  }
  function observe(data) {
    if (_typeof(data) !== 'object' || data == null) {
      return;
    } // 通过类来实现对数据的观测


    return new Observer(data);
  }

  function initState(vm) {
    // 将所有数据定义在vm实例上，数据代理object.defineproperty
    var opts = vm.$options;

    if (opts.data) {
      // 数据的初始化
      initData(vm);
    }
  }

  function proxy(vm, source, key) {
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[source][key];
      },
      set: function set(newValue) {
        vm[source][key] = newValue;
      }
    });
  }

  function initData(vm) {
    // 数据劫持 object.defineproperty
    var data = vm.$options.data;
    data = vm._data = typeof data === 'function' ? data.call(vm) : data;

    for (var key in data) {
      proxy(vm, '_data', key); //vm[_data][key]
    }

    observe(data); // 观测数据
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      vm.$options = options; // 实例上的属性

      initState(vm); // 初始化状态
      // if(vm.$options.el){
      // vm.$mount(vm.options.el);
      // }
    }; // Vue.prototype.$mount = function(el){
    //   el = document.querySelector(el);
    //   const vm = this;
    //   const options = vm.options;
    //   vm.$options.el = el;
    //   if(!options.render){
    //     let template = options.template;
    //     if(!template && el){
    //       template = el.outerHTML;
    //     }
    //     const render = compileToFunctions(template);
    //     options.render = render;
    //   }
    //   mounteComponent(vm, el);
    // }

  }

  // import { renderMixin } from "./render";

  function Vue(options) {
    this._init(options); // 当用户new Vue时 就调用init方法进行vue的初始方法

  } // 可以拆分逻辑到不同的文件中 更利于代码维护 模块化的概念


  initMixin(Vue); // 扩展初始化方法

  return Vue;

})));
//# sourceMappingURL=vue.js.map
