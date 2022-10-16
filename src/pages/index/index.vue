<template>
  <div class="bg-[#f8f8f8] h-100vh w-750rpx fixed top-0" style="z-index: -1000"></div>
  <img :src="bg" style="position: fixed; width: 750rpx; height: 372rpx; top: 0; z-index: -100" />
  <div class="flex flex-col items-center">
    <div class="relative mt-108rpx w-750rpx h-48rpx flex items-center">
      <div class="flex items-center ml-40rpx text-24rpx text-white" @click="handleToBluetooth">
        <img v-if="isConnect" :src="bluetooth" style="width: 19rpx; height: 34rpx" />
        <img v-else :src="unconnect" style="width: 48rpx; height: 40rpx" />
        {{ isConnect ? '已连接' : '未连接' }}
      </div>
      <div class="absolute left-137px text-17px text-white">净化香薰系统</div>
    </div>
    <div class="mt-140rpx p-24rpx rounded-20rpx bg-white w-670rpx h-252rpx relative box-border">
      <div class="absolute right-24rpx top-24rpx flex items-center" style="color: #999; font-size: 24rpx">
        <img :src="fuwei" style="width: 28rpx; height: 28rpx; margin-top: 2rpx; margin-right: 10rpx" />
        香水复位
      </div>
      <div class="flex items-center" style="font-weight: 700; font-size: 29rpx">
        <div class="w-108rpx h-108rpx rounded-full flex justify-center items-center mr-24rpx gradient">
          <img :src="nongdu" style="width: 30rpx; height: 40rpx" />
        </div>
        香氛浓度
      </div>
      <div class="w-620rpx h-80rpx mt-16rpx relative rounded-20rpx slider-bg">
        <div class="w-2rpx h-40rpx rounded-16rpx bg-light-700 absolute left-168rpx top-20rpx"></div>
        <div class="w-2rpx h-40rpx rounded-16rpx bg-light-700 absolute left-310rpx top-20rpx"></div>
        <div class="w-2rpx h-40rpx rounded-16rpx bg-light-700 absolute left-452rpx top-20rpx"></div>
        <div id="slider-block" class="slider-block">
          <div class="w-8rpx h-32rpx absolute right-16rpx top-24rpx bg-white rounded-16rpx"></div>
        </div>
        <div class="absolute left-58rpx top-23rpx white-text" style="font-size: 24rpx">淡香</div>
        <div class="absolute left-357rpx top-23rpx white-text" style="font-size: 24rpx">清香</div>
        <div class="absolute w-155rpx h-80rpx left-0" @click="handleXiangXunNongDuChange(0)"></div>
        <div class="absolute w-155rpx h-80rpx left-155rpx" @click="handleXiangXunNongDuChange(1)"></div>
        <div class="absolute w-155rpx h-80rpx left-310rpx" @click="handleXiangXunNongDuChange(2)"></div>
        <div class="absolute w-155rpx h-80rpx left-465rpx" @click="handleXiangXunNongDuChange(3)"></div>
      </div>
    </div>
    <div class="mt-40rpx p-24rpx rounded-20rpx bg-white w-670rpx relative box-border">
      <div class="absolute right-50rpx top-36rpx">
        <img :src="shadow" style="height: 200rpx; width: 200rpx" />
      </div>
      <div class="flex items-center" style="font-weight: 700; font-size: 29rpx">
        <div class="w-108rpx h-108rpx rounded-full flex justify-center items-center mr-24rpx gradient">
          <img :src="nongdu" style="width: 30rpx; height: 40rpx" />
        </div>
        香氛剩余量
      </div>
      <div class="mt-32rpx">
        <div class="relative">
          <nut-progress
            percentage="100"
            status="active"
            :text-inside="true"
            stroke-width="20"
            stroke-color="linear-gradient(270deg, #038FE5 0%, rgba(0, 142, 229, 0.4) 100%)"
          >
          </nut-progress>
          <div class="white-text absolute top-6rpx left-24rpx">香型A</div>
        </div>
        <div class="mt-16rpx relative">
          <nut-progress
            percentage="75"
            status="active"
            :text-inside="true"
            stroke-width="20"
            stroke-color="linear-gradient(270deg, #038FE5 0%, rgba(0, 142, 229, 0.4) 100%)"
          >
          </nut-progress>
          <div class="white-text absolute top-6rpx left-24rpx">香型B</div>
        </div>
        <div class="mt-16rpx relative">
          <nut-progress
            percentage="25"
            status="active"
            :text-inside="true"
            stroke-width="20"
            stroke-color="linear-gradient(270deg, #038FE5 0%, rgba(0, 142, 229, 0.4) 100%)"
          >
          </nut-progress>
          <div class="white-text absolute top-6rpx left-24rpx">香型C</div>
        </div>
      </div>
    </div>
    <div class="flex w-670rpx justify-between mt-40rpx">
      <div class="w-320rpx h-230rpx bg-white rounded-16rpx p-32rpx box-border flex flex-col justify-between">
        <div class="flex justify-between items-center">
          <div
            class="w-80rpx h-80rpx rounded-full flex justify-center items-center"
            style="background: linear-gradient(180deg, #e8eaf7 -11.25%, rgba(232, 234, 247, 0) 100%)"
          >
            <img :src="kaiguan" style="width: 42rpx; height: 42rpx" />
          </div>
          <nut-switch v-model="kaiguanchecked" active-text="ON" inactive-text="OFF" @change="kaiguanChange" />
        </div>
        <h3 style="font-size: 30rpx; font-weight: 700">香氛开关</h3>
      </div>
      <div class="w-320rpx h-230rpx bg-white rounded-16rpx p-32rpx box-border flex justify-between">
        <div class="flex flex-col justify-between items-center">
          <div
            class="w-80rpx h-80rpx rounded-full flex justify-center items-center self-start"
            style="background: linear-gradient(180deg, #e8eaf7 -11.25%, rgba(232, 234, 247, 0) 100%)"
          >
            <img :src="qiehuan" style="width: 42rpx; height: 42rpx" />
          </div>
          <h3 style="font-size: 30rpx; font-weight: 700">香氛切换</h3>
        </div>
        <div class="flex flex-col justify-between">
          <div
            class="w-98rpx h-40rpx bg-#008EE5 text-center rounded-40rpx mb-12rpx leading-40rpx"
            style="font-size: 22rpx; color: #ffffff"
            @click="qiehuanHandler(1)"
          >
            香氛A
          </div>
          <div
            class="w-98rpx h-40rpx bg-#008EE5 text-center rounded-40rpx mb-12rpx leading-40rpx"
            style="font-size: 22rpx; color: #ffffff"
            @click="qiehuanHandler(2)"
          >
            香氛B
          </div>
          <div
            class="w-98rpx h-40rpx bg-#008EE5 text-center rounded-40rpx leading-40rpx"
            style="font-size: 22rpx; color: #ffffff"
            @click="qiehuanHandler(3)"
          >
            香氛C
          </div>
        </div>
      </div>
    </div>
    <div class="flex w-670rpx justify-between mt-40rpx">
      <div class="w-320rpx h-230rpx bg-white rounded-16rpx p-32rpx box-border flex flex-col justify-between">
        <div class="flex justify-between items-center">
          <div
            class="w-80rpx h-80rpx rounded-full flex justify-center items-center"
            style="background: linear-gradient(180deg, #e8eaf7 -11.25%, rgba(232, 234, 247, 0) 100%)"
          >
            <img :src="denglizi" style="width: 42rpx; height: 42rpx" />
          </div>
          <nut-switch v-model="kaiguanchecked" active-text="ON" inactive-text="OFF" @change="dengliziChange" />
        </div>
        <h3 style="font-size: 30rpx; font-weight: 700">等离子开关</h3>
      </div>
      <div class="w-320rpx h-230rpx bg-white rounded-16rpx p-32rpx box-border flex justify-between">
        <div class="flex flex-col justify-between items-center">
          <div
            class="w-80rpx h-80rpx rounded-full flex justify-center items-center self-start"
            style="background: linear-gradient(180deg, #e8eaf7 -11.25%, rgba(232, 234, 247, 0) 100%)"
          >
            <img :src="shezhi" style="width: 42rpx; height: 42rpx" />
          </div>
          <h3 style="font-size: 30rpx; font-weight: 700">香氛设置</h3>
        </div>
        <div class="flex flex-col justify-between items-end">
          <div
            class="w-46rpx h-46rpx rounded-full flex justify-center items-center mb-12rpx"
            style="box-shadow: 0 5rpx 30rpx 0 rgba(0, 142, 229, 0.2)"
          >
            <img :src="shezhiIcon" style="width: 29rpx; height: 29rpx" />
          </div>
          <div
            class="w-98rpx h-40rpx text-center rounded-40rpx mb-12rpx leading-40rpx"
            style="border: 2px solid #37adf5; font-size: 18rpx; color: #1a1a1a"
            @click="meigeHandler"
          >
            每隔一秒
          </div>
          <div
            class="w-98rpx h-40rpx text-center rounded-40rpx leading-40rpx"
            style="border: 2px solid #37adf5; font-size: 18rpx; color: #1a1a1a"
            @click="gongzuoHandler"
          >
            工作一秒
          </div>
        </div>
      </div>
    </div>
    <div class="w-750rpx h-140rpx"></div>
    <div class="box-shadow fixed w-750rpx h-60px bg-white bottom-0 flex items-center">
      <div class="flex flex-1 justify-center items-center" @click="handleToAbout">
        <img :src="guanyu" style="width: 42rpx; height: 42rpx" />
        <span class="ml-9px">关于我们</span>
      </div>
      <div class="w-2px h-32rpx bg-black rounded-2px"></div>
      <div class="flex flex-1 justify-center items-center">
        <img :src="lianxi" style="width: 42rpx; height: 42rpx" />
        <span class="ml-9px">联系方式</span>
      </div>
    </div>
  </div>
  <nut-dialog v-model:visible="bleNotOpenDialog" title="蓝牙未打开" content="请打开蓝牙再进行操作" />
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { navigateTo, default as Taro } from '@tarojs/taro';
import { getHexOrder } from '@/service/blueOrder/order';
import { useBle } from '../../hooks';
import bg from '../../assets/images/bg.png';
import bluetooth from '../../assets/images/bluetooth.png';
import unconnect from '../../assets/images/unconnect.png';
import fuwei from '../../assets/images/fuwei.png';
import nongdu from '../../assets/images/nongdu.png';
import shadow from '../../assets/images/shadow.png';
import guanyu from '../../assets/images/guanyu.png';
import lianxi from '../../assets/images/lianxi.png';
import kaiguan from '../../assets/images/kaiguan.png';
import denglizi from '../../assets/images/denglizi.png';
import qiehuan from '../../assets/images/qiehuan.png';
import shezhi from '../../assets/images/shezhi.png';
import shezhiIcon from '../../assets/images/shezhiIcon.png';

