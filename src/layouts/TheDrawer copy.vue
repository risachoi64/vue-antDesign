<template>
	<a-layout-sider
		width="256px"
		v-model:collapsed="collapsed"
		:trigger="null"
		collapsible
	>
		<img class="logo" src="../../public/ant-design3.png" />
		<a-menu theme="dark" v-model:selectedKeys="selectedKeys" mode="inline">
			<a-menu-item key="1">
				<pie-chart-outlined />
				<span>워크플레이스</span>
			</a-menu-item>
			<a-sub-menu key="sub1">
				<template #title>
					<span>
						<user-outlined />
						<span>게시판 관리</span>
					</span>
				</template>
				<a-menu-item key="2">
					<router-link to="/board">게시판 관리</router-link>
				</a-menu-item>
			</a-sub-menu>
			<a-sub-menu key="sub2">
				<template #title>
					<span>
						<team-outlined />
						<span>시스템 관리</span>
					</span>
				</template>
				<a-menu-item key="3">
					<router-link to="/useradmin">사용자 관리</router-link>
				</a-menu-item>
				<a-menu-item key="4">사용자 관리 2</a-menu-item>
				<a-menu-item key="5">메뉴 관리</a-menu-item>
				<a-menu-item key="6">ROLE 관리</a-menu-item>
				<a-menu-item key="7">시스템로그</a-menu-item>
			</a-sub-menu>
		</a-menu>
	</a-layout-sider>
</template>

<script setup>
import {
	PieChartOutlined,
	UserOutlined,
	TeamOutlined,
} from '@ant-design/icons-vue';
import { ref } from 'vue';

const collapsed = ref(false);
const selectedKeys = ref(['1']);
</script>

<style>
.logo {
	align-items: center;
	height: 40px;
	margin: 10px 10px 10px 35px;
	/* background: rgba(255, 255, 255, 0.3); */
}
</style>
