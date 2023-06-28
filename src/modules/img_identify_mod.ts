import {InferenceSession ,Tensor} from 'onnxruntime-web';

const classes = [
  {name:"苹果",Disease:"健康"},
  {name:"苹果",Disease:"黑星病一般"},
  {name:"玉米",Disease:"锈病一般"},
  {name:"玉米",Disease:"锈病严重"},
  {name:"葡萄",Disease:"健康"},
  {name:"葡萄",Disease:"黑腐病一般"},
  {name:"葡萄",Disease:"黑腐病严重"},
  {name:"苹果",Disease:"黑星病严重"},
  {name:"桃",Disease:"健康"},
  {name:"桃",Disease:"疮痂病一般"},
  {name:"桃",Disease:"疮痂病严重"},
  {name:"辣椒",Disease:"健康"},
  {name:"辣椒",Disease:"疮痂病一般"},
  {name:"辣椒",Disease:"疮痂病严重"},
  {name:"马铃薯",Disease:"健康"},
  {name:"马铃薯",Disease:"早疫病一般"},
  {name:"马铃薯",Disease:"早疫病严重"},
  {name:"草莓",Disease:"健康"},
  {name:"草莓",Disease:"叶枯病一般"},
  {name:"草莓",Disease:"叶枯病严重"},
  {name:"番茄",Disease:"健康"},
  {name:"未识别到植物",Disease:""},
  {name:"番茄",Disease:"叶斑病一般"},
  {name:"番茄",Disease:"叶斑病严重"},
  {name:"樱桃",Disease:"健康"},
  {name:"樱桃",Disease:"白粉病一般"},
  {name:"樱桃",Disease:"白粉病严重"},
  {name:"玉米",Disease:"健康"},
]
let newclasses = classes.map((i)=>{
  return {name:i['name']+i['Disease'],value:0}
})
let session: InferenceSession | null = null; 
function imageDataToTensor(data:Uint8ClampedArray,dims:number[]){
    const [redArray, greenArray, blueArray] = new Array(new Array<number>(), new Array<number>(), new Array<number>());
  
    for (let i = 0; i < data.length; i += 4) {
      redArray.push((data[i]/255        -0.485)/0.229);
      greenArray.push((data[i + 1]/255  -0.456)/0.224);
      blueArray.push((data[i + 2]/255   -0.406)/0.225);
    }
    const transposedData = redArray.concat(greenArray).concat(blueArray);
    const float32Data = new Float32Array(dims[0] * dims[1] * dims[2]);
    let i, l = transposedData.length;
    for (i = 0; i < l; i++) {
      float32Data[i] = transposedData[i];
    }
    const inputTensor = new Tensor("float32", float32Data, dims);
    const x = inputTensor.reshape([1,3,224,224])
    return x;
  }

  function softmax(arr: Float32Array): Float32Array {
    const max = Math.max(...arr);
    const expArr = Array.from(arr, (num) => Math.exp(num - max));
    const sum = expArr.reduce((acc, cur) => acc + cur, 0);
    return new Float32Array(expArr.map((num) => num / sum));
  }
  function loadImageDataFromURL(url:string) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
  
      img.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        img.width = 224;
        img.height = 224;
        canvas.width = img.width;
        canvas.height = img.height;
  
        ctx!.drawImage(img, 0, 0);
  
        const imageData:ImageData = ctx!.getImageData(0, 0, img.width, img.height);
        resolve(imageData);
      };
  
      img.onerror = function() {
        reject(new Error('Failed to load image.'));
      };
      img.src = url;
    });
  }
  export async function identifyImg(imgurl:string){
    if (!session) {
        session = await InferenceSession.create('/mobilenet.onnx');
      }
    let imgData:ImageData = await loadImageDataFromURL(imgurl) as ImageData
    const imageDataTensor = imageDataToTensor(imgData.data,[3,224,224])
    const feeds = { input: imageDataTensor };
    const result = await session.run(feeds)
    const resultNbm = softmax(result.output.data as Float32Array)
    const bufferArray: Float32Array = resultNbm as Float32Array;
    let resultIdx:number = 0
    let resultMax:number = bufferArray[0]
    bufferArray.forEach((v,i)=>{
      newclasses[i].value = v*100
      if (v>resultMax){
        resultMax = v
        resultIdx = i
      }
    })
    return newclasses
  }