export function printBuffer(buffer: number[], lastInsert: number) {
  console.log(buffer.map((v) => (v === lastInsert ? `(${v})` : v)).join(' '));
}
