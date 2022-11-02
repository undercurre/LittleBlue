<template>
  <div class="bg-[#f8f8f8] h-100vh w-750rpx fixed top-0" style="z-index: -1000"></div>
  <img :src="bg" style="position: fixed; width: 750rpx; height: 372rpx; top: 0; z-index: -100" />
  <div class="flex flex-col items-center">
    <div class="relative mt-108rpx w-750rpx h-48rpx flex items-center">
      <div class="flex items-center p-40rpx text-24rpx text-white" @click="handleToBluetooth">
        <img v-if="isConnect" :src="bluetooth" style="width: 19rpx; height: 34rpx; margin-right: 4rpx" />
        <img v-else :src="unconnect" style="width: 48rpx; height: 40rpx; margin-right: 4rpx" />
        {{ isConnect ? '已连接' : '未连接' }}
      </div>
      <div class="absolute left-137px text-17px text-white">净化香薰系统</div>
    </div>
    <div class="mt-140rpx p-24rpx rounded-20rpx bg-white w-670rpx h-252rpx relative box-border">
      <div
        class="absolute right-24rpx top-24rpx flex items-center"
        style="color: #999; font-size: 24rpx"
        @click="handlefuwei"
      >
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
        <div class="absolute w-155rpx h-80rpx left-0" @click="handleXiangXunNongDuChange(1)"></div>
        <!-- <div class="absolute w-155rpx h-80rpx left-155rpx" @click="handleXiangXunNongDuChange(1)"></div> -->
        <div class="absolute w-155rpx h-80rpx left-310rpx" @click="handleXiangXunNongDuChange(2)"></div>
        <!-- <div class="absolute w-155rpx h-80rpx left-465rpx" @click="handleXiangXunNongDuChange(3)"></div> -->
      </div>
    </div>
    <div class="mt-40rpx p-24rpx rounded-20rpx bg-white w-670rpx relative box-border">
      <div class="absolute right-50rpx top-36rpx">
        <img :src="shadow" style="height: 200rpx; width: 200rpx" />
      </div>
      <div class="flex items-center" style="font-weight: 700; font-size: 29rpx">
        <div class="w-108rpx h-108rpx rounded-full flex justify-center items-center mr-24rpx gradient">
          <img :src="shengyu" style="width: 40rpx; height: 42rpx" />
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
      <div
        class="w-320rpx h-230rpx bg-white rounded-16rpx p-32rpx pt-10rpx pr-16rpx box-border flex flex-col justify-between"
      >
        <div class="flex justify-between items-center">
          <div
            class="w-80rpx h-80rpx rounded-full flex justify-center items-center"
            style="background: linear-gradient(180deg, #e8eaf7 -11.25%, rgba(232, 234, 247, 0) 100%)"
          >
            <img :src="kaiguan" style="width: 29rpx; height: 32rpx" />
          </div>
          <img
            v-if="xiangxunkaiguanchecked"
            :src="btnOn"
            style="width: 126rpx; height: 126rpx"
            @click="kaiguanChange(false)"
          />
          <img v-else :src="btnOff" style="width: 126rpx; height: 126rpx" @click="kaiguanChange(true)" />
          <!-- <nut-switch
						:model-value="xiangxunkaiguanchecked"
						active-text="ON"
						inactive-text="OFF"
						@change="kaiguanChange"
					/> -->
        </div>
        <h3 style="font-size: 30rpx; font-weight: 700">香氛开关</h3>
      </div>
      <div class="w-320rpx h-230rpx bg-white rounded-16rpx pl-32rpx pr-10rpx py-14rpx box-border flex justify-between">
        <div class="flex flex-col justify-between items-center py-20rpx">
          <div
            class="w-80rpx h-80rpx rounded-full flex justify-center items-center self-start"
            style="background: linear-gradient(180deg, #e8eaf7 -11.25%, rgba(232, 234, 247, 0) 100%)"
          >
            <img :src="qiehuan" style="width: 32rpx; height: 32rpx" />
          </div>
          <h3 style="font-weight: 700" class="text-30rpx">香氛切换</h3>
        </div>
        <div class="flex flex-col justify-between">
          <div
            class="w-126rpx h-51rpx bg-#008EE5 text-center rounded-40rpx leading-40rpx text-28rpx text-white flex-center"
            @click="qiehuanHandler(1)"
          >
            香氛A
          </div>
          <div
            class="w-126rpx h-51rpx bg-#008EE5 text-center rounded-40rpx leading-40rpx text-28rpx text-white flex-center"
            @click="qiehuanHandler(2)"
          >
            香氛B
          </div>
          <div
            class="w-126rpx h-51rpx bg-#008EE5 text-center rounded-40rpx leading-40rpx text-28rpx text-white flex-center"
            @click="qiehuanHandler(3)"
          >
            香氛C
          </div>
        </div>
      </div>
    </div>
    <div class="flex w-670rpx justify-between mt-40rpx">
      <div
        class="w-320rpx h-230rpx bg-white rounded-16rpx p-32rpx pt-10rpx pr-16rpx box-border flex flex-col justify-between"
      >
        <div class="flex justify-between items-center">
          <div
            class="w-80rpx h-80rpx rounded-full flex justify-center items-center"
            style="background: linear-gradient(180deg, #e8eaf7 -11.25%, rgba(232, 234, 247, 0) 100%)"
          >
            <img :src="denglizi" style="width: 30rpx; height: 39rpx" />
          </div>
          <img
            v-if="denglizikaiguanchecked"
            :src="btnOn"
            style="width: 126rpx; height: 126rpx"
            @click="dengliziChange(false)"
          />
          <img v-else :src="btnOff" style="width: 126rpx; height: 126rpx" @click="dengliziChange(true)" />
          <!-- <nut-switch
						:model-value="denglizikaiguanchecked"
						active-text="ON"
						inactive-text="OFF"
						@change="dengliziChange"
					/> -->
        </div>
        <h3 style="font-size: 30rpx; font-weight: 700">等离子开关</h3>
      </div>
      <div class="w-320rpx h-230rpx bg-white rounded-16rpx p-32rpx pb-4rpx pr-24rpx box-border flex justify-between">
        <div class="flex flex-col justify-between items-center pb-28rpx">
          <div
            class="w-80rpx h-80rpx rounded-full flex justify-center items-center self-start"
            style="background: linear-gradient(180deg, #e8eaf7 -11.25%, rgba(232, 234, 247, 0) 100%)"
          >
            <img :src="shezhi" style="width: 24rpx; height: 30rpx" />
          </div>
          <h3 style="font-weight: 700" class="text-30rpx mb-28rpx">香氛设置</h3>
        </div>
        <div class="flex flex-col justify-between items-end">
          <div
            class="w-76rpx h-76rpx rounded-full flex justify-center items-center mb-12rpx"
            style="box-shadow: 0 5rpx 30rpx 0 rgba(0, 142, 229, 0.2)"
          >
            <img :src="shezhiIcon" style="width: 42rpx; height: 42rpx" />
          </div>
          <div
            v-if="chixuSwitch"
            class="w-98rpx h-40rpx text-center rounded-40rpx mb-12rpx leading-40rpx"
            style="border: 2px solid #37adf5; font-size: 18rpx; color: #1a1a1a; margin-bottom: 20rpx"
            @click="showchixu = true"
          >
            持续工作
          </div>
          <div
            v-if="!chixuSwitch"
            class="w-98rpx h-40rpx text-center rounded-40rpx mb-12rpx leading-40rpx"
            style="border: 2px solid #37adf5; font-size: 18rpx; color: #1a1a1a"
            @click="showchixu = true"
          >
            每隔{{ meige[0] }}秒
          </div>
          <div
            v-if="!chixuSwitch"
            class="w-98rpx h-40rpx text-center rounded-40rpx leading-40rpx"
            style="border: 2px solid #37adf5; font-size: 18rpx; color: #1a1a1a"
            @click="showchixu = true"
          >
            工作{{ gongzuo[0] }}秒
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
      <div class="flex flex-1 justify-center items-center" @click="handleToConnect">
        <img :src="lianxi" style="width: 42rpx; height: 42rpx" />
        <span class="ml-9px">联系方式</span>
      </div>
    </div>
  </div>
  <nut-dialog v-model:visible="bleNotWorkDialog" :title="dialogTitle" :content="dialogContent" no-cancel-btn />
  <nut-popup
    v-model:visible="showchixu"
    position="bottom"
    :style="{ height: '41%', boxSizing: 'border-box' }"
    :z-index="100"
    :round="true"
  >
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 32rpx 44rpx">
      <div></div>
      <span style="font-size: 15px; font-weight: 700">香氛设置</span>
      <nut-icon name="close" size="12" @click="showchixu = false"></nut-icon>
    </div>
    <div style="display: flex; flex-direction: column; padding-left: 93rpx">
      <div style="display: flex; align-items: center; margin-bottom: 40rpx">
        <img
          v-if="!chixuSwitch"
          :src="selected"
          style="width: 28rpx; height: 28rpx; margin-right: 37rpx; margin-bottom: 30rpx"
          @click="chixuSwitch = !chixuSwitch"
        />
        <img
          v-if="chixuSwitch"
          :src="unselect"
          style="width: 28rpx; height: 28rpx; margin-right: 37rpx; margin-bottom: 30rpx"
          @click="chixuSwitch = !chixuSwitch"
        />
        <span style="font-size: 14px; margin-bottom: 30rpx">每隔</span>
        <picker-view
          indicator-style="height: 30px;"
          style="width: 20rpx; height: 240rpx; padding: 0 70rpx"
          :value="meige"
          @change="onMeigeChange"
        >
          <picker-view-column>
            <view
              v-for="(item, index) in [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
                28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53,
                54, 55, 56, 57, 58, 59, 60
              ]"
              :key="index"
              >{{ item }}</view
            >
          </picker-view-column>
        </picker-view>
        <span style="font-size: 14px; margin-right: 65rpx; margin-bottom: 30rpx">秒</span>
        <span style="font-size: 14px; margin-bottom: 30rpx">工作</span>
        <picker-view
          indicator-style="height: 30px;"
          style="width: 20rpx; height: 240rpx; padding: 0 70rpx"
          :value="gongzuo"
          @change="onGongzuoChange"
        >
          <picker-view-column>
            <view
              v-for="(item, index) in [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
                28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53,
                54, 55, 56, 57, 58, 59, 60
              ]"
              :key="index"
              >{{ item }}</view
            >
          </picker-view-column>
        </picker-view>
        <span style="font-size: 14px; margin-bottom: 30rpx">秒</span>
      </div>
      <div style="display: flex; align-items: center" @click="chixuSwitch = !chixuSwitch">
        <img v-if="chixuSwitch" :src="selected" style="width: 28rpx; height: 28rpx; margin-right: 37rpx" />
        <img v-if="!chixuSwitch" :src="unselect" style="width: 28rpx; height: 28rpx; margin-right: 37rpx" />
        <span style="font-size: 14px">持续工作</span>
      </div>
    </div>
    <div style="display: flex; padding: 50rpx 20rpx; justify-content: space-between">
      <nut-button style="width: 322rpx" type="default" @click="showchixu = false">取消</nut-button
      ><nut-button color="#008EE5" style="width: 322rpx" type="info" @click="chixuConfirm">确认</nut-button>
    </div>
  </nut-popup>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { navigateTo, default as Taro } from '@tarojs/taro';
