<template>
    <BsApp>
        <BsConfirm/>
        <BsMenu permanent :rail="!isMenuExpanded" @click="handleMenuClick"
                :class="{ 'menu-expanded': isMenuExpanded, 'menu-collapsed': !isMenuExpanded }" data-cy="menu">
            <BsList>
                <div
                    class="d-flex pl-5 pr-5 pt-2 pb-2 list-title "
                    :class="isMenuExpanded ? 'justify-space-between' : 'justify-center'"
                >
                    <img v-if="isMenuExpanded" :src="logoUrl" alt="Logo Bússola" class="img-logo"/>
                    <img v-if="!isMenuExpanded" :src="logoRetratilUrl" alt="Logo Bússola" class="img-logo-retratil"/>
                    <BsButton
                        v-if="isMenuExpanded"
                        icon
                        variant="text"
                        size="small"
                        @click.stop="toggleMenu"
                    >
                        <BsIcon size="14" icon="fa-solid fa-chevron-left"/>
                    </BsButton>
                </div>

                <template v-if="isAdmin">
                    <AdminMenu :isMenuExpanded="isMenuExpanded"/>
                </template>

                <template v-else>
                    <FinanceiroMenu :isMenuExpanded="isMenuExpanded"/>
                </template>

            </BsList>
        </BsMenu>

        <BsAppBar color="#FFFFFF" flat class="app-bar" density="compact">
            <div class="w-100 d-flex justify-end mr-5">
                <BsDropMenu>
                    <template #activator="{ props }">
                        <BsAvatar
                            v-bind="props"
                            class="cursor-pointer"
                            color="#0F5AE8"
                            size="32"
                        >
                            {{ userInitial }}
                        </BsAvatar>
                    </template>

                    <BsList nav>
                        <BsListItem activeColor="#D4DBDE" class="app-bar__user-menu" @click="handleLogout">
                            <span>Sair</span>
                            <template #prepend>
                                <BsIcon icon="fas fa-sign-out" color="error"></BsIcon>
                            </template>
                        </BsListItem>
                    </BsList>
                </BsDropMenu>
            </div>
        </BsAppBar>

        <BsMain class="main">
            <router-view/>
            <slot/>
        </BsMain>
    </BsApp>
</template>

<script setup lang="ts">
import {ref, watch, computed} from 'vue'
import {useRoute, useRouter} from 'vue-router';
import {useAuthStore} from "@/stores/authStore";

import AdminMenu from './menu/AdminMenu.vue'
import FinanceiroMenu from './menu/FinanceiroMenu.vue'

import logoUrl from '@/assets/Logo.svg';
import logoRetratilUrl from '@/assets/logo_bussola_retratil.svg';

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();

const userNames = (auth.user?.nome || '').split(' ').filter(Boolean);
let userInitial = userNames[0]?.[0] || 'U';
if (userNames[1]) userInitial += userNames[1][0];

const isAdmin = computed(() => (auth.user?.perfil || '').toLowerCase() === 'admin');

const isMenuExpanded = ref(localStorage.getItem('menu-expanded') !== 'false');

watch(isMenuExpanded, (newValue) => {
    localStorage.setItem('menu-expanded', newValue.toString())
})

const toggleMenu = () => isMenuExpanded.value = !isMenuExpanded.value;

const handleMenuClick = () => {
    if (!isMenuExpanded.value) {
        isMenuExpanded.value = true;
    }
}

const handleLogout = () => {
    auth.logout();
    localStorage.setItem('menu-expanded', 'true');
    router.push('/login');
};
</script>