const app = Taro.getApp();

if (!app.globalData) {
  app.globalData = {};
  app.globalData.ble = useBle();
} else if (!app.globalData.ble) {
  app.globalData.ble = useBle();
}

const xiangXunNongDu = ref(0);
const kaiguanchecked = ref(true);
const isConnect = ref(false);
let deviceId = '';
let serviceId = '';
let characteristicId = '';
const bleNotOpenDialog = ref(false);

watchEffect(() => {
  isConnect.value = app.globalData.ble.connected.value;
  if (isConnect.value) {
    deviceId = app.globalData.ble.deviceId.value;
    serviceId = app.globalData.ble.serviceId.value;
    characteristicId = app.globalData.ble.characteristicId.value;
  }
});

function handleXiangXunNongDuChange(level: number) {
  const animate = Taro.getCurrentInstance()?.page?.animate;
  if (animate) {
    animate(
      '#slider-block',
      [
        {
          left: `${xiangXunNongDu.value * 155}rpx`,
          offset: 0,
          ease: 'ease-in-out'
        },
        {
          left: `${level * 155}rpx`,
          offset: 1,
          ease: 'ease-in-out'
        }
      ],
      300,
      () => {}
    );
  }

  xiangXunNongDu.value = level;
}

function handleToAbout() {
  navigateTo({
    url: '/package/about/index'
  });
}

