import React, { Component, Fragment } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import moment from 'moment'
import { Container, Row, Col, Badge } from 'react-bootstrap'
import { Collapse, Tag } from 'antd'

import * as actionCreators from '../../../store/actions/index'
import axios from '../../../axios-instance'
import './Dashboard.less'

const numberToVND = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '₫';
}
const { Panel } = Collapse;

class Dashboard extends Component {
  state = {
    orders: []
  }

  componentDidMount() {
    axios.get('/admin/orders', {
      headers: {
        'Authorization': `Bearer ${this.props.token}`
      }
    })
      .then(res => res.data)
      .then(data => this.setState({
        orders: data.orders
      }))
      .catch(err => this.props.onError(err))
  }

  render() {    
    return (
      <Fragment>
        <Container className='container'>
          <Row>
            <Col>
              
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