/**
 * 工具库
 * 
 * @author JiM_Hao
 * 
 * 项目通用的方法都在这里，不够的话自己加吧
 */

const utils = {
  /**
   * 获取[min, max]区间内任意整数
   * @param  {Number} min 最小值
   * @param  {Number} max 最大值
   * @return {Number}
   */
  rand: function (min, max) {
    return Math.floor(min + Math.random() * (max - min + 1))
  },
  /**
   * [isArray description]
   * @param  {[type]}  source [description]
   * @return {Boolean}        [description]
   */
  isArray(source) {
    return Object.prototype.toString.call(source) === '[object Array]'
  },
  /**
   * 对一个object进行深度拷贝
   *
   * @author berg
   * @param {Object} source 需要进行拷贝的对象
   * 对于Object来说，只拷贝自身成员，不拷贝prototype成员
   *
   * @returns {Object} 拷贝后的新对象
   */
  clone(source) {
    var result = source
    let i
    let len
    if (!source || source instanceof Number || source instanceof String || source instanceof Boolean) {
      return result
    } else if (this.isArray(source)) {
      result = []
      var resultLen = 0
      for (i = 0, len = source.length; i < len; i++) {
        result[resultLen++] = this.clone(source[i])
      }
    } else if (this.isPlain(source)) {
      result = {}
      for (i in source) {
        if (source.hasOwnProperty(i)) {
          result[i] = this.clone(source[i])
        }
      }
    }
    return result
  },
  /**
   * 判断一个对象是不是字面量对象，即判断这个对象是不是由{}或者new Object类似方式创建
   *
   * @name baidu.object.isPlain
   * @param {Object} source 需要检查的对象
   * 事实上来说，在Javascript语言中，任何判断都一定会有漏洞，因此本方法只针对一些最常用的情况进行了判断
   * @returns {Boolean} 检查结果
   */
  isPlain(obj) {
    let hasOwnProperty = Object.prototype.hasOwnProperty
    let key
    if (!obj ||
      // 一般的情况，直接用toString判断
      Object.prototype.toString.call(obj) !== '[object Object]' ||
      // IE下，window/document/document.body/HTMLElement/HTMLCollection/NodeList等DOM对象上一个语句为true
      // isPrototypeOf挂在Object.prototype上的，因此所有的字面量都应该会有这个属性
      // 对于在window上挂了isPrototypeOf属性的情况，直接忽略不考虑
      !('isPrototypeOf' in obj)
    ) {
      return false
    }

    // 判断new fun()自定义对象的情况
    // constructor不是继承自原型链的
    // 并且原型中有isPrototypeOf方法才是Object
    if (obj.constructor &&
      !hasOwnProperty.call(obj, 'constructor') &&
      !hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')) {
      return false
    }
    // 判断有继承的情况
    // 如果有一项是继承过来的，那么一定不是字面量Object
    // OwnProperty会首先被遍历，为了加速遍历过程，直接看最后一项
    for (key in obj) { }
    return key === undefined || hasOwnProperty.call(obj, key)
  },
  /**
   * 创建flash对象的html字符串
   * @param {Object}  options           创建flash的选项参数
   * @param {string}  options.id          要创建的flash的标识
   * @param {string}  options.url         flash文件的url
   * @param {String}  options.errorMessage    未安装flash player或flash player版本号过低时的提示
   * @param {string}  options.ver         最低需要的flash player版本号
   * @param {string}  options.width         flash的宽度
   * @param {string}  options.height        flash的高度
   * @param {string}  options.align         flash的对齐方式，允许值：middle/left/right/top/bottom
   * @param {string}  options.base        设置用于解析swf文件中的所有相对路径语句的基本目录或URL
   * @param {string}  options.bgcolor       swf文件的背景色
   * @param {string}  options.salign        设置缩放的swf文件在由width和height设置定义的区域内的位置。允许值：l/r/t/b/tl/tr/bl/br
   * @param {boolean} options.menu        是否显示右键菜单，允许值：true/false
   * @param {boolean} options.loop        播放到最后一帧时是否重新播放，允许值： true/false
   * @param {boolean} options.play        flash是否在浏览器加载时就开始播放。允许值：true/false
   * @param {string}  options.quality       设置flash播放的画质，允许值：low/medium/high/autolow/autohigh/best
   * @param {string}  options.scale         设置flash内容如何缩放来适应设置的宽高。允许值：showall/noborder/exactfit
   * @param {string}  options.wmode         设置flash的显示模式。允许值：window/opaque/transparent
   * @param {string}  options.allowscriptaccess   设置flash与页面的通信权限。允许值：always/never/sameDomain
   * @param {string}  options.allownetworking   设置swf文件中允许使用的网络API。允许值：all/internal/none
   * @param {boolean} options.allowfullscreen   是否允许flash全屏。允许值：true/false
   * @param {boolean} options.seamlesstabbing   允许设置执行无缝跳格，从而使用户能跳出flash应用程序。该参数只能在安装Flash7及更高版本的Windows中使用。允许值：true/false
   * @param {boolean} options.devicefont      设置静态文本对象是否以设备字体呈现。允许值：true/false
   * @param {boolean} options.swliveconnect     第一次加载flash时浏览器是否应启动Java。允许值：true/false
   * @param {Object}  options.vars        要传递给flash的参数，支持JSON或string类型。
   * @returns {string} flash对象的html字符串
   */
  createHTML(options) {
    options = options || {}
    let version = this.version()
    let needVersion = options['ver'] || '6.0.0'
    let vUnit1 = {}
    let vUnit2 = {}
    let i = {}
    let k = {}
    let len = {}
    let item = {}
    let tmpOpt = {}
    let encodeHTML = this.encodeHTML

    // 复制options，避免修改原对象
    for (k in options) {
      tmpOpt[k] = options[k]
    }
    options = tmpOpt

    // 浏览器支持的flash插件版本判断
    if (version) {
      version = version.split('.')
      needVersion = needVersion.split('.')
      for (i = 0; i < 3; i++) {
        vUnit1 = parseInt(version[i], 10)
        vUnit2 = parseInt(needVersion[i], 10)
        if (vUnit2 < vUnit1) {
          break
        } else if (vUnit2 > vUnit1) {
          return '' // 需要更高的版本号
        }
      }
    } else {
      return '' // 未安装flash插件
    }

    let vars = options['vars']
    let objProperties = ['classid', 'codebase', 'id', 'width', 'height', 'align']

    // 初始化object标签需要的classid、codebase属性值
    options['align'] = options['align'] || 'middle'
    options['classid'] = 'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000'
    options['codebase'] = 'http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0'
    options['movie'] = options['url'] || ''
    delete options['vars']
    delete options['url']

    // 初始化flashvars参数的值
    if (typeof vars === 'string') {
      options['flashvars'] = vars
    } else {
      var fvars = []
      for (k in vars) {
        item = vars[k]
        fvars.push(k + '=' + encodeURIComponent(item))
      }
      options['flashvars'] = fvars.join('&')
    }
    // 构建IE下支持的object字符串，包括属性和参数列表
    var str = ['<object ']
    for (i = 0, len = objProperties.length; i < len; i++) {
      item = objProperties[i]
      str.push(' ', item, '="', encodeHTML(options[item]), '"')
    }
    str.push('>')
    var params = {
      'wmode': 1,
      'scale': 1,
      'quality': 1,
      'play': 1,
      'loop': 1,
      'menu': 1,
      'salign': 1,
      'bgcolor': 1,
      'base': 1,
      'allowscriptaccess': 1,
      'allownetworking': 1,
      'allowfullscreen': 1,
      'seamlesstabbing': 1,
      'devicefont': 1,
      'swliveconnect': 1,
      'flashvars': 1,
      'movie': 1
    }
    for (k in options) {
      item = options[k]
      k = k.toLowerCase()
      if (params[k] && (item || item === false || item === 0)) {
        str.push('<param name="' + k + '" value="' + encodeHTML(item) + '" />')
      }
    }

    // 使用embed时，flash地址的属性名是src，并且要指定embed的type和pluginspage属性
    options['src'] = options['movie']
    options['name'] = options['id']
    delete options['id']
    delete options['movie']
    delete options['classid']
    delete options['codebase']
    options['type'] = 'application/x-shockwave-flash'
    options['pluginspage'] = 'http://www.macromedia.com/go/getflashplayer'
    // 构建embed标签的字符串
    str.push('<embed')
    // 在firefox、opera、safari下，salign属性必须在scale属性之后，否则会失效
    // 经过讨论，决定采用BT方法，把scale属性的值先保存下来，最后输出
    let salign
    for (k in options) {
      item = options[k]
      if (item || item === false || item === 0) {
        if ((new RegExp('^salign\x24', 'i')).test(k)) {
          salign = item
          continue
        }
        str.push(' ', k, '="', encodeHTML(item), '"')
      }
    }
    if (salign) {
      str.push(' salign="', encodeHTML(salign), '"')
    }
    str.push('></embed></object>')
    return str.join('')
  },
  /**
   * 浏览器支持的flash插件版本
   * 
   * @property version 浏览器支持的flash插件版本
   * @return {String} 版本号
   */
  version() {
    var n = navigator
    if (n.plugins && n.mimeTypes.length) {
      var plugin = n.plugins['Shockwave Flash']
      if (plugin && plugin.description) {
        return plugin.description.replace(/([a-zA-Z]|\s)+/, '').replace(/(\s)+r/, '.') + '.0'
      }
    } else if (window.ActiveXObject && !window.opera) {
      for (var i = 12; i >= 2; i--) {
        try {
          var c = new window.ActiveXObject('ShockwaveFlash.ShockwaveFlash.' + i)
          if (c) {
            var version = c.GetVariable('$version')
            return version.replace(/WIN/g, '').replace(/,/g, '.')
          }
        } catch (e) { }
      }
    }
  },
  /**
   * 对目标字符串进行html编码
   * 
   * @param {string} source 目标字符串
   * 编码字符有5个：&<>"'
   * @returns {string} html编码后的字符串
   */
  encodeHTML: function (source) {
    return String(source).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
  },
  /**
   * 判断一个对象转化成URL query
   *
   * @name jianmin3
   * @param {Object} json 被转换的json对象
   * @returns {string} url query
   */
  jsonToQueryString(json) {
    return Object.keys(json).map(key => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    }).join('&')
  }
}

export default utils