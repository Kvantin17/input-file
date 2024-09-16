<template>
  <div
    :style="{
      width: width + 'px',
      height: height + 'px',
      backgroundImage: uploadedUrl ? `url(${uploadedUrl})` : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }"
    class="container"
  >
    <div class="container-blur">
      <input
        type="file"
        :multiple="inputAttrs.multiple"
        :accept="inputAttrs.accept.join(',')"
        @change="handleFileSelect"
        class="container-input"
      />
      <div v-if="loading" class="container-loader">Loading...</div>
      <div v-else class="container-content">
        <div v-if="files.length > 0">
          <button class="container-remove" @click="removeFiles">x</button>
          <div v-if="fileType === 'image' && uploadedUrl">
            <img :src="uploadedUrl" alt="Preview" class="container-preview" />
          </div>
          <div v-else>
            <span v-for="(file, index) in files" :key="index">{{
              file.name
            }}</span>
          </div>
        </div>
        <div v-else class="container-placeholder">
          {{ fileType === "video" ? "Добавить видео" : "+" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { PropType } from "vue";

const props = defineProps({
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  fileType: {
    type: String as PropType<"image" | "video" | "document">,
    default: "image",
  },
  inputAttrs: {
    type: Object as PropType<{ multiple: boolean; accept: string[] }>,
    required: true,
  },
  onUpload: {
    type: Function as PropType<(file: File) => Promise<string>>,
    required: false,
  },
});

const files = ref<File[]>([]);
const uploadedUrl = ref<string | null>(null);
const loading = ref(false);

const handleFileSelect = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];

    loading.value = true;
    try {
      files.value = [file];

      if (props.onUpload) {
        uploadedUrl.value = await props.onUpload(file);
      } else {
        uploadedUrl.value = URL.createObjectURL(file);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      loading.value = false;
    }
  }
};

const removeFiles = () => {
  files.value = [];
  uploadedUrl.value = null;
};
</script>

<style scoped>
.container {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
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
