import {InferenceSession ,Tensor} from 'onnxruntime-web';

const classes = [
    {name:"苹果",Disease:"健康"},
    {name:"苹果",Disease:"黑星病一般"},
    {name:"苹果",Disease:"黑星病严重"},
    {name:"苹果",Disease:"灰斑病"},
    {name:"苹果",Disease:"雪松锈病一般"},
    {name:"苹果",Disease:"雪松锈病严重"},
    {name:"樱桃",Disease:"健康"},
    {name:"樱桃",Disease:"白粉病一般"},
    {name:"樱桃",Disease:"白粉病严重"},
    {name:"玉米",Disease:"健康"},
    {name:"玉米",Disease:"灰斑病一般"},
    {name:"玉米",Disease:"灰斑病严重"},
    {name:"玉米",Disease:"锈病一般"},
    {name:"玉米",Disease:"锈病严重"},
    {name:"玉米",Disease:"叶斑病一般"},
    {name:"玉米",Disease:"叶斑病严重"},
    {name:"玉米",Disease:"花叶病毒病"},
    {name:"葡萄",Disease:"健康"},
    {name:"葡萄",Disease:"黑腐病一般"},
    {name:"葡萄",Disease:"黑腐病严重"},
    {name:"葡萄",Disease:"轮斑病一般"},
    {name:"葡萄",Disease:"轮斑病严重"},
    {name:"葡萄",Disease:"褐斑病一般"},
    {name:"葡萄",Disease:"褐斑病严重"},
    {name:"柑桔",Disease:"健康"},
    {name:"柑桔",Disease:"黄龙病一般"},
    {name:"柑桔",Disease:"黄龙病严重"},
    {name:"桃",Disease:"健康"},
    {name:"桃",Disease:"疮痂病一般"},
    {name:"桃",Disease:"疮痂病严重"},
    {name:"辣椒",Disease:"健康"},
    {name:"辣椒",Disease:"疮痂病一般"},
    {name:"辣椒",Disease:"疮痂病严重"},
    {name:"马铃薯",Disease:"健康"},
    {name:"马铃薯",Disease:"早疫病一般"},
    {name:"马铃薯",Disease:"早疫病严重"},
    {name:"马铃薯",Disease:"晚疫病一般"},
    {name:"马铃薯",Disease:"晚疫病严重"},
    {name:"草莓",Disease:"健康"},
    {name:"草莓",Disease:"叶枯病一般"},
    {name:"草莓",Disease:"叶枯病严重"},
    {name:"番茄",Disease:"健康"},
    {name:"番茄",Disease:"白粉病一般"},
    {name:"番茄",Disease:"白粉病严重"},
    {name:"番茄",Disease:"疮痴病一般"},
    {name:"番茄",Disease:"疮痴病严重"},
    {name:"番茄",Disease:"早疫病一般"},
    {name:"番茄",Disease:"早疫病严重"},
    {name:"番茄",Disease:"晚疫病菌一般"},
    {name:"番茄",Disease:"晚疫病菌严重"},
    {name:"番茄",Disease:"叶霉病一般"},
    {name:"番茄",Disease:"叶霉病严重"},
    {name:"番茄",Disease:"斑点病一般"},
    {name:"番茄",Disease:"斑点病严重"},
    {name:"番茄",Disease:"斑枯病一般"},
    {name:"番茄",Disease:"斑枯病严重"},
    {name:"番茄",Disease:"红蜘蛛损伤一般"},
    {name:"番茄",Disease:"红蜘蛛损伤严重"},
    {name:"番茄",Disease:"黄化曲叶病毒病一般"},
    {name:"番茄",Disease:"黄化曲叶病毒病严重"},
    {name:"番茄",Disease:"花叶病毒病"},
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
  
  export async function identifyImg(imgData:ImageData){
    if (!session) {
        session = await InferenceSession.create('/sqNext.onnx');
      }
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