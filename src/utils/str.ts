// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const hexTable = Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, '0')) as const

/**
 * 高性能 UUID v4 生成器 (无分隔符版)
 * 生成符合 RFC4122 标准的 32 字符 UUID
 * 特点：
 * 1. 使用密码学安全随机数生成器 (CSPRNG)
 * 2. 性能优化：预计算十六进制表 + 单次内存分配
 * 3. 严格类型校验
 * 4. 无第三方依赖
 *
 * @returns 32 字符的 UUID 字符串
 */
export const generateUUID = (): string => {
  const buffer = new Uint8Array(16)
  crypto.getRandomValues(buffer)

  // 遵循 UUID v4 规范设置版本位
  buffer[6] = (buffer[6] & 0x0f) | 0x40 // version 4
  buffer[8] = (buffer[8] & 0x3f) | 0x80 // variant 10

  // 预分配内存优化
  const uuid = new Array(32)

  // 高性能十六进制转换
  for (let i = 0; i < 16; i++) {
    const hex = hexTable[buffer[i]]
    uuid[i * 2] = hex[0]
    uuid[i * 2 + 1] = hex[1]
  }

  return uuid.join('')
}