import { PickerViewColumn } from '@tarojs/components';
import { getHexOrder } from '@/service/blueOrder/order';
import { useBle } from '../../hooks';
import bg from '../../assets/images/bg.png';
import bluetooth from '../../assets/images/bluetooth.png';
import unconnect from '../../assets/images/unconnect.png';
import fuwei from '../../assets/images/fuwei.png';
import nongdu from '../../assets/images/nongdu.png';
import shengyu from '../../assets/images/shengyu.png';
import shadow from '../../assets/images/shadow.png';
import guanyu from '../../assets/images/guanyu.png';
import lianxi from '../../assets/images/lianxi.png';
import kaiguan from '../../assets/images/kaiguan.png';
import denglizi from '../../assets/images/denglizi.png';
import qiehuan from '../../assets/images/qiehuan.png';
import shezhi from '../../assets/images/shezhi.png';
import shezhiIcon from '../../assets/images/shezhiIcon.png';
import selected from '../../assets/images/selected.png';
import unselect from '../../assets/images/unselect.png';
import btnOn from '../../assets/images/btnOn.png';
import btnOff from '../../assets/images/btnOff.png';

// chixu
const chixuSwitch = ref(false);
const showchixu = ref(false);
const meige = ref([0]);
const gongzuo = ref([0]);
const meigeFaker = ref([0]);
const gongzuoFaker = ref([0]);

