<script setup lang="ts">
import FileLoader from "./components/FileLoader.vue";
</script>

<template>
  <main>
    <FileLoader
      :width="300"
      :height="200"
      fileType="image"
      :inputAttrs="{
        multiple: 2,
        accept: ['.png'],
      }"
    />
    <FileLoader
      :width="500"
      :height="300"
      fileType="video"
      :inputAttrs="{
        multiple: 1,
        accept: ['.mp4', '.webm'],
      }"
    />
    <FileLoader
      :width="500"
      :height="300"
      fileType="document"
      :inputAttrs="{
        multiple: 1,
        accept: ['.pdf'],
      }"
    />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
