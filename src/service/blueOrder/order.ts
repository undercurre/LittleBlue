// 生成一条蓝牙指令数组
export function createOrder() {
  return ['', '', '0xAA'];
}

// 填充指令类型
export function setOrderType(type: string, arr: string[]) {
  switch (type) {
    case 'kaiguan':
      arr[0] = '0xF1';
      break;
    case 'qiehuan':
      arr[0] = '0xF2';
      break;
    case 'denglizi':
      arr[0] = '0xF3';
      break;
    case 'meige':
      arr[0] = '0xF4';
      break;
    case 'gongzuo':
      arr[0] = '0xF5';
      break;
    case 'nongdu':
      arr[0] = '0xF6';
      break;
    case 'fuwei':
      arr[0] = '0xF9';
      break;
    case 'chaxun':
      arr[0] = '0xFD';
      break;
    default:
      break;
  }
}

// 填充值
export function setOrderValue(type: string, value: number | boolean, arr: string[]) {
  console.log('typeInValue', type);
  // 开关 boolean
  if (type === 'kaiguan') {
    arr[1] = value ? '0x01' : '0x00';
  }
  // 浓度 1 2
  if (type === 'nongdu') {
    arr[1] = value === 1 ? '0x01' : '0x02';
  }
  // 可以切换香薰123
  if (type === 'qiehuan') {
    const temp = 201 + (value as number);
    arr[1] = temp.toString(16);
  }
  // 等离子 boolean
  if (type === 'denglizi') {
    arr[1] = value ? '0x01' : '0x00';
  }
  // 每隔 1-60
  if (type === 'meige') {
    const temp = value as number;
    arr[1] = temp.toString(16);
  }
  // 工作 1-60
  if (type === 'gongzuo') {
    const temp = value as number;
    arr[1] = temp.toString(16);
  }
  // 浓度 1-2
  if (type === 'nongdu') {
    const temp = value as number;
    arr[1] = temp.toString(16);
  }
  // 复位
  if (type === 'fuwei') {
    const temp = 85;
    arr[1] = temp.toString(16);
  }
  // 查询
  if (type === 'chaxun') {
    const temp = 253;
    arr[1] = temp.toString(16);
  }
}

// 获取一条十六进制字符串指令
export function getHexOrder(type: string, value: number | boolean) {
  const orderArr = createOrder();
  console.log('orderArr', orderArr);
  setOrderType(type, orderArr);
  console.log('type', orderArr);
  setOrderValue(type, value, orderArr);
  console.log('value', orderArr);
  const buffer = new ArrayBuffer(3);
  const dataView = new DataView(buffer);
  orderArr.forEach((item, index) => {
    dataView.setUint8(index, parseInt(item, 16));
  });
  return buffer;
}
