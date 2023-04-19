<template>
	<a-layout-header style="background: #fff; padding: 0">
		<menu-unfold-outlined
			v-if="collapsed"
			class="trigger"
			@click="() => (collapsed = !collapsed)"
		/>
		<menu-fold-outlined
			v-else
			class="trigger"
			@click="() => (collapsed = !collapsed)"
		/>
		<a-dropdown :trigger="['click']">
			<template #overlay>
				<a-menu @click="handleMenuClick">
					<a-menu-item key="1">
						<UserOutlined />
						1st menu item``
					</a-menu-item>
					<a-menu-item key="2">
						<UserOutlined />
						2nd menu item
					</a-menu-item>
					<a-menu-item key="3">
						<UserOutlined />
						3rd item
					</a-menu-item>
				</a-menu>
			</template>
			<a-button>
				Button
				<DownOutlined />
			</a-button>
		</a-dropdown>
	</a-layout-header>
</template>

<script setup>
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	UserOutlined,
	DownOutlined,
} from '@ant-design/icons-vue';
import { ref } from 'vue';

const collapsed = ref(false);

const handleMenuClick = e => {
	console.log('click', e);
};
</script>

<!-- <script>
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  DownOutlined,
} from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    DownOutlined,
},
  setup () {
      const handleMenuClick = e => {
      console.log('click', e);
    };

    return {
      collapsed: ref(false),
      handleMenuClick,

    }
  }
})
</script> -->

<style>
.trigger {
	font-size: 18px;
	line-height: 64px;
	padding: 0 24px;
	cursor: pointer;
	transition: color 0.3s;
}

.trigger:hover {
	color: #1890ff;
}
</style>
