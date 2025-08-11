<template>
  <div class="flex h-screen bg-gray-200 justify-center items-center">
    <div class="bg-white rounded-xl p-6 shadow-lg shadow-violet-500/50">
      <div class="text-violet-700 font-bold pb-2 text-center text-lg">Lupa Vagas</div>
      <Form :initialValues :resolver @submit="onFormSubmit" class="flex flex-col w-full sm:w-56">
        <FormField v-slot="$field" as="section" name="email" initialValue="">
          <InputText type="text" placeholder="Email" class="mb-1" v-model="initialValues.email" />
          <div class="h-1 mb-6">
            <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
          </div>
        </FormField>
        <FormField v-slot="$field" asChild name="password" initialValue="">
          <Password type="text" placeholder="Password" :feedback="false" class="mb-1" v-model="initialValues.password" toggleMask />
          <div class="h1 mb-5">
            <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
          </div>
        </FormField>
        <Button class="mb-5" type="submit" severity="primary" label="Submit" :loading="loading" />
        <Button label="Cadastre-se" severity="secondary" @click="visible = true" />
      </Form>
    </div>

    <!-- REGISTER -->

    <Dialog header="Cadastro" v-model:visible="visible" modal :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <Form :initialValues="initialValuesRegister" :resolver="resolverRegister" @submit="onFormSubmitNewUser" class="flex flex-col w-full sm:w-56">
        <FormField v-slot="$field" as="section" name="email" initialValue="">
          <InputText type="text" placeholder="Email" class="mb-1"  v-model="initialValuesRegister.email" />
          <div class="h-1 mb-6">
            <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
          </div>
        </FormField>
        <FormField v-slot="$field" asChild name="password" initialValue="">
          <Password type="text" placeholder="Password" :feedback="false" class="mb-1" v-model="initialValuesRegister.password" toggleMask />
          <div class="h1 mb-5">
            <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
          </div>
        </FormField>
        <FormField v-slot="$field" asChild name="repassword" initialValue="">
          <Password type="text" placeholder="Repita o password" :feedback="false" class="mb-1" v-model="initialValuesRegister.repassword" toggleMask />
          <div class="h1 mb-5">
            <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
          </div>
        </FormField>
        <!-- isComapny -->
        <FormField v-slot="$field" asChild name="repassword" initialValue="">
          <div class="flex items-center gap-2 mb-4">
            <Checkbox v-model="initialValuesRegister.isComapny" inputId="isCompany" name="isCompany" binary />
            <label for="isCompany">Sou empresa!</label>
        </div>
        </FormField>
        <Button class="mb-5" type="submit" severity="primary" label="Cadastrar" :loading="loading" />
      </Form>
    </Dialog>

    <!-- REGISTER END-->
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import { useToast } from 'primevue/usetoast';
import Auth from '../services/auth';
import { encryptAndSave, decryptAndRead } from './../services/encrypt'

const auth = new Auth()
const router = useRouter()

const visible = ref(false);
const loading = ref(false);

const initialValues = ref({
    email: '',
    password: '',
});

const initialValuesRegister = ref({
    email: '',
    password: '',
    repassword: '',
    isComapny: false,
});

const formsMapper = {
  'login': initialValues,
  'register': initialValuesRegister
}

const toast = useToast();

const resolver = zodResolver(
    z.object({
        email: z.string().min(1, { message: 'informe o email' }).email('este email não é válido'),
        password: z.string().min(1, { message: 'informe sua senha' })
    })
);

const resolverRegister = zodResolver(
    z.object({
        email: z.string().min(1, { message: 'informe o email' }).email('este email não é válido'),
        password: z.string().min(1, { message: 'informe sua senha' }),
        repassword: z.string(), 
    }).refine((data) => data.password === data.repassword, {
      message: 'As senhas precisa ser iguais!',
      path: ['repassword']
    })
);

const onFormSubmit = async ({ valid }) => {
  if (valid) {
    // loading.value = true
    const data = await auth.signIn(initialValues.value.email, initialValues.value.password)
    if (data.status === 401) {
      toast.add({ severity: 'error', summary: 'Email ou senha incorreto!', life: 3000 });
      return
    }

    if (data.status === 404) {
      toast.add({ severity: 'error', summary: 'Email não encontrado!', life: 3000 });
      return
    }

    if (data.status === 403) {
      toast.add({ severity: 'error', summary: 'Você precisa confirmar o cadastro no seu email!', life: 5000 });
      return
    }

    toast.add({ severity: 'success', summary: 'Login realizado com sucesso!', life: 3000 });
    console.log('encryptAndSave', await encryptAndSave(data, 'auth'))
    console.log('decrypt', await decryptAndRead('auth'))
    // sessionStorage.setItem('auth', JSON.stringify(data))

    if (data.permission && data.permission === 'ADMIN') {
      router.push({ name: 'dashboard' })
      return
    }
    router.push({ name: 'home' })
  }
};

const onFormSubmitNewUser = async ({ valid }) => {
  if (valid) {
    loading.value = true
    await auth.signUp(initialValuesRegister.value.email, initialValuesRegister.value.password, initialValuesRegister.value.isComapny)
    toast.add({ severity: 'success', summary: 'Cadastro realizado com sucesso! Você receberá um email para confirmar o cadastro', life: 6000 });
    loading.value = false
    visible.value = false
  }
};

function clearForms(form) {
  for(let i in form.value) {
    form.value[i] = ''
  }
}

watch(visible, (async() => {
  if (visible.value) {
    clearForms(formsMapper['login'])
  } else {
    clearForms(formsMapper['register'])
  }
}))

</script>
<style lang="scss">
.p-password-input {
  padding: 8px 12px !important;
}
</style>
