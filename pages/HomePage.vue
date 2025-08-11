<template>
  <Tabs value="0">
    <TabList>
      <Tab value="0" class="flex items-center gap-2">
        <i class="pi pi-user" />
        <span class="font-bold whitespace-nowrap">Perfil</span>
      </Tab>
      <Tab value="1" class="flex items-center gap-2">
        <i class="pi pi-graduation-cap" />
        <span class="font-bold whitespace-nowrap">Escolaridade/Cursos</span>
      </Tab>
      <Tab value="2" class="flex items-center gap-2">
        <i class="pi pi-briefcase" />
        <span class="font-bold whitespace-nowrap">Experiência</span>
        <!-- <Badge value="2" /> -->
      </Tab>
    </TabList>
    <TabPanels>
      <TabPanel value="0">
        <ProfileForm :saveProfile="saveProfile" :isLoading="isLoading" />
      </TabPanel>
      <TabPanel value="1">
        <SchoolingsForm :saveProfile="saveProfile" :isLoading="isLoading" />
      </TabPanel>
      <TabPanel value="2">
        experiência
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>
<script lang="ts" setup>
import ProfileForm from '../src/components/ProfileForm.vue';
import { ref } from 'vue';
import { useToast } from "primevue/usetoast";
import SchoolingsForm from '../src/components/SchoolingsForm.vue';

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
