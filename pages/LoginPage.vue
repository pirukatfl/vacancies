<template>
  <div class="flex h-screen bg-gray-200 justify-center items-center">
    <div class="bg-white rounded-xl p-6 shadow-lg shadow-violet-500/50">
      <div class="text-violet-700 font-bold pb-2 text-center text-lg">Lupa Vagas</div>
      <Form :initialValues :resolver @submit="onFormSubmit" class="flex flex-col w-full sm:w-56">
        <FormField v-slot="$field" as="section" name="email" initialValue="">
          <InputText type="text" placeholder="Email" class="mb-1" />
          <div class="h-1 mb-6">
            <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
          </div>
        </FormField>
        <FormField v-slot="$field" asChild name="password" initialValue="">
          <Password type="text" placeholder="Password" :feedback="false" class="mb-1" />
          <div class="h1 mb-5">
            <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
          </div>
        </FormField>
        <Button class="" type="submit" severity="primary" label="Submit" />
      </Form>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import { useToast } from 'primevue/usetoast';

const axios = inject('axios')
console.log('axios', await axios.get('/profiles?name=furlannn'))
const initialValues = ref({
    email: '',
    password: ''
});

const toast = useToast();

const resolver =  zodResolver(
    z.object({
        email: z.string().min(1, { message: 'informe o email' }).email('este email não é válido'),
        password: z.string().min(1, { message: 'informe sua senha' })
    })
);

const onFormSubmit = ({ valid }) => {
  if (valid) {
      toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
      console.log('KKK')
    }
};
</script>