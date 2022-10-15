<template>
  <div class="flex items-center flex-col">
    <div v-for="item in bluetoothList" :key="item.name" class="w-670rpx bluetoothCell px-40rpx pt-40rpx">
      <div class="flex justify-between">
        <div class="title">{{ item.name }}</div>
        <div class="buttom-text" :style="{ color: connectUUID === item.uuid ? '#00C777' : '#000' }">
          {{ connectUUID === item.uuid ? '已连接' : '未连接' }}
        </div>
      </div>
      <div class="flex justify-between mt-24rpx">
        <div class="info-text">信号强度：</div>
        <div class="info-text">{{ item.signalStrength }}</div>
      </div>
      <div class="flex justify-between mt-24rpx">
        <div class="info-text">UUID：</div>
        <div class="info-text">{{ item.uuid }}</div>
      </div>
      <div class="flex justify-between mt-24rpx">
        <div class="info-text">SERVICE数量：</div>
        <div class="info-text">{{ item.serviceNum }}</div>
      </div>
      <div class="w-670rpx h-1rpx mt-40rpx bg-[#E7E7E7]"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
definePageConfig({
  navigationBarTitleText: '蓝牙连接',
  navigationStyle: 'default',
  backgroundTextStyle: 'dark',
  enablePullDownRefresh: true
});

const connectUUID = ref('1231231231231');

const bluetoothList = ref<
  {
    name: string;
    uuid: string;
    signalStrength: number;
    serviceNum: number;
  }[]
>([
  {
    name: 'xiangfen 001',
    uuid: '1231231231231',
    signalStrength: 10,
    serviceNum: 1
  },
  {
    name: 'xiangfen 002',
    uuid: '1231231231232',
    signalStrength: 10,
    serviceNum: 1
  },
  {
    name: 'xiangfen 003',
    uuid: '1231231231233',
    signalStrength: 10,
    serviceNum: 1
  }
]);
</script>

<script lang="ts">
export default {
  onPullDownRefresh: () => {
    console.log('123');
  }
};
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
