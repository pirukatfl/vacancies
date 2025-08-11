<template>
  <div class="card flex justify-center md:h-170 overflow-y-scroll">
    <Form class="flex flex-col gap-4 w-full sm:w-56">
      <template v-for="(row, index) in form" :key="row.id">
        <div class="flex">
          <div>
            <div class="flex flex-col mt-3">
              <label :for="`${row.id}-fullname`">Instituição</label>
              <InputText :id="`${row.id}-fullname`" :name="`${row.id}-fullname`" type="text" v-model="row.institutionName" placeholder="Nome da instituição" />
            </div>
            <div class="flex flex-col mt-3">
              <label :for="`${row.id}-courseName`">Curso</label>
              <InputText :id="`${row.id}-courseName`" :name="`${row.id}-courseName`" type="text" v-model="row.courseName" placeholder="Nome do curso" />
            </div>
            <div class="flex flex-col mt-3">
              <label :for="`${row.id}-initialDate`">Data de início</label>
              <DatePicker :id="`${row.id}-initialDate`" v-model="row.initialDate" />
            </div>
            <div class="flex flex-col mt-3">
              <label :for="`${row.id}-deadline`">Date de conclusão</label>
              <DatePicker :id="`${row.id}-deadline`" v-model="row.deadline" />
            </div>
            <div class="flex mt-3">
              <Checkbox v-model="row.isFinished" :inputId="`${row.id}-isFinished`" :name="`${row.id}-isFinished`" binary />
              <label :for="`${row.id}-isFinished`" class="ml-1">Finalizado?</label>
            </div>
          </div>
          <div class="flex flex-col justify-center ml-4">
            <Button severity="danger" @click="deleteRow(index)">
              <i class="pi pi-trash" />
            </Button>
          </div>
        </div>
      </template>
      <div class="flex items-center">
        <Button severity="primary" @click="addRow()">
          <i class="pi pi-plus" />
        </Button>
        <div class="ml-2">Adicionar</div>
      </div>
    </Form>
  </div>
  <div class="flex justify-center mt-4">
    <Button @click="save" type="submit" severity="delete" :loading="props.isLoading" label="Salvar" />
  </div>
</template>
<script setup lang="ts">
import { reactive, onMounted } from 'vue';

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
  saveProfile: {
    type: Function,
    default: () => {}
  },
  data: {

  }
})

const defaultObject = (): Schoolings => {
  return {
    id: Math.random(),
    institutionName: '',
    courseName: '',
    initialDate: null,
    deadline: null,
    isFinished: false,
  }
}

interface Schoolings {
  id: number,
  institutionName: string,
  courseName: string,
  initialDate: null,
  deadline: null,
  isFinished: boolean,
}

const form = reactive<Schoolings[]>([]);

function addRow() {
  form.push(defaultObject())
}

function deleteRow(index: number) {
  form.splice(index, 1)
}

async function save () {
  // props.saveProfile()
};

onMounted(() => {
  console.log('HOP')
  if(form.length == 0) {
    addRow()
  }
})
</script>