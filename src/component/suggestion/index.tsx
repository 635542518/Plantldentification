import { Button, Popover } from 'antd';
import React, { useState } from 'react';
const targetClass = ['苹果黑星病', '玉米锈病', '葡萄黑腐病', '桃疮痂病', '辣椒疮痂病', '马铃薯早疫病', '草莓叶枯病', '番茄叶斑病', '樱桃白粉病']
const content1 = (
    <div>
        <p>
            针对苹果黑星病一般程度的病害,建议以下专业应对措施：<br />
            1. 及时清理果园周围的落叶、落果和瘟疫的枝干,减少病菌在果园内的传播。<br />
            2. 种植抗病能力强的苹果品种,如‘金帅’、‘金冠’等。<br />
            3. 使用防治病害的药剂,如丙酸锰锌等铜类杀菌剂,通过喷雾或涂抹的方式施用,能有效降低病害的发生率。<br />
            针对苹果黑星病严重程度的病害,建议以下专业应对措施：<br />
            1. 及时清理枯死或严重感染的枝条,对整株树进行清理和修剪,并切断受感染的果实,防止病害繁殖与传播。<br />
            2. 喷洒高有效度的杀菌剂,如多菌灵、硫酸铜、丙酸锰锌等,每隔一周喷施一次,在果实成熟前喷施两到三次。<br />
            3. 进行科学养护,注意加强灌溉、施肥和调节植株生长环境。控制病害的发生必须从根本上发展做起,加强树木的抗病性,预防和降低病害发生的风险。<br />
        </p >
    </div>
);

