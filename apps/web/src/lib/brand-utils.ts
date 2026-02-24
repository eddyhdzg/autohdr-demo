export function downloadFile(filePath: string, fileName?: string): void {
  const a = document.createElement("a");
  a.href = filePath;
  a.download = fileName ?? filePath.split("/").pop() ?? "download";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export async function copySvgToClipboard(svgPath: string): Promise<void> {
  const response = await fetch(svgPath);
  if (!response.ok) {
    throw new Error(`Failed to fetch SVG: ${response.status}`);
  }
  const svgText = await response.text();
  await navigator.clipboard.writeText(svgText);
}

export async function copyPngToClipboard(pngPath: string): Promise<void> {
  const img = new Image();
  img.crossOrigin = "anonymous";

  const loaded = new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = reject;
  });

  img.src = pngPath;
  await loaded;

  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");
  ctx.drawImage(img, 0, 0);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => {
      if (b) resolve(b);
      else reject(new Error("Canvas toBlob failed"));
    }, "image/png");
  });

  await navigator.clipboard.write([
    new ClipboardItem({ "image/png": blob }),
  ]);
}
