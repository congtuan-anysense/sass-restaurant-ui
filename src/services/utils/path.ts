export function pathWithId(id: number): string {
  return `${this.path.split(":")[0]}${id}`;
}
