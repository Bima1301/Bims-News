import Permission from '@/data/Permission';
import { Button, Transfer } from 'antd';
import { useEffect, useState } from 'react';

const PermissionManage = (props) => {
    console.log("MANAGE", props);


  const [mockData, setMockData] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const getMock = () => {
    const tempTargetKeys = [];
    const tempMockData = [];
    // for (let i = 0; i < 20; i++) {
    //   const data = {
    //     key: i.toString(),
    //     title: `content${i + 1}`,
    //     description: `description of content${i + 1}`,
    //     // chosen: i % 2 === 0,
    //   };
    //   if (data.chosen) {
    //     tempTargetKeys.push(data.key);
    //   }
    //   tempMockData.push(data);
    // }

    Permission.map((permission, i) => {
        const data = {
            key: permission.name + ' '+ props.module_name,
            title: permission.name + ' '+ props.module_name,
            // description: permission.name + ' '+ props.module_name,
            // chosen: i % 2 === 0,
          };
          tempMockData.push(data);
    });
    setMockData(tempMockData);
    props.permissions.map((permission, i) => {
        tempTargetKeys.push(permission.name);
    });
    setTargetKeys(tempTargetKeys);
    props.onChange(tempTargetKeys);
  };
  useEffect(() => {
    getMock();
  }, []);
  const handleChange = (newTargetKeys) => {
    setTargetKeys(newTargetKeys);
    props.onChange(newTargetKeys);
  };

  


  const renderFooter = (_, { direction }) => {
    if (direction === 'left') {
      return (
        <Button
          size="small"
          style={{
            float: 'left',
            margin: 5,
          }}
          onClick={getMock}
        >
          Left button reload
        </Button>
      );
    }
    return (
      <Button
        size="small"
        style={{
          float: 'right',
          margin: 5,
        }}
        onClick={getMock}
      >
        Right button reload
      </Button>
    );
  };
  return (
    <Transfer
      dataSource={mockData}
      showSearch
      listStyle={{
        width: 250,
        height: 300,
      }}
      operations={['to right', 'to left']}
      targetKeys={targetKeys}
      onChange={handleChange}
      render={(item) => `${item.title}`}
      footer={renderFooter}
    />
  );
};
export default PermissionManage;