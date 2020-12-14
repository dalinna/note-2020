

const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g
function genChildren(el){
  const children = el.children;
  console.log('children',children);
  if(children){
    return  children.map(child=>gen(child).join(','))
  };
}

function gen(node){ // 区分元素和文本
  console.log('node', node );
  if(node.type ==1){
    return generate(node);
  }else{ // 文本逻辑不能用_c处理
    // 有{{}}  混合文本 {{a}} aa {{a}}
    let text = node.text;
    if(defaultTagRE.test(text)){
      let tokens = [];
      let match;
      let index= 0;
      let lastIndex = 0
      while(match = defaultTagRE.exec(text)){
        index = match.index;
        if(index > defaultTagRE.lastIndex){
          tokens.push(JSON.stringify(text.slice(lastIndex)))
        }
      }
    }else{
      return `_v(${JSON.stringify(text)})`
    }

  }
}


export function generate(el){
  console.log(el);
  function genProps(attrs){
    let str='';
    for(let i=0;i<attrs.length;i++){
      let attr = attrs[i];
      if(attr.name === 'style'){
        let obj = {}
        attr.value.split(';').forEach(item=>{
          let [key,value] = item.split(':');
          obj[key] = value
        })
        attr.value = obj;
      }
      str += `${attr.name}:${JSON.stringify(attr.value)}`
    }
    return `{${str.slice(0,-1)}}`;
  }

  // 将 ast => js代码；
//   <div id="app" style="color:green">
//    <span class="122">{{name}}</span>
//  </div>
  let children = genChildren(el);
  let code =`_c('${el.tag}',${
    el.attrs.length? genProps(el.attrs):'undefined'
  } ${
    children? (','+ children):''
  })`
  console.log(code);
  return code;
}
