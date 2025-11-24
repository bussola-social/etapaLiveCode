<template>
    <div>
        <BsListItem
            to="/home"
            class="my-2"
            prepend-icon="fa-regular fa-house"
            activeColor="#0F5AE8"
            :title="isMenuExpanded ? 'Início' : ''"
        />

        <BsListGroup value="Gestão" class="my-2" activeColor="#0F5AE8">
            <template #activator="{ props, isOpen }">
                <BsListItem
                    activeColor="#0F5AE8"
                    v-bind="props"
                    :append-icon="isOpen ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"
                    prepend-icon="fa-regular fa-user-gear"
                    :title="isMenuExpanded ? 'Gestão' : ''"
                    active-class="active-list-item"
                />
            </template>
            <BsListItem to="/admin/gestao/organizacoes" title="Organizações"/>
            <BsListItem to="/admin/gestao/usuarios" title="Usuários"/>
            <BsListItem to="/admin/gestao/planos-usuarios" title="Planos dos Usuários"/>
        </BsListGroup>
    </div>
</template>

<script setup lang="ts">
defineProps({
    isMenuExpanded: Boolean
})
</script>
