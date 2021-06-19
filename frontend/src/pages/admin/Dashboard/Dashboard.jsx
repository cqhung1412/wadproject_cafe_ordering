import React, { Component, Fragment } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import moment from 'moment'
import openSocket from 'socket.io-client'

import { Container, Row, Col } from 'react-bootstrap'
import { Switch, Card, Spin } from 'antd'
import serverUrl from '../../../utils/serverUrl'
import * as actionCreators from '../../../store/actions/index'
import axios from '../../../axios-instance'
import './Dashboard.less'


class Dashboard extends Component {
  state = {
    orders: [],
    toggleLoading: '',
    newOrderLoading: false
  }

  componentDidMount() {
    axios.get('/admin/orders', {
      headers: {
        'Authorization': `Bearer ${this.props.token}`
      }
    })
      .then(res => {
        console.log(res.data.orders)
        return res.data
      })
      .then(data => this.setState({
        orders: data.orders
      }))
      .catch(err => this.props.onError(err));
    const socket = openSocket(serverUrl);
    socket.on('new-order', data => {
      if (data.action === 'processing')
        this.setState({ newOrderLoading: true });
      if (data.action === 'create')
        this.setState({
          orders: data.orders,
          newOrderLoading: false
        });
      if (data.action === 'no-action')
        this.setState({ newOrderLoading: false });
    })
  }

  onToggleStatus = (orderId) => {
    this.setState({ toggleLoading: orderId });
    axios.put(`/admin/order-completed/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${this.props.token}`
      }
    })
      .then(res => res.data)
      .then(data => this.setState({
        orders: data.orders,
        toggleLoading: ''
      }))
      .catch(err => {
        this.props.onError(err)
        this.setState({ toggleLoading: '' })
      })
  }

  render() {
    const { orders, toggleLoading, newOrderLoading } = this.state;
    return (
      <Fragment>
        <Container className='container'>
          <Row>
            <Col>
              {newOrderLoading ? <Spin size='large' /> :
                orders.sort((a,b) => (a.status > b.status) ? -1 : ((b.status > a.status) ? 1 : 0)).map((o, index) => (
                  <Fragment key={index}>
                    <h2>{o.status}</h2>
                    <div style={{ display: 'flex', alignItems: 'grid', justifyContent: 'center', flexWrap: 'no-wrap' }}>
                      {
                        o.orders.map((order, orderIndex) => (
                          <Card
                            key={orderIndex}
                            title={moment(order.createdAt).format('hh:mm DD/MM/YYYY')}
                            extra={<Switch
                              checked={order.orderStatus === 'Completed'}
                              onClick={() => this.onToggleStatus(order._id)}
                              loading={toggleLoading === order._id}
                            />}
                            style={{ width: 500, margin: '10px' }}
                          >
                            {
                              order.products.map((p, prodIndex) => (
                                <p key={prodIndex}>
                                  {`Qty: ${p.quantity} ${p.name} ${p.toppings.length !== 0 ? (p.size + ' +' + p.toppings.join(' +')) : p.size} ${p.note ? '(' + p.note + ')' : ''}`}
                                </p>
                              ))
                            }
                          </Card>
                        ))
                      }
                    </div>
                  </Fragment>
                ))
              }
            </Col>
          </Row>
        </Container>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  const { user } = state.auth;
  const { token } = user;
  return { token };
};

const mapDispatchToProps = dispatch => {
  return {
    onError: (error) => dispatch(actionCreators.setError(error))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));