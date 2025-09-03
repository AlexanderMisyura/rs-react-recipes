export async function fileToBase64(file: File): Promise<string> {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (e) => {
      reject(new Error(e.target?.error?.message ?? 'Failed to read file'));
    };
  });
}
