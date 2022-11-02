// 16进制字符串转数组
export function binStr2Array(str: string) {
  const byteArray = [] as number[];
  if (str === undefined) return byteArray;
  for (let i = 0; i < str.length; i += 1) {
    if (i % 2 === 0) {
      byteArray[i / 2] = parseInt(str.substring(i, i + 2), 16);
    }
  }
  return byteArray;
}

// 数组转16进制字符串
export function convertTo16Str(buffer: ArrayBuffer) {
  return Array.prototype.map.call(new Uint8Array(buffer), x => `00${x.toString(16)}`.slice(-2)).join('');
}
