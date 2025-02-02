import { FileState } from "@google/generative-ai/dist/server/server";
import { fileManager, mediaPath } from "../v1/config";

export const handleAudioUpload = async (filePath: string, fileName: string, mimeType: string) => {
  const uploadResult = await fileManager.uploadFile(
    `${mediaPath}/${filePath}`,
    {
      mimeType: mimeType,
      displayName: fileName,
    }
  );

  let uploadedFile = await fileManager.getFile(uploadResult.file.name);
  while (uploadedFile.state === FileState.PROCESSING) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    uploadedFile = await fileManager.getFile(uploadResult.file.name);
  }

  if (uploadedFile.state === FileState.FAILED) {
    throw new Error("Audio upload failed.");
  }

  return uploadedFile.uri;
};