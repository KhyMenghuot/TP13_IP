<script setup>
import { RouterLink, RouterView } from 'vue-router'
import LayoutVue from './components/layout/Layout.vue'
import listPro from './views/list_product.vue'
import daskboard from './components/layout/Daskboard.vue'
</script>

<template>
    <div>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/product">Product</RouterLink>
        <RouterLink to="/Admit">Admit</RouterLink>
        <RouterView />
    </div>

</template>

<style scoped lang="scss">

</style>