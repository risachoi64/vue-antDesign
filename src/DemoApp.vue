<template>
	<a-layout>
		<!-- <TheDrawer /> -->
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
							<RouterLink :to="item.to" @click="openTabPane(item)"
								>{{ item.title }} 1st depth</RouterLink
							>
						</a-menu-item>
					</template>
					<template v-else>
						<!-- <sub-menu :key="item.key" :menu-info="item" /> -->
						<a-sub-menu>
							<template #icon><MailOutlined /></template>
							<template #title>{{ item.title }}</template>
							<a-menu-item v-for="item in item.children" :key="item.key">
								<RouterLink :to="item.to" @click="openTabPane(item)"
									>{{ item.title }} 2nd depth</RouterLink
								>
							</a-menu-item>
						</a-sub-menu>
					</template>
				</template>
			</a-menu>
		</a-layout-sider>
		<a-layout>
			<TheHeader />
			<!-- <div :style="{ marginBottom: '16px' }">
        <a-button @click="add">ADD</a-button>
      </div>           -->
			<div class="card-container">
				<a-tabs
					v-model:activeKey="activeKey"
					hide-add
					type="editable-card"
					@edit="onEdit"
					@change="openContent(activeKey)"
				>
					<a-tab-pane
						v-for="pane in panes"
						:key="pane.key"
						:tab="pane.title"
						:closable="pane.closable"
					>
						{{ pane.content }}
					</a-tab-pane>
					<!-- <tabPane
						v-for="pane in panes"
						:key="pane.key"
						:tab="pane.title"
						:closable="pane.closable"
					/> -->
				</a-tabs>
			</div>
			.
			<TheView></TheView>
			<TheFooter />
		</a-layout>
	</a-layout>
</template>

<script setup>
// import TheDrawer from './layouts/TheDrawer.vue';
import TheHeader from './layouts/TheHeader.vue';
import TheFooter from './layouts/TheFooter.vue';
import TheView from './layouts/TheView.vue';
// import tabPane from './components/tabPane.vue';
import { ref } from 'vue/dist/vue.esm-bundler.js';
import {
	PieChartOutlined,
	MailOutlined,
	ConsoleSqlOutlined,
} from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';

// import { useRouter } from 'vue-router';

// Tab
// const newTabIndex = ref(0);
const router = useRouter();

const openTabPane = item => {
	activeKey.value = item.key;
	// add(item);
	add_find(item);
	// console.log(`openPane 함수 : ${panes.value}`);
};

const openContent = activeKey => {
	// console.log(`ackivekey: ${activeKey}`);
	const activePane = panes.value.find(pane => pane.key === activeKey);
	router.push({ path: `${activePane.to}` });
	// console.log(`find 결과: ${activePane.key}, ${activePane.to}`);
};
const add = item => {
	for (var i = 0; i < panes.value.length; i++) {
		// console.log(panes.value[i].key);
		// console.log(item.key);
		if (panes.value[i].key === item.key) {
			activeKey.value = panes.value[i].key;
			// console.log('이미 있음');
			break;
		} else {
			if (i === panes.value.length - 1) {
				// console.log('새탭 생성');
				panes.value.push(item);
				break;
			}
		}
	}
};

const add_find = item => {
	// console.log(item.key);
	panes.value.find(pane => pane.key === item.key)
		? (activeKey.value = item.key)
		: panes.value.push(item);
};

const remove = targetKey => {
	let lastIndex = 0;
	panes.value.forEach((pane, i) => {
		if (pane.key === targetKey) {
			lastIndex = i - 1;
		}
	});
	panes.value = panes.value.filter(pane => pane.key !== targetKey);
	if (panes.value.length && activeKey.value === targetKey) {
		if (lastIndex >= 0) {
			activeKey.value = panes.value[lastIndex].key;
		} else {
			activeKey.value = panes.value[0].key;
		}
	}
};
const onEdit = targetKey => {
	remove(targetKey);
};

const list = [
	{
		key: '1',
		title: '워크스페이스',
		content: '워크스페이스',
		to: '/workspace',
	},
	{
		key: '2',
		title: '게시판 관리',
		children: [
			{
				key: '2.1',
				title: '게시판 관리',
				content: '게시판 관리/게시판 관리',
				to: '/board',
			},
		],
	},
	{
		key: '3',
		title: '시스템 관리',
		children: [
			{
				key: '3.1',
				title: '사용자 관리',
				content: '시스템 관리/사용자 관리',
				to: '/useradmin',
			},
			{
				key: '3.2',
				title: '사용자 관리2',
				content: '시스템 관리/사용자 관리2',
				to: '/useradmin2',
			},
			{
				key: '3.3',
				title: '메뉴 관리',
				content: '시스템 관리/메뉴 관리',
				to: '/menu',
			},
		],
	},
];

// console.log(`${list[0].key}`);
const panes = ref([list[0]]);
const activeKey = ref(panes.value[0].key);
const selectedKeys = ref(['1']);
const openKeys = ref(['2']);
const collapsed = ref(true);
const toggleCollapsed = () => {
	collapsed.value = !collapsed.value;
};
toggleCollapsed();
</script>
<style>
/* tabs */
.card-container {
	background: #f5f5f5;
	overflow: hidden;
	padding: 24px;
	display: flex;
}
.card-container > .ant-tabs-card > .ant-tabs-content {
	height: 120px;
	margin-top: -16px;
}

.card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
	background: #fff;
	padding: 16px;
}

.card-container > .ant-tabs-card > .ant-tabs-bar {
	border-color: #fff;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
	border-color: transparent;
	background: transparent;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
	border-color: #fff;
	background: #fff;
}

.logo {
	align-items: center;
	height: 40px;
	margin: 10px 10px 10px 35px;
	/* background: rgba(255, 255, 255, 0.3); */
}
</style>
