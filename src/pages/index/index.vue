<template>
  <div class="bg-[#f8f8f8] h-100vh w-750rpx fixed top-0" style="z-index: -1000"></div>
  <img :src="bg" style="position: fixed; width: 750rpx; height: 372rpx; top: 0; z-index: -100" />
  <div class="flex flex-col items-center">
    <div class="relative mt-108rpx w-750rpx h-48rpx flex items-center">
      <div class="flex items-center ml-40rpx text-24rpx text-white">
        <img :src="unconnect" style="width: 48rpx; height: 40rpx" />
        未连接
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
      <div>滑块</div>
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
          <div class="white-text absolute top-8rpx left-24rpx">香型A</div>
          <nut-progress
            percentage="100"
            status="active"
            :text-inside="true"
            stroke-width="20"
            stroke-color="linear-gradient(270deg, #038FE5 0%, rgba(0, 142, 229, 0.4) 100%)"
          >
          </nut-progress>
        </div>
        <div class="mt-16rpx relative">
          <div class="white-text absolute top-8rpx left-24rpx">香型B</div>
          <nut-progress
            percentage="75"
            status="active"
            :text-inside="true"
            stroke-width="20"
            stroke-color="linear-gradient(270deg, #038FE5 0%, rgba(0, 142, 229, 0.4) 100%)"
          >
          </nut-progress>
        </div>
        <div class="mt-16rpx relative">
          <div class="white-text absolute top-8rpx left-24rpx">香型C</div>
          <nut-progress
            percentage="25"
            status="active"
            :text-inside="true"
            stroke-width="20"
            stroke-color="linear-gradient(270deg, #038FE5 0%, rgba(0, 142, 229, 0.4) 100%)"
          >
          </nut-progress>
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
          <nut-switch v-model="kaiguanchecked" active-text="ON" inactive-text="OFF" />
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
          >
            香氛A
          </div>
          <div
            class="w-98rpx h-40rpx bg-#008EE5 text-center rounded-40rpx mb-12rpx leading-40rpx"
            style="font-size: 22rpx; color: #ffffff"
          >
            香氛B
          </div>
          <div
            class="w-98rpx h-40rpx bg-#008EE5 text-center rounded-40rpx leading-40rpx"
            style="font-size: 22rpx; color: #ffffff"
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
          <nut-switch v-model="kaiguanchecked" active-text="ON" inactive-text="OFF" />
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
          >
            每隔一秒
          </div>
          <div
            class="w-98rpx h-40rpx text-center rounded-40rpx leading-40rpx"
            style="border: 2px solid #37adf5; font-size: 18rpx; color: #1a1a1a"
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
      <div class="flex flex-1 justify-center items-center" @click="handleToBluetooth">
        <img :src="lianxi" style="width: 42rpx; height: 42rpx" />
        <span class="ml-9px">联系方式</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { navigateTo } from '@tarojs/taro';
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

const kaiguanchecked = ref(true);

function handleToAbout() {
  navigateTo({
    url: '/package/about/index'
  });
}

function handleToBluetooth() {
  navigateTo({
    url: '/package/bluetoothConnect/index'
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
  font-style: normal;
  font-weight: 500;
  font-size: 20rpx;
  color: #ffffff;
}
</style>
