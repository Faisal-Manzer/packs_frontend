import React, {useState} from 'react';
import {Row, Col, Typography, Spin} from 'antd';
import {Table} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './returndocket.styles.scss';
import {useEffect} from 'react';
import {retrieveReturns} from 'common/api/auth';

const {Title} = Typography;

const ReturnDocket = ({location}) => {
  const [reqReturn, setReqReturn] = useState(null);
  const [total, setTotal] = useState(0);
  const [weight, setWeight] = useState(0);

  useEffect(() => {
    const fetchReturn = async () => {
      const {data} = await retrieveReturns();
      const reqData = data.filter((d) => d.id === location.state.id);
      if (reqData) setReqReturn(reqData[0]);
      console.log(reqData[0]);
    };
    fetchReturn();
  }, [location]);

  useEffect(() => {
    const calcTotal = () => {
      let tot = 0,
        wt = 0;
      if (reqReturn) {
        reqReturn.items.map((item) => {
          tot += item.quantity * item.product.priceperunit;
          wt += item.product.volumetric_weight;
        });
      }
      setWeight(wt);
      setTotal(tot);
    };
    calcTotal();
  }, [reqReturn]);

  var a = [
    '',
    'one ',
    'two ',
    'three ',
    'four ',
    'five ',
    'six ',
    'seven ',
    'eight ',
    'nine ',
    'ten ',
    'eleven ',
    'twelve ',
    'thirteen ',
    'fourteen ',
    'fifteen ',
    'sixteen ',
    'seventeen ',
    'eighteen ',
    'nineteen ',
  ];
  var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  function inWords(num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    var str = '';
    str += n[1] != 0 ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += n[2] != 0 ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += n[3] != 0 ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += n[4] != 0 ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str +=
      n[5] != 0
        ? (str != '' ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only '
        : '';
    return str;
  }

  if (reqReturn)
    return (
      <div className="container-docket">
        <div className="header-docket">
          <div className="logo-docket">
            <img src={process.env.PUBLIC_URL + '/home-logo.png'} alt="Yantraksh" />
          </div>
          <div className="heading-docket">
            <Title level={2} style={{fontWeight: 'bold'}}>
              DELIVERY CHALLAN
            </Title>
          </div>
        </div>
        <hr />
        <Row className="meta-docket">
          <Col span={12} className="left">
            <Row>
              <Col span={22}>
                <p style={{fontWeight: 'bold', display: 'inline'}}>Transaction No. : </p>
                <p style={{display: 'inline'}}>{reqReturn.transaction_no}</p>
              </Col>
            </Row>
            <Row>
              <Col span={22}>
                <p style={{fontWeight: 'bold', display: 'inline'}}>Transaction Date : </p>
                <p style={{display: 'inline'}}>{reqReturn.transaction_date.slice(0, 10)}</p>
              </Col>
            </Row>
            <Row>
              <Col span={22}>
                <p style={{fontWeight: 'bold', display: 'inline'}}>Dispatch Date : </p>
                <p style={{display: 'inline'}}>{reqReturn.transaction_date.slice(0, 10)}</p>
              </Col>
            </Row>
            <Row>
              <Col span={22}>
                <p style={{fontWeight: 'bold', display: 'inline'}}>Transaction Type : Return</p>
              </Col>
            </Row>
          </Col>
          <Col span={5}></Col>
          <Col
            span={7}
            className="right"
            style={{
              fontFamily: 'Arial, Helvetica, sans-serif',
            }}>
            <p>
              [ &nbsp;] Original for Consignee <br /> [ &nbsp;] Duplicate for Transporter <br />[
              &nbsp;] Triplicate for Consignor
            </p>
          </Col>
        </Row>
        <div className="main-data-docket">
          <Row>
            <Col span={12}>
              <Row>
                <Col span={10}>
                  <p style={{fontWeight: 'bold'}}>Sender's Name : </p>
                </Col>
                <Col span={12} style={{wordWrap: 'break-word'}}>
                  {reqReturn.receiver_client.name}
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={10}>
                  <p style={{fontWeight: 'bold'}}>Receiver's Name : </p>
                </Col>
                <Col span={12} style={{wordWrap: 'break-word'}}>
                  {reqReturn.warehouse.name}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Row>
                <Col span={10}>
                  <p style={{fontWeight: 'bold'}}>Sender's Address : </p>
                </Col>
                <Col span={12} style={{wordWrap: 'break-word'}}>
                  {reqReturn.receiver_client.address + ', ' + reqReturn.receiver_client.city}
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={10}>
                  <p style={{fontWeight: 'bold'}}>Receiver's Address : </p>
                </Col>
                <Col span={12} style={{wordWrap: 'break-word'}}>
                  {reqReturn.warehouse.address +
                    ', ' +
                    reqReturn.warehouse.city +
                    ', ' +
                    reqReturn.warehouse.state +
                    ', ' +
                    reqReturn.warehouse.pincode}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Row>
                <Col span={10}>
                  <p style={{fontWeight: 'bold'}}>GST : </p>
                </Col>
                <Col span={12} style={{wordWrap: 'break-word'}}>
                  {reqReturn.receiver_client.gst}
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={10}>
                  <p style={{fontWeight: 'bold'}}>GST : </p>
                </Col>
                <Col span={12} style={{wordWrap: 'break-word'}}>
                  {reqReturn.warehouse.gst}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <Row className="table-docket">
          <Table bordered size="sm">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>HSN/SAC</th>
                <th>Product Name</th>
                <th>Product Code</th>
                <th>QTY</th>
                <th>Rate/Unit</th>
                <th>Taxable Value</th>
              </tr>
            </thead>
            <tbody>
              {reqReturn.items.map((item, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.product.hsn_code}</td>
                    <td>{item.product.name}</td>
                    <td>{item.product.short_code}</td>
                    <td>{item.quantity}</td>
                    <td>{item.product.priceperunit}</td>
                    <td>{item.quantity * item.product.priceperunit}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Row>
        <Row className="final-docket">
          <Col span={12}>
            <Row>
              <Col span={8}>
                <p style={{fontWeight: 'bold', display: 'inline'}}>Amount in Words : </p>
              </Col>
              <Col span={16}>
                <p style={{display: 'inline', wordWrap: 'break-word', textTransform: 'capitalize'}}>
                  {String.fromCharCode(0x20b9) + ' ' + inWords(total) + 'Only.'}
                </p>
              </Col>
              <br />
            </Row>
            <Row>
              <Col span={24}>
                <p style={{fontWeight: 'bold', display: 'inline'}}>Charged Weight : </p>
                <p style={{fontWeight: 'bold', display: 'inline'}}>{weight} Kg</p>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <p style={{fontWeight: 'bold', display: 'inline'}}>Transporter Name : </p>
                <p style={{display: 'inline', wordWrap: 'break-word'}}>
                  {reqReturn.transport_by.name}
                </p>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <p style={{fontWeight: 'bold', display: 'inline'}}>Driver Name : </p>
                <p style={{display: 'inline', wordWrap: 'break-word'}}>{reqReturn.driver_name}</p>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <p style={{fontWeight: 'bold', display: 'inline'}}>Driver No. : </p>
                <p style={{display: 'inline', wordWrap: 'break-word'}}>{reqReturn.driver_number}</p>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row>
              <Col span={24}>
                <p style={{fontWeight: 'bold', display: 'inline'}}>Grand Total : </p>
                <p style={{fontWeight: 'bold', display: 'inline', wordWrap: 'break-word'}}>
                  {String.fromCharCode(0x20b9) + ' ' + total}
                </p>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <p style={{fontWeight: 'bold', display: 'inline'}}>Creation Date : </p>
                <p style={{display: 'inline', wordWrap: 'break-word'}}>
                  {new Date().getDate().toString() +
                    '/' +
                    new Date().getMonth().toString() +
                    '/' +
                    new Date().getFullYear().toString()}
                </p>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <p style={{fontWeight: 'bold', display: 'inline'}}>Vehicle No. : </p>
                <p style={{display: 'inline', wordWrap: 'break-word'}}>
                  {reqReturn.vehicle_number}
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
        <hr />
        <table style={{pageBreakInside: 'avoid'}}>
          <div className="declaration">
            <p style={{fontWeight: 'bold', display: 'inline'}}>Declaration : </p>
            <p style={{display: 'inline'}}>
              The packaging products given on hire shall always remain the property of Yantraksh
              Logistics Private Limited and shall not be used for the purpose otherwise agreed upon.
              The same shall be returned at the address notified by Yantraksh Logistics Private
              Limited.
            </p>
            <br />
            <p style={{fontWeight: 'bold', display: 'inline'}}>Note : </p>
            <p style={{display: 'inline'}}>
              {' '}
              No E-Way Bill is required for Empty Cargo Containers. Refer, Rule 14 of Central Goods
              and Services Tax (Second Amendment) Rules, 2018.
            </p>
          </div>
        </table>

        <hr />
        <table style={{pageBreakInside: 'avoid', width: '90vw'}}>
          <div className="footer">
            <Row>
              <Col span={1}></Col>
              <Col span={11} style={{fontWeight: 'bold'}}>
                For Sending Location :
              </Col>
              <Col span={6}></Col>
              <Col span={6} style={{fontWeight: 'bold'}}>
                For Receiving Location :
              </Col>
            </Row>
            <br /> <br />
            <br />
            <Row>
              <Col span={1}></Col>
              <Col span={11} style={{fontWeight: 'bold'}}>
                Authorized Signature
              </Col>
              <Col span={6}></Col>
              <Col span={6} style={{fontWeight: 'bold'}}>
                Authorized Signature
              </Col>
            </Row>
            <Row>
              <Col span={1}></Col>
              <Col span={11}>(Company Seal & Signature)</Col>
              <Col span={6}></Col>
              <Col span={6}>(Company Seal & Signature)</Col>
            </Row>
            <br /> <br />
            <div
              style={{
                display: 'flex',
                justifyContent: 'Center',
                alignItems: 'center',
                flexDirection: 'column',
                padding: '0',
                margin: '0',
              }}>
              <p style={{fontSize: '26px', color: '#034efc'}}>
                Yantraksh Logistics Private Limited
              </p>
              <p>CIN No: U74999GJ2018PTC105552</p>
            </div>
          </div>
        </table>
      </div>
    );
  return (
    <Spin spinning={true} style={{position: 'absolute', marginLeft: '49vw', marginTop: '49vh'}} />
  );
};

export default ReturnDocket;
