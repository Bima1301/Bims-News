import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import Category from "@/data/Category";
import dateFormat, { masks } from "dateformat";
import { Head, Link, router, usePage } from "@inertiajs/react";

const TablePost = (props) => {
    const [page, setPage] = useState(1);
    const [paginationSize, setPaginationSize] = useState(25);
    const { posts } = props;
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
            title: "Judul",
            dataIndex: "title",
            key: "title",
            width: "30%",
            ...getColumnSearchProps("title"),
        },
        // props.posts[0].name && props.auth.user.role == 'admin' ?
        // {
        //     title: "Author",
        //     dataIndex: "name",
        //     key: "name",
        //     width: "10%",
        //     ...getColumnSearchProps("name"),
        // } : {},
        props.auth.user.role_name == 'admin' ?
        {
            title: "Author",
            dataIndex: "name",
            key: "name",
            width: "10%",
            ...getColumnSearchProps("name"),
        } : {},
        props.auth.user.role_name == 'contributor' ? 
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: "10%",
            ...getColumnSearchProps("status"),
            render: (e) => {
                // console.log(e);
                return (
                    <div>
                        {e == null || e == 'unpublish' ? 'Unpublish' : 'Publish'}
                    </div>
                );
            },
        } : {},
        {
            title: "Gambar",
            dataIndex: "image",
            key: "image",
            width: "10%",
            render: (e) => {
                return (
                    <div>
                        <img className="w-32 h" src={`/storage/${e}`} alt="" />
                    </div>
                );
            },
        },
        {
            title: "Kategori",
            dataIndex: "categories",
            key: "categories",
            width: "20%",
            ...getColumnSearchProps("categories"),
            render: (e) => {
                return (
                    <div>
                        {e.map((item,i) => (
                            <p key={i}>{item.name}</p>
                        ))}
                    </div>
                );
            },
        },
        {
            title: "Tanggal Publish",
            dataIndex: "date",
            key: "date",
            width: "20%",
            ...getColumnSearchProps("date"),
            render: (e) => {
                return <div>{dateFormat(e, "mediumDate")}</div>;
            },
        },
        {
            title: "Action",
            key: "Action",
            width: "5%",
            render: (e, data) => {
                return (
                    <div className="flex flex-col">
                        {props.auth.user.role_name == 'admin' && (
                            <div>
                                {/* {console.log(data)} */}
                                {data.status == 'publish' ? (
                                <Link
                                    href={route("mypost.unpublish", data.id)}
                                    className="btn btn-sm bg-red-700 mb-3 border-none"
                                >
                                    Unpublish
                                </Link>
                                    
                                ) : 
                                (
                                    <Link
                                    href={route("mypost.publish", data.id)}
                                    className="btn btn-sm btn-success mb-3 hover:text-white"
                                >
                                    Publish Now
                                </Link>  
                                )}
                            </div>
                        )}
                        <Link
                            href={route("mypost.show", data.slug)}
                            className="btn btn-sm btn-info mb-0"
                        >
                            Show
                        </Link>
                        {data.user_id == props.auth.user.id && (
                            <div className="w-full flex flex-col">
                        <Link
                            href={route("mypost.edit", data.slug)}
                            className="btn btn-sm btn-warning my-3"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() => {
                                if (
                                    confirm(
                                        "Are you sure you want to delete this post?"
                                    )
                                ) {
                                    router.delete(
                                        route("mypost.destroy", data.id)
                                    );
                                }
                            }}
                            className="btn btn-sm btn-error mb-0"
                        >
                            Delete
                        </button>

                            </div>
                        )}
                    </div>
                );
            },
        },
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
            dataSource={posts}
            className = "overflow-x-auto"
        />
    );
};
export default TablePost;