const content2 = (
    <div>
        <p>
            针对玉米锈病一般程度的病害,建议以下专业应对措施：<br />
            1. 及时清理病原菌来源,清除田野周围的草丛,收割和处理已感染的秸秆,并在成熟前清洁和处理每一株玉米作物。<br />
            2. 种植抗病性强的玉米品种,通过遗传学改良培养具有优异抗病基因的玉米品种,如‘鲁冀7号’、‘中熟253’等。<br />
            3. 使用防治病害的药物,如氧乐果、苯丙酸锰等,喷洒在叶片或整株植株表面,阻隔病害的发生与繁殖。<br />
            针对玉米锈病严重程度的病害,建议以下专业应对措施：<br />
            1. 对已感染玉米植株采取根除办法,包括在发现感染病害后立即清除植株、焚烧和处理感染的植株、采用轮作种植、更替土壤等。<br />
            2. 喷洒高浓度的杀菌药剂,如多菌灵、甲基硫菌灵等,对叶片正反两面喷洒施药,确保喷药药液充分覆盖玉米叶片表面。<br />
            3. 进行科学管理,巩固土壤质量,调节植株生长环境。如适当提高玉米种植密度,稀植可提高通风透气性,避免高湿环境和罹病风险。<br />
        </p >
    </div>
);
const content3 = (
    <div>
        <p>
            针对葡萄黑腐病一般程度的病害,建议以下专业应对措施：<br />
            1. 及时清理葡萄园周围的凋落叶、枯枝、落果和病残体,以减少病原菌的传播。<br />
            2. 种植抗病性强的葡萄品种,如‘巨峰’、‘荷美尔’等。<br />
            3. 施用病害防治药剂,如苯醚甲环唑等杀菌剂,通过喷洒的方式,喷药液均匀喷洒到葡萄果实和叶片表面,以防止病菌传播。<br />
            针对葡萄黑腐病严重程度的病害,建议以下专业应对措施：<br />
            1. 及时清除已经感染的果实和病残体,避免病菌的繁殖和传播,使用消毒剂处理好相关采摘、修剪和消毒工具。<br />
            2. 使用高浓度和高效的杀菌药剂,如多菌灵、甲基硫菌灵等,每隔7天左右就喷洒一次, 注意药剂的使用量和浓度,喷药液均匀覆盖到葡萄整株植株、叶片和果实表面。<br />
            3. 加强葡萄栽培管理,妥善调控植株生长环境,避免过度密植和高湿度等不良环境因素对葡萄生长和防病的影响,保持土壤通风性、降低气温和湿度,防止病害的发生。同时,注意定期施肥、浇水等葡萄生长和发育所需的基本工作。<br />
        </p >
    </div>
);
const content4 = (
    <div>
        <p>
            针对桃疮痂病一般程度的病害,建议以下专业应对措施：<br />
            1. 及时剪除感染疮痂的枝条、干枯死伤的枝条和叶子,减少病菌的传播。<br />
            2. 在感染期开始或刚经过时,通过使用高浓度的杀菌剂,如丙环唑等控制感染,防止病菌扩散传染。<br />
            3. 实行轮作制度,以保证桃树的生长状况,避免土壤中养分的过度消耗造成树木根系不健康的状况。<br />
            针对桃疮痂病严重程度的病害,建议以下专业应对措施：<br />
            1. 采取集中治理的策略,对桃园进行全面大扫除,然后采用喷洒高效的杀菌剂,如乐果、多菌灵等,提高药剂的浓度,每隔一周就要喷洒一次。<br />
            2. 对于重度感染的桃树,可以采用手动或涂抹的方式将感染部分切除,注意保护桃树伤口,常喷涂泰安等伤口愈合剂。<br />
            3. 引进工程细菌防治技术,将其通过大面积浸种到桃林土中,使得该种细菌能在根系周边进行繁殖,以达到抑制病原菌生长的目的。<br />
        </p >
    </div>
);
const content5 = (
    <div>
        <p>
            针对辣椒疮痂病一般程度的病害,建议以下专业应对措施：<br />
            1. 坚持采取每年早春、初夏和晚夏3次喷药的防治措施,使用含有金霉素和氧氯化钠的农药进行喷洒杀菌,以防止疮痂病的繁殖和传播。<br />
            2. 对于出现较小的疮痂斑点,可以使用普通肥皂液喷洒,有助于清洗和消除疮痂菌。<br />
            3. 定期修剪和清理瘟疫枝干、叶片和落叶等,减少感染病原菌的可能性。同时,保持良好的通风和适度的湿度条件,调节好环境温度,在温度不高和湿度不高的情况下种植,有利于疮痂病的控制和防治。<br />
            针对辣椒疮痂病严重程度的病害,建议以下专业应对措施：<br />
            1. 采取联合治疗的方式,使用高效、宽谱的杀菌剂,如多菌灵、丙环唑等进行喷洒。每隔7-10天喷洒一次,持续3-4次,严密覆盖植株所有部位的药液有利于病害快速得到控制。<br />
            2. 对已经感染的植株,采用全局性的喷洒方式,将杀菌药液在整株植株表面冲洗喷洒,有利于防止疮痂病更深的扩散和传播。<br />
            3. 使用特效微生物制剂,如柳叶菜单胞菌、链霉菌、木霉菌等,加快生物防治的工作效率,比化学防治方式更加环保和可靠。<br />
        </p >
    </div>
);
const content6 = (
    <div>
        <p>
            针对马铃薯早疫病一般程度的病害,建议以下专业应对措施：<br />
            1. 及时清除田间落叶、落果、残茬和病株,尤其是在病害相对较轻的情况下,这些废弃物都是早疫病菌的重要来源。<br />
            2. 根据不同的生长季节和条件选择适宜的马铃薯品种,避免夏季用地过湿,或种植密度太大。<br />
            3. 程度一般的早疫病,可以通过喷洒杀菌剂进行药物防治,如甲霜灵、哒草灵等杀菌剂,按照药剂说明用量和浓度喷洒马铃薯叶片表面和植株周围。<br />
            针对马铃薯早疫病严重程度的病害,建议以下专业应对措施：<br />
            1. 季节性管理病害,防治病害加强,严格选择抗早疫病的马铃薯品种,进行基因治理工作。<br />
            2. 病害预警和控制具有重要意义,监测降雨量、湿度和季节影响因子,尽早分辨出病株和区域性传染,及时采取实施轻重防治策略。<br />
            3. 采用高浓度、宽谱的化学药剂喷洒,如敌草快和菌捷等药剂在严重情况下使用,需按药剂说明用量和浓度均匀喷洒,覆盖到马铃薯全株植株。但化学药剂的使用要慎重,应根据当地的环境规范和禁药期等因素进行安排。<br />
        </p >
    </div>
);
const content7 = (
    <div>
        <p>
            针对草莓叶枯病一般程度的病害,建议以下专业应对措施：<br />
            1. 选择抗病品种进行栽培或马铃薯套种,以减少患病的可能性。<br />
            2. 每年在草莓生长期间,定期修剪和清理叶子、果实、残茬、干萎和感染的枝叶等,及时清理废弃物,减少病原体的滋生,有助于病害的预防。<br />
            3. 使用草莓叶枯病的防治药剂,如氟吡菌酯、甲基硫菌灵等,每隔7-10天喷洒一次。注意药剂的使用量和浓度,喷洒药液要均匀分布到植株和土壤表面。药剂的使用需要在药剂禁用期内进行,以减少对环境的影响。<br />
            针对草莓叶枯病严重程度的病害,建议以下专业应对措施：<br />
            1. 进行大规模的清净防治,对所有感染的植株进行全面铲除和处理,把根部和上部进行彻底的焚烧或深埋,以彻底消灭病原体。<br />
            2. 缩短草莓栽植面积的时间,进行轮作和休耕,定期浅耕和深耕,进行土壤翻转或更换,以减少病原体在土壤中的存活量和传播率。<br />
            3. 调整种植密度、合理施肥、减轻草莓压力,定期喷洒翻斗菜防治草莓叶枯病的相关生物制剂,如木霉和拟青霉,以有效地控制草莓叶枯病的滋生和传播。<br />
        </p >
    </div>
);
const content8 = (
    <div>
        <p>
            针对番茄斑枯病一般程度的病害,建议以下专业应对措施：<br />
            1. 采用无菌育苗,使用健康的种子和良好的育苗介质,提高番茄植株的健康状况,减少病原菌的滋生和传播。<br />
            2. 实行淋灌浇水,缩短水浸、水湿持续时间,防止由于水分和湿度过高导致的常绿性病原菌生长繁殖,避免晾晒口湿度过高的情况。<br />
            3. 定期修剪和清除枯死的枝条、叶片和果实等,并及时将剩余部分、感染和病留残根深埋或烧毁,减少病原体在土壤中的存活量和传染率。<br />
            针对番茄斑枯病严重程度的病害,建议以下专业应对措施：<br />
            1. 采取药物防治措施,使用高效有益的杀菌剂,如氟吡菌酯、环氧菌素等。每隔7-10天喷洒一次,持续3-4周,以控制病害的扩散和传播。<br />
            2. 通过移栽、轮作和分区种植等措施,尽量减少番茄植株间的交叉感染,增加病害的隔离程度。<br />
            3. 通过提高气温、降低湿度和加强通风等措施,改善番茄生长环境,增强番茄的抗病性和免疫能力。定期装备空气净化器进行空气消毒,筛选出菌类杂质,杀灭细菌,有助于病害的消灭。<br />
        </p >
    </div>
);
const content9 = (
    <div>
        <p>
            针对樱桃白粉病一般程度的病害,建议以下专业应对措施：<br />
            1. 及时清理和删节樱桃枝条,确保树冠内部通风畅顺,减少露水滞留和湿润环境的出现。<br />
            2. 土地消毒,制作规范的干净栽培基质,不使用含有病菌的肥料,增加该区域的气候适应性。<br />
            3. 使用有效的杀菌剂（如百菌清、代森锰锌、硫磺等）喷洒牌桃树冠,避免白粉病在发病季节内向健康的樱桃树传播。<br />
            针对樱桃白粉病严重程度的病害,建议以下专业应对措施：<br />
            1. 除去受感染的枝条、叶片和果实等物质,深挖残体和病菌贮存区域,采用消毒方法进行,以消灭重复发生的风险。<br />
            2. 采用高效的杀菌剂进行喷洒,如二氧化硫、草甘膦、乙基蒿恶唑等,每隔1-2周进行1次喷洒,覆盖植株的所有部位和周围环境。<br />
            3. 增强番茄植株的免疫力和抗病性,改善樱桃种植环境,增加通风和光照的条件,降低空气、土壤温度和湿度,卫生清洁。<br />
        </p >
    </div>
);
const content10 = (
    <div>
        <p>
            未识别到植物
        </p >
    </div>
);
const lst = [content1, content2, content3, content4, content5, content6, content7, content8, content9, content10]
const Suggestion = (props: any) => {
    return (
        <Popover content={lst[targetClass.indexOf(props.title.slice(0, -2))]} title={props.title} trigger="click">
            <Button ghost style={{ background: 'rgba(255,255,255,.25)', color: 'white', border: 'none' }}>建议</Button>
        </Popover>
    )
};

export default Suggestion;