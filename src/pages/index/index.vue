<template>
  <div class="bg-[#f8f8f8]">
    <nut-cell title="基础弹框" @click="baseClick"></nut-cell>
    <nut-cell title="分包A" @click="handleToA"></nut-cell>
    <nut-cell title="分包B" @click="handleToB"></nut-cell>
    <nut-cell title="TSX写法" @click="handleToC"></nut-cell>
    <nut-dialog v-model:visible="visible1" title="基础弹框" content="这是基础弹框。" />
    <div class="box-shadow fixed w-375px h-60px bg-white bottom-0 flex items-center">
      <div class="flex flex-1 justify-center items-center">
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
</style>
