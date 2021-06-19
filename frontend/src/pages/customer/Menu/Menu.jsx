import React, { Component, Fragment } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import { Spin, Input, Radio, InputNumber, Form, Checkbox } from 'antd'
import { Container, Row, Col, Media } from 'react-bootstrap'
import { PlusCircleFill } from 'react-bootstrap-icons'
import './Menu.less'

import cafeSuaDa from '../../../assets/images/cafe-sua-da.jpg'
import americanoDa from '../../../assets/images/Americano-da.jpg'
import bacXiu from '../../../assets/images/Bac-siu.jpg'
import bmiChaBong from '../../../assets/images/Bmi-cha-bong-pho-mai.jpg'
import cafeDaXay from '../../../assets/images/cafe-da-xay.jpg'
import cafeDenDa from '../../../assets/images/Cafe-den-da.jpg'
import cookieDaXay from '../../../assets/images/Cookie-da-xay.jpg'
import gaXe from '../../../assets/images/Ga-xe-la-chanh.jpg'
import hongTraSua from '../../../assets/images/hong-tra-sua-new.jpg'
import mochiVietQuat from '../../../assets/images/MOCHI_viet quat.jpg'
import mochiXoai from '../../../assets/images/Mochi-xoai.jpg'
import oolongNong from '../../../assets/images/oolong-nong-new.jpg'
import sinhtoVietQuat from '../../../assets/images/Sinh-to-viet-quoc.jpg'
import traDaoCamSa from '../../../assets/images/Tra-dao-cam-sapng.jpg'
import traHatSen from '../../../assets/images/Tra-hat-sen.jpg'
import tsMacca from '../../../assets/images/TS-Macca-tran-chau-trang.jpg'

import * as actionCreators from '../../../store/actions/index'

import AntForm from '../../../components/AntForm/AntForm'

const numberToVND = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '₫';
}

const imgList = [
  cafeSuaDa,
  bacXiu,
  cafeDenDa,
  americanoDa,
  cafeDenDa,
  oolongNong,
  hongTraSua,
  tsMacca,
  mochiVietQuat,
  mochiXoai,
  gaXe,
  bmiChaBong,
  cafeDaXay,
  cookieDaXay,
  sinhtoVietQuat,
  traDaoCamSa,
  traHatSen
];  

