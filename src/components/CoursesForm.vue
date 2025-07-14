<template>
  <div class="card flex justify-center">
    <Form class="flex flex-col gap-4 w-full sm:w-56">
      <!-- <div class="flex flex-col gap-1">
        <label for="photo">Foto</label>
        <InputText id="photo" name="furllname" type="text" v-model="form.photo" placeholder="foto" />
      </div> -->
      {{ form }}
      <div class="flex flex-col gap-1">
        <label for="fullname">Nome completo</label>
        <InputText id="fullname" name="furllname" type="text" v-model="form.fullname" placeholder="Nome completo" />
      </div>
      <div class="flex flex-col gap-1">
        <label for="age">Idade</label>
        <InputNumber inputId="age" name="age" v-model="form.age" :min="0" :max="80" :useGrouping="false"/>
      </div>
      <div class="flex flex-col gap-1">
        <label for="age">Gênero</label>
        <Select v-model="form.gender" :options="[{ name: 'masculino', code: 'masculino' }, { name: 'feminino', code: 'feminino' }]" optionLabel="name" placeholder="Selecione o gênero" />
      </div>
      <div class="flex flex-col gap-1">
        <label for="phoneNumber">Número (preferência whatsApp)</label>
        <InputMask id="phoneNumber" name="phoneNumber" v-model="form.phoneNumber" mask="(99)999999999" placeholder="(99)999999999" />
      </div>

      <Button @click="save" type="submit" severity="primary" :loading="props.isLoading" label="Salvar" />
    </Form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
  saveProfile: {
    type: Function,
    default: () => {}
  }
})

interface Profile {
  fullname: string,
  age: number,
  gender: string,
  about: string,
  photo: string,
  phoneNumber: string,
}

const form = reactive<Profile>({
  fullname: '',
  age: 0,
  gender: '',
  about: '',
  photo: '',
  phoneNumber: '',
});

async function save () {
  // props.saveProfile()
};
</script>