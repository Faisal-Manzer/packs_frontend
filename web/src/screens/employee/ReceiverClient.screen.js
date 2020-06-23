import React, {useState} from 'react';
import {ReceiverForm} from '../../forms/receiver.form';
import {TableWithTabHOC} from '../../hocs/TableWithTab.hoc';
import {useAPI} from 'common/hooks/api';
import receiverColumns from 'common/columns/Receiver.column';
import {Popconfirm, Button} from 'antd';
import {deleteReceiverClient} from 'common/api/auth';
import {deleteHOC} from '../../hocs/deleteHoc';
import Delete from '../../icons/Delete';
import Edit from '../../icons/Edit';
// import Upload from '../../icons/Upload';
// import File from '../../icons/File';

const ReceiverClientEmployeeScreen = () => {
  const {data, loading, reload} = useAPI('/receiverclients/', {});
  const [editingId, setEditingId] = useState(null);

  console.log(data);

  const columns = [
    ...receiverColumns,
    {
      title: 'Action',
      key: 'operation',
      width: '200',
      render: (row) => (
        <div className="row align-center justify-evenly">
          <Button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: '1px',
            }}
            onClick={() => setEditingId(row.id)}>
            <Edit />
          </Button>
          {/* {row.document ? (
            <File />
          ) : (
            <Button
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                boxShadow: 'none',
                padding: '1px',
              }}
              // onClick={() => setEditingId(row.id)}>
            >
              <Upload />
            </Button>
          )} */}
          <Popconfirm
            title="Confirm Delete"
            onConfirm={deleteHOC({
              row,
              reload,
              api: deleteReceiverClient,
              success: 'Deleted Receiver Client successfully',
              failure: 'Error in deleting receiver client',
            })}>
            <Button
              style={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
                border: 'none',
                padding: '1px',
              }}>
              <Delete />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const tabs = [
    {
      name: 'All Receiver Clients',
      key: 'allReceiverClients',
      data,
      columns,
      loading,
    },
  ];

  const cancelEditing = () => setEditingId(null);

  return (
    <TableWithTabHOC
      rowKey={(record) => record.id}
      refresh={reload}
      tabs={tabs}
      size="middle"
      title="Receiver Clients"
      editingId={editingId}
      cancelEditing={cancelEditing}
      modalBody={ReceiverForm}
      modalWidth={45}
      expandParams={{loading}}
    />
  );
};

export default ReceiverClientEmployeeScreen;