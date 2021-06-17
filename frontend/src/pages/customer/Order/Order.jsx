import React, { Component, Fragment } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import moment from 'moment'
import { Container, Row, Col, Badge } from 'react-bootstrap'
import { Collapse, Tag } from 'antd'
import './Order.less'

import * as actionCreators from '../../../store/actions/index'

const numberToVND = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '₫';
}
const { Panel } = Collapse;

class Order extends Component {
  componentDidMount() {
    this.props.onMount();
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
  return { orders };
};

const mapDispatchToProps = dispatch => {
  return {
    onMount: () => dispatch(actionCreators.getOrders()),
    onError: (error) => dispatch(actionCreators.setError(error))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Order));