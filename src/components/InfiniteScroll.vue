<template>
  <div ref="scrollContainer" class="scrollContainer">
    <slot />
    <div ref="observerTarget" class="observer-target"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
//REFS
const observerTarget = ref<HTMLElement | null>(null); // Элемент, который будем отслеживать

const props = withDefaults(
  defineProps<{
    loadMore: () => Promise<void>;
    distance?: number;
  }>(),
  {
    distance: 50, // значение по умолчанию
  }
);

// Используем IntersectionObserver
const observer = new IntersectionObserver(
  async (entries) => {
    if (entries[0].isIntersecting) {
      await props.loadMore();
    }
  },
  { rootMargin: "0px", threshold: props.distance / 100 } // threshold 1.0 означает, что элемент должен быть полностью в области видимости
);

onMounted(async () => {
  if (observerTarget.value) {
    observer.observe(observerTarget.value); // Начинаем отслеживание
  }
});

onUnmounted(() => {
  if (observerTarget.value) {
    observer.unobserve(observerTarget.value); // Останавливаем отслеживание
  }
});
</script>

<style scoped>
.scrollContainer {
  position: relative;
}

.observer-target {
  position: absolute;
  bottom: 0;
  height: 100vh;
}
</style>
