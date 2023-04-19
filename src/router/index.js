import { createRouter, createWebHistory } from 'vue-router';
import WorkspaceView from '@/views/WorkspaceView.vue';
import BoardView from '@/views/BoardView.vue';
import UserAdminView from '@/views/UserAdminView.vue';
import UserAdminView2 from '@/views/UserAdminView2.vue';
import menuView from '@/views/menuView.vue';

const routes = [
	{
		path: '/',
		component: WorkspaceView,
	},
	{
		path: '/workspace',
		component: WorkspaceView,
	},
	{
		path: '/board',
		component: BoardView,
	},
	{
		path: '/useradmin',
		component: UserAdminView,
	},
	{
		path: '/useradmin2',
		component: UserAdminView2,
	},
	{
		path: '/menu',
		component: menuView,
	},
];

const router = createRouter({
	history: createWebHistory('/'),
	routes,
});

export default router;
