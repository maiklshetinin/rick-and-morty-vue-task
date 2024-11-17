<script setup lang="ts">
import { ICharacterData } from "src/types/api.ts";

defineProps<{
  character: ICharacterData;
  isNightMode: boolean;
}>();
</script>

<template>
  <div
    :class="['character-card', isNightMode ? 'character-card--night-mode' : '']"
  >
    <div class="character-card__image-wrapper">
      <img
        :src="character.image"
        :alt="character.name"
        class="character-card__image"
      />
      <div class="character-card__image-overlay"></div>
    </div>

    <div class="character-card__content">
      <h2
        :class="[
          'character-card__name',
          isNightMode ? 'character-card__name--night-mode' : '',
        ]"
      >
        {{ character.name }}
      </h2>
      <p class="character-card__info">
        <span class="character-card__label">Status:</span>
        {{ character.status }}
      </p>
      <p class="character-card__info">
        <span class="character-card__label">Species:</span>
        {{ character.species }}
      </p>
      <p class="character-card__info">
        <span class="character-card__label">Gender:</span>
        {{ character.gender }}
      </p>
      <p class="character-card__info">
        <span class="character-card__label">Location:</span>
        {{ character.location.name }}
      </p>
    </div>
  </div>
</template>

<style>
.character-card {
  display: flex;
  max-height: auto;
  flex-direction: column;
  flex-shrink: 0;
  background-color: var(--el-color-primary-light-9);
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(119, 119, 119, 0.1);
  border: 1px solid var(--el-border-color);
  overflow: hidden;
  transition: var(--el-transition-duration);
}

.character-card--night-mode {
  border: 1px solid #4c4d4f;
  background-color: transparent;
  transition: var(--el-transition-duration);
}

.character-card__image-wrapper {
  position: relative;
}

.character-card__image {
  width: 100%;
  height: 18rem;
  object-fit: cover;
}

.character-card__image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 5rem;
}

.character-card__content {
  padding: 1rem;
  color: var(--el-color-primary);
}

.character-card__name {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: var(--el-color-primary);
  transition: var(--el-transition-duration);
}

.character-card__name--night-mode {
  filter: drop-shadow(2px 2px 6px #409eff);
  transition: var(--el-transition-duration);
}

.character-card__info {
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.character-card__label {
  font-weight: 600;
}
</style>
