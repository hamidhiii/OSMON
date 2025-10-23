import {  Instagram, Facebook, Twitter, Youtube, } from 'lucide-react';

export const FOOTER_DATA = {
    customerService: {
      title: 'CUSTOMER SERVICE',
      links: [
        { text: 'Contact Us', href: '#contact' },
        { text: 'Track My Order', href: '#track' },
        { text: 'Shipping & Returns', href: '#shipping' },
      ],
    },
    myAccount: {
      title: 'MY ACCOUNT',
      links: [
        { text: 'Create an Account', href: '#signup' },
        { text: 'Account Login', href: '#login' },
        { text: 'Wishlist', href: '#wishlist' },
      ],
    },
    company: {
      title: 'OUR COMPANY',
      links: [
        { text: 'Our Story', href: '#story' },
        { text: 'Designers & Trade', href: '#designers' },
        { text: 'Partnerships', href: '#partnerships' },
        { text: 'Reviews', href: '#reviews' },
        { text: 'Our Blog', href: '#blog' },
      ],
    },
    resources: {
      title: 'RESOURCES',
      links: [
        { text: 'Free Design Services', href: '#design' },
        { text: 'Gift Registry', href: '#registry' },
        { text: 'Gift Cards', href: '#giftcards' },
        { text: 'Trade Program', href: '#trade' },
        { text: 'Contract Grade Furniture', href: '#contract' },
      ],
    },
    contact: {
      email: 'info@osmon.com',
      phone: '516-945-8000',
      hours: 'Monday - Friday 9am - 4pm EST',
    },
    social: {
      title: 'FOLLOW US',
      platforms: [
        { icon: Instagram, href: '#instagram', label: 'Instagram' },
        { icon: Facebook, href: '#facebook', label: 'Facebook' },
        { icon: Twitter, href: '#twitter', label: 'Twitter' },
        { icon: Youtube, href: '#youtube', label: 'YouTube' },
      ],
      hashtag: '#osmon',
      handle: '@osmon',
    },
    newsletter: {
      title: 'Join our VIP list for exclusive offers, new arrivals & more.',
      description: 'Enjoy $50 off your first purchase of $250 or more when you sign up to receive emails. Exceptions apply and cannot be combined with other offers or promotions.',
    },
    legal: {
      copyright: '2025',
      companyName: 'OSMON',
      rating: 'osmon.com has a Shopper Approved rating of 4.8/5 based on 2832 ratings and reviews.',
      links: [
        { text: 'Terms of Use', href: '#terms' },
        { text: 'Privacy', href: '#privacy' },
        { text: 'Site Index', href: '#sitemap' },
        { text: 'Ad Choices', href: '#ads' },
        { text: 'Cookie Settings', href: '#cookies' },
        { text: 'Do Not Sell My Info', href: '#privacy-rights' },
      ],
    },
  };