export const openUploadWidget = (callback) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    console.warn("Cloudinary not configured: Missing environment variables.");
    return;
  }

  const myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: cloudName,
      uploadPreset: uploadPreset,
      cropping: true, // Enable cropping
      croppingAspectRatio: 1, // Square crop for profile photos
      folder: "cv-builder/users", // Optional folder
      sources: ["local", "url", "camera"],
      multiple: false,
      clientAllowedFormats: ["image"],
      maxImageFileSize: 2000000, // 2MB
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
        // Transform the URL to optimize for face detection and square cut
        // Example: https://res.cloudinary.com/demo/image/upload/c_thumb,g_face,h_200,w_200/v1/sample.jpg
        // const optimizedUrl = result.info.secure_url.replace("/upload/", "/upload/c_thumb,g_face,h_200,w_200/");
        // We can handle transformations when rendering or here.
        // Returning the raw result for now so the component can decide.
        callback(result.info.secure_url);
      }
    },
  );

  myWidget.open();
};

export const uploadToCloudinary = async (file) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary configuration missing");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", "cv-builder/users");

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Upload failed");
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};
