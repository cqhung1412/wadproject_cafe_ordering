import React, { Component } from 'react'
import { Image } from 'react-bootstrap'

import LazyImage from '../../../components/animations/LazyImage/LazyImage'

import home from '../../../assets/images/home.gif'
import story from '../../../assets/images/our-story.gif'
import offer from '../../../assets/images/we-offer.gif'
import promo from '../../../assets/images/promo-news.gif'
import contact from '../../../assets/images/contact.png'



import mobilehome from '../../../assets/images/mobile-home.gif'
import mobilestory from '../../../assets/images/mobile-story.gif'
import mobileoffer from '../../../assets/images/mobile-offer.gif'
import mobilepromo from '../../../assets/images/mobile-promo.gif'
import mobilecontact from '../../../assets/images/mobile-contact.png'

import './Homepage.less'

const LazyImageWrapper = props => (
  <div className={`w-100 ${props.isMobile ? 'mobile-' : ''}banner`} id={props.id}>
    <LazyImage
      placeholder={null}
      src={props.src}
      height='100%'
      effect='opacity'
      alt={props.alt}
    />
  </div>
)

export default class Homepage extends Component {
  render() {
    return (
      <div>
        <Image src={home} className='w-100 banner' id='home' alt='home' />
        <LazyImageWrapper src={story} id='story' alt='Our Story' />
        <LazyImageWrapper src={offer} id='offer' alt='What we offer' />
        <LazyImageWrapper src={promo} id='promo' alt='promotions and news' />
        <Image src={contact} className='w-100 banner' id='contact' alt='our contact' />

        <Image src={mobilehome} className='w-100 mobile-banner' id='home-mobile' alt='home' />
        <LazyImageWrapper src={mobilestory} id='story-mobile' alt='our story' isMobile={true} />
        <LazyImageWrapper src={mobileoffer} id='offer-mobile' alt='what we offer' isMobile={true} />
        <LazyImageWrapper src={mobilepromo} id='promo-mobile' alt='promotions and news' isMobile={true} />
        <Image src={mobilecontact} className='w-100 mobile-banner' id='contact-mobile' alt='our contact' />
      </div>
    )
  }
}