function onMeigeChange(e: any) {
  meigeFaker.value[0] = e.detail.value[0];
}

function onGongzuoChange(e: any) {
  gongzuoFaker.value[0] = e.detail.value[0];
}

function chixuConfirm() {
  meige.value[0] = meigeFaker.value[0];
  gongzuo.value[0] = gongzuoFaker.value[0];
  showchixu.value = false;
  meigeHandler();
  gongzuoHandler();
}

const app = Taro.getApp();

if (!app.globalData) {
  app.globalData = {};
  app.globalData.ble = useBle();
} else if (!app.globalData.ble) {
  app.globalData.ble = useBle();
}

const xiangXunNongDu = ref(0);
const xiangxunkaiguanchecked = ref(true);
const denglizikaiguanchecked = ref(true);
const isConnect = ref(false);
let deviceId = '';
let serviceId = '';
let characteristicId = '';
let notifyCharacteristic = '';
const bleNotWorkDialog = ref(false);
const dialogTitle = ref('');
const dialogContent = ref('');

function openBLENotOpenDialog() {
  dialogTitle.value = '蓝牙不可用';
  dialogContent.value = '请打开蓝牙再进行操作,苹果手机用户需要到系统设置允许使用蓝牙功能';
  bleNotWorkDialog.value = true;
}

// 如果没连接蓝牙，调用这个方法弹窗，并返回是否已连接
function openBLENotConnectDialogIfNotConnect() {
  // if (!isConnect.value) {
  //   dialogTitle.value = '操作错误';
  //   dialogContent.value = '请连接蓝牙再进行操作';
  //   bleNotWorkDialog.value = true;
  //   return false;
  // }
  return true;
}

