import React, {useState, useEffect} from 'react';
import {GRNForm} from '../../forms/GRN.form';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import GRNColumns from 'common/columns/GRN.column';
import {ProductTable} from '../../components/GRNProductsTable';
import {Popconfirm, Button, Input} from 'antd';
import {deleteHOC} from '../../hocs/deleteHoc';
import {connect} from 'react-redux';
import {useTableSearch} from 'hooks/useTableSearch';
import {useAPI} from 'common/hooks/api';
import Edit from 'icons/Edit';
import Delete from 'icons/Delete';
import Document from 'icons/Document';

import {deleteGRN} from 'common/api/auth';

const {Search} = Input;

const KitEmployeeScreen = ({currentPage}) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [reqData, setReqData] = useState(null);

  const {data: grns, loading} = useAPI('/grns/', {});

  const {filteredData, reload} = useTableSearch({
    searchVal,
    reqData: reqData,
  });

  useEffect(() => {
    if (grns) {
      const fetchData = async () => {
        const newData = grns.map((grn) => ({
          id: grn.id,
          warehouse: grn.warehouse.name,
          material_vendor: grn.material_vendor.name,
          transport_vendor: grn.transport_vendor.name,
          reference_no: grn.reference_no,
          invoice_no: grn.invoice_no,
          inward_date: grn.inward_date,
          products: grn.items,
          document: grn.document,
        }));
        setReqData(newData);
      };
      fetchData();
    }
  }, [grns]);

  const cancelEditing = () => {
    setEditingId(null);
  };

  const columns = [
    ...GRNColumns,
    {
      title: 'Action',
      key: 'operation',
      width: '7vw',
      render: (text, record) => (
        <div className="row justify-evenly">
          <a href={record.document} target="_blank">
            <Button
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                boxShadow: 'none',
                padding: '1px',
              }}
              disabled={!record.document}
              onClick={(e) => e.stopPropagation()}>
              <Document />
            </Button>
          </a>
          <Button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: '1px',
            }}
            onClick={(e) => {
              setEditingId(record.id);
              e.stopPropagation();
            }}>
            <Edit />
          </Button>
          <Popconfirm
            title="Confirm Delete"
            onCancel={(e) => e.stopPropagation()}
            onConfirm={deleteHOC({
              record,
              reload,
              api: deleteGRN,
              success: 'Deleted GRN successfully',
              failure: 'Error in deleting GRN',
            })}>
            <Button
              style={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
                border: 'none',
                padding: '1px',
              }}
              onClick={(e) => e.stopPropagation()}>
              <Delete />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const tabs = [
    {
      name: 'All GRNs',
      key: 'allGRNs',
      data: filteredData,
      columns,
      loading,
    },
  ];

  return (
    <>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <div style={{width: '15vw', display: 'flex', alignItems: 'flex-end'}}>
          <Search onChange={(e) => setSearchVal(e.target.value)} placeholder="Search" enterButton />
        </div>
      </div>
      <br />
      <TableWithTabHOC
        rowKey={(record) => record.id}
        refresh={reload}
        tabs={tabs}
        size="middle"
        title="GRNs"
        editingId={editingId}
        cancelEditing={cancelEditing}
        modalBody={GRNForm}
        modalWidth={60}
        expandHandleKey="products"
        expandParams={{loading}}
        ExpandBody={ProductTable}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(KitEmployeeScreen);
