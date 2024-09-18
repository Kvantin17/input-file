import { useFileInputModel } from "./useFileInputModel";
import { describe, it, expect } from "vitest";

describe("useFileInputModel", () => {
  it("Инициализация", () => {
    const { isImage, isVideo, isLoading, isImgShown, isClearBtnShown } =
      useFileInputModel({ fileType: "image" });

    expect(isImage.value).toBe(true);
    expect(isVideo.value).toBe(false);
    expect(isLoading.value).toBe(false);
    expect(isImgShown.value).toBe(true);
    expect(isClearBtnShown.value).toBe(true);
  });

  it("скрытие и расскрытие Loader", () => {
    const { showLoader, hideLoader, isLoading } = useFileInputModel({
      fileType: "image",
    });

    showLoader();
    expect(isLoading.value).toBe(true);

    hideLoader();
    expect(isLoading.value).toBe(false);
  });

  it("скрытие и вывод Img", () => {
    const { renderImage, hideImage, isImgShown } = useFileInputModel({
      fileType: "image",
    });

    renderImage();
    expect(isImgShown.value).toBe(true);

    hideImage();
    expect(isImgShown.value).toBe(false);
  });
  it("создание ссылки", async () => {
    const { parseFile, uploadedUrl } = useFileInputModel({ fileType: "image" });

    const file = new File(["тестовый контент"], "test.png", {
      type: "image/png",
    });

    await parseFile(file);

    expect(uploadedUrl.value).toContain("blob:");
    expect(uploadedUrl.value).toBeDefined();
  });
  it("удаление ссылки", async () => {
    const { parseFile, removeFile, uploadedUrl, file } = useFileInputModel({
      fileType: "image",
    });

    const testFile = new File(["тестовый контент"], "test.png", {
      type: "image/png",
    });

    await parseFile(testFile);
    expect(uploadedUrl.value).toContain("blob:");

    removeFile();

    expect(uploadedUrl.value).toBeUndefined();
    expect(file.value).toBeNull();
  });
});
