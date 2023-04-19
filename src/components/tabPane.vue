<template>
	<a-tab-pane
		v-for="pane in panes"
		:key="pane.key"
		:tab="pane.title"
		:closable="pane.closable"
	>
		<!-- @tabClick="openContent(pane.to)" -->
		{{ pane.content }}
	</a-tab-pane>
</template>

<script setup>
import openContent from '@/DemoApp.vue';
const props = defineProps({
	panes: Array,
});
console.log(props.value);
</script>
