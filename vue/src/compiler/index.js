
import { generate } from "./generater.js";
import { parseHTML } from "./parse.js";
export function compiletoFunctions(template){
  let el = parseHTML(template);
  let ele = generate(el);
}


