<template>
  <div class="container">
    <HospitalTop/>
    <div class="content">
      <router-view></router-view>
    </div>
    <HosptialBottom/>
    <Login v-if="userStore.visiable"/>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
import useUserStore from './store/modules/user';
export default defineComponent({
  name:'App',
  setup(){
    const userStore=useUserStore()
    return {
      userStore
    }
  }
})
</script>
<style lang="scss" scoped>
.container{
  display: flex;
  flex-direction: column;
  align-items: center;
  .content{
    width: 1200px;
    min-height: 900px;
    margin-top: 70px;
  }
}
</style>