async function handleToBluetooth() {
  const res = await app.globalData.ble.openBluetoothAdapter();
  if (!res) {
    bleNotOpenDialog.value = true;
    return;
  }
  navigateTo({
    url: '/package/bluetoothConnect/index'
  });
}

function kaiguanChange(value: boolean) {
  const order = getHexOrder('kaiguan', value);
  Taro.writeBLECharacteristicValue({
    // 这里的 deviceId 需要在 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
    deviceId,
    // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
    serviceId,
    // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
    characteristicId,
    // 这里的value是ArrayBuffer类型
    value: order,
    success(res) {
      Taro.showToast({ title: JSON.stringify(order) });
      console.log('writeBLECharacteristicValue success', res.errMsg);
    }
  });
}

function qiehuanHandler(num: number) {
  const order = getHexOrder('qiehuan', num);
  Taro.writeBLECharacteristicValue({
    // 这里的 deviceId 需要在 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
    deviceId,
    // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
    serviceId,
    // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
    characteristicId,
    // 这里的value是ArrayBuffer类型
    value: order,
    success(res) {
      console.log('writeBLECharacteristicValue success', res.errMsg);
    }
  });
}

function dengliziChange(value: boolean) {
  const order = getHexOrder('denglizi', value);
  Taro.writeBLECharacteristicValue({
    // 这里的 deviceId 需要在 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
    deviceId,
    // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
    serviceId,
    // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
    characteristicId,
    // 这里的value是ArrayBuffer类型
    value: order,
    success(res) {
      console.log('writeBLECharacteristicValue success', res.errMsg);
    }
  });
}

