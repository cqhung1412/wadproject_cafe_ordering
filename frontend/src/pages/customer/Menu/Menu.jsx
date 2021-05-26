import React, { Component } from 'react'
import { Container, Row, Col, Media } from 'react-bootstrap'
import { PlusCircleFill } from 'react-bootstrap-icons'
import './Menu.css'
import constants from '../../../utils/constants'
import placeholder from '../../../assets/images/placeholder.svg'

const productGroupByCategories = [
  {
    category: constants.PRODUCT_CATEGORIES.COFFEE,
    products: [
      {
        name: 'Cà Phê Sữa Đá',
        unitPrice: 32000,
        desc: 'Cà phê phin kết hợp cũng sữa đặc là một sáng tạo đầy tự hào của người Việt, được xem món uống thương hiệu của Việt Nam.',
        sizes: [
          { size: 'Small', additionalPrice: 0 },
          { size: 'Medium', additionalPrice: 3000 },
          { size: 'Large', additionalPrice: 6000 }
        ],
        toppings: []
      },
      {
        name: 'Bạc Xỉu',
        unitPrice: 32000,
        desc: 'Theo chân những người gốc Hoa đến định cư tại Sài Gòn, Bạc sỉu là cách gọi tắt của "Bạc tẩy xỉu phé" trong tiếng Quảng Đông, chính là: Ly sữa trắng kèm một chút cà phê.',
        sizes: [
          { size: 'Small', additionalPrice: 0 },
          { size: 'Medium', additionalPrice: 3000 },
          { size: 'Large', additionalPrice: 6000 }
        ],
        toppings: []
      },
      {
        name: 'Caramel Macchiato Đá',
        unitPrice: 50000,
        desc: 'Vị thơm béo của sữa tươi, vị đắng thanh thoát của cà phê Espresso hảo hạng, và vị ngọt đậm của sốt caramel.',
        sizes: [
          { size: 'Small', additionalPrice: 0 },
          { size: 'Medium', additionalPrice: 5000 },
        ],
        toppings: [
          { name: 'Espresso (1 shot)', additionalPrice: 10000 },
          { name: 'Sauce Caramel', additionalPrice: 10000 }
        ]
      },
      {
        name: 'Trà Sữa Oolong Nướng',
        unitPrice: 50000,
        desc: 'Đậm đà chuẩn gu - bởi trà oolong nướng đậm vị hoà cùng lớp sữa thơm béo. Hương vị chân ái đúng gu đậm đà - trà oolong được "sao" (nướng) lâu hơn cho vị đậm đà, hoà quyện với sữa thơm ngậy. Cho từng ngụm mát lạnh, lưu luyến vị trà sữa đậm đà mãi nơi cuống họng.',
        sizes: [
          { size: 'Medium', additionalPrice: 0 },
          { size: 'Large', additionalPrice: 5000 },
        ],
        toppings: [
          { name: 'Trân châu trắng', additionalPrice: 10000 }
        ]
      },
      {
        name: 'Hồng Trà Sữa Trân Châu',
        unitPrice: 55000,
        desc: 'Từng ngụm trà chuẩn gu thơm lừng, đậm đà beo béo bởi lớp sữa tươi chân ái hoà quyện. Sự kết hợp hoàn hảo của trà đen nguyên lá đậm đà chuẩn gu, cùng lớp sữa thơm béo ngọt ngào đượm vị. Có sẵn trân châu trắng dai giòn cho phiên bản lạnh - để tăng thêm hứng khởi, vui miệng bớt lăn tăn.',
        sizes: [
          { size: 'Medium', additionalPrice: 0 },
          { size: 'Large', additionalPrice: 5000 },
        ],
        toppings: [
          { name: 'Trân châu trắng', additionalPrice: 10000 }
        ]
      },
      {
        name: 'Trà Sữa Oolong Nướng',
        unitPrice: 50000,
        desc: 'Đậm đà chuẩn gu - bởi trà oolong nướng đậm vị hoà cùng lớp sữa thơm béo. Hương vị chân ái đúng gu đậm đà - trà oolong được "sao" (nướng) lâu hơn cho vị đậm đà, hoà quyện với sữa thơm ngậy. Cho từng ngụm mát lạnh, lưu luyến vị trà sữa đậm đà mãi nơi cuống họng.',
        sizes: [
          { size: 'Medium', additionalPrice: 0 },
          { size: 'Large', additionalPrice: 5000 },
        ],
        toppings: [
          { name: 'Trân châu trắng', additionalPrice: 10000 }
        ]
      },
      {
        name: 'Hồng Trà Sữa Trân Châu',
        unitPrice: 55000,
        desc: 'Từng ngụm trà chuẩn gu thơm lừng, đậm đà beo béo bởi lớp sữa tươi chân ái hoà quyện. Sự kết hợp hoàn hảo của trà đen nguyên lá đậm đà chuẩn gu, cùng lớp sữa thơm béo ngọt ngào đượm vị. Có sẵn trân châu trắng dai giòn cho phiên bản lạnh - để tăng thêm hứng khởi, vui miệng bớt lăn tăn.',
        sizes: [
          { size: 'Medium', additionalPrice: 0 },
          { size: 'Large', additionalPrice: 5000 },
        ],
        toppings: [
          { name: 'Trân châu trắng', additionalPrice: 10000 }
        ]
      }
    ]
  },
  {
    category: constants.PRODUCT_CATEGORIES.MILKTEA,
    products: [
      {
        name: 'Trà Sữa Oolong Nướng',
        unitPrice: 50000,
        desc: 'Đậm đà chuẩn gu - bởi trà oolong nướng đậm vị hoà cùng lớp sữa thơm béo. Hương vị chân ái đúng gu đậm đà - trà oolong được "sao" (nướng) lâu hơn cho vị đậm đà, hoà quyện với sữa thơm ngậy. Cho từng ngụm mát lạnh, lưu luyến vị trà sữa đậm đà mãi nơi cuống họng.',
        sizes: [
          { size: 'Medium', additionalPrice: 0 },
          { size: 'Large', additionalPrice: 5000 },
        ],
        toppings: [
          { name: 'Trân châu trắng', additionalPrice: 10000 }
        ]
      },
      {
        name: 'Hồng Trà Sữa Trân Châu',
        unitPrice: 55000,
        desc: 'Từng ngụm trà chuẩn gu thơm lừng, đậm đà beo béo bởi lớp sữa tươi chân ái hoà quyện. Sự kết hợp hoàn hảo của trà đen nguyên lá đậm đà chuẩn gu, cùng lớp sữa thơm béo ngọt ngào đượm vị. Có sẵn trân châu trắng dai giòn cho phiên bản lạnh - để tăng thêm hứng khởi, vui miệng bớt lăn tăn.',
        sizes: [
          { size: 'Medium', additionalPrice: 0 },
          { size: 'Large', additionalPrice: 5000 },
        ],
        toppings: [
          { name: 'Trân châu trắng', additionalPrice: 10000 }
        ]
      },
      {
        name: 'Trà Sữa Oolong Nướng',
        unitPrice: 50000,
        desc: 'Đậm đà chuẩn gu - bởi trà oolong nướng đậm vị hoà cùng lớp sữa thơm béo. Hương vị chân ái đúng gu đậm đà - trà oolong được "sao" (nướng) lâu hơn cho vị đậm đà, hoà quyện với sữa thơm ngậy. Cho từng ngụm mát lạnh, lưu luyến vị trà sữa đậm đà mãi nơi cuống họng.',
        sizes: [
          { size: 'Medium', additionalPrice: 0 },
          { size: 'Large', additionalPrice: 5000 },
        ],
        toppings: [
          { name: 'Trân châu trắng', additionalPrice: 10000 }
        ]
      },
      {
        name: 'Hồng Trà Sữa Trân Châu',
        unitPrice: 55000,
        desc: 'Từng ngụm trà chuẩn gu thơm lừng, đậm đà beo béo bởi lớp sữa tươi chân ái hoà quyện. Sự kết hợp hoàn hảo của trà đen nguyên lá đậm đà chuẩn gu, cùng lớp sữa thơm béo ngọt ngào đượm vị. Có sẵn trân châu trắng dai giòn cho phiên bản lạnh - để tăng thêm hứng khởi, vui miệng bớt lăn tăn.',
        sizes: [
          { size: 'Medium', additionalPrice: 0 },
          { size: 'Large', additionalPrice: 5000 },
        ],
        toppings: [
          { name: 'Trân châu trắng', additionalPrice: 10000 }
        ]
      },
      {
        name: 'Trà Sữa Oolong Nướng',
        unitPrice: 50000,
        desc: 'Đậm đà chuẩn gu - bởi trà oolong nướng đậm vị hoà cùng lớp sữa thơm béo. Hương vị chân ái đúng gu đậm đà - trà oolong được "sao" (nướng) lâu hơn cho vị đậm đà, hoà quyện với sữa thơm ngậy. Cho từng ngụm mát lạnh, lưu luyến vị trà sữa đậm đà mãi nơi cuống họng.',
        sizes: [
          { size: 'Medium', additionalPrice: 0 },
          { size: 'Large', additionalPrice: 5000 },
        ],
        toppings: [
          { name: 'Trân châu trắng', additionalPrice: 10000 }
        ]
      },
      {
        name: 'Hồng Trà Sữa Trân Châu',
        unitPrice: 55000,
        desc: 'Từng ngụm trà chuẩn gu thơm lừng, đậm đà beo béo bởi lớp sữa tươi chân ái hoà quyện. Sự kết hợp hoàn hảo của trà đen nguyên lá đậm đà chuẩn gu, cùng lớp sữa thơm béo ngọt ngào đượm vị. Có sẵn trân châu trắng dai giòn cho phiên bản lạnh - để tăng thêm hứng khởi, vui miệng bớt lăn tăn.',
        sizes: [
          { size: 'Medium', additionalPrice: 0 },
          { size: 'Large', additionalPrice: 5000 },
        ],
        toppings: [
          { name: 'Trân châu trắng', additionalPrice: 10000 }
        ]
      },
      {
        name: 'Trà Sữa Oolong Nướng',
        unitPrice: 50000,
        desc: 'Đậm đà chuẩn gu - bởi trà oolong nướng đậm vị hoà cùng lớp sữa thơm béo. Hương vị chân ái đúng gu đậm đà - trà oolong được "sao" (nướng) lâu hơn cho vị đậm đà, hoà quyện với sữa thơm ngậy. Cho từng ngụm mát lạnh, lưu luyến vị trà sữa đậm đà mãi nơi cuống họng.',
        sizes: [
          { size: 'Medium', additionalPrice: 0 },
          { size: 'Large', additionalPrice: 5000 },
        ],
        toppings: [
          { name: 'Trân châu trắng', additionalPrice: 10000 }
        ]
      },
      {
        name: 'Hồng Trà Sữa Trân Châu',
        unitPrice: 55000,
        desc: 'Từng ngụm trà chuẩn gu thơm lừng, đậm đà beo béo bởi lớp sữa tươi chân ái hoà quyện. Sự kết hợp hoàn hảo của trà đen nguyên lá đậm đà chuẩn gu, cùng lớp sữa thơm béo ngọt ngào đượm vị. Có sẵn trân châu trắng dai giòn cho phiên bản lạnh - để tăng thêm hứng khởi, vui miệng bớt lăn tăn.',
        sizes: [
          { size: 'Medium', additionalPrice: 0 },
          { size: 'Large', additionalPrice: 5000 },
        ],
        toppings: [
          { name: 'Trân châu trắng', additionalPrice: 10000 }
        ]
      }
    ]
  },
  {
    category: constants.PRODUCT_CATEGORIES.MOJITO,
    products: [
      {
        name: 'Trà Sữa Oolong Nướng',
        unitPrice: 50000,
        desc: 'Đậm đà chuẩn gu - bởi trà oolong nướng đậm vị hoà cùng lớp sữa thơm béo. Hương vị chân ái đúng gu đậm đà - trà oolong được "sao" (nướng) lâu hơn cho vị đậm đà, hoà quyện với sữa thơm ngậy. Cho từng ngụm mát lạnh, lưu luyến vị trà sữa đậm đà mãi nơi cuống họng.',
        sizes: [
          { size: 'Medium', additionalPrice: 0 },
          { size: 'Large', additionalPrice: 5000 },
        ],
        toppings: [
          { name: 'Trân châu trắng', additionalPrice: 10000 }
        ]
      },
      {
        name: 'Hồng Trà Sữa Trân Châu',
        unitPrice: 55000,
        desc: 'Từng ngụm trà chuẩn gu thơm lừng, đậm đà beo béo bởi lớp sữa tươi chân ái hoà quyện. Sự kết hợp hoàn hảo của trà đen nguyên lá đậm đà chuẩn gu, cùng lớp sữa thơm béo ngọt ngào đượm vị. Có sẵn trân châu trắng dai giòn cho phiên bản lạnh - để tăng thêm hứng khởi, vui miệng bớt lăn tăn.',
        sizes: [
          { size: 'Medium', additionalPrice: 0 },
          { size: 'Large', additionalPrice: 5000 },
        ],
        toppings: [
          { name: 'Trân châu trắng', additionalPrice: 10000 }
        ]
      },
      {
        name: 'Trà Sữa Oolong Nướng',
        unitPrice: 50000,
        desc: 'Đậm đà chuẩn gu - bởi trà oolong nướng đậm vị hoà cùng lớp sữa thơm béo. Hương vị chân ái đúng gu đậm đà - trà oolong được "sao" (nướng) lâu hơn cho vị đậm đà, hoà quyện với sữa thơm ngậy. Cho từng ngụm mát lạnh, lưu luyến vị trà sữa đậm đà mãi nơi cuống họng.',
        sizes: [
          { size: 'Medium', additionalPrice: 0 },
          { size: 'Large', additionalPrice: 5000 },
        ],
        toppings: [
          { name: 'Trân châu trắng', additionalPrice: 10000 }
        ]
      },
      {
        name: 'Hồng Trà Sữa Trân Châu',
        unitPrice: 55000,
        desc: 'Từng ngụm trà chuẩn gu thơm lừng, đậm đà beo béo bởi lớp sữa tươi chân ái hoà quyện. Sự kết hợp hoàn hảo của trà đen nguyên lá đậm đà chuẩn gu, cùng lớp sữa thơm béo ngọt ngào đượm vị. Có sẵn trân châu trắng dai giòn cho phiên bản lạnh - để tăng thêm hứng khởi, vui miệng bớt lăn tăn.',
        sizes: [
          { size: 'Medium', additionalPrice: 0 },
          { size: 'Large', additionalPrice: 5000 },
        ],
        toppings: [
          { name: 'Trân châu trắng', additionalPrice: 10000 }
        ]
      },
      {
        name: 'Trà Sữa Oolong Nướng',
        unitPrice: 50000,
        desc: 'Đậm đà chuẩn gu - bởi trà oolong nướng đậm vị hoà cùng lớp sữa thơm béo. Hương vị chân ái đúng gu đậm đà - trà oolong được "sao" (nướng) lâu hơn cho vị đậm đà, hoà quyện với sữa thơm ngậy. Cho từng ngụm mát lạnh, lưu luyến vị trà sữa đậm đà mãi nơi cuống họng.',
        sizes: [
          { size: 'Medium', additionalPrice: 0 },
          { size: 'Large', additionalPrice: 5000 },
        ],
        toppings: [
          { name: 'Trân châu trắng', additionalPrice: 10000 }
        ]
      },
      {
        name: 'Hồng Trà Sữa Trân Châu',
        unitPrice: 55000,
        desc: 'Từng ngụm trà chuẩn gu thơm lừng, đậm đà beo béo bởi lớp sữa tươi chân ái hoà quyện. Sự kết hợp hoàn hảo của trà đen nguyên lá đậm đà chuẩn gu, cùng lớp sữa thơm béo ngọt ngào đượm vị. Có sẵn trân châu trắng dai giòn cho phiên bản lạnh - để tăng thêm hứng khởi, vui miệng bớt lăn tăn.',
        sizes: [
          { size: 'Medium', additionalPrice: 0 },
          { size: 'Large', additionalPrice: 5000 },
        ],
        toppings: [
          { name: 'Trân châu trắng', additionalPrice: 10000 }
        ]
      }
    ]
  },
  {
    category: constants.PRODUCT_CATEGORIES.CITRUS,
    products: [
      {
        name: 'Trà Sữa Oolong Nướng',
        unitPrice: 50000,
        desc: 'Đậm đà chuẩn gu - bởi trà oolong nướng đậm vị hoà cùng lớp sữa thơm béo. Hương vị chân ái đúng gu đậm đà - trà oolong được "sao" (nướng) lâu hơn cho vị đậm đà, hoà quyện với sữa thơm ngậy. Cho từng ngụm mát lạnh, lưu luyến vị trà sữa đậm đà mãi nơi cuống họng.',
        sizes: [
          { size: 'Medium', additionalPrice: 0 },
          { size: 'Large', additionalPrice: 5000 },
        ],
        toppings: [
          { name: 'Trân châu trắng', additionalPrice: 10000 }
        ]
      },
      {
        name: 'Hồng Trà Sữa Trân Châu',
        unitPrice: 55000,
        desc: 'Từng ngụm trà chuẩn gu thơm lừng, đậm đà beo béo bởi lớp sữa tươi chân ái hoà quyện. Sự kết hợp hoàn hảo của trà đen nguyên lá đậm đà chuẩn gu, cùng lớp sữa thơm béo ngọt ngào đượm vị. Có sẵn trân châu trắng dai giòn cho phiên bản lạnh - để tăng thêm hứng khởi, vui miệng bớt lăn tăn.',
        sizes: [
          { size: 'Medium', additionalPrice: 0 },
          { size: 'Large', additionalPrice: 5000 },
        ],
        toppings: [
          { name: 'Trân châu trắng', additionalPrice: 10000 }
        ]
      },
      {
        name: 'Trà Sữa Oolong Nướng',
        unitPrice: 50000,
        desc: 'Đậm đà chuẩn gu - bởi trà oolong nướng đậm vị hoà cùng lớp sữa thơm béo. Hương vị chân ái đúng gu đậm đà - trà oolong được "sao" (nướng) lâu hơn cho vị đậm đà, hoà quyện với sữa thơm ngậy. Cho từng ngụm mát lạnh, lưu luyến vị trà sữa đậm đà mãi nơi cuống họng.',
        sizes: [
          { size: 'Medium', additionalPrice: 0 },
          { size: 'Large', additionalPrice: 5000 },
        ],
        toppings: [
          { name: 'Trân châu trắng', additionalPrice: 10000 }
        ]
      },
      {
        name: 'Hồng Trà Sữa Trân Châu',
        unitPrice: 55000,
        desc: 'Từng ngụm trà chuẩn gu thơm lừng, đậm đà beo béo bởi lớp sữa tươi chân ái hoà quyện. Sự kết hợp hoàn hảo của trà đen nguyên lá đậm đà chuẩn gu, cùng lớp sữa thơm béo ngọt ngào đượm vị. Có sẵn trân châu trắng dai giòn cho phiên bản lạnh - để tăng thêm hứng khởi, vui miệng bớt lăn tăn.',
        sizes: [
          { size: 'Medium', additionalPrice: 0 },
          { size: 'Large', additionalPrice: 5000 },
        ],
        toppings: [
          { name: 'Trân châu trắng', additionalPrice: 10000 }
        ]
      },
      {
        name: 'Trà Sữa Oolong Nướng',
        unitPrice: 50000,
        desc: 'Đậm đà chuẩn gu - bởi trà oolong nướng đậm vị hoà cùng lớp sữa thơm béo. Hương vị chân ái đúng gu đậm đà - trà oolong được "sao" (nướng) lâu hơn cho vị đậm đà, hoà quyện với sữa thơm ngậy. Cho từng ngụm mát lạnh, lưu luyến vị trà sữa đậm đà mãi nơi cuống họng.',
        sizes: [
          { size: 'Medium', additionalPrice: 0 },
          { size: 'Large', additionalPrice: 5000 },
        ],
        toppings: [
          { name: 'Trân châu trắng', additionalPrice: 10000 }
        ]
      },
      {
        name: 'Hồng Trà Sữa Trân Châu',
        unitPrice: 55000,
        desc: 'Từng ngụm trà chuẩn gu thơm lừng, đậm đà beo béo bởi lớp sữa tươi chân ái hoà quyện. Sự kết hợp hoàn hảo của trà đen nguyên lá đậm đà chuẩn gu, cùng lớp sữa thơm béo ngọt ngào đượm vị. Có sẵn trân châu trắng dai giòn cho phiên bản lạnh - để tăng thêm hứng khởi, vui miệng bớt lăn tăn.',
        sizes: [
          { size: 'Medium', additionalPrice: 0 },
          { size: 'Large', additionalPrice: 5000 },
        ],
        toppings: [
          { name: 'Trân châu trắng', additionalPrice: 10000 }
        ]
      }
    ]
  },
  {
    category: constants.PRODUCT_CATEGORIES.SOFT_DRINK,
    products: [
      {
        name: 'Trà Sữa Oolong Nướng',
        unitPrice: 50000,
        desc: 'Đậm đà chuẩn gu - bởi trà oolong nướng đậm vị hoà cùng lớp sữa thơm béo. Hương vị chân ái đúng gu đậm đà - trà oolong được "sao" (nướng) lâu hơn cho vị đậm đà, hoà quyện với sữa thơm ngậy. Cho từng ngụm mát lạnh, lưu luyến vị trà sữa đậm đà mãi nơi cuống họng.',
        sizes: [
          { size: 'Medium', additionalPrice: 0 },
          { size: 'Large', additionalPrice: 5000 },
        ],
        toppings: [
          { name: 'Trân châu trắng', additionalPrice: 10000 }
        ]
      },
      {
        name: 'Hồng Trà Sữa Trân Châu',
        unitPrice: 55000,
        desc: 'Từng ngụm trà chuẩn gu thơm lừng, đậm đà beo béo bởi lớp sữa tươi chân ái hoà quyện. Sự kết hợp hoàn hảo của trà đen nguyên lá đậm đà chuẩn gu, cùng lớp sữa thơm béo ngọt ngào đượm vị. Có sẵn trân châu trắng dai giòn cho phiên bản lạnh - để tăng thêm hứng khởi, vui miệng bớt lăn tăn.',
        sizes: [
          { size: 'Medium', additionalPrice: 0 },
          { size: 'Large', additionalPrice: 5000 },
        ],
        toppings: [
          { name: 'Trân châu trắng', additionalPrice: 10000 }
        ]
      }
    ]
  },
  {
    category: constants.PRODUCT_CATEGORIES.PASTRY,
    products: [
      {
        name: 'Trà Sữa Oolong Nướng',
        unitPrice: 50000,
        desc: 'Đậm đà chuẩn gu - bởi trà oolong nướng đậm vị hoà cùng lớp sữa thơm béo. Hương vị chân ái đúng gu đậm đà - trà oolong được "sao" (nướng) lâu hơn cho vị đậm đà, hoà quyện với sữa thơm ngậy. Cho từng ngụm mát lạnh, lưu luyến vị trà sữa đậm đà mãi nơi cuống họng.',
        sizes: [
          { size: 'Medium', additionalPrice: 0 },
          { size: 'Large', additionalPrice: 5000 },
        ],
        toppings: [
          { name: 'Trân châu trắng', additionalPrice: 10000 }
        ]
      },
      {
        name: 'Hồng Trà Sữa Trân Châu',
        unitPrice: 55000,
        desc: 'Từng ngụm trà chuẩn gu thơm lừng, đậm đà beo béo bởi lớp sữa tươi chân ái hoà quyện. Sự kết hợp hoàn hảo của trà đen nguyên lá đậm đà chuẩn gu, cùng lớp sữa thơm béo ngọt ngào đượm vị. Có sẵn trân châu trắng dai giòn cho phiên bản lạnh - để tăng thêm hứng khởi, vui miệng bớt lăn tăn.',
        sizes: [
          { size: 'Medium', additionalPrice: 0 },
          { size: 'Large', additionalPrice: 5000 },
        ],
        toppings: [
          { name: 'Trân châu trắng', additionalPrice: 10000 }
        ]
      },
      {
        name: 'Trà Sữa Oolong Nướng',
        unitPrice: 50000,
        desc: 'Đậm đà chuẩn gu - bởi trà oolong nướng đậm vị hoà cùng lớp sữa thơm béo. Hương vị chân ái đúng gu đậm đà - trà oolong được "sao" (nướng) lâu hơn cho vị đậm đà, hoà quyện với sữa thơm ngậy. Cho từng ngụm mát lạnh, lưu luyến vị trà sữa đậm đà mãi nơi cuống họng.',
        sizes: [
          { size: 'Medium', additionalPrice: 0 },
          { size: 'Large', additionalPrice: 5000 },
        ],
        toppings: [
          { name: 'Trân châu trắng', additionalPrice: 10000 }
        ]
      },
      {
        name: 'Hồng Trà Sữa Trân Châu',
        unitPrice: 55000,
        desc: 'Từng ngụm trà chuẩn gu thơm lừng, đậm đà beo béo bởi lớp sữa tươi chân ái hoà quyện. Sự kết hợp hoàn hảo của trà đen nguyên lá đậm đà chuẩn gu, cùng lớp sữa thơm béo ngọt ngào đượm vị. Có sẵn trân châu trắng dai giòn cho phiên bản lạnh - để tăng thêm hứng khởi, vui miệng bớt lăn tăn.',
        sizes: [
          { size: 'Medium', additionalPrice: 0 },
          { size: 'Large', additionalPrice: 5000 },
        ],
        toppings: [
          { name: 'Trân châu trắng', additionalPrice: 10000 }
        ]
      },
      {
        name: 'Trà Sữa Oolong Nướng',
        unitPrice: 50000,
        desc: 'Đậm đà chuẩn gu - bởi trà oolong nướng đậm vị hoà cùng lớp sữa thơm béo. Hương vị chân ái đúng gu đậm đà - trà oolong được "sao" (nướng) lâu hơn cho vị đậm đà, hoà quyện với sữa thơm ngậy. Cho từng ngụm mát lạnh, lưu luyến vị trà sữa đậm đà mãi nơi cuống họng.',
        sizes: [
          { size: 'Medium', additionalPrice: 0 },
          { size: 'Large', additionalPrice: 5000 },
        ],
        toppings: [
          { name: 'Trân châu trắng', additionalPrice: 10000 }
        ]
      },
      {
        name: 'Hồng Trà Sữa Trân Châu',
        unitPrice: 55000,
        desc: 'Từng ngụm trà chuẩn gu thơm lừng, đậm đà beo béo bởi lớp sữa tươi chân ái hoà quyện. Sự kết hợp hoàn hảo của trà đen nguyên lá đậm đà chuẩn gu, cùng lớp sữa thơm béo ngọt ngào đượm vị. Có sẵn trân châu trắng dai giòn cho phiên bản lạnh - để tăng thêm hứng khởi, vui miệng bớt lăn tăn.',
        sizes: [
          { size: 'Medium', additionalPrice: 0 },
          { size: 'Large', additionalPrice: 5000 },
        ],
        toppings: [
          { name: 'Trân châu trắng', additionalPrice: 10000 }
        ]
      },
      {
        name: 'Trà Sữa Oolong Nướng',
        unitPrice: 50000,
        desc: 'Đậm đà chuẩn gu - bởi trà oolong nướng đậm vị hoà cùng lớp sữa thơm béo. Hương vị chân ái đúng gu đậm đà - trà oolong được "sao" (nướng) lâu hơn cho vị đậm đà, hoà quyện với sữa thơm ngậy. Cho từng ngụm mát lạnh, lưu luyến vị trà sữa đậm đà mãi nơi cuống họng.',
        sizes: [
          { size: 'Medium', additionalPrice: 0 },
          { size: 'Large', additionalPrice: 5000 },
        ],
        toppings: [
          { name: 'Trân châu trắng', additionalPrice: 10000 }
        ]
      },
      {
        name: 'Hồng Trà Sữa Trân Châu',
        unitPrice: 55000,
        desc: 'Từng ngụm trà chuẩn gu thơm lừng, đậm đà beo béo bởi lớp sữa tươi chân ái hoà quyện. Sự kết hợp hoàn hảo của trà đen nguyên lá đậm đà chuẩn gu, cùng lớp sữa thơm béo ngọt ngào đượm vị. Có sẵn trân châu trắng dai giòn cho phiên bản lạnh - để tăng thêm hứng khởi, vui miệng bớt lăn tăn.',
        sizes: [
          { size: 'Medium', additionalPrice: 0 },
          { size: 'Large', additionalPrice: 5000 },
        ],
        toppings: [
          { name: 'Trân châu trắng', additionalPrice: 10000 }
        ]
      },
      {
        name: 'Trà Sữa Oolong Nướng',
        unitPrice: 50000,
        desc: 'Đậm đà chuẩn gu - bởi trà oolong nướng đậm vị hoà cùng lớp sữa thơm béo. Hương vị chân ái đúng gu đậm đà - trà oolong được "sao" (nướng) lâu hơn cho vị đậm đà, hoà quyện với sữa thơm ngậy. Cho từng ngụm mát lạnh, lưu luyến vị trà sữa đậm đà mãi nơi cuống họng.',
        sizes: [
          { size: 'Medium', additionalPrice: 0 },
          { size: 'Large', additionalPrice: 5000 },
        ],
        toppings: [
          { name: 'Trân châu trắng', additionalPrice: 10000 }
        ]
      },
      {
        name: 'Hồng Trà Sữa Trân Châu',
        unitPrice: 55000,
        desc: 'Từng ngụm trà chuẩn gu thơm lừng, đậm đà beo béo bởi lớp sữa tươi chân ái hoà quyện. Sự kết hợp hoàn hảo của trà đen nguyên lá đậm đà chuẩn gu, cùng lớp sữa thơm béo ngọt ngào đượm vị. Có sẵn trân châu trắng dai giòn cho phiên bản lạnh - để tăng thêm hứng khởi, vui miệng bớt lăn tăn.',
        sizes: [
          { size: 'Medium', additionalPrice: 0 },
          { size: 'Large', additionalPrice: 5000 },
        ],
        toppings: [
          { name: 'Trân châu trắng', additionalPrice: 10000 }
        ]
      }
    ]
  }
]

const numberToVND = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '₫';
}

export default class Menu extends Component {
  state = {
    activeCategory: ''
  }

  onCategoryClick = (category) => {
    this.setState({
      activeCategory: category
    })
  }

  render() {
    const categories = productGroupByCategories.map(p => p.category);
    const { activeCategory } = this.state;
    return (
      <Container className='container'>
        <Row>
          <Col sm={4}>
            <div className='cate-container'>
              <ul className='cate-ul'>
                {categories.map(c => (
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
                {productGroupByCategories.map(c => (
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
          {/* <Col sm={2} className='border'></Col> */}
        </Row>
      </Container>
    )
  }
}
