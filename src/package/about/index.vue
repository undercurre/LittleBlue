<template>
	<div class="flex items-center flex-col">
		<div class="mt-52rpx mb-64rpx mx-42rpx">
			<p style="font-size: 26rpx; line-height: 46rpx; letter-spacing: 0.1em; margin-bottom: 64rpx; color: #333333;">
				公司倡导“率真存厚、立志有恒,奋斗为本、成就客户;创造分享、共同成长”的经营理念，是您值得信赖的专家伙伴。
			</p>
			<p style="font-size: 26rpx; line-height: 46rpx; letter-spacing: 0.1em; margin-bottom: 64rpx; color: #333333;">
				中软国际在服务财富500强企业及大中型客户的近二十年里，在电信、政府、制造、金融公司倡导：率真存厚、立志有恒，奋斗为本、成就客户;创造分享、共同成长的经营理念，是您值得信赖的专家伙伴。
			</p>
			<p style="font-size: 26rpx; line-height: 46rpx; letter-spacing: 0.1em; color: #333333;">
				中软国际在服务财富500强企业及大中型客户的近二十年里，在电信、政府、制造、金融。
			</p>
		</div>
		<img :src="bg" style="width: 650rpx; height: 390rpx; border-radius: 20rpx">
	</div>
</template>
<script lang="ts" setup>
import bg from '../../assets/images/bg.png'
definePageConfig({
  navigationBarTitleText: '关于我们',
  enablePullDownRefresh: true,
  backgroundTextStyle: 'dark'
});
</script>

<style lang="scss">
</style>
