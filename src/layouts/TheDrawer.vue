<template>
	<a-layout-sider
		width="256px"
		v-model:collapsed="collapsed"
		:trigger="null"
		collapsible
	>
		<img class="logo" src="../../public/ant-design3.png" />
		<a-menu
			v-model:openKeys="openKeys"
			v-model:selectedKeys="selectedKeys"
			mode="inline"
			theme="dark"
			:inline-collapsed="collapsed"
		>
			<template v-for="item in list" :key="item.key">
				<template v-if="!item.children">
					<a-menu-item :key="item.key">
						<template #icon>
							<PieChartOutlined />
						</template>
						<RouterLink :to="item.to">{{ item.title }} 1st depth</RouterLink>
					</a-menu-item>
				</template>
				<template v-else>
					<!-- <sub-menu :key="item.key" :menu-info="item" /> -->
					<a-sub-menu>
						<template #icon><MailOutlined /></template>
						<template #title>{{ menuInfo.title }}</template>
						<template v-for="item in menuInfo.children" :key="item.key">
							<template>
								<a-menu-item :key="item.key">
									<template #icon>
										<PieChartOutlined />
									</template>
									<RouterLink :to="item.to"
										>{{ item.title }} 2nd depth</RouterLink
									>
								</a-menu-item>
							</template>
						</template>
					</a-sub-menu>
				</template>
			</template>
		</a-menu>
	</a-layout-sider>
</template>

<script setup>
import { ref } from 'vue/dist/vue.esm-bundler.js';
import { PieChartOutlined, MailOutlined } from '@ant-design/icons-vue';

// export default defineComponent({
//   components: {
//     'sub-menu': SubMenu,
//     PieChartOutlined,
//   },

const selectedKeys = ref(['1']);
const openKeys = ref(['2']);
const collapsed = ref(true);
const toggleCollapsed = () => {
	collapsed.value = !collapsed.value;
};
toggleCollapsed();
</script>

<style>
.logo {
	align-items: center;
	height: 40px;
	margin: 10px 10px 10px 35px;
	/* background: rgba(255, 255, 255, 0.3); */
}
</style>
