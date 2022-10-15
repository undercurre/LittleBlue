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
  const serviceId = ref('');
  const characteristicId = ref('');
  const deviceName = ref('');
  const characteristics = ref<any[]>([]);
  const scaning = ref(false); // 是否在搜索
  function onBluetoothDeviceFound() {
    Taro.onBluetoothDeviceFound(res => {
      res.devices.forEach(device => {
        if (!device.name && !device.localName) {
          return;
        }
        const foundDevices = devices.value;
        const idx = inArray(foundDevices, 'deviceId', device.deviceId);
        if (idx === -1) {
          devices.value[foundDevices.length] = device;
        } else {
          devices.value[idx] = device;
        }
      });
    });
  }
  function stopBluetoothDevicesDiscovery() {
    discoveryStarted.value = false;
    Taro.stopBluetoothDevicesDiscovery();
  }
  function startBluetoothDevicesDiscovery() {
    if (discoveryStarted.value) {
      stopBluetoothDevicesDiscovery();
      return;
    }
    devices.value = [];
    characteristics.value = [];
    discoveryStarted.value = true;
    Taro.startBluetoothDevicesDiscovery({
      allowDuplicatesKey: true,
      success: res => {
        setTimeout(() => {
          console.log('----BluetoothDevicesDiscovery finish---- ');
          if (discoveryStarted.value) {
            stopBluetoothDevicesDiscovery();
          }
        }, 20000);
        console.log('startBluetoothDevicesDiscovery success', res);
        onBluetoothDeviceFound();
      }
    });
  }
  function openBluetoothAdapter() {
    scaning.value = false;
    Taro.openBluetoothAdapter({
      success: (res: any) => {
        console.log('openBluetoothAdapter success', res);
        startBluetoothDevicesDiscovery();
      },
      fail: (res: any) => {
        if (res.errCode === 10001) {
          Taro.onBluetoothAdapterStateChange((res1: any) => {
            console.log('onBluetoothAdapterStateChange', res1);
            if (res1.available) {
              startBluetoothDevicesDiscovery();
            }
          });
        }
      }
    });
  }
  function getBluetoothAdapterState() {
    Taro.getBluetoothAdapterState({
      success: (res: any) => {
        console.log('getBluetoothAdapterState', res);
        if (res.discovering) {
          onBluetoothDeviceFound();
        } else if (res.available) {
          startBluetoothDevicesDiscovery();
        }
      }
    });
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
  function getBLEDeviceCharacteristics(insDeviceId: string, insServiceId: string) {
    Taro.getBLEDeviceCharacteristics({
      deviceId: insDeviceId,
      serviceId: insServiceId,
      success: res => {
        console.log('getBLEDeviceCharacteristics success', res.characteristics);
        for (let i = 0; i < res.characteristics.length; i += 1) {
          const item = res.characteristics[i];
          if (item.properties.read) {
            Taro.readBLECharacteristicValue({
              deviceId: insDeviceId,
              serviceId: insServiceId,
              characteristicId: item.uuid
            });
          }
          if (item.properties.write) {
            deviceId.value = insDeviceId;
            serviceId.value = insServiceId;
            characteristicId.value = item.uuid;
            // this.writeBLECharacteristicValue();
          }
          if (item.properties.notify || item.properties.indicate) {
            Taro.notifyBLECharacteristicValueChange({
              deviceId: insDeviceId,
              serviceId: insServiceId,
              characteristicId: item.uuid,
              state: true
            });
          }
        }
      },
      fail(res) {
        console.error('getBLEDeviceCharacteristics', res);
      }
    });
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
  function getBLEDeviceServices(insDeviceId: string) {
    Taro.getBLEDeviceServices({
      deviceId: insDeviceId,
      success: (res: any) => {
        for (let i = 0; i < res.services.length; i += 1) {
          if (res.services[i].isPrimary) {
            getBLEDeviceCharacteristics(insDeviceId, res.services[i].uuid);
            return;
          }
        }
      }
    });
  }
  function createBLEConnection(e: any) {
    const ds = e.currentTarget.dataset;
    deviceId.value = ds.deviceId;
    deviceName.value = ds.name;
    Taro.createBLEConnection({
      deviceId: deviceId.value,
      success: () => {
        connected.value = true;
        getBLEDeviceServices(deviceId.value);
      }
    });
    stopBluetoothDevicesDiscovery();
  }

  return {
    openBluetoothAdapter,
    getBluetoothAdapterState,
    stopBluetoothDevicesDiscovery,
    startBluetoothDevicesDiscovery,
    createBLEConnection,
    writeBLECharacteristicValue,
    devices,
    connected,
    deviceId,
    serviceId,
    characteristicId,
    discoveryStarted
  };
}
