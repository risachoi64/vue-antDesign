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
							<RouterLink
								:to="item.to"
								@click="[add, goToPage(item.title), pushTabContent(item)]"
								>{{ item.title }} 1st depth</RouterLink
							>
						</a-menu-item>
					</template>
					<template v-else>
						<sub-menu :key="item.key" :menu-info="item" />
					</template>
				</template>
			</a-menu>
		</a-layout-sider>
		<a-layout>
			<TheHeader />
			<div class="card-container">
				<a-tabs
					v-model:activeKey="activeKey"
					hide-add
					type="editable-card"
					@edit="onEdit"
				>
					<a-tab-pane
						v-for="pane in panes"
						:key="pane.key"
						:tab="pane.title"
						:closable="pane.closable"
					>
						<!--@click="goToPage"-->
						{{ pane.content }}
					</a-tab-pane>
				</a-tabs>
			</div>
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
import { ref } from 'vue';
import { PieChartOutlined, MailOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';

const panes = ref([
	{
		key: '1',
		title: '워크스페이스',
		to: '/workspace',
	},
]);

// Tab
const activeKey = ref(panes.value[0].key);
const newTabIndex = ref(0);
const add = () => {
	activeKey.value = `newTab${newTabIndex.value++}`;
	panes.value.push({
		title: `New Tab ${activeKey.value}`,
		content: `Content of new Tab ${activeKey.value}`,
		key: activeKey.value,
	});
};

const router = useRouter();
const goToPage = title => {
	router.push(title);
};
const pushTabContent = item => {
	this.panes.push(item);
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

//Drawer
// you can rewrite it to a single file component, if not, you should config vue alias to vue/dist/vue.esm-bundler.js
const SubMenu = {
	name: 'SubMenu',
	props: {
		menuInfo: {
			type: Object,
			default: () => ({}),
		},
	},
	template: `
    <a-sub-menu :key="menuInfo.key">
      <template #icon><MailOutlined /></template>
      <template #title>{{ menuInfo.title }}</template>
      <template v-for="item in menuInfo.children" :key="item.key">
        <template v-if="!item.children">
          <a-menu-item :key="item.key">
            <template #icon>
              <PieChartOutlined />
            </template>
            <RouterLink :to="item.to" @click="add">{{ item.title }} 2nd depth</RouterLink>
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :menu-info="item" :key="item.key" />
        </template>
      </template>
    </a-sub-menu>
  `,
	components: {
		PieChartOutlined,
		MailOutlined,
	},
};
const list = [
	{
		key: '1',
		title: '워크스페이스',
		to: '/workspace',
	},
	{
		key: '2',
		title: '게시판 관리',
		children: [
			{
				key: '2.1',
				title: '게시판 관리',
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
				to: '/useradmin',
			},
			{
				key: '3.2',
				title: '사용자 관리',
				to: '/useradmin2',
			},
		],
	},
];
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
</style>
