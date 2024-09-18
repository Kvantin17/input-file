import { computed, ref } from "vue";

export function useFileInputModel({
  fileType,
}: {
  fileType: "image" | "video" | "document";
}) {
  const file = ref<File | null>(null);
  const uploadedUrl = ref<string | undefined>(undefined);

  const isLoading = ref(false);
  const isImgShown = ref(true);
  const isClearBtnShown = ref(true);

  const isImage = computed(() => fileType === "image");
  const isVideo = computed(() => fileType === "video");

  const showLoader = () => {
    isLoading.value = true;
  };

  const hideLoader = () => {
    isLoading.value = false;
  };

  const renderImage = () => {
    if (isImage) {
      isImgShown.value = true;
    }
  };

  const removeImage = () => {
    if (isImage) {
      isImgShown.value = false;
    }
  };

  const parseFile = async (file: File) => {
    if (!file) return;
    uploadedUrl.value = URL.createObjectURL(file);
  };

  const removeFile = () => {
    if (uploadedUrl.value) {
      URL.revokeObjectURL(uploadedUrl.value);
    }
    file.value = null;
    uploadedUrl.value = undefined;
  };

  return {
    isLoading,
    isImgShown,
    isClearBtnShown,
    showLoader,
    hideLoader,
    renderImage,
    removeImage,
    parseFile,
    removeFile,
    file,
    uploadedUrl,
    isImage,
    isVideo,
  };
}
