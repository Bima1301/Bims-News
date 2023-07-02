import { theme, Transfer, Tree } from "antd";
import { useState, useEffect } from "react";
// Customize Table Transfer
const isChecked = (selectedKeys, eventKey) => selectedKeys.includes(eventKey);
const generateTree = (treeNodes = [], checkedKeys = []) =>
    treeNodes.map(({ children, ...props }) => ({
        ...props,
        disabled: checkedKeys.includes(props.key),
        children: generateTree(children, checkedKeys),
    }));
// const generateTree = (
//     treeNodes = [],
//     checkedKeys = [],
//     parentDisabled = false
// ) =>
//     treeNodes.map(({ children, ...props }) => {
//         const disabled = parentDisabled || checkedKeys.includes(props.key);
//         return {
//             ...props,
//             disabled,
//             children: generateTree(children, checkedKeys, disabled),
//         };
//     });
const TreeTransfer = ({ dataSource, targetKeys, ...restProps }) => {
    const [selectedKeys, setSelectedKeys] = useState([]);
    // console.log("iki didalem", targetKeys);
    const { token } = theme.useToken();
    const transferDataSource = [];
    function flatten(list = []) {
        list.forEach((item) => {
            transferDataSource.push(item);
            flatten(item.children);
        });
    }
    flatten(dataSource);
    const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        // filter sourceSelectedKeys string type
        let selected = [];
        const sourceSelectedKeysString = sourceSelectedKeys.filter(
            (key) => typeof key === "string"
        );
        sourceSelectedKeysString.map((key) => {
            const module = dataSource.find((module) => module.key === key);
            if (module) {
                module.children.map((permission) => {
                    if (!sourceSelectedKeys.includes(permission.key)) {
                        selected.push(permission.key);
                    }
                });
            }
        });
        const targetSelectedKeysInteger = targetSelectedKeys.filter(
            (key) => typeof key === "number"
        );
        const sourceselectedKeysInteger = sourceSelectedKeys.filter(
            (key) => typeof key === "number"
        );
        setSelectedKeys([
            ...targetSelectedKeysInteger,
            ...selected,
            ...sourceselectedKeysInteger,
        ]);
        // console.log(selectedKeys);
    };
    return (
        <Transfer
            listStyle={{
                width: "100%",
            }}
            {...restProps}
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            dataSource={transferDataSource}
            className="tree-transfer w-full"
            render={(item) => item.title}
            showSelectAll={false}
            onSelectChange={handleSelectChange}
        >
            {({ direction, onItemSelect, selectedKeys }) => {
                if (direction === "left") {
                    const checkedKeys = [...selectedKeys, ...targetKeys];
                    return (
                        <div
                            style={{
                                padding: token.paddingXS,
                            }}
                        >
                            <Tree
                                blockNode
                                checkable
                                checkStrictly={false}
                                defaultExpandAll
                                checkedKeys={checkedKeys}
                                treeData={generateTree(dataSource, targetKeys)}
                                onCheck={(_, { node: { key } }) => {
                                    onItemSelect(
                                        key,
                                        !isChecked(checkedKeys, key)
                                    );
                                }}
                                onSelect={(_, { node: { key } }) => {
                                    onItemSelect(
                                        key,
                                        !isChecked(checkedKeys, key)
                                    );
                                }}
                            />
                        </div>
                    );
                }
            }}
        </Transfer>
    );
};

const RolePermissionManagement = (props) => {
    // console.log("MANAGE", props.role_permissions.permissions);
    const [targetKeys, setTargetKeys] = useState([]);
    const [treeData, setTreeData] = useState([]);
    useEffect(() => {
        let data = [];
        props.modules.map((module, i) => {
            let permissions = [];
            module.permissions.map((permission, i) => {
                permissions.push({
                    key: permission.id,
                    title: permission.name,
                });
            });
            data.push({
                key: module.name,
                title: module.name,
                children: permissions,
            });
        });
        setTreeData(data);
    }, [props.modules]);

    useEffect(() => {
        // console.log("asdasdasdasd", props.role_permissions.permissions);
        props.role_permissions.permissions.map((permission, i) => {
            setTargetKeys((targetKeys) => [...targetKeys, permission.id]);
        });
    }, [props.role_permissions.permissions]);

    const onChange = (keys) => {
        setTargetKeys(keys);
    };
    // console.log("TARGET", targetKeys);
    return (
        <>
            <TreeTransfer
                dataSource={treeData}
                targetKeys={targetKeys}
                onChange={onChange}
            />
            <button
                onClick={() => props.submit(targetKeys)}
                className="btn mt-5"
            >
                Save Change
            </button>
        </>
    );
};
export default RolePermissionManagement;
