import React, { Component, Fragment } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import { Container, Row, Col, Badge } from 'react-bootstrap'

import * as actionCreators from '../../../store/actions/index'

import './Cart.less'
import placeholder from '../../../assets/images/placeholder.svg'

const numberToVND = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '₫';
}

class Cart extends Component {
  render() {
    const cartProducts = this.props.cart;

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
                          <p>{p.size.name}</p>
                          <p>{p.note}</p>
                        </div>
                        <div className='prod-price w-auto'>{numberToVND(p.totalPrice)}</div>
                      </div>
                    </li>
                  ))}
                </ul>
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