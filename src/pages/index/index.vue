<template>
  <div class="bg-[#f8f8f8] h-100vh w-750rpx fixed top-0" style="z-index: -1000"></div>
  <img :src="bg" style="position: fixed; width: 750rpx; height: 372rpx; top: 0; z-index: -100" />
  <div class="flex flex-col items-center">
    <div class="relative mt-54px w-375px h-24px flex items-center">
      <div class="flex items-center ml-20px text-12px text-white">
        <img :src="unconnect" style="width: 48rpx; height: 40rpx" />
        未连接
      </div>
      <div class="absolute left-137px text-17px text-white">净化香薰系统</div>
    </div>
    <div class="mt-70px p-12px rounded-10px bg-white w-335px h-126px relative">
      <div class="absolute right-12px top-12px flex items-center" style="color: #999; font-size: 24rpx">
        <img :src="fuwei" style="width: 28rpx; height: 28rpx; margin-top: 2rpx; margin-right: 10rpx" />
        香水复位
      </div>
      <div class="flex items-center" style="font-weight: 700; font-size: 29rpx">
        <div class="w-54px h-54px rounded-full flex justify-center items-center mr-12px gradient">
          <img :src="nongdu" style="width: 30rpx; height: 40rpx" />
        </div>
        香氛浓度
      </div>
      <div>滑块</div>
    </div>
    <div class="mt-20px p-12px rounded-10px bg-white w-335px relative">
      <div class="absolute right-25px top-18px">
        <img :src="shadow" style="height: 200rpx; width: 200rpx" />
      </div>
      <div class="flex items-center" style="font-weight: 700; font-size: 29rpx">
        <div class="w-54px h-54px rounded-full flex justify-center items-center mr-12px gradient">
          <img :src="nongdu" style="width: 30rpx; height: 40rpx" />
        </div>
        香氛剩余量
      </div>
      <div class="mt-16px">
        <div class="relative">
          <div class="white-text absolute top-4px left-12px">香型A</div>
          <nut-progress
            percentage="100"
            status="active"
            :text-inside="true"
            stroke-width="20"
            stroke-color="linear-gradient(270deg, #038FE5 0%, rgba(0, 142, 229, 0.4) 100%)"
          >
          </nut-progress>
        </div>
        <div class="mt-8px relative">
          <div class="white-text absolute top-4px left-12px">香型B</div>
          <nut-progress
            percentage="75"
            status="active"
            :text-inside="true"
            stroke-width="20"
            stroke-color="linear-gradient(270deg, #038FE5 0%, rgba(0, 142, 229, 0.4) 100%)"
          >
          </nut-progress>
        </div>
        <div class="mt-8px relative">
          <div class="white-text absolute top-4px left-12px">香型C</div>
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
    <div class="box-shadow fixed w-375px h-60px bg-white bottom-0 flex items-center">
      <div class="flex flex-1 justify-center items-center">
        <img :src="guanyu" style="width: 42rpx; height: 42rpx" />
        <span class="ml-9px">关于我们</span>
      </div>
      <div class="w-2px h-16px bg-black rounded-2px"></div>
      <div class="flex flex-1 justify-center items-center">
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

const visible1 = ref<boolean>(false);

function baseClick() {
  visible1.value = true;
}

function handleToA() {
  navigateTo({
    url: '/package/packageA/index'
  });
}

function handleToB() {
  navigateTo({
    url: '/package/packageB/index'
  });
}

function handleToC() {
  navigateTo({
    url: '/package/packageC/index'
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
  box-shadow: 0px -4px 30px rgba(0, 0, 0, 0.05);
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
