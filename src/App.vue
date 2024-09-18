<script setup lang="ts">
import FileLoader from "./components/FileLoader/index.vue";
import { useFileInputModel } from "./components/FileLoader/useFileInputModel";

const customLoad = async (
  file: object,
  model: ReturnType<typeof useFileInputModel>
) => {
  const { showLoader, hideLoader } = model;

  try {
    showLoader();
    const src = await new Promise((resolve) => {
      const url =
        "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg";
      setTimeout(() => resolve(url), 500);
    });
    return src;
  } catch (error) {
    throw new Error("Error");
  } finally {
    hideLoader();
  }
};

const consoleLogFile = (file: File) => {
  console.log(file);
};

const consoleLogFiles = (files: File[]) => {
  console.log(files);
};
</script>

<template>
  <main>
    <FileLoader
      width="200px"
      height="300px"
      fileType="image"
      :inputAttrs="{
        multiple: false,
        accept: ['.png'],
      }"
      :customLoad="customLoad"
      @select-file="consoleLogFile"
      @select-files="consoleLogFiles"
    />
    <FileLoader
      width="2rem"
      height="4rem"
      fileType="image"
      :inputAttrs="{
        multiple: false,
        accept: ['.png'],
      }"
    />
    <FileLoader
      width="500px"
      height="300px"
      fileType="video"
      :inputAttrs="{
        multiple: true,
        accept: ['.mp4', '.webm'],
      }"
    />
    <FileLoader
      width="500px"
      height="300px"
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