function meigeHandler() {
  const num = false;
  const order = getHexOrder('meige', num);
  Taro.writeBLECharacteristicValue({
    // 这里的 deviceId 需要在 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
    deviceId,
    // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
    serviceId,
    // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
    characteristicId,
    // 这里的value是ArrayBuffer类型
    value: order,
    success(res) {
      console.log('writeBLECharacteristicValue success', res.errMsg);
    }
  });
}

function gongzuoHandler() {
  const num = false;
  const order = getHexOrder('gongzuo', num);
  Taro.writeBLECharacteristicValue({
    // 这里的 deviceId 需要在 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
    deviceId,
    // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
    serviceId,
    // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
    characteristicId,
    // 这里的value是ArrayBuffer类型
    value: order,
    success(res) {
      console.log('writeBLECharacteristicValue success', res.errMsg);
    }
  });
}

/** 设置页面属性 */
definePageConfig({
  navigationBarTitleText: '首页'
});
</script>

<style>
span {
  font-family: 'PingFang SC';
}

.box-shadow {
  box-shadow: 0px -8rpx 30px rgba(0, 0, 0, 0.05);
}

.gradient {
  background: linear-gradient(180deg, #e8eaf7 -11.25%, rgba(232, 234, 247, 0) 100%);
}

.white-text {
  font-weight: 500;
  font-size: 20rpx;
  color: #ffffff;
}

.slider-bg {
  background: linear-gradient(270deg, #008ee5 0%, rgba(0, 142, 229, 0.4) 100%);
}

.slider-block {
  position: absolute;
  width: 155rpx;
  height: 80rpx;
  left: 0;
  top: 0;
  border-radius: 20rpx;
  background: linear-gradient(180deg, #85cffd 0%, #c2e2f5 100%);
}
</style>