watchEffect(() => {
  isConnect.value = app.globalData.ble.connected.value;
  if (isConnect.value) {
    deviceId = app.globalData.ble.deviceId.value;
    serviceId = app.globalData.ble.serviceId.value;
    characteristicId = app.globalData.ble.characteristicId.value;
    notifyCharacteristic = app.globalData.ble.notifyCharacteristic.value;
    // 开始监听设备返回的数据
    Taro.notifyBLECharacteristicValueChange({
      deviceId,
      serviceId,
      characteristicId: notifyCharacteristic,
      state: true,
      success(res) {
        console.log('notifyBLECharacteristicValueChange', res);
        Taro.onBLECharacteristicValueChange(res1 => {
          Taro.showToast({ title: `接收到：${buf2hex(res1.value)}` });
        });
      }
    });
    // 监听蓝牙断开的事件
    Taro.onBLEConnectionStateChange(res => {
      if (!res.connected) {
        app.globalData.ble.connected.value = false;
        app.globalData.ble.serviceId.value = '';
        app.globalData.ble.characteristicId.value = '';
        app.globalData.ble.notifyCharacteristic.value = '';
      }
    });
  }
});

function handleXiangXunNongDuChange(level: number) {
  if (!openBLENotConnectDialogIfNotConnect()) return;
  const order = getHexOrder('nongdu', level);
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
  const animate = Taro.getCurrentInstance()?.page?.animate;
  if (animate) {
    animate(
      '#slider-block',
      [
        {
          left: `${(xiangXunNongDu.value - 1) * 310}rpx`,
          offset: 0,
          ease: 'ease-in-out'
        },
        {
          left: `${(level - 1) * 310}rpx`,
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

function handleToConnect() {
  navigateTo({
    url: '/package/connect/index'
  });
}

async function handleToBluetooth() {
  const res = await app.globalData.ble.openBluetoothAdapter();
  if (!res) {
    openBLENotOpenDialog();
    return;
  }
  navigateTo({
    url: '/package/bluetoothConnect/index'
  });
}

// @todo: 换到util
function buf2hex(buffer: ArrayBuffer) {
  return Array.prototype.map.call(new Uint8Array(buffer), x => `00${x.toString(16)}`.slice(-2)).join('');
}

function handlefuwei() {
  if (!openBLENotConnectDialogIfNotConnect()) return;
  const order = getHexOrder('fuwei', 85);
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

function kaiguanChange(value: boolean) {
  if (!openBLENotConnectDialogIfNotConnect()) return;
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
      console.log('writeBLECharacteristicValue success', res.errMsg);
    }
  });
  xiangxunkaiguanchecked.value = !xiangxunkaiguanchecked.value;
}

function qiehuanHandler(num: number) {
  if (!openBLENotConnectDialogIfNotConnect()) return;
  const order = getHexOrder('qiehuan', num);
  Taro.showToast({ title: `发送：${buf2hex(order)}` });
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
  if (!openBLENotConnectDialogIfNotConnect()) return;
  const order = getHexOrder('denglizi', value);
  Taro.showToast({ title: `发送：${buf2hex(order)}` });
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
  denglizikaiguanchecked.value = !denglizikaiguanchecked.value;
}

function meigeHandler() {
  if (!openBLENotConnectDialogIfNotConnect()) return;
  const num = meige.value[0];
  const order = getHexOrder('meige', num);
  Taro.showToast({ title: `发送：${buf2hex(order)}` });
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
  if (!openBLENotConnectDialogIfNotConnect()) return;
  const num  = gongzuo.value[0];
  const order = getHexOrder('gongzuo', num);
  Taro.showToast({ title: `发送：${buf2hex(order)}` });
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
  box-shadow: 0px -8 rpx 30px rgba(0, 0, 0, 0.05);
}

.gradient {
  background: linear-gradient(180deg, #e8eaf7 -11.25%, rgba(232, 234, 247, 0) 100%);
}

.white-text {
  font-weight: 500;
  font-size: 20 rpx;
  color: #ffffff;
}

.slider-bg {
  background: linear-gradient(270deg, #008ee5 0%, rgba(0, 142, 229, 0.4) 100%);
}

.slider-block {
  position: absolute;
  width: 155 rpx;
  height: 80 rpx;
  left: 0;
  top: 0;
  border-radius: 20 rpx;
  background: linear-gradient(180deg, #85cffd 0%, #c2e2f5 100%);
}

.nut-switch-label {
  font-size: 22 rpx !important;
}

.nut-switch-label.close {
  transform: translateX(42 rpx) !important;
}

.nut-switch-label.open {
  transform: translateX(-42 rpx) !important;
}
</style>
