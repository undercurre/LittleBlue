<template>
  <div class="flex items-center flex-col">
    <div
      v-for="item in bluetoothList"
      :key="item.deviceId"
      class="w-670rpx bluetoothCell px-40rpx pt-40rpx"
      @click="handleConnect(item)"
    >
      <div class="flex justify-between">
        <div class="title">{{ item.name }}</div>
        <div class="buttom-text" :style="{ color: connectDeviceId === item.deviceId ? '#00C777' : '#000' }">
          {{ connectDeviceId === item.deviceId ? '已连接' : '未连接' }}
        </div>
      </div>
      <div class="flex justify-between mt-24rpx">
        <div class="info-text">信号强度：</div>
        <div class="info-text">{{ item.signalStrength }}dB</div>
      </div>
      <div class="flex justify-between mt-24rpx">
        <div class="info-text">deviceId：</div>
        <div class="info-text">{{ item.deviceId }}</div>
      </div>
      <!-- <div class="flex justify-between mt-24rpx">
        <div class="info-text">SERVICE数量：</div>
        <div class="info-text">{{ item.serviceNum }}</div>
      </div> -->
      <div class="w-670rpx h-1rpx mt-40rpx bg-[#E7E7E7]"></div>
    </div>
  </div>
  <nut-dialog v-model:visible="dialogVisible" :title="title" :content="content" no-cancel-btn />
</template>
<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import Taro from '@tarojs/taro';
import { useBle } from '@/hooks';
import { rxduuid, serviceuuid, txduuid } from '../../config/uuid';
definePageConfig({
  navigationBarTitleText: '蓝牙连接',
  navigationStyle: 'default',
  backgroundTextStyle: 'dark',
  enablePullDownRefresh: true
});

const dialogVisible = ref(false);
const title = ref('基础弹框');
const content = ref('这是基础弹框。');
const app = Taro.getApp();

if (!app.globalData) {
  app.globalData = {};
  app.globalData.ble = useBle();
} else if (!app.globalData.ble) {
  app.globalData.ble = useBle();
}

if (app.globalData.ble.discoveryStarted.value === false) {
  app.globalData.ble.startBluetoothDevicesDiscovery();
}

Taro.usePullDownRefresh(() => {
  console.log('下拉刷新寻找蓝牙');
  if (app.globalData.ble.discoveryStarted.value === true) return;
  app.globalData.ble.startBluetoothDevicesDiscovery();
});

watchEffect(
  () => {
    if (app.globalData.ble.discoveryStarted.value === true) {
      Taro.startPullDownRefresh();
    } else {
      Taro.stopPullDownRefresh();
    }
  },
  {
    flush: 'post'
  }
);

const connectDeviceId = ref('1231231231231');

interface bleInfo {
  name: string;
  deviceId: string;
  signalStrength: number;
  // serviceNum: number;
}

const bluetoothList = ref<bleInfo[]>([]);

async function checkServiceAndCharacteristic(deviceId: string) {
  let res = await app.globalData.ble.getBLEDeviceServices(deviceId);
  if (res.errCode !== 0) {
    return false;
  }
  let isService = false;
  res.services.forEach((service: any) => {
    if (service.uuid === serviceuuid) {
      isService = true;
      app.globalData.ble.serviceId.value = service.uuid;
    }
  });
  if (!isService) {
    console.log('没找到正确的Service');
    return false;
  }
  res = await app.globalData.ble.getBLEDeviceCharacteristics(deviceId, serviceuuid);
  if (res === false) {
    console.log('characteristics获取失败');
    return false;
  }
  console.log('getBLEDeviceCharacteristics', res);
  let isWriteCharacteristic = false;
  let isNotifyCharacteristic = false;
  res.characteristics.forEach((characteristic: any) => {
    if (characteristic.properties.write && characteristic.uuid === txduuid) {
      isWriteCharacteristic = true;
      app.globalData.ble.characteristicId.value = characteristic.uuid;
    }
    if ((characteristic.properties.notify || characteristic.properties.indicate) && characteristic.uuid === rxduuid) {
      isNotifyCharacteristic = true;
      app.globalData.ble.notifyCharacteristic.value = characteristic.uuid;
    }
  });
  if (!isWriteCharacteristic) {
    console.log('没找到正确的写数据特征值');
    return false;
  }
  if (!isNotifyCharacteristic) {
    console.log('没找到正确的读数据特征值');
    return false;
  }
  return true;
}

async function handleConnect(item: bleInfo) {
  await app.globalData.ble.stopBluetoothDevicesDiscovery();
  console.log('点击连接：', item);
  Taro.showLoading({
    title: `正在连接 ${item.name}`
  });
  let res = await app.globalData.ble.createBLEConnection({
    deviceId: item.deviceId,
    name: item.name
  });
  Taro.hideLoading();
  if (!res) {
    title.value = `连接${item.name}失败`;
    content.value = `请尝试重新连接`;
    connectDeviceId.value = '';
    dialogVisible.value = true;
    app.globalData.ble.connected.value = false;
    return;
  }
  res = await checkServiceAndCharacteristic(item.deviceId);
  if (res) {
    console.log('匹配上正确的服务和特征值');
    title.value = `连接${item.name}成功`;
    content.value = `可以直接返回首页进行控制`;
    connectDeviceId.value = item.deviceId;
    app.globalData.ble.connected.value = true;
  } else {
    console.log('没匹配上正确的服务和特征值');
    title.value = `连接错误设备`;
    content.value = `设备连接错误，请连接正确设备`;
    connectDeviceId.value = '';
    app.globalData.ble.connected.value = false;
  }
  dialogVisible.value = true;
}

watchEffect(() => {
  console.log('搜到蓝牙设备：', app.globalData.ble.devices.value);
  const res = [...app.globalData.ble.devices.value];
  bluetoothList.value = res
    .sort((a, b) => b.RSSI - a.RSSI)
    .map(device => ({
      name: device.name || device.localName,
      deviceId: device.deviceId,
      signalStrength: device.RSSI
      // serviceNum: device.advertisServiceUUIDs || device.advertisServiceUUIDs.length || 0
    }));
});
</script>

<style lang="scss">
.title {
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 700;
  font-size: 30rpx;
  line-height: 42rpx;
}

.buttom-text {
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 500;
  font-size: 24rpx;
  line-height: 34rpx;
  color: #000000;
}

.info-text {
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 500;
  font-size: 26rpx;
  line-height: 36rpx;
  color: #000000;
}

.bluetoothCell:active {
  background-color: #f7f7f7;
}
</style>
