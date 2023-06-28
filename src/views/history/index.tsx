import { Collapse, Image, Checkbox, Button, Select, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { remove } from '../../modules/database_mod'
import './history.scss'
import { getAll } from '../../modules/database_mod'
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CaretRightOutlined, DeleteFilled, EyeFilled, PieChartFilled, RollbackOutlined, SyncOutlined, UploadOutlined } from '@ant-design/icons';
import Barplot from '../../component/barplot'
import Pieplot from '../../component/pieplot'
import Heatmap from '../../component/heatmap';
import Suggestion from '../../component/suggestion'
const { Panel } = Collapse;
const { Search } = Input;

const HistoryCollapse: React.FC = () => {
    const [data, setData] = useState<any[]>([])
    const [indeterminate, setIndeterminate] = useState(false);
    const [checkAll, setCheckAll] = useState(false);
    const [plantClass, setPlantClass] = useState<string[]>([])
    const [diseaseClass, setDiseaseClass] = useState<string[]>([])
    const [check, setCheck] = useState<boolean[]>([])
    const [selectDisease, setSelectDisease] = useState<string>('')
    const [selectPlant, setSelectPlant] = useState<string>('')
    const [isdb, setIsdb] = useState(false)
    const [isHeatmap,setIsHeatmap] = useState(false)
    let saveData: any[]
    function setPageData(res: any[]) {
        setData(res as any[])
        saveData = res
        setCheck(Array(res.length).fill(false))
        let tempPlantClass: string[] = []
        let tempDiseaseClass: string[] = []
        res.forEach((v: any, i: any) => {
            tempPlantClass.push(v['name'].slice(0, -2))
            tempDiseaseClass.push(v['name'].slice(-2))
        })
    }
    useEffect(() => {
        getAll().then((res: any) => {
            setData(res as any[])
            saveData = res
            setCheck(Array(res.length).fill(false))
            let tempPlantClass: string[] = []
            let tempDiseaseClass: string[] = []
            res.forEach((v: any, i: any) => {
                tempPlantClass.push(v['name'].slice(0, -2))
                tempDiseaseClass.push(v['name'].slice(-2))
            })
            setPlantClass([...new Set(tempPlantClass)])
            setDiseaseClass([...new Set(tempDiseaseClass)])
        })
    }, [])

    const onSearch = (value: string) => {
        if (value == '') {
            getAll().then((res: any) => {
                setPageData(res)
            })
        } else {
            let newData: any[] = []
            getAll().then((res: any) => {
                res.forEach((v:any) => {
                    if (v['address'].includes(value) || v['name'].includes(value)) {
                        newData.push(v)
                    }
                })
                setData(newData)

            })
 
        }
    };
    const onSelectPlant = (e: string) => {
        setCheckAll(false)
        setIndeterminate(false)
        setSelectPlant(e)
        getAll().then((res: any) => {
            let newData: any[] = []
            res.forEach((v: any) => {
                if (v['name'].includes(selectDisease) && v['name'].includes(e)) {
                    newData.push(v)
                }
            })
            setPageData(newData)
        })
    }
    const onSelectDisease = (e: any) => {
        setCheckAll(false)
        setIndeterminate(false)
        setSelectDisease(e)
        getAll().then((res: any) => {
            let newData: any[] = []
            res.forEach((v: any) => {
                if (v['name'].includes(e) && v['name'].includes(selectPlant)) {
                    newData.push(v)
                }
            })
            setPageData(newData)
        })
    }
    const exportBtn = () => {
        window.location.href = `http://localhost:3000/files/data.xlsx`
    }
    const dbBtn = () => {
        setIsdb(true)
    }
    const mapBtn = () => {
        setIsHeatmap(true)
    }
    const backBtn = () => {
        setIsdb(false)
        setIsHeatmap(false)
    }
    function backLogin(){
        window.location.href='/#/login'
    }
    return (
        isdb ? (<div className='DbBox'>
            <Button onClick={backBtn} icon={<RollbackOutlined style={{ color: 'white' }} />} ghost style={{ background: 'rgba(255,255,255,.25)', color: 'white', border: 'none' }}></Button>
            <div style={{textAlign:'center',display:'flex',flexWrap: 'wrap',justifyContent: 'space-evenly'}}>
                <Image.PreviewGroup>
                    {
                        check.map((v, i) => {
                            if (v) {
                                return <div style={{marginTop:'10px',textAlign:'center',color:'white'}}>
                                    <div>{data[i]['name']}</div>
                                        <Image width={224} height={224} src={`http://localhost:3000/files/${data[i]['imgName']}`} />
                                    </div>
                            }
                            return<></>
                        })
                    }
                </Image.PreviewGroup>
            </div>
        </div>) :
        isHeatmap?(<div className='DbBox'>
            <Button onClick={backBtn} icon={<RollbackOutlined style={{ color: 'white' }} />} ghost style={{ background: 'rgba(0,0,0,.25)', color: 'white', border: 'none',position:'absolute',top:'10px',left:'10px',zIndex:99 }}></Button>
            <Heatmap height='100%' width='100%'/>
        </div>):
            (<div className='HistoryBox'>
                <div className='HistoryQuey'>
                    <div style={{width: '100%'}}><Button onClick={backLogin} icon={<RollbackOutlined style={{ color: 'white' }} />} ghost style={{ background: 'rgba(0,0,0,.25)', color: 'white', border: 'none'}}></Button></div>
                    <Search onSearch={onSearch} style={{ width: 170, marginTop: '20px' }} />
                    <Button icon={<EyeFilled />} onClick={dbBtn} ghost style={{ background: 'rgba(255,255,255,.25)', color: 'white', border: 'none', width: 170, marginTop: '40px' }} type="primary">
                        对比
                    </Button>
                    <Button icon={<PieChartFilled />} onClick={mapBtn} ghost style={{ background: 'rgba(255,255,255,.25)', color: 'white', border: 'none', width: 170, marginTop: '20px' }} type="primary">
                        病害热力图
                    </Button>
                    <Button icon={<UploadOutlined />} onClick={exportBtn} ghost style={{ background: 'rgba(255,255,255,.25)', color: 'white', border: 'none', width: 170, marginTop: '20px' }} type="primary">
                        导出
                    </Button>
                </div>
                <div className='HistoryCollapseStyle'>
                    <div style={{ margin: '10px 10px' }}>
                        <Checkbox onChange={(e: CheckboxChangeEvent) => {
                            e.stopPropagation()
                            if (e.target.checked) {
                                setCheck(Array(check.length).fill(true))
                                setIndeterminate(false)
                            } else {
                                setCheck(Array(check.length).fill(false))
                                setIndeterminate(false)
                            }
                            setCheckAll((checkAll) => {
                                return !checkAll
                            })
                        }} style={{ color: 'white' }} indeterminate={indeterminate} checked={checkAll}>全选</Checkbox>
                        <Button type="text" onClick={async (e) => {
                            let removeIds: number[] = []
                            check.forEach((v, i) => {
                                if (v) {
                                    removeIds.push(data[i]['id'])
                                }
                            })
                            if (removeIds.length != 0) {
                                await remove(removeIds)
                                window.location.reload();
                            }
                        }}><DeleteFilled style={{ color: 'white' }} /></Button>
                        <Select
                            onSelect={onSelectPlant}
                            defaultValue='叶面类型'
                            style={{ width: '150px' }}
                            options={plantClass.map((v) => {
                                return { value: v, label: v }
                            })}
                        />
                        <Select
                            defaultValue='病害程度'
                            onSelect={onSelectDisease}
                            style={{ width: '150px' }}
                            options={diseaseClass.map((v) => {
                                return { value: v, label: v }
                            })}
                        />
                        <Button type="text" onClick={async (e) => {
                            window.location.reload();
                        }}><SyncOutlined style={{ color: 'white' }} /></Button>
                    </div>
                    <Collapse accordion ghost collapsible="icon" bordered={false} expandIcon={({ isActive }: any) => <CaretRightOutlined style={{ color: 'white' }} rotate={isActive ? 90 : 0} />}>
                        {
                            data != undefined ? data.map((v, i) => {
                                let data = JSON.parse(v['outPutData'])
                                let status: string = ''
                                if (v['name'].slice(-2) == '健康') {
                                    status = `#71ef71`
                                }
                                if (v['name'].slice(-2) == '一般') {
                                    status = `#fdd791`
                                }
                                if (v['name'].slice(-2) == '严重') {
                                    status = `red`
                                }
                                return (
                                    <Panel header={
                                        <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                                            <Checkbox checked={check[i]} onChange={(e: CheckboxChangeEvent) => {
                                                e.stopPropagation()
                                                setCheck(check => {
                                                    const updatedStatus = [...check];
                                                    updatedStatus[i] = !updatedStatus[i];
                                                    return updatedStatus;
                                                });
                                                let checkSum = check.reduce((accumulator, currentValue) => accumulator + Number(currentValue), 0)
                                                if (e.target.checked) {
                                                    checkSum += 1
                                                } else {
                                                    checkSum -= 1
                                                }
                                                if (checkSum == check.length) {
                                                    setCheckAll(true)
                                                    setIndeterminate(false)
                                                } else if (checkSum == 0) {
                                                    setCheckAll(false)
                                                    setIndeterminate(false)
                                                } else {
                                                    setCheckAll(false)
                                                    setIndeterminate(true)
                                                }

                                            }} style={{ color: 'white' }}><div>{v['name']}</div><div>{'识别速度:' + v['speed'] + '(ms)'}</div><div>{v['address']}</div></Checkbox>
                                            <div style={{ background: status, height: '10px', width: '10px', marginLeft: '10px',marginRight: '30px', borderRadius: '10px' }}>
                                            </div>
                                            <Suggestion title={v['name']}/>
                                        </div>
                                    }
                                        key={i}
                                        className='PanelStyle'
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                            <Image src={`http://localhost:3000/files/${v['imgName']}`} width={300} height={300} style={{ borderRadius: 10 }} />
                                            <Barplot width='280px' height='280px' data={data} />
                                            <Pieplot width='280px' height='280px' data={data} />
                                        </div>
                                    </Panel>
                                )
                            }) : <div></div>
                        }
                    </Collapse>
                </div>
            </div>)
    );
};

export default HistoryCollapse;