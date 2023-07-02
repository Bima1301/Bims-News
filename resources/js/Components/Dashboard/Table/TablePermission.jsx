import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import Category from "@/data/Category";
import dateFormat, { masks } from "dateformat";
import { Head, Link, router, usePage } from "@inertiajs/react";

const TablePermission = (props) => {
    // console.log("ROLE PERMISSION",props.permissions.permissions);
    const [page, setPage] = useState(1);
    const [paginationSize, setPaginationSize] = useState(25);
    const { permissions } =props.permissions.permissions ? props.permissions : props ;

    console.log("ROLE PERMISSION",permissions);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{
                        marginBottom: 8,
                        display: "block",
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        className="bg-black flex items-center"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() =>
                            clearFilters && handleReset(clearFilters)
                        }
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>

                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? "#1890ff" : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: "#ffc069",
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });
    const columns = [
        {
            title: "No",
            dataIndex: "No",
            key: "no",
            width: "5%",
            render: (text, record, index) =>
                (page - 1) * paginationSize + index + 1,
        },
        {
            title: "Nama",
            dataIndex: "name",
            key: "name",
            width: "30%",
            ...getColumnSearchProps("name"),
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            width: "30%",
            ...getColumnSearchProps("description"),
        },
        // props.posts[0].name && props.auth.user.role == 'admin' ?
        // {
        //     title: "Author",
        //     dataIndex: "name",
        //     key: "name",
        //     width: "10%",
        //     ...getColumnSearchProps("name"),
        // } : {},
        
    ];
    return (
        <Table
            pagination={{
                onChange(current, pageSize) {
                    setPage(current);
                    setPaginationSize(pageSize);
                },
                defaultPageSize: 25,
                hideOnSinglePage: false,
                showSizeChanger: true,
            }}
            columns={columns}
            dataSource={permissions}
            className = "overflow-x-auto"
        />
    );
};
export default TablePermission;
