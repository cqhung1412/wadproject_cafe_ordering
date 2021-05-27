import React, { Component } from 'react'
import { Image } from 'react-bootstrap'

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

import './Homepage.css'
export default class Homepage extends Component {
  render() {
    return (
      <div>
        <Image src={home} className='w-100 banner' id='home' alt='home' />
        <Image src={story} className='w-100 banner' id='story' alt='our story' />
        <Image src={offer} className='w-100 banner' id='offer' alt='what we offer' />
        <Image src={promo} className='w-100 banner' id='promo' alt='promotions and news' />
        <Image src={contact} className='w-100 banner' id='contact' alt='our contact' />

        <Image src={mobilehome} className='w-100 mobile-banner' id='home' alt='home' />
        <Image src={mobilestory} className='w-100 mobile-banner' id='story' alt='our story' />
        <Image src={mobileoffer} className='w-100 mobile-banner' id='offer' alt='what we offer' />
        <Image src={mobilepromo} className='w-100 mobile-banner' id='promo' alt='promotions and news' />
        <Image src={mobilecontact} className='w-100 mobile-banner' id='contact' alt='our contact' />
      </div>
    )
  }
}
