<script setup lang="ts">
import { useStore } from "../../store/index.ts";
import { storeToRefs } from "pinia";
import debounce from "lodash.debounce";

//STORES
const store = useStore();
//STORE_TO_REFS
const { characters, nextPageUrl, locations } = storeToRefs(store);

//ACTIONS
const { getCharacters } = store;

defineProps<{
  isNightMode: boolean;
}>();

const form = defineModel<{ name: null | string; locationId: null | number }>({
  default: { name: null, locationId: null },
});

const submitForm = async () => {
  nextPageUrl.value = null;

  await getCharacters(null, {
    name: form.value.name ?? "",
    locationId: form.value.locationId ?? 0,
  });
};

const handleName = debounce(() => {
  characters.value = [];
  form.value.locationId = null;
  submitForm();
}, 300); // Задержка в 300 мс

const handleLocation = () => {
  characters.value = [];
  form.value.name = null;
  submitForm();
};
</script>

<template>
  <el-form
    :model="form"
    label-position="top left"
    label-width="auto"
    class="form-container__row"
  >
    <el-form-item label="Filter by Name" class="form-container__item">
      <el-input
        v-model="form.name"
        type="text"
        :class="[
          'form-container__input',
          isNightMode ? 'form-container__input--night-mode' : '',
        ]"
        @input="handleName"
        placeholder="Search by name"
        clearable
      />
    </el-form-item>

    <el-form-item label="Filter by ILocation" class="form-container__item">
      <el-select
        v-model="form.locationId"
        :class="[
          'form-container__select',
          isNightMode ? 'form-container__select--night-mode' : '',
        ]"
        placeholder="Select"
        value-key="name"
        @change="handleLocation"
        clearable
      >
        <el-option
          v-for="location in locations"
          :key="location.id"
          :label="location.name"
          :value="location.id"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<style>
.form-container__row {
  display: flex;
  flex-direction: column;
  justify-content: start;

  gap: 0;

  width: 100%;
  height: 140px;
}

.form-container__item {
  width: 100%;
}

.form-container__input > .el-input__wrapper {
  transition: var(--el-transition-duration);
}

.form-container__select--night-mode > .el-select__wrapper,
.form-container__input--night-mode > .el-input__wrapper {
  background-color: #2c2c2c;
  box-shadow: 0 0 0 1px #4c4d4f inset;
}

.form-container__select--night-mode
  > .el-select__wrapper
  > .el-select__selection
  > .el-select__placeholder,
.form-container__input--night-mode > .el-input__wrapper > .el-input__inner {
  color: #fff;
}

@media (min-width: 240px) {
  .form-container__row {
    justify-content: start;
  }
}

@media (min-width: 640px) {
  .form-container__row {
    flex-direction: row;
    gap: 1rem;
    height: 70px;
  }

  .form-container__item {
    width: 49%;
  }
}

@media (min-width: 768px) {
  .form-container__row {
    justify-content: space-between;
  }
  .form-container__item {
    width: 100%;
  }
}

@media (min-width: 1024px) {
  .form-container__row {
    justify-content: start;
  }

  .form-container__item {
    width: 24%;
  }
}

.el-form-item__label-wrap,
.el-form-item__label {
  margin: 0 !important;
  color: #909399 !important;
}
</style>
