import React, { Component, Fragment } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import { Container, Row, Col, Badge } from 'react-bootstrap'
import { Button, Typography } from 'antd'

import * as actionCreators from '../../../store/actions/index'
import axios from '../../../axios-instance'
import { processToPayment } from '../../../utils/payment'
import './Cart.less'

const { Text } = Typography;

const numberToVND = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '₫';
}

class Cart extends Component {
  getCheckoutPage = () => {
    axios.post('/checkout', { products: this.props.cart }, {
      headers: {
        'Authorization': JSON.parse(localStorage.getItem('user')).token
      }
    })
      .then(res => res.data.stripeCheckoutSessionId)
      .then(sessionId => {
        processToPayment(sessionId)
      })
      .catch(err => this.props.onError(err));
  }

  render() {
    const cartProducts = this.props.cart;
    let totalPrice = 0;
    let totalQuantity = 0;
    cartProducts.forEach(p => totalPrice += p.totalPrice);
    cartProducts.forEach(p => totalQuantity += p.quantity);

    return (
      <Fragment>
        <Container className='container'>
          <Row>
            <Col>
              <div className='prod-container'>
                <ul className='prod-ul'>
                  {cartProducts.map((p, index) => (
                    <li className='prod-li' key={index}>
                      <div className='prod-media'>
                        <div className='prod-quantity w-auto'><Badge pill className='prod-badge'>{p.quantity}</Badge></div>
                        <div className='prod-center w-auto'>
                          <h6>{p.name}</h6>
                          <p>{p.toppings ? (p.size + ' +' + p.toppings.join(' +')) : p.size}</p>
                          <p>{p.note}</p>
                        </div>
                        <div className='prod-price w-auto'>{numberToVND(p.totalPrice)}</div>
                      </div>
                    </li>
                  ))}
                  <li className='prod-li prod-price'>
                    <div className='prod-price-type'>
                      <div>Total ({totalQuantity} drinks)</div>
                    </div>
                    <div className='prod-price-number'>
                      <h4>{numberToVND(totalPrice)}</h4>
                    </div>
                  </li>
                </ul>
                <Button className='checkout-button' type='primary' onClick={this.getCheckoutPage}>
                  <Text>{totalQuantity} drinks</Text>
                  <Text>Process to Checkout</Text>
                  <Text>{numberToVND(totalPrice)}</Text>
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  const { cart } = state.cart;
  return {
    cart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRemoveFromCart: (productIndex) => dispatch(actionCreators.removeProductFromCart(productIndex)),
    onError: (error) => dispatch(actionCreators.setError(error))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart));