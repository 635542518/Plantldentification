import { Collapse } from 'antd';
import React from 'react';
import './history.scss'
const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const HistoryCollapse: React.FC = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <div className='HistoryCollapseStyle'>
    <Collapse defaultActiveKey={['1']} onChange={onChange} >
      <Panel header="This is panel header 1" key="1" className='PanelStyle'>
        <p>{text}</p>
      </Panel>
      <Panel header="This is panel header 2" key="2" className='PanelStyle'>
        <p>{text}</p>
      </Panel>
      <Panel header="This is panel header 3" key="3" className='PanelStyle'>
        <p>{text}</p>
      </Panel>
    </Collapse>
    </div>
  );
};

export default HistoryCollapse;