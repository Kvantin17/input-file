<script setup lang="ts">
import FileLoader from "./components/FileLoader.vue";

const customLoad = async () => {
  const src = await new Promise((resolve) => {
    const url =
      "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg";
    setTimeout(() => resolve(url), 500);
  });

  return src;
};
</script>

<template>
  <main>
    <FileLoader
      :width="200"
      :height="300"
      fileType="image"
      :inputAttrs="{
        multiple: false,
        accept: ['.png'],
      }"
      :onUpload="customLoad"
    />
    <FileLoader
      :width="200"
      :height="300"
      fileType="image"
      :inputAttrs="{
        multiple: false,
        accept: ['.png'],
      }"
    />
    <FileLoader
      :width="500"
      :height="300"
      fileType="video"
      :inputAttrs="{
        multiple: true,
        accept: ['.mp4', '.webm'],
      }"
    />
    <FileLoader
      :width="500"
      :height="300"
      fileType="document"
      :inputAttrs="{
        multiple: true,
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
