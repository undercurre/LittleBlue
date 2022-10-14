// 生成一条蓝牙指令数组
export function createOrder() {
	return ['', '', '0xAA']
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
		case 'meige':
			arr[0] = '0xF4';
		case 'gongzuo':
			arr[0] = '0xF5';
	}
}

// 填充值
export function setOrderValue(type: string, value: number | boolean, arr: string[]) {
	// 开关 boolean
	if (type === 'kaiguan') {
		arr[1] = value ? '0x01' : '0x00'
	}
	// 可以切换香薰123
	if (type === 'qiehuan') {
		let temp = 514 + (value as number)
		arr[1] = temp.toString(16)
	}
	// 等离子 boolean
	if (type === 'denglizi') {
		arr[1] = value ? '0x01' : '0x00'
	}
	// 每隔 1-60
	if (type === 'denglizi') {
		let temp = value as number
		arr[1] = temp.toString(16)
	}
	// 工作 1-60
	if (type === 'denglizi') {
		let temp = value as number
		arr[1] = temp.toString(16)
	}
}

// 获取一条十六进制字符串指令
export function getHexOrder(type: string, value: number | boolean) {
	const orderArr = createOrder();
	setOrderType(type, orderArr);
	setOrderValue(type, value, orderArr);
	return orderArr.join('');
}
