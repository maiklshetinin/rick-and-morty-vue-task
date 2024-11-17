<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, ref, reactive, watch } from "vue";
import { useStore } from "src/store";
import Card from "src/pages/components/Card.vue";
import InfiniteScroll from "src/components/InfiniteScroll.vue";
import CardSearchForm from "src/pages/components/CardSearchForm.vue";
import { Sunny, Moon } from "@element-plus/icons-vue";

//STORES
const store = useStore();
//STORE_TO_REFS
const { characters, nextPageUrl } = storeToRefs(store);

//ACTIONS
const { getCharacters, getLocations } = store;

//REFS
const currentPage = ref(1);
const isNightMode = ref(false);

const filters = reactive({
  name: null,
  locationId: null,
});

// Функция для загрузки дополнительных элементов
const loadMoreItems = async () => {
  console.log("Загрузка новых данных...");
  if (nextPageUrl.value) {
    currentPage.value++;
    await getCharacters(
      nextPageUrl.value,
      {
        name: filters.name ?? "",
        locationId: filters.locationId ?? 0,
      },
      currentPage.value
    );
  }
};

watch(isNightMode, (newValue) => {
  document.body.classList.toggle("body--night-mode", newValue);
});

onMounted(async () => {
  await getCharacters(null, {}, currentPage.value);
  await getLocations();
});
</script>

<template>
  <header :class="['header', isNightMode ? 'header--night-mode' : '']">
    <div class="header__controls">
      <el-switch
        v-model="isNightMode"
        :active-action-icon="Moon"
        :inactive-action-icon="Sunny"
        style="position: absolute; right: 1rem; top: 0.25rem"
      />
      <CardSearchForm
        ref="cardSearchForm"
        v-model="filters"
        :isNightMode="isNightMode"
      />
    </div>
  </header>
  <el-scrollbar view-class="view-scrollbar">
    <InfiniteScroll :loadMore="loadMoreItems" :distance="10">
      <main class="characters-container__grid">
        <Card
          v-for="character in characters"
          :key="character.id"
          :character="character"
          :isNightMode="isNightMode"
        />
      </main>
    </InfiniteScroll>
  </el-scrollbar>
</template>

<style>
.header {
  background-color: var(--el-color-primary-light-9);
  border-bottom: 1px solid var(--el-border-color);
  transition: var(--el-transition-duration);
}

.header--night-mode {
  border-bottom: 1px solid #4c4d4f;
  background-color: transparent;
  transition: var(--el-transition-duration);
}

.header__controls {
  position: relative;
  margin: 0 auto;
  max-width: 1280px;
  padding: 1em;
}

.view-scrollbar {
  max-height: calc(100vh - 140px - 2em);

  @media (min-width: 640px) {
    max-height: calc(100vh - 70px - 2em);
  }
}

.characters-container__grid {
  margin: 0 auto;
  max-width: 1280px;
  display: grid;
  padding: 1em;
  height: 100%;
  flex-shrink: 0;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1rem;
  grid-auto-rows: 1fr;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
