<template>
  <div
    :style="{ width: width + 'px', height: height + 'px' }"
    class="file-loader-container"
  >
    <input
      type="file"
      :multiple="inputAttrs.multiple > 1"
      :accept="inputAttrs.accept.join(',')"
      @change="handleFileSelect"
      class="file-loader-input"
    />
    <div v-if="loading" class="file-loader-loader">Loading...</div>
    <div v-else class="file-loader-content">
      <div v-if="files.length > 0">
        <button class="file-loader-remove" @click="removeFiles">x</button>
        <div v-if="fileType === 'image' && firstFileUrl">
          <img :src="firstFileUrl" alt="Preview" class="file-loader-preview" />
        </div>
        <div v-else>
          <span v-for="(file, index) in files" :key="index">{{
            file.name
          }}</span>
        </div>
      </div>
      <div v-else class="file-loader-placeholder">
        {{ fileType === "video" ? "Добавить видео" : "+" }}
      </div>
      <div v-if="exceedsLimit" class="file-loader-warning">
        Превышено количество файлов. Можно загрузить до
        {{ inputAttrs.multiple }} файла(ов).
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  props: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    fileType: {
      type: String as () => "image" | "video" | "document",
      default: "image",
    },
    inputAttrs: {
      type: Object as () => {
        multiple: number;
        accept: string[];
      },
      required: true,
    },
  },
  setup(props) {
    const files = ref<File[]>([]);
    const firstFileUrl = computed(() => URL.createObjectURL(files.value[0]));
    const loading = ref(false);
    const exceedsLimit = ref(false);

    const handleFileSelect = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files) {
        const selectedFiles = Array.from(input.files);

        console.log(selectedFiles);

        if (selectedFiles.length > props.inputAttrs.multiple) {
          exceedsLimit.value = true;
          return;
        } else {
          exceedsLimit.value = false;
        }

        files.value = selectedFiles;
        loading.value = true;
        setTimeout(() => {
          loading.value = false;
        }, 1000);
      }
    };

    const removeFiles = () => {
      files.value = [];
      exceedsLimit.value = false;
    };

    return {
      files,
      firstFileUrl,
      loading,
      exceedsLimit,
      handleFileSelect,
      removeFiles,
    };
  },
});
</script>

<style scoped>
.file-loader-container {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
}

.file-loader-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.file-loader-loader {
  text-align: center;
  line-height: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.file-loader-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.file-loader-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.file-loader-remove {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 14px;
}

.file-loader-placeholder {
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

.file-loader-warning {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}
</style>
