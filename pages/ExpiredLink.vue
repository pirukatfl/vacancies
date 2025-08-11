<template>
  <h1>Link expirado</h1>
</template>
<script lang="ts" setup>
import ProfileForm from '../src/components/ProfileForm.vue';
import { ref } from 'vue';
import { useToast } from "primevue/usetoast";

const toast = useToast()

const isLoading = ref(false)


function saveProfile() {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    toast.add({ severity: 'success', summary: 'Dados atualizados!', life: 3000 });
  }, 3000)
}
</script>
<style lang="scss">
.p-tablist-tab-list {
  flex-wrap: wrap!important;
}
</style>
