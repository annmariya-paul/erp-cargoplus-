

 export function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 1 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  }