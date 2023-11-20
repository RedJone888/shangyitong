<template>
</template>
<script lang="ts">
import { defineComponent,onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { SET_TOKEN } from '@/utils/user';
export default defineComponent({
    name: 'WXLogin',
    setup() {
        const $route = useRoute()
        SET_TOKEN(JSON.stringify($route.query))
        // console.log('干活了');
        // let html=document.querySelector('html')
        // html.style.display='none'
        // console.log('干完了');
        
        return {
        }
    }
})
</script>
<style></style>