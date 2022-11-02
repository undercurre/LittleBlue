<template>
	<div style="width: 134rpx; overflow: hidden; margin-top: 32px">
		<div style="width: 100px; height: 240rpx; overflow-y: scroll">
			<div
				style="
          width: 134rpx;
          height: 240rpx;
          display: flex;
          flex-direction: column;
          align-items: center;
        "
			>
				<div v-for="item in column" style="width: 34rpx; height: 60rpx; text-align: center; line-height: 60rpx; font-size: 12px">
					{{ item }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		column: Array,
	},
};
</script>
