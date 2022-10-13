<template>
  <div class="bg-[#f8f8f8]">

		<div class="flex w-screen py-32rpx px-40rpx box-border flex-wrap">
			<div class="w-320rpx h-230rpx bg-white mr-15rpx mb-15rpx rounded-16rpx p-32rpx box-border flex flex-col justify-between">
				<div class="flex justify-between items-center">
					<div class="w-80rpx h-80rpx rounded-full flex justify-center items-center" style="background: linear-gradient(180deg, #E8EAF7 -11.25%, rgba(232, 234, 247, 0) 100%);">
						<img :src="kaiguan" style="width: 42rpx; height: 42rpx">
					</div>
					<nut-switch v-model="kaiguanchecked" active-text="ON" inactive-text="OFF" />
				</div>
				<h3 style="font-size: 30rpx; font-weight: 700;">香氛开关</h3>
			</div>
			<div class="w-320rpx h-230rpx bg-white ml-15rpx mb-15rpx rounded-16rpx p-32rpx box-border flex justify-between">
				<div class="flex flex-col justify-between items-center">
					<div class="w-80rpx h-80rpx rounded-full flex justify-center items-center self-start" style="background: linear-gradient(180deg, #E8EAF7 -11.25%, rgba(232, 234, 247, 0) 100%);">
						<img :src="qiehuan" style="width: 42rpx; height: 42rpx">
					</div>
					<h3 style="font-size: 30rpx; font-weight: 700;">香氛切换</h3>
				</div>
				<div class="flex flex-col justify-between">
					<div class="w-98rpx h-40rpx bg-#008EE5 text-center rounded-40rpx mb-12rpx leading-40rpx" style="font-size: 22rpx; color: #ffffff">香氛A</div>
					<div class="w-98rpx h-40rpx bg-#008EE5 text-center rounded-40rpx mb-12rpx leading-40rpx" style="font-size: 22rpx; color: #ffffff">香氛B</div>
					<div class="w-98rpx h-40rpx bg-#008EE5 text-center rounded-40rpx leading-40rpx" style="font-size: 22rpx; color: #ffffff">香氛C</div>
				</div>
			</div>
			<div class="w-320rpx h-230rpx bg-white mr-15rpx mt-15rpx rounded-16rpx p-32rpx box-border flex flex-col justify-between">
				<div class="flex justify-between items-center">
					<div class="w-80rpx h-80rpx rounded-full flex justify-center items-center" style="background: linear-gradient(180deg, #E8EAF7 -11.25%, rgba(232, 234, 247, 0) 100%);">
						<img :src="denglizi" style="width: 42rpx; height: 42rpx">
					</div>
					<nut-switch v-model="kaiguanchecked" active-text="ON" inactive-text="OFF" />
				</div>
				<h3 style="font-size: 30rpx; font-weight: 700;">等离子开关</h3>
			</div>
			<div class="w-320rpx h-230rpx bg-white ml-15rpx mt-15rpx rounded-16rpx p-32rpx box-border flex justify-between">
				<div class="flex flex-col justify-between items-center">
					<div class="w-80rpx h-80rpx rounded-full flex justify-center items-center self-start" style="background: linear-gradient(180deg, #E8EAF7 -11.25%, rgba(232, 234, 247, 0) 100%);">
						<img :src="shezhi" style="width: 42rpx; height: 42rpx">
					</div>
					<h3 style="font-size: 30rpx; font-weight: 700;">香氛设置</h3>
				</div>
				<div class="flex flex-col justify-between items-end">
					<div class="w-46rpx h-46rpx rounded-full flex justify-center items-center mb-12rpx" style="box-shadow: 0 5rpx 30rpx 0 rgba(0, 142, 229, 0.2)">
						<img :src="shezhiIcon" style="width: 29rpx; height: 29rpx">
					</div>
					<div class="w-98rpx h-40rpx text-center rounded-40rpx mb-12rpx leading-40rpx" style="border: 2px solid #37ADF5; font-size: 18rpx; color: #1A1A1A">每隔一秒</div>
					<div class="w-98rpx h-40rpx text-center rounded-40rpx leading-40rpx" style="border: 2px solid #37ADF5; font-size: 18rpx; color: #1A1A1A">工作一秒</div>
				</div>
			</div>
		</div>
    <div class="box-shadow fixed w-375px h-60px bg-white bottom-0 flex items-center">
      <div class="flex flex-1 justify-center items-center" @click="handleToB">
        <img :src="guanyu" alt="" style="width: 42rpx; height: 42rpx" />
        <span class="ml-9px">关于我们</span>
      </div>
      <div class="w-2px h-16px bg-black rounded-2px"></div>
      <div class="flex flex-1 justify-center items-center">
        <img :src="lianxi" alt="" style="width: 42rpx; height: 42rpx" />
        <span class="ml-9px">联系方式</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { navigateTo } from '@tarojs/taro';
import guanyu from '../../assets/images/guanyu.png';
import lianxi from '../../assets/images/lianxi.png';
import kaiguan from '../../assets/images/kaiguan.png';
import denglizi from '../../assets/images/denglizi.png';
import qiehuan from '../../assets/images/qiehuan.png';
import shezhi from '../../assets/images/shezhi.png';
import shezhiIcon from '../../assets/images/shezhiIcon.png';

const visible1 = ref<boolean>(false);
const kaiguanchecked = ref(true);

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
</style>
