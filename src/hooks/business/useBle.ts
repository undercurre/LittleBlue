import { ref } from 'vue';
import Taro from '@tarojs/taro';

function inArray(arr: any[], key: string, val: unknown) {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][key] === val) {
      return i;
    }
  }
  return -1;
}

// ArrayBuffer转16进度字符串示例
function ab2hex(buffer: number[]) {
  const hexArr = Array.prototype.map.call(new Uint8Array(buffer), (bit: number) => {
    return `00${bit.toString(16)}`.slice(-2);
  });
  return hexArr.join('');
}

/**
 * 蓝牙
 */
export default function useCountDown() {
  const devices = ref<any[]>([]); // 蓝牙列表
  const discoveryStarted = ref(false);
  const connected = ref(false); // 连接状态
  const deviceId = ref(''); // 蓝牙设备ID
  const serviceId = ref(''); // 服务UUID
  const characteristicId = ref(''); // 写数据特征值UUID
  const deviceName = ref('');
  const characteristics = ref<any[]>([]);
  const scaning = ref(false); // 是否在搜索
  function onBluetoothDeviceFound() {
    Taro.onBluetoothDeviceFound(res => {
      console.log('找到！', res);
      res.devices.forEach(device => {
        if (!device.name && !device.localName) {
          return;
        }
        const idx = inArray(devices.value, 'deviceId', device.deviceId);
        if (idx === -1) {
          devices.value = [...devices.value, device];
        } else {
          devices.value[idx] = device;
        }
      });
    });
  }
  async function stopBluetoothDevicesDiscovery() {
    discoveryStarted.value = false;
    await Taro.stopBluetoothDevicesDiscovery();
  }
  async function startBluetoothDevicesDiscovery() {
    if (discoveryStarted.value) {
      await stopBluetoothDevicesDiscovery();
    }
    devices.value = [];
    characteristics.value = [];
    discoveryStarted.value = true;
    try {
      const res = Taro.startBluetoothDevicesDiscovery({ allowDuplicatesKey: true });
      setTimeout(() => {
        console.log('----BluetoothDevicesDiscovery finish---');
        if (discoveryStarted.value) {
          stopBluetoothDevicesDiscovery();
        }
      }, 10000);
      console.log('startBluetoothDevicesDiscovery-res', res);
      onBluetoothDeviceFound();
    } catch (err) {
      console.log('startBluetoothDevicesDiscovery-err', err);
    }
  }
  async function openBluetoothAdapter() {
    scaning.value = false;
    try {
      const res = await Taro.openBluetoothAdapter();
      console.log('openBluetoothAdapter-res', res);
      return true;
    } catch (err) {
      console.log('openBluetoothAdapter-err', err);
      return false;
    }

    // {
    //   success: (res: any) => {
    //     console.log('openBluetoothAdapter success', res);
    //     startBluetoothDevicesDiscovery();
    //   },
    //   fail: (res: any) => {
    //     if (res.errCode === 10001) {
    //       Taro.onBluetoothAdapterStateChange((res1: any) => {
    //         console.log('onBluetoothAdapterStateChange', res1);
    //         if (res1.available) {
    //           startBluetoothDevicesDiscovery();
    //         }
    //       });
    //     }
    //   }
    // }
  }
  async function getBluetoothAdapterState() {
    try {
      const res = await Taro.getBluetoothAdapterState();
      console.log('getBluetoothAdapterState-res', res);
      return true;
    } catch (err) {
      console.log('getBluetoothAdapterState-err', err);
      return false;
    }
  }
  function writeBLECharacteristicValue(buffer: ArrayBuffer) {
    // 向蓝牙设备发送一个0x00的16进制数据
    // const buffer = new ArrayBuffer(1);
    // const dataView = new DataView(buffer);
    // dataView.setUint8(0, Math.random() * 255 || 0);
    Taro.writeBLECharacteristicValue({
      deviceId: deviceId.value,
      serviceId: deviceId.value,
      characteristicId: characteristicId.value,
      value: buffer
    });
  }
  async function getBLEDeviceCharacteristics(insDeviceId: string, insServiceId: string): Promise<any> {
    try {
      const characteristicsRes = await Taro.getBLEDeviceCharacteristics({
        deviceId: insDeviceId,
        serviceId: insServiceId
      });
      return characteristicsRes;
    } catch (err) {
      console.error('getBLEDeviceCharacteristics-err', err);
      return false;
    }
    // const characteristics = await Taro.getBLEDeviceCharacteristics({
    //   deviceId: insDeviceId,
    //   serviceId: insServiceId,
    //   success: res => {
    //     console.log('getBLEDeviceCharacteristics success', res.characteristics);
    //     // for (let i = 0; i < res.characteristics.length; i += 1) {
    //     //   const item = res.characteristics[i];
    //     //   if (item.properties.read) {
    //     //     Taro.readBLECharacteristicValue({
    //     //       deviceId: insDeviceId,
    //     //       serviceId: insServiceId,
    //     //       characteristicId: item.uuid
    //     //     });
    //     //   }
    //     //   if (item.properties.write) {
    //     //     deviceId.value = insDeviceId;
    //     //     serviceId.value = insServiceId;
    //     //     characteristicId.value = item.uuid;
    //     //     // this.writeBLECharacteristicValue();
    //     //   }
    //     //   if (item.properties.notify || item.properties.indicate) {
    //     //     Taro.notifyBLECharacteristicValueChange({
    //     //       deviceId: insDeviceId,
    //     //       serviceId: insServiceId,
    //     //       characteristicId: item.uuid,
    //     //       state: true
    //     //     });
    //     //   }
    //     // }
    //   },
    //   fail(res) {
    //     console.error('getBLEDeviceCharacteristics', res);
    //   }
    // });
    // 操作之前先监听，保证第一时间获取数据
    Taro.onBLECharacteristicValueChange((characteristic: any) => {
      const idx = inArray(characteristics.value, 'uuid', characteristic.characteristicId);
      if (idx === -1) {
        characteristics.value[characteristics.value.length] = {
          uuid: characteristic.characteristicId,
          value: ab2hex(characteristic.value)
        };
      } else {
        characteristics.value[idx] = {
          uuid: characteristic.characteristicId,
          value: ab2hex(characteristic.value)
        };
      }
    });
  }
  async function getBLEDeviceServices(insDeviceId: string) {
    const res = await Taro.getBLEDeviceServices({
      deviceId: insDeviceId
    });
    console.log('getBLEDeviceServices', res);
    return res;
    // for (let i = 0; i < res.services.length; i += 1) {
    // 	if (res.services[i].isPrimary) {
    // 		getBLEDeviceCharacteristics(insDeviceId, res.services[i].uuid);
    // 		return;
    // 	}
    // }
  }
  async function createBLEConnection(device: any) {
    deviceId.value = device.deviceId;
    deviceName.value = device.name;
    try {
      const res = await Taro.createBLEConnection({
        deviceId: deviceId.value
      });
      console.log('createBLEConnection-res', res);
      connected.value = true;
      return true;
    } catch (err) {
      console.log('createBLEConnection-err', err);
      return false;
    }
  }

  return {
    openBluetoothAdapter,
    getBluetoothAdapterState,
    stopBluetoothDevicesDiscovery,
    startBluetoothDevicesDiscovery,
    createBLEConnection,
    getBLEDeviceServices,
    getBLEDeviceCharacteristics,
    writeBLECharacteristicValue,
    devices,
    connected,
    deviceId,
    serviceId,
    characteristicId,
    discoveryStarted
  };
}
