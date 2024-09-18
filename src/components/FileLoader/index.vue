<template>
  <div :style="containerStyle" class="container">
    <div class="container-blur">
      <input
        type="file"
        :multiple="inputAttrs.multiple"
        :accept="inputAttrs.accept.join(',')"
        class="container-input"
        @change="handleFileSelectEvent"
      />
      <div v-if="isLoading" class="container-loader">Loading...</div>
      <div v-else class="container-content">
        <div v-if="file">
          <button
            v-if="isClearBtnShown"
            class="container-remove"
            @click="removeFile"
          >
            x
          </button>
          <div v-if="isImage && isImgShown">
            <img :src="uploadedUrl" alt="Preview" class="container-preview" />
          </div>
          <div v-else>
            <span>{{ file.name }}</span>
          </div>
        </div>
        <div v-else class="container-placeholder">
          {{ isVideo ? "Добавить видео" : "+" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useFileInputModel } from "./useFileInputModel";
import type { FileLoaderProps } from "./types";

const props = withDefaults(defineProps<FileLoaderProps>(), {
  fileType: "image",
});

const model = useFileInputModel({ fileType: props.fileType });

const {
  isLoading,
  isImgShown,
  isClearBtnShown,
  parseFile,
  removeFile,
  file,
  uploadedUrl,
  isVideo,
  isImage,
} = model;

const containerStyle = computed(() => ({
  width: props.width,
  height: props.height,
  backgroundImage:
    uploadedUrl.value && isImgShown.value
      ? `url(${uploadedUrl.value})`
      : "none",
}));

const emit = defineEmits(["select-file", "select-files"]);

const handleFileSelectEvent = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    file.value = input.files[0];
    // Стоит ли в этой ф-ции делать emit или лучше вынести их отдельно в computed?
    emit("select-file", file.value);
    emit("select-files", [file.value]);

    if (props.customLoad) {
      uploadedUrl.value = await props.customLoad(file.value, model);
    } else {
      parseFile(file.value);
    }
  }
};
</script>

<style scoped>
.container {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.container-blur {
  backdrop-filter: blur(8px);
  width: 100%;
  height: 100%;
}

.container-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.container-loader {
  text-align: center;
  line-height: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.container-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.container-remove {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 14px;
}

.container-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  color: #888;
  font-size: 24px;
  cursor: pointer;
  background-color: #f0f0f0;
}
</style>
