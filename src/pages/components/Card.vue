<script setup lang="ts">
import { ICharacterData } from "../../types/api.ts";

defineProps<{
  character: ICharacterData;
}>();
</script>

<template>
  <div class="character-card">
    <div class="character-card__image-wrapper">
      <img
        :src="character.image"
        :alt="character.name"
        class="character-card__image"
      />
      <div class="character-card__image-overlay"></div>
    </div>

    <div class="character-card__content">
      <h2 class="character-card__name">{{ character.name }}</h2>
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
  max-height: auto;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  background-color: var(--el-color-primary-light-9);
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(119, 119, 119, 0.1);
  overflow: hidden;
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
}

.character-card__info {
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.character-card__label {
  font-weight: 600;
}
</style>
