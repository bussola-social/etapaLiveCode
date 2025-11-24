import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router';
import AppLayout from "@/layout/AppLayout.vue";
import NotFound from "@/views/errors/NotFound.vue";
import Home from "../pages/Home.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: AppLayout,
        meta: {requiresAuth: true},
        children: [
            {path: 'home', component: Home },
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
