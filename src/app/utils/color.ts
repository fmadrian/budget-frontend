import * as d3 from 'd3';
// Generates a random rgb color and returns it in hexadecimal form.
const randomColor = () => {
  const r = Math.floor(Math.random() * 256),
    g = Math.floor(Math.random() * 256),
    b = Math.floor(Math.random() * 256);

  return d3.rgb(r, g, b).formatHex();
};
export const generateRandomColors = (quantity: number) => {
  const result: string[] = [];
  const color = '';
  for (let i = 0; i < quantity; i++) {
    // If a color is repeated, it has to generate a new one.
    if (!result.includes(color)) {
      result.push(randomColor());
    } else {
      i -= 1;
    }
  }
  return result;
};
