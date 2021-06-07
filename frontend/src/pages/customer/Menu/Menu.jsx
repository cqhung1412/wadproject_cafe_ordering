import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import { Spin } from 'antd'
import { Container, Row, Col, Media } from 'react-bootstrap'
import { PlusCircleFill } from 'react-bootstrap-icons'
import './Menu.css'
import placeholder from '../../../assets/images/placeholder.svg'

import * as actionCreators from '../../../store/actions/index'

import AntForm from '../../../components/AntForm/AntForm'
import { Fragment } from 'react'

const numberToVND = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '₫';
}

class Menu extends Component {
  state = {
    activeCategory: '',
    isLoading: false,
    isOpenForm: false
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.props.onMount();
    this.setState({ isLoading: false });
  }

  onCategoryClick = (category) => {
    this.setState({
      activeCategory: category
    });
  }

  toggleForm = () => this.setState({
    isOpenForm: !this.state.isOpenForm
  })

  render() {
    const productsGroupByCategories = this.props.products;
    const { activeCategory, isLoading, isOpenForm } = this.state;

    const form = (
      <AntForm
        visible={isOpenForm}
        title={'Add To Cart'}
        loading={false}
        layout={null}
        id={'cartForm'}
        onFinish={(values) => console.log(values)}
        onFinishFailed={this.toggleForm}
        onCancel={this.toggleForm}
      >

      </AntForm>
    );

    return (
      <Fragment>
        <Container className='container'>
          <Row>
            <Col sm={4}>
              <div className='cate-container'>
                {isLoading ? <Spin /> : <ul className='cate-ul'>
                  {this.props.categories.map(c => (
                    <li className={activeCategory === c ? ' active-li' : 'cate-li'}>
                      <a className={'cate-a' + (activeCategory === c ? ' active' : '')} href={`#${c}`} onClick={() => this.onCategoryClick(c)}>{c}</a>
                    </li>
                  ))}
                </ul>}
              </div>
            </Col>
            <Col sm={8}>
              <div className='prod-container'>
                <ul className='cate-prod-ul'>
                  {productsGroupByCategories.map(c => (
                    <li className='cate-prod-li'>
                      <h4 style={{ color: 'orange' }}>{c.category}</h4>
                      <ul className='prod-ul'>
                        {c.products.map(p => (
                          <li className='prod-li'>
                            <Media className='prod-media'>
                              <img
                                width={64}
                                height={64}
                                className="mr-3"
                                src={placeholder}
                                alt="Generic placeholder"
                              />
                              <Media.Body>
                                <h5 style={{ color: 'darkorange' }}>{p.name}</h5>
                                <p>{p.desc}</p>
                                <h6 style={{ color: 'darkorange' }} className='m-0'>{numberToVND(p.unitPrice)}</h6>
                              </Media.Body>
                              <PlusCircleFill className='add-to-cart' onClick={this.toggleForm} />
                            </Media>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
        {form}
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  const { products, categories } = state.prod;
  return {
    products,
    categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onMount: () => dispatch(actionCreators.getProductsGroupByCategories())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Menu));