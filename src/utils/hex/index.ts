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
export function convertTo16Str(byteArray: number[]) {
  if (!byteArray || !byteArray.length || byteArray.length === 0) return '';
  return byteArray.map(byte => byte.toString(16).toLowerCase().padStart(2, '0')).join('');
}
