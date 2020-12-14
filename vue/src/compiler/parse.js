const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 标签开头的正则 捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的 </div>
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g


{/*
<div id="app" style="color:green">
  <div class="122"></div>
</div>
*/}
function createASTElement(tag,attrs){
  return {
    tag,
    type:1,
    children:[],
    attrs,
    parents:null
  }
}

let root = null ;
let currentParent;
let stack = [];
export function parseHTML(html){
  // 根据开始标签、结束标签、文本内容生成ast语法书
  function start(tagName, attrs){
    console.log('tagName',tagName,attrs);
    let element  = createASTElement(tagName, attrs);
    if(!root){
      root = element;
    }
    currentParent = element;
    stack.push(element);
  }
  function end(tagName){
    let element  = stack.pop();
    currentParent = stack[stack.length-1];
    if(currentParent){
      element.parent = currentParent;
      currentParent.children.push(element);
    }
  }
  function chars(text){
    text = text.replace(/\s/g, '');
    if(text){
      currentParent.children.push({
        type: 2,
        text
      })
    }
  }
  function advance(n){
    html = html.substring(n);
  }
  function parseStartTag(){
    const start = html.match(startTagOpen)
    if(start){
      let match = {
        tagName :start[1],
        attrs:[]
      }
      advance(start[0].length); // 获取元素
      // 查找属性
      let end ,attr;
      while(!(end = html.match(startTagClose))&& (attr = html.match(attribute))){
        advance(attr[0].length);
        match.attrs.push({
          name: attr[1],
          value : attr[3] || attr[4] || attr[5]
        })
      }
      if(end){
        advance(end[0].length); // 获取元素
        return match;
      }
    }
  }
  while(html){
    let textEnd= html.indexOf('<');
    if(textEnd == 0){
      let startTagMatch = parseStartTag();
      if(startTagMatch){ // 开始标签
        ;
        start(startTagMatch.tagName,startTagMatch.attrs);
        continue;
      }
      let endTagMatch = html.match(endTag);
      if(endTagMatch){
        console.log('结尾',endTagMatch[1]);
        end(endTagMatch[1])
        advance(endTagMatch[0].length);
      }

    }
    let text;
    if(textEnd > 0){
      text = html.substring(0, textEnd);
    }
    if(text){
      advance(text.length);
      chars(text);
      console.log('文本',text);
    }
  }
  return root;
}
