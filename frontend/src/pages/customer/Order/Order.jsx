import React, { Component, Fragment } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import moment from 'moment'
import openSocket from 'socket.io-client'

import { Container, Row, Col, Badge } from 'react-bootstrap'
import { Collapse, Tag } from 'antd'
import './Order.less'
import serverUrl from '../../../utils/serverUrl'
import * as actionCreators from '../../../store/actions/index'

const numberToVND = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '₫';
}
const { Panel } = Collapse;

class Order extends Component {
  componentDidMount() {
    this.props.onMount();
    const socket = openSocket(serverUrl);
    socket.on('completed-order', data => {
      if (data.action === 'update' && data.userId === this.props.user.userId) {
        this.props.onUpdateOrders(data.orders);
        new Notification('Your order is completed! Please come to the counter to get your drinks <3');
      }
    })
  }

  render() {
    const orders = this.props.orders;
    console.log(orders)
    return (
      <Fragment>
        <Container className='container'>
          <Row>
            <Col>
              <Collapse accordion>
                {orders.map((order, orderIndex) => (
                  <Panel
                    key={orderIndex}
                    header={moment(order.createdAt).format('hh:mm DD/MM/YYYY')}
                    extra={<Tag color={order.orderStatus === 'Completed' ? 'green' : 'yellow'}>{order.orderStatus}</Tag>}
                  >
                    <div className='order-container'>
                      <ul className='order-ul'>
                        {order.products.map((p, index) => (
                          <li className='prod-li' key={index}>
                            <div className='prod-media'>
                              <div className='prod-quantity w-auto'><Badge className='prod-badge'>{p.quantity}</Badge></div>
                              <div className='prod-center w-auto'>
                                <h6>{p.name}</h6>
                                <p>{p.toppings.length !== 0 ? (p.size + ' +' + p.toppings.join(' +')) : p.size}</p>
                                <p>{p.note}</p>
                              </div>
                              <div className='prod-price w-auto'>{numberToVND(p.totalPrice)}</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Panel>
                ))}
              </Collapse>
            </Col>
          </Row>
        </Container>
      </Fragment>
    )
  }
}


const mapStateToProps = state => {
  const { orders } = state.order;
  const { user } = state.auth;
  return { orders, user };
};

const mapDispatchToProps = dispatch => {
  return {
    onMount: () => dispatch(actionCreators.getOrders()),
    onUpdateOrders: (orders) => dispatch(actionCreators.updateOrder(orders)),
    onError: (error) => dispatch(actionCreators.setError(error))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Order));