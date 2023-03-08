 export function camelize(str) {
  const titleCase = str
    .toLowerCase()
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
  return titleCase;
};

// export function camelize(str) {
//   return str
//     .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
//       return index === 1 ? word.toLowerCase() : word.toUpperCase();
//     })
//     .replace(/\s+/g, "");
// }
