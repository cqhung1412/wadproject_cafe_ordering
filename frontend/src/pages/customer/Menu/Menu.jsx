import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import { Container, Row, Col, Media } from 'react-bootstrap'
import { PlusCircleFill } from 'react-bootstrap-icons'
import './Menu.css'
import placeholder from '../../../assets/images/placeholder.svg'

import * as actionCreators from '../../../store/actions/index'

const numberToVND = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '₫';
}

class Menu extends Component {
  state = {
    activeCategory: ''
  }

  componentDidMount() {
    this.props.onMount();
  }

  onCategoryClick = (category) => {
    this.setState({
      activeCategory: category
    })
  }

  render() {
    // const categories = productGroupByCategories.map(p => p.category);
    const productsGroupByCategories = this.props.products;
    const { activeCategory } = this.state;
    return (
      <Container className='container'>
        <Row>
          <Col sm={4}>
            <div className='cate-container'>
              <ul className='cate-ul'>
                {this.props.categories.map(c => (
                  <li className={activeCategory === c ? ' active-li' : 'cate-li'}>
                    <a className={'cate-a' + (activeCategory === c ? ' active' : '')} href={`#${c}`} onClick={() => this.onCategoryClick(c)}>{c}</a>
                  </li>
                ))}
              </ul>
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
                            <PlusCircleFill className='add-to-cart' />
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