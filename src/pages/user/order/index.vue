<template>
    <div>
        <div v-if="$route.query.orderId">
            <Detail/>
        </div>
        <div v-else>
            <AllOrder/>
        </div>
    </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
import { useRoute } from 'vue-router';
import Detail from './detail/index.vue'
import AllOrder from './allOrder/index.vue'
export default defineComponent({
    name:'Order',
    components:{Detail,AllOrder},
    setup(){
        const $route=useRoute()
        return {
        }
    }
})
</script>
<style>
</style>