const silentLogger = () => {
  /* 静默 */
};

/**
 * 楼宇识别用 OCR：与界面语言无关。
 * 对同一张照片并行跑 eng+chi_sim 与 eng，合并文本后再做 detectBuildingCode，
 * 这样中文/英文 App 下匹配规则一致；弹窗里的楼名与简介仍由当前语言的 t() 决定。
 */
export async function runBuildingOcrOnFile(file: File): Promise<string> {
  const { default: Tesseract } = await import("tesseract.js");
  const opts = { logger: silentLogger };

  const recognize = async (langTag: string): Promise<string> => {
    try {
      const result = await Tesseract.recognize(file, langTag, opts);
      return typeof result.data.text === "string" ? result.data.text : "";
    } catch {
      return "";
    }
  };

  const [bilingual, english] = await Promise.all([
    recognize("eng+chi_sim"),
    recognize("eng"),
  ]);

  return [bilingual, english].filter((s) => s.trim().length > 0).join("\n");
}
