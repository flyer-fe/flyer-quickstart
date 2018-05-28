/**
 * 数字处理工具库
 * 
 * @author JiM_Hao
 * 
 */

export function change(source, times, fix) {
  if (!source) {
    return 0
  }
  source = +source
  return Number((source * times).toFixed(fix))
}
export function comma(source, length) {
  if (!source) {
    return 0
  }
  source = +source
  if (!length || length < 1) {
    length = 3
  }

  source = String(source).split('.')
  source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{' + length + '})+$)', 'ig'), '$1,')
  return source.join('.')
}

export function decimal(source, length) {
  // 0.123456 => 123.456 => 123.46‰
  if (!source) {
    return 0
  }
  source = +source
  source = Number((source * 1000).toFixed(2))
  return source + '‰'
}

export function percent(source, length) {
  // 0.123456 => 12.3456 => 12.3%
  if (!source) {
    return 0
  }
  source = +source
  source = Number((source * 100).toFixed(1))
  return source + '%'
}

export function decimalPercent(source, length) {
  // 0.123456 => 12.3456 => 12.35%
  if (!source) {
    return 0
  }
  source = +source
  source = (source).toFixed(2)
  return source
}

export function decimalThousand(source, length) {
  // 1.23456 => 1.23‰
  if (!source) {
    return 0
  }
  source = +source
  source = Number(source.toFixed(2))
  return source + '‰'
}

export function decimalTwo(source, length) {
  // 1.23456 => 1.23
  if (!source) {
    return 0
  }
  source = +source
  source = Number(source.toFixed(2))
  return source
}

export function int(source) {
  if (!source) {
    return 0
  }
  source = +source
  source = Number(source.toFixed(0))
  return source
}
