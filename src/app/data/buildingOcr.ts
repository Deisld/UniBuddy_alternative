/** 校园指示牌上的楼栋缩写（与地图图例一致）；较长代码优先匹配 */
export const BUILDING_OCR_CODES_ORDERED: string[] = [
  "GYM",
  "SC", "SB", "SA", "SD",
  "EE", "EB", "PB", "IR", "IA", "HS", "ES", "DB", "BS", "MA", "MB", "AS",
  "LS", "FB", "CB",
];

/** OCR 文本里是否出现某一代码（避免在单词中间误匹配；支持标牌上的独立大字） */
export function detectBuildingCode(ocrText: string): string | null {
  const upper = ocrText.toUpperCase();
  for (const code of BUILDING_OCR_CODES_ORDERED) {
    const re = new RegExp(`(^|[^A-Z0-9])${code}([^A-Z0-9]|$)`, "g");
    if (re.test(upper)) return code;
  }
  return null;
}
