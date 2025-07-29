<template>
  <div class="flex h-screen bg-gray-200 justify-center items-center">
    <div class="bg-white rounded-xl p-6 shadow-lg shadow-violet-500/50">
      <div class="text-violet-700 font-bold pb-2 text-center text-lg">Lupa Vagas</div>
      <Form :initialValues :resolver @submit="onFormSubmit" class="flex flex-col w-full sm:w-56">
        <FormField v-slot="$field" as="section" name="email" initialValue="">
          <InputText type="text" placeholder="Email" class="mb-1" />
          <div class="h-1 mb-6">
            <Message v-if="$field?.invalid" severity="error" size="small" variant="simple" v-model="initialValues.email" >{{ $field.error?.message }}</Message>
          </div>
        </FormField>
        <FormField v-slot="$field" asChild name="password" initialValue="">
          <Password type="text" placeholder="Password" :feedback="false" class="mb-1" v-model="initialValues.password"  />
          <div class="h1 mb-5">
            <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
          </div>
        </FormField>
        <Button class="mb-5" type="submit" severity="primary" label="Submit" />
        <Button label="Cadastre-se" severity="secondary" @click="visible = true" />
      </Form>
    </div>

    <!-- REGISTER -->

    <Dialog v-model:visible="visible" modal :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      {{ initialValuesRegister }}
      <Form :initialValues:initialValuesRegister :resolver="resolverRegister" @submit="onFormSubmitNewUser" class="flex flex-col w-full sm:w-56">
        <FormField v-slot="$field" as="section" name="email" initialValue="">
          <InputText type="text" placeholder="Email" class="mb-1" />
          <div class="h-1 mb-6">
            <Message v-if="$field?.invalid" severity="error" size="small" variant="simple" v-model="initialValues.email" >{{ $field.error?.message }}</Message>
          </div>
        </FormField>
        <FormField v-slot="$field" asChild name="password" initialValue="">
          <Password type="text" placeholder="Password" :feedback="false" class="mb-1" v-model="initialValues.password" />
          <div class="h1 mb-5">
            <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
          </div>
        </FormField>
        <FormField v-slot="$field" asChild name="repassword" initialValue="">
          <Password type="text" placeholder="Repita o password" :feedback="false" class="mb-1" v-model="initialValues.repassword"  />
          <div class="h1 mb-5">
            <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
          </div>
        </FormField>
        <Button class="mb-5" type="submit" severity="primary" label="Cadastrar" />
      </Form>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import { useToast } from 'primevue/usetoast';
import Auth from '../services/auth';

const auth = new Auth()

const visible = ref(false);

const initialValues = ref({
    email: '',
    password: '',
});

const initialValuesRegister = ref({
    email: '',
    password: '',
    repassword: '',
});

const toast = useToast();

const resolver =  zodResolver(
    z.object({
        email: z.string().min(1, { message: 'informe o email' }).email('este email não é válido'),
        password: z.string().min(1, { message: 'informe sua senha' })
    })
);

const resolverRegister =  zodResolver(
    z.object({
        email: z.string().min(1, { message: 'informe o email' }).email('este email não é válido'),
        password: z.string().min(1, { message: 'informe sua senha' })
        repassword: z.
    })
);

const onFormSubmit = async ({ valid }) => {
  if (valid) {
      await auth.signIn(initialValues.value.email, initialValues.value.password)
      toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
    }
};

const onFormSubmitNewUser = async ({ valid }) => {
  if (valid) {
      await auth.signUp(initialValues.value.email, initialValues.value.password)
      toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
    }
};
</script>