const names = [
    "苹果健康",
    "苹果黑星病一般",
    "玉米锈病一般",
    "玉米锈病严重",
    "葡萄健康",
    "葡萄黑腐病一般",
    "葡萄黑腐病严重",
    "苹果黑星病严重",
    "桃健康",
    "桃疮痂病一般",
    "桃疮痂病严重",
    "辣椒健康",
    "辣椒疮痂病一般",
    "辣椒疮痂病严重",
    "马铃薯健康",
    "马铃薯早疫病一般",
    "马铃薯早疫病严重",
    "草莓健康",
    "草莓叶枯病一般",
    "草莓叶枯病严重",
    "番茄健康",
    "未识别到植物",
    "番茄叶斑病一般",
    "番茄叶斑病严重",
    "樱桃健康",
    "樱桃白粉病一般",
    "樱桃白粉病严重",
    "玉米健康"
]
const plantName = ["苹果","葡萄","桃","辣椒","马铃薯","草莓","番茄","樱桃","玉米","未识别到植物"]
const diseaseName=["黑星病","锈病","黑腐病","黑星病","疮痂病","早疫病","叶枯病","叶斑病","白粉病"]

export const treeData = [
    {
      title: '苹果',
      value: '苹果',
      children: [
        {
            title:'苹果健康',
            value:'苹果健康',
        },
        {
            title:'苹果黑星病',
            value:'苹果黑星病',
            children:[
                {
                    title:'苹果黑星病一般',
                    value:'苹果黑星病一般',
                },
                {
                    title:'苹果黑星病严重',
                    value:'苹果黑星病严重',
                }
            ]
        }
      ],
    },
    {
        title: '玉米',
        value: '玉米',
        children: [
          {
              title:'玉米健康',
              value:'玉米健康',
          },
          {
              title:'玉米锈病',
              value:'玉米锈病',
              children:[
                  {
                      title:'玉米锈病一般',
                      value:'玉米锈病一般',
                  },
                  {
                      title:'玉米锈病严重',
                      value:'玉米锈病严重',
                  }
              ]
          }
        ],
    },
    {
        title: '葡萄',
        value: '葡萄',
        children: [
          {
              title:'葡萄健康',
              value:'葡萄健康',
          },
          {
              title:'葡萄黑腐病',
              value:'葡萄黑腐病',
              children:[
                  {
                      title:'葡萄黑腐病一般',
                      value:'葡萄黑腐病一般',
                  },
                  {
                      title:'葡萄黑腐病严重',
                      value:'葡萄黑腐病严重',
                  }
              ]
          }
        ],
    },
    {
        title: '桃',
        value: '桃',
        children: [
          {
              title:'桃健康',
              value:'桃健康',
          },
          {
              title:'桃疮痂病',
              value:'桃疮痂病',
              children:[
                  {
                      title:'桃疮痂病一般',
                      value:'桃疮痂病一般',
                  },
                  {
                      title:'桃疮痂病严重',
                      value:'桃疮痂病严重',
                  }
              ]
          }
        ],
    },
    {
    title: '辣椒',
    value: '辣椒',
    children: [
        {
            title:'辣椒健康',
            value:'辣椒健康',
        },
        {
            title:'辣椒疮痂病',
            value:'辣椒疮痂病',
            children:[
                {
                    title:'辣椒疮痂病一般',
                    value:'辣椒疮痂病一般',
                },
                {
                    title:'辣椒疮痂病严重',
                    value:'辣椒疮痂病严重',
                }
            ]
        }
    ],
    },
    {
    title: '马铃薯',
    value: '马铃薯',
    children: [
        {
            title:'马铃薯健康',
            value:'马铃薯健康',
        },
        {
            title:'马铃薯早疫病',
            value:'马铃薯早疫病',
            children:[
                {
                    title:'马铃薯早疫病一般',
                    value:'马铃薯早疫病一般',
                },
                {
                    title:'马铃薯早疫病严重',
                    value:'马铃薯早疫病严重',
                }
            ]
        }
    ],
    },
    {
    title: '草莓',
    value: '草莓',
    children: [
        {
            title:'草莓健康',
            value:'草莓健康',
        },
        {
            title:'草莓叶枯病',
            value:'草莓叶枯病',
            children:[
                {
                    title:'草莓叶枯病一般',
                    value:'草莓叶枯病一般',
                },
                {
                    title:'草莓叶枯病严重',
                    value:'草莓叶枯病严重',
                }
            ]
        }
    ],
    },
    {
    title: '番茄',
    value: '番茄',
    children: [
        {
            title:'番茄健康',
            value:'番茄健康',
        },
        {
            title:'番茄叶斑病',
            value:'番茄叶斑病',
            children:[
                {
                    title:'番茄叶斑病一般',
                    value:'番茄叶斑病一般',
                },
                {
                    title:'番茄叶斑病严重',
                    value:'番茄叶斑病严重',
                }
            ]
        }
    ],
    },
    {
    title: '樱桃',
    value: '樱桃',
    children: [
        {
            title:'樱桃健康',
            value:'樱桃健康',
        },
        {
            title:'樱桃白粉病',
            value:'樱桃白粉病',
            children:[
                {
                    title:'樱桃白粉病一般',
                    value:'樱桃白粉病一般',
                },
                {
                    title:'樱桃白粉病严重',
                    value:'樱桃白粉病严重',
                }
            ]
        }
    ],
    }
  ];

function getDisease(name:string){
    for(let i=0;i<diseaseName.length;i++){
        if(name.includes(diseaseName[i])){
            return diseaseName[i]
        }
    }
}

function getName(name:string){
    for(let i=0;i<plantName.length;i++){
        if(name.includes(plantName[i])){
            return plantName[i]
        }
    }
}

function transformData(name:string) {
    const result = {name:'无',disease:'无',level:'无'}
    if(name=='未识别到植物')return result
    for(let i=0;i<plantName.length;i++){
        if(name.includes(plantName[i])){
            result['name'] = plantName[i]
            if(name.slice(-2)=='健康'){
                result['level']='无'
                return result
            }
            if(name.slice(-2)=='一般'){
                result['level']='一般'
                result['disease']=getDisease(name)!
                result['name'] = getName(name)!
                return result
            }
            if(name.slice(-2)=='严重'){
                result['level']='严重'
                result['disease']=getDisease(name)!
                result['name'] = getName(name)!
                return result
            }
        }
    }
}

export default transformData;