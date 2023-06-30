import { Collapse, Image, Checkbox, Button, Select, Input, TreeSelect, message, FloatButton, Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import { remove } from '../../modules/database_mod'
import './history.scss'
import { getAll } from '../../modules/database_mod'
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CaretRightOutlined, DeleteFilled, EyeFilled, PieChartFilled, QuestionCircleFilled, QuestionCircleOutlined, RollbackOutlined, SyncOutlined, UploadOutlined } from '@ant-design/icons';
import Barplot from '../../component/barplot'
import Heatmap from '../../component/heatmap';
import Suggestion from '../../component/suggestion'
import config from '../../porject-config'
import transformData, { treeData } from '../../modules/parser_result';





const { Panel } = Collapse;
const { Search } = Input;

const HistoryCollapse: React.FC = () => {
    const [data, setData] = useState<any[]>([])
    const [indeterminate, setIndeterminate] = useState(false);
    const [checkAll, setCheckAll] = useState(false);//全选按钮是否
    const [check, setCheck] = useState<boolean[]>([])

    const [isdb, setIsdb] = useState(false)
    const [isHeatmap, setIsHeatmap] = useState(false)
    const [value, setValue] = useState<string | undefined>(undefined);

    let saveData: any[]
    function setPageData(res: any[]) {
        setData(res as any[])
        saveData = res
        setCheck(Array(res.length).fill(false))
    }
    useEffect(() => {
        getAll().then((res: any) => {
            setData(res as any[])
            saveData = res
            setCheck(Array(res.length).fill(false))
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
                res.forEach((v: any) => {
                    if (v['address'].includes(value) || v['name'].includes(value)) {
                        newData.push(v)
                    }
                })
                setData(newData)
            })

        }
    };


    const exportBtn = () => {
        window.location.href = `${config['webserver']}/files/data.xlsx`
    }
    const dbBtn = () => {
        if(check.reduce((accumulator, currentValue) => accumulator + Number(currentValue), 0)<2){
            message.warning('请选择两种以上数据进行对比')
        }else{
            setIsdb(true)
        }
    }
    const mapBtn = () => {
        if(check.reduce((accumulator, currentValue) => accumulator + Number(currentValue), 0)<2){
            message.warning('请选择多条数据进行查看')
        }else{
            setIsHeatmap(true)
        }
    }
    const backBtn = () => {
        setIsdb(false)
        setIsHeatmap(false)
    }
    function backLogin() {
        window.location.href = '/#/login'
    }
    const selectTag = (newValue: string) => {
        setValue(newValue);
        if (newValue.length == 0) {
            getAll().then((res: any) => {
                setPageData(res)
            })
        } else {
            let newData: any[] = []
            getAll().then((res: any) => {
                res.forEach((v: any) => {
                    (newValue as unknown as string[]).forEach((target:any)=>{
                        if (v['name'].includes(target)) {
                            newData.push(v)
                        }
                    })
                    
                })
                setData(newData)
            })

        }
    };
    return (
        isdb ? (<div className='DbBox'>
            <Button onClick={backBtn} icon={<RollbackOutlined style={{ color: 'white' }} />} ghost style={{ background: 'rgba(255,255,255,.25)', color: 'white', border: 'none' }}></Button>
            <div style={{ textAlign: 'center', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                <Image.PreviewGroup>
                    {
                        check.map((v, i) => {
                            if (v) {
                                return <div style={{ marginTop: '10px', textAlign: 'center', color: 'white' }} key={i}>
                                    <div>{data[i]['name']}</div>
                                    {/* <Image width={224} height={224} src={`http://localhost:3000/files/${data[i]['imgName']}`} /> */}
                                    <Image width={224} height={224} src={`${config['webserver']}/files/${data[i]['imgName']}`} />
                                </div>
                            }
                            return <></>
                        })
                    }
                </Image.PreviewGroup>
            </div>
        </div>) :
            isHeatmap ? (<div style={{color:'white'}}>
                    <div style={{ background:'rgb(0 0 0 / 10%)',color: 'white',backdropFilter:'blur(10px) saturate(1.5)',marginBottom: '5px',borderRadius: '10px',padding: '5px',width:'100%'}}>
                            <QuestionCircleOutlined style={{paddingRight:'5px'}}/>说明：该地图可根据用户所选择的数据,对应颜色由浅至深显示在地图上, 颜色越深红代表该地区 植物病害越严重，用户可以着重处理该地区病害。
                    </div>
                    <div className='DbBox'>
                            <Button onClick={backBtn} icon={<RollbackOutlined style={{ color: 'white' }} />} ghost style={{ background: 'rgba(0,0,0,.25)', color: 'white', border: 'none', position: 'absolute', top: '10px', left: '10px', zIndex: 99 }}></Button>
                            <Heatmap height='100%' width='100%' check={check}/>
                            <Popover content={(<div>数值由小到大代表病害的严重程度</div>)} title="说明">
                                <FloatButton icon={<QuestionCircleOutlined />} type="default" style={{ left: -45 ,bottom:10}}/>
                            </Popover>
                    </div>
            </div>) :
                (<div className='HistoryBox'>
                    <div className='HistoryQuey'>
                        <div style={{ width: '100%' }}><Button onClick={backLogin} icon={<RollbackOutlined style={{ color: 'white' }} />} ghost style={{ background: 'rgba(0,0,0,.25)', color: 'white', border: 'none' }}></Button></div>
                        <Button icon={<EyeFilled />} onClick={dbBtn} ghost style={{ background: 'rgba(255,255,255,.25)', color: 'white', border: 'none', width: 150, marginTop: '20px' }} type="primary">
                            病害对比
                        </Button>
                        <Button icon={<PieChartFilled />} onClick={mapBtn} ghost style={{ background: 'rgba(255,255,255,.25)', color: 'white', border: 'none', width: 150, marginTop: '20px' }} type="primary">
                            病害热力图
                        </Button>
                        <Button icon={<UploadOutlined />} onClick={exportBtn} ghost style={{ background: 'rgba(255,255,255,.25)', color: 'white', border: 'none', width: 150, marginTop: '20px' }} type="primary">
                            数据导出
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
                                }
                                window.location.reload()
                            }}><DeleteFilled style={{ color: 'white' }} /></Button>
                            <TreeSelect
                                showSearch
                                style={{ width: '300px' }}
                                value={value}
                                placeholder="请选择类别(可多选)"
                                allowClear
                                multiple
                                onChange={selectTag}
                                treeData={treeData}
                                />
                            <Search onSearch={onSearch} style={{ width: 150,marginLeft:'10px'}} />
                            <Button type="text" onClick={async (e) => {
                                    setValue(undefined);
                                    getAll().then((res: any) => {
                                        setPageData(res)
                                    })

                            }}><SyncOutlined style={{ color: 'white' }} /></Button>
                        </div>
                        <Collapse defaultActiveKey={['0']} accordion ghost collapsible="icon" bordered={false} expandIcon={({ isActive }: any) => <CaretRightOutlined style={{ color: 'white' }} rotate={isActive ? 90 : 0} />}>
                            {
                                data != undefined ? data.map((v, i) => {
                                    let data = JSON.parse(v['outPutData'])
                                    let status: string = '#c7c7c7'
                                    if (v['name'].slice(-2) == '健康') {
                                        status = `#24ff24`
                                    }
                                    if (v['name'].slice(-2) == '一般') {
                                        status = `#f9c25b`
                                    }
                                    if (v['name'].slice(-2) == '严重') {
                                        status = `red`
                                    }
                                    let parserName = transformData(v['name'])!
                                    return (
                                        <Panel header={
                                            <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', width: '100%', justifyContent: 'space-between' }}>
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

                                                }} style={{ color: 'white' }}>
                                                    植物种类:{parserName['name']}
                                                    {'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}
                                                    植物病害:{parserName['disease']}
                                                    {'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}
                                                    病害程度:{parserName['level']}
                                                    {'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}
                                                    {'识别速度:' + v['speed'] + '(ms)'}
                                                    {'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}
                                                    <div>
                                                        {v['address']}
                                                        {'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}
                                                        {'识别时间:' + v['datetime'].split(/T|\./g)[0]+' '+v['datetime'].split(/T|\./g)[1]}    
                                                    </div>
                                                </Checkbox>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <div style={{ background: status, height: '10px', width: '10px', marginRight: '30px', borderRadius: '10px' }}>
                                                    </div>
                                                    <Suggestion title={v['name']} />
                                                </div>
                                            </div>
                                        }
                                            key={i}
                                            className='PanelStyle'
                                        >
                                            <div>
                                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                                    <Image src={`${config['webserver']}/files/${v['imgName']}`} width={335} height={335} style={{ borderRadius: 10 }} />
                                                    <Barplot width='400px' height='315px' data={data} />
                                                </div>
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