class Menu extends Component {
  state = {
    activeCategory: '',
    isLoading: false,
    isOpenForm: false,
    selectedProduct: null,
    selectedToppingList: [],
    selectedTotalPrice: 0,
    lastSelectedSizePrice: 0,
    lastSelectedQuantity: 1
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

  toggleForm = (product) => this.setState({
    selectedProduct: this.state.isOpenForm ? null : product,
    selectedTotalPrice: this.state.isOpenForm ? 0 : product.unitPrice,
    selectedToppingList: [],
    lastSelectedSizePrice: 0,
    lastSelectedQuantity: 1,
    isOpenForm: !this.state.isOpenForm,
  })

  onCancelForm = () => this.setState({
    selectedProduct: null,
    selectedTotalPrice: 0,
    selectedToppingList: [],
    lastSelectedSizePrice: 0,
    lastSelectedQuantity: 1,
    isOpenForm: false
  })

  openForm = (product) => this.setState({
    selectedProduct: product,
    selectedTotalPrice: product.unitPrice,
    selectedToppingList: [],
    lastSelectedSizePrice: 0,
    lastSelectedQuantity: 1
  }, () => this.setState({ isOpenForm: true }))

  calculateTotalPrice = (addedPrice, isAdding, forSize = false) => {
    const { selectedTotalPrice, lastSelectedSizePrice, lastSelectedQuantity } = this.state;
    forSize
      ? this.setState({
        selectedTotalPrice: parseInt(selectedTotalPrice - lastSelectedSizePrice * lastSelectedQuantity + addedPrice * lastSelectedQuantity),
        lastSelectedSizePrice: addedPrice
      })
      : this.setState({
        selectedTotalPrice: isAdding
          ? parseInt(selectedTotalPrice + addedPrice * lastSelectedQuantity)
          : parseInt(selectedTotalPrice - addedPrice * lastSelectedQuantity)
      });
  }

  onQuantityChange = (quantity) => {
    const { lastSelectedQuantity, selectedTotalPrice } = this.state;
    const unitPrice = parseInt(selectedTotalPrice / lastSelectedQuantity);
    const newTotalPrice = parseInt(unitPrice * quantity);
    this.setState({
      lastSelectedQuantity: quantity,
      selectedTotalPrice: newTotalPrice
    });
  }

  onSubmitToCart = (values) => {
    const { selectedProduct, selectedTotalPrice } = this.state;
    console.log(values)
    const productDetails = {
      productId: selectedProduct.productId,
      name: selectedProduct.name,
      note: values.note,
      size: values.size,
      toppings: values.toppings,
      quantity: values.quantity,
      totalPrice: selectedTotalPrice
    };
    this.props.onAddToCart(productDetails);
    this.setState({
      selectedProduct: null,
      selectedTotalPrice: 0,
      lastSelectedSizePrice: 0,
      lastSelectedQuantity: 1,
      isOpenForm: false
    });
  }

  onToppingGroupChange = (checkedList) => {
    this.setState({
      selectedToppingList: checkedList
    })
  }

  render() {
    const productsGroupByCategories = this.props.products;
    const { activeCategory, isLoading, isOpenForm, selectedProduct, selectedTotalPrice, selectedToppingList, lastSelectedQuantity } = this.state;
    const products2D = productsGroupByCategories.map(c => c.products);
    const products = [].concat.apply([], products2D);
    const form = (
      <AntForm
        visible={isOpenForm}
        title={`Add To Cart ${selectedProduct && selectedProduct.name}`}
        loading={false}
        layout={null}
        id={'cartForm'}
        initialValues={isOpenForm ? selectedProduct : null}
        onFinish={this.onSubmitToCart}
        onCancel={this.onCancelForm}
        submitButtonText={`Add To Cart (${numberToVND(selectedTotalPrice)})`}
      >
        <Form.Item
          name='size'
          label='Size'
          rules={[{
            required: true,
            message: 'Please select the size!',
            type: 'string'
          }]}
        >
          <Radio.Group>
            {
              selectedProduct && selectedProduct.sizes.map((s, index) => (
                <Radio
                  key={index} value={s.size}
                  onChange={(event) => this.calculateTotalPrice(s.additionalPrice, event.target.checked, true)}
                >
                  {`${s.size} (+${numberToVND(s.additionalPrice)})`}
                </Radio>
              ))
            }
          </Radio.Group>
        </Form.Item>
        {selectedProduct && selectedProduct.toppings.length > 0 &&
          <Form.Item
            name='toppings'
            label='Toppings'
            rules={[{
              required: false,
              type: 'array'
            }]}
          >
            <Checkbox.Group
              value={selectedToppingList}
              onChange={this.onToppingGroupChange}
            >
              {
                selectedProduct && selectedProduct.toppings.map((t, index) => (
                  <Checkbox
                    key={index} value={t.name}
                    onChange={(event) => this.calculateTotalPrice(t.additionalPrice, event.target.checked)}
                  >
                    {`${t.name} (+${numberToVND(t.additionalPrice)})`}
                  </Checkbox>
                ))
              }
            </Checkbox.Group>
          </Form.Item>}
        <Form.Item
          name='note'
          label='Note'
          rules={[{
            type: 'string'
          }]}
          initialValue=''
        >
          <Input.TextArea placeholder='Add note for this drink...' />
        </Form.Item>
        <Form.Item
          name='quantity'
          label='Quantity'
          rules={[{
            type: 'number',
            required: true,
            message: 'Please select the right quantity!'
          }]}
          initialValue={lastSelectedQuantity}
        >
          <InputNumber min={1} max={10} onChange={this.onQuantityChange} />
        </Form.Item>
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
                    <li className='cate-prod-li' id={c.category}>
                      <div style={{ height: '3vh' }} />
                      <h4 style={{ color: 'orange' }}>{c.category}</h4>
                      <ul className='prod-ul'>
                        {products.map((p, index) => p.category === c.category && (
                          <li className='prod-li' key={p.name}>
                            <Media className='prod-media'>
                              <img
                                width={64}
                                height={64}
                                className="mr-3"
                                src={imgList[index]}
                                alt="Generic placeholder"
                              />
                              <Media.Body>
                                <h5 style={{ color: 'darkorange' }}>{p.name}</h5>
                                <p>{p.description}</p>
                                <h6 style={{ color: 'darkorange' }} className='m-0'>{numberToVND(p.unitPrice)}</h6>
                              </Media.Body>
                              <PlusCircleFill className='add-to-cart' onClick={() => this.openForm(p)} />
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
    onMount: () => dispatch(actionCreators.getProductsGroupByCategories()),
    onAddToCart: (product) => dispatch(actionCreators.addProductToCart(product)),
    onError: (error) => dispatch(actionCreators.setError(error))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Menu));