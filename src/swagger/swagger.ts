import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Shop',
      version: '1.0.0',
      description: 'welcome to shop, where send hand good has value'
    },
    paths: {
      // Users routes
      '/login': {
        post: {
          tags: ['User'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: {
                      type: 'string',
                      example: 'testemail@gmail.com'
                    },
                    password: {
                      type: 'string',
                      example: 'pass1234'
                    }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: 'User logged in successfully'
            }
          }
        }
      },

      '/register': {
        post: {
          tags: ['User'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string',
                      example: 'Test User'
                    },
                    email: {
                      type: 'string',
                      example: 'testemail@gmail.com'
                    },

                    password: {
                      type: 'string',
                      example: 'pass1234'
                    }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: 'User registered successfully'
            }
          }
        }
      },

      // '/users/reset/password/{email}/{password}': {
      //   put: {
      //     tags: ['User'],
      //     parameters: [
      //       {
      //         name: 'email',
      //         in: 'path',
      //         description: 'The user email',
      //         required: true,
      //         schema: {
      //           type: 'string',
      //           required: true,
      //           description: 'The user email'
      //         }
      //       },
      //       {
      //         name: 'password',
      //         in: 'path',
      //         description: 'The user password',
      //         required: true,
      //         schema: {
      //           type: 'string',
      //           required: true,
      //           description: 'The user password'
      //         }
      //       }
      //     ],
      //     responses: {
      //       200: {
      //         description: 'User password reset successfully'
      //       }
      //     }
      //   }
      // },

      // '/users/check/{email}': {
      //   get: {
      //     tags: ['User'],
      //     parameters: [
      //       {
      //         name: 'email',
      //         in: 'path',
      //         description: 'The user email',
      //         required: true,
      //         schema: {
      //           type: 'string',
      //           required: true,

      //           description: 'The user email'
      //         }
      //       }
      //     ],
      //     responses: {
      //       200: {
      //         description: 'User exists'
      //       }
      //     }
      //   }
      // },

      '/users/update/{id}': {
        put: {
          tags: ['User'],
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'The user id',
              required: true,
              schema: {
                type: 'string',
                required: true,
                description: 'The user id'
              }
            }
          ],
          requestBody: {
            required: false,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string',
                      example: 'Test User'
                    },
                    bio: {
                      type: 'string',
                      example: 'I am a software developer'
                    },
                    phone: {
                      type: 'string',
                      example: '44712345678'
                    },
                    profile_pic: {
                      type: 'string',
                      example: 'https://www.google.com'
                    },
                    cover_pic: {
                      type: 'string',
                      example: 'https://www.google.com'
                    },
                    location: {
                      type: 'string',
                      example: 'Coventry'
                    }
                  }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'User updated successfully'
          }
        }
      },

      '/users/followers/{id}': {
        get: {
          tags: ['User'],
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'The user id',
              required: true,
              schema: {
                type: 'string',
                required: true,
                description: 'The user id'
              }
            }
          ],
          responses: {
            200: {
              description: 'A list of followers'
            }
          }
        }
      },

      '/users/following/{id}': {
        get: {
          tags: ['User'],
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'The user id',
              required: true,
              schema: {
                type: 'string',
                required: true,
                description: 'The user id'
              }
            }
          ],
          responses: {
            200: {
              description: 'A list of followers'
            }
          }
        }
      },

      // '/users/verify/social/{email}': {
      //   put: {
      //     tags: ['User'],
      //     parameters: [
      //       {
      //         name: 'email',
      //         in: 'path',
      //         description: 'The user email',
      //         required: true,
      //         schema: {
      //           type: 'string',
      //           required: true,
      //           description: 'The user email'
      //         }
      //       }
      //     ],
      //     responses: {
      //       200: {
      //         description: 'User verified successfully'
      //       }
      //     }
      //   }
      // },

      // '/users/verify/{email}/{code}': {
      //   put: {
      //     tags: ['User'],
      //     parameters: [
      //       {
      //         name: 'code',
      //         in: 'path',
      //         description: 'The verification code',
      //         required: true,
      //         schema: {
      //           type: 'string',
      //           required: true,
      //           description: 'The verification code'
      //         }
      //       },
      //       {
      //         name: 'email',
      //         in: 'path',
      //         description: 'The user email',
      //         required: true,
      //         schema: {
      //           type: 'string',
      //           required: true,
      //           description: 'The user email'
      //         }
      //       }
      //     ],
      //     responses: {
      //       200: {
      //         description: 'User verified successfully'
      //       }
      //     }
      //   }
      // },

      // '/users/resend/code/{email}': {
      //   get: {
      //     tags: ['User'],
      //     parameters: [
      //       {
      //         name: 'email',
      //         in: 'path',
      //         description: 'The user email',
      //         required: true,
      //         schema: {
      //           type: 'string',
      //           required: true,
      //           description: 'The user email'
      //         }
      //       }
      //     ],
      //     responses: {
      //       200: {
      //         description: 'verification code sent successfully'
      //       }
      //     }
      //   }
      // },

      '/users': {
        get: {
          tags: ['User'],
          responses: {
            200: {
              description:
                'A list of users currently registered in the database'
            }
          }
        }
      },
      '/users/{id}': {
        get: {
          tags: ['User'],
          description: 'Get a user by id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'The user id',
              required: true,
              schema: {
                type: 'string',
                required: true,
                description: 'The user id'
              }
            }
          ],
          responses: {
            200: {
              description: "User's details"
            }
          }
        }
      },

      '/users/delete/{id}': {
        delete: {
          tags: ['User'],
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'The user id',
              required: true,
              schema: {
                type: 'string',
                required: true,
                description: 'The user id'
              }
            }
          ],
          responses: {
            200: {
              descrition: 'User deleted successfully'
            }
          }
        }
      },

      '/follow': {
        post: {
          tags: ['User'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    followerId: {
                      type: 'string',
                      example: '60f9b9b0b9b9b9b9b9b9b9b9'
                    },
                    followingId: {
                      type: 'string',
                      example: '60f9b9b0b9b9b9b9b9b9b9b9'
                    }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: 'User followed successfully'
            }
          }
        }
      },
      '/unfollow': {
        post: {
          tags: ['User'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    followerId: {
                      type: 'string',
                      example: '60f9b9b0b9b9b9b9b9b9b9b9'
                    },
                    followingId: {
                      type: 'string',
                      example: '60f9b9b0b9b9b9b9b9b9b9b9'
                    }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: 'User followed successfully'
            }
          }
        }
      },

      // Products routes
      '/product/send': {
        post: {
          tags: ['Product'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string',
                      example: 'Iphone 12'
                    },
                    
                    description: {
                      type: 'string',
                      example: 'Iphone 12 pro max'
                    },
                   
                    price: {
                      type: 'number',
                      example: '100000'
                    },
                    category: {
                      type: 'string',
                      enum: [
                        'ELECTRONICS',
                        'FASHION',
                        'HOME',
                        'HEALTH',
                        'SPORTS',
                        'BOOKS',
                        'BEAUTY',
                        'OTHERS'
                      ],
                      example: 'ELECTRONICS'
                    },
                    seller_id: {
                      type: 'string',
                      example: '1'
                    },
                    seller_name: {
                      type: 'string',
                      example: 'Test User'
                    },
                    seller_email: {
                      type: 'string',
                      example: 'testemail@gmail.com'
                    },
                    seller_phone: {
                      type: 'string',
                      example: '44712345678'
                    },
                    location: {
                      type: 'string',
                      example: 'Coventry'
                    },
                    quantity: {
                      type: 'number',
                      example: '1'
                    }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Product added successfully'
            }
          }
        }
      },

      '/product': {
        get: {
          tags: ['Product'],
          parameters:[
            {
              name: 'name',
              in: 'query',
              description: 'The product name',
              required: false,
              schema: {
                type: 'string',
                required: false,
                description: 'The product name'
              }
            },
            {
              name: 'price',
              in: 'query',
              description: 'The product price',
              required: false,
              schema: {
                type: 'number',
                required: false,
                description: 'The product price'
              }
            },
            {
              name: 'location',
              in: 'query',
              description: 'The product location',
              required: false,
              schema: {
                type: 'string',
                required: false,
                description: 'The product location'
              }
            },
          ],
          responses: {
            200: {
              description:
                'A list of products currently registered in the database'
            }
          }
        }
      },

      '/product/{id}': {
        get: {
          tags: ['Product'],
          description: 'Get a product by id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'The product id',
              required: true,
              schema: {
                type: 'string',
                required: true,
                description: 'The product id'
              }
            }
          ],
          responses: {
            200: {
              description: "Product's details"
            }
          }
        }
      },

      '/product/user/{id}': {
        get: {
          tags: ['Product'],
          description: 'Get a product by user id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'The user id',
              required: true,
              schema: {
                type: 'string',
                required: true,
                description: 'The user id'
              }
            }
          ],
          responses: {
            200: {
              description: "Product's details"
            }
          }
        }
      },

      '/product/update/{id}': {
        put: {
          tags: ['Product'],
          description: 'Update a product by id',
          requestBody: {
            required: false,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string',
                      example: 'Iphone 12'
                    },
                    description: {
                      type: 'string',
                      example: 'Iphone 12 pro max'
                    },
                    price: {
                      type: 'number',
                      example: '100000'
                    },
                    category: {
                      type: 'string',
                      enum: [
                        'ELECTRONICS',
                        'FASHION',
                        'HOME',
                        'HEALTH',
                        'SPORTS',
                        'BOOKS',
                        'BEAUTY',
                        'OTHERS'
                      ],
                      example: 'ELECTRONICS'
                    },
                    seller_id: {
                      type: 'string',
                      example: '1'
                    },
                    seller_name: {
                      type: 'string',
                      example: 'Test User'
                    },
                    seller_email: {
                      type: 'string',
                      example: 'emili0113Muhoro@gmail.com'
                    },
                    seller_phone: {
                      type: 'string',
                      example: '44712345678'
                    },
                    location: {
                      type: 'string',
                      example: 'Coventry'
                    },
                    quantity: {
                      type: 'number',
                      example: '1'
                    }
                  }
                }
              }
            }
          },
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'The product id',
              required: true,
              schema: {
                type: 'string',
                required: true,
                description: 'The product id'
              }
            }
          ],
          responses: {
            200: {}
          }
        }
      },

      '/product/delete/{id}': {
        delete: {
          tags: ['Product'],
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'The product id',
              required: true,
              schema: {
                type: 'string',
                required: true,
                description: 'The product id'
              }
            }
          ],
          responses: {
            200: {
              descrition: 'Product deleted successfully'
            }
          }
        }
      },

      '/product/user/delete/{id}': {
        delete: {
          tags: ['Product'],
          description: 'Delete all products by user',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'The user id',
              required: true,
              schema: {
                type: 'string',
                required: true,
                description: 'The user id'
              }
            }
          ],
          responses: {
            200: {
              descrition: 'user products deleted successfully'
            }
          }
        }
      },

      '/product/category/{category}': {
        get: {
          tags: ['Product'],
          parameters: [
            {
              name: 'category',
              in: 'path',
              description: 'The product category',
              required: true,
              schema: {
                type: 'string',
                required: true,
                enum: [
                  'ELECTRONICS',
                  'FASHION',
                  'HOME',
                  'HEALTH',
                  'SPORTS',
                  'BOOKS',
                  'BEAUTY',
                  'OTHERS'
                ],
                description: 'The product category'
              }
            }
          ],
          responses: {
            200: {
              description: "Product's details"
            }
          }
        }
      },

      '/product/add/favourite': {
        post: {
          tags: ['Product'],
          description: 'Add a product to favourite',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    buyer_id: {
                      type: 'string',
                      example: '1'
                    },
                    product_id: {
                      type: 'string',
                      example: '1'
                    }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Product added to favourite successfully'
            }
          }
        }
      },

      '/product/fetch/favourite/{id}': {
        get: {
          tags: ['Product'],
          description: 'Get all products in favourite',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'The user id',
              required: true,
              schema: {
                type: 'string',
                required: true,
                description: 'The user id'
              }
            }
          ],
          responses: {
            200: {
              description: 'All products in favourite'
            }
          }
        }
      },

      '/product/delete/favourite/{id}': {
        delete: {
          tags: ['Product'],
          description: 'Delete a product from favourite',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'The product id',
              required: true,
              schema: {
                type: 'string',
                required: true,
                description: 'The product id'
              }
            }
          ],
          responses: {
            200: {
              description: 'Product deleted from favourite successfully'
            },
            404: {
              description: 'Product not found'
            }
          }
        }
      },

      //review routes

      // '/review/send': {
      //   post: {
      //     tags: ['Review'],
      //     requestBody: {
      //       required: true,
      //       content: {
      //         'application/json': {
      //           schema: {
      //             type: 'object',
      //             properties: {
      //               sender_name: {
      //                 type: 'string',
      //                 example: 'Test User'
      //               },
      //               sender_image: {
      //                 type: 'string',
      //                 example: 'https://res.cloudinary.com/dzcmadjl1/i'
      //               },
      //               sender_email: {
      //                 type: 'string',
      //                 example: 'testemail@gmail.com'
      //               },
      //               user_id: {
      //                 type: 'string',
      //                 example: '1'
      //               },
      //               rating: {
      //                 type: 'number',
      //                 example: 5
      //               },
      //               comment: {
      //                 type: 'string',
      //                 example: 'Nice product'
      //               }
      //             }
      //           }
      //         }
      //       }
      //     },
      //     responses: {
      //       200: {
      //         description: 'Review added successfully'
      //       }
      //     }
      //   }
      // },

      // '/review/user/{id}': {
      //   get: {
      //     tags: ['Review'],
      //     description: 'Get a review by product id',
      //     parameters: [
      //       {
      //         name: 'id',
      //         in: 'path',
      //         description: 'The user id',
      //         required: true,
      //         schema: {
      //           type: 'string',
      //           required: true,
      //           description: 'The user id'
      //         }
      //       }
      //     ],
      //     responses: {
      //       200: {
      //         description: 'User reviews'
      //       }
      //     }
      //   }
      // },

      // '/review/user/update/{id}': {
      //   put: {
      //     tags: ['Review'],
      //     description: 'Update a review by id',
      //     requestBody: {
      //       required: false,
      //       content: {
      //         'application/json': {
      //           schema: {
      //             type: 'object',
      //             properties: {
      //               comment: {
      //                 type: 'string',
      //                 example: 'This is a nice product'
      //               },
      //               rating: {
      //                 type: 'number',
      //                 example: 5
      //               },
      //               user_id: {
      //                 type: 'string',
      //                 example: '1'
      //               }
      //             }
      //           }
      //         }
      //       }
      //     },
      //     parameters: [
      //       {
      //         name: 'id',
      //         in: 'path',
      //         description: 'The review id',
      //         required: true,
      //         schema: {
      //           type: 'string',
      //           required: true,
      //           description: 'The review id'
      //         }
      //       }
      //     ],
      //     responses: {
      //       200: {
      //         description: 'Review updated successfully'
      //       }
      //     }
      //   }
      // },

      // '/review/usella/send': {
      //   post: {
      //     tags: ['Review'],
      //     description: 'Send a review to a usella founders',
      //     requestBody: {
      //       required: true,
      //       content: {
      //         'application/json': {
      //           schema: {
      //             type: 'object',
      //             properties: {
      //               comment: {
      //                 type: 'string',
      //                 example: 'Nice product'
      //               },
      //               rating: {
      //                 type: 'number',
      //                 example: 5
      //               }
      //             }
      //           }
      //         }
      //       }
      //     }
      //   }
      // },

      // '/review/usella/delete/{id}': {
      //   delete: {
      //     tags: ['Review'],
      //     description: 'Delete a review by user id',
      //     parameters: [
      //       {
      //         name: 'id',
      //         in: 'path',
      //         description: 'The user id',
      //         required: true,
      //         schema: {
      //           type: 'string',
      //           required: true,
      //           description: 'The user id'
      //         }
      //       }
      //     ],
      //     responses: {
      //       200: {
      //         description: 'Review deleted successfully'
      //       },
      //       404: {
      //         description: 'Review not found'
      //       }
      //     }
      //   }
      // },

      // '/review/usella': {
      //   get: {
      //     tags: ['Review'],
      //     description: 'Get all reviews',
      //     responses: {
      //       200: {
      //         description: 'All reviews'
      //       }
      //     }
      //   }
      // },

      //order routes

      '/order/add/cart': {
        post: {
          tags: ['Order'],
          description: 'Add a product to cart',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    buyer_id: {
                      type: 'string',
                      example: '1'
                    },
                    product_id: {
                      type: 'string',
                      example: '1'
                    }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Product added to cart successfully'
            }
          }
        }
      },

      '/order/fetch/cart/{id}': {
        get: {
          tags: ['Order'],
          description: 'Get all products in cart',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'The user id',
              required: true,
              schema: {
                type: 'string',
                required: true,
                description: 'The user id'
              }
            }
          ],
          responses: {
            200: {
              description: 'All products in cart'
            }
          }
        }
      },

      '/order/delete/cart/{id}': {
        delete: {
          tags: ['Order'],
          description: 'Delete a product from cart',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'The product id',
              required: true,
              schema: {
                type: 'string',
                required: true,
                description: 'The product id'
              }
            }
          ],
          responses: {
            200: {
              description: 'Product deleted from cart successfully'
            },
            404: {
              description: 'Product not found'
            }
          }
        }
      },

      '/order': {
        get: {
          tags: ['Order'],
          description: 'Get all orders',
          responses: {
            200: {
              description: 'All orders'
            }
          }
        }
      },

      '/order/create': {
        post: {
          tags: ['Order'],
          description: 'create an order',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    buyer_id: {
                      type: 'string',
                      example: '1'
                    },
                    buyer_email: {
                      type: 'string',
                      example: 'testemail@gmail.com'
                    },
                    buyer_name: {
                      type: 'string',
                      example: 'Test User'
                    },
                    product_id: {
                      type: 'string',
                      example: '1'
                    },
                    quantity: {
                      type: 'number',
                      example: 1
                    },
                    location: {
                      type: 'string',
                      example: 'Coventry'
                    }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Order created successfully'
            }
          }
        }
      },

      '/order/{id}': {
        get: {
          tags: ['Order'],
          description: 'Get an order by id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'The order id',
              required: true,
              schema: {
                type: 'string',
                required: true,
                description: 'The order id'
              }
            }
          ],
          responses: {
            200: {
              description: 'Order details'
            }
          }
        }
      },

      '/order/user/{id}': {
        get: {
          tags: ['Order'],
          description: 'Get an order by user id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'The user id',
              required: true,
              schema: {
                type: 'string',
                description: 'The user id'
              }
            }
          ],
          responses: {
            200: {
              description: 'Order details'
            }
          }
        }
      },

      '/order/seller/{id}': {
        get: {
          tags: ['Order'],
          description: 'Get an order by user id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'The user id',
              required: true,
              schema: {
                type: 'string',
                description: 'The user id'
              }
            }
          ],
          responses: {
            200: {
              description: 'Order details'
            }
          }
        }
      },

      '/order/cancel/{id}': {
        delete: {
          tags: ['Order'],
          description: 'Cancel your Order',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'The order id',
              required: true,
              schema: {
                type: 'string',
                description: 'The order id'
              }
            }
          ],
          responses: {
            200: {
              description: 'Order cancelled successfully'
            },
            500: {
              description: 'Order has not been cancelled'
            }
          }
        }
      },
      '/order/confirm/{id}/{seller}': {
        put: {
          tags: ['Order'],
          description: 'Confirm an order',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'The order id',
              required: true,
              schema: {
                type: 'string',
                description: 'The order id'
              }
            },
            {
              name: 'seller',
              in: 'path',
              description: 'The seller id',
              required: true,
              schema: {
                type: 'string',
                description: 'The seller id'
              }
            }
          ],
          responses: {
            200: {
              description: 'Order confirmed successfully'
            },
            500: {
              description: 'Order has not been confirmed'
            }
          }
        }
      },
      '/order/reject/{id}/{seller}': {
        put: {
          tags: ['Order'],
          description: 'Confirm an order',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'The order id',
              required: true,
              schema: {
                type: 'string',
                description: 'The order id'
              }
            },
            {
              name: 'seller',
              in: 'path',
              description: 'The seller id',
              required: true,
              schema: {
                type: 'string',
                description: 'The seller id'
              }
            }
          ],
          responses: {
            200: {
              description: 'Order confirmed successfully'
            },
            500: {
              description: 'Order has not been confirmed'
            }
          }
        }
      },

      '/order/pay/{amount}/{id}': {
        post: {
          tags: ['Order'],
          description: 'Pay for an order',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    phone: {
                      type: 'string',
                      example: '796250443'
                    },
                    
                  }
                }
              }
            }
          },
          parameters: [
            {
              in: 'header',
              name: 'Authorization',
              type: String,
              description: "The access token",
              required: true,
              schema: {
                type: 'string',
                description: "The access token",
                format: "Bearer {token}"
              }
            },
            {
              name: 'amount',
              in: 'path',
              description: "The order's amount",
              required: true,
              schema: {
                type: 'number',
                description: "The order's amount"
              }
            },
            {
              name: 'id',
              in: 'path',
              description: 'The order id',
              required: true,
              schema: {
                type: 'string',
                description: 'The order id'
              }
            }
          ],
          responses: {
            200: {
              description: 'payment made successfully'
            },
            500: {
              description: 'payment has not been made'
            }
          }
        }
      },

      '/order/complete/{id}': {
        put: {
          tags: ['Order'],
          description: 'Complete an order',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'The order id',
              required: true,
              schema: {
                type: 'string',
                description: 'The order id'
              }
            }
          ],
          responses: {
            200: {
              description: 'Order completed successfully'
            },
            500: {
              description: 'Order has not been completed'
            }
          }
        }
      },

      '/order/history/{id}': {
        get: {
          tags: ['Order'],
          description: 'Get all orders by user id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'The user id',
              required: true,
              schema: {
                type: 'string',
                description: 'The user id'
              }
            }
          ],
          responses: {
            200: {
              description: 'All orders'
            }
          }
        }
      },

      // '/mpesa/token': {
      //   get: {
      //     tags: ['Mpesa'],
      //     description: 'Get Mpesa token',
      //     responses: {
      //       200: {
      //         description: 'Mpesa token'
      //       },
      //     }
      //   }
      // },

      // '/mpesa/pay' : {
      //   post: {
      //     tags: ['Mpesa'],
      //     description: 'Pay for an order',
      //     parameters: [
      //       {
      //         name: 'amount',
      //         in: 'query',
      //         description: "The order's amount",
      //         required: true,
      //         schema: {
      //           type: 'amount',
      //           description: "The order's amount"
      //         },
      //       },
      //       { 
      //         name: 'phone',
      //         in: 'query',
      //         description: "The user's phone number",
      //         required: true,
      //         schema: {
      //           type: 'phone',
      //           description: "The user's phone number"
      //         },
      //       },
      //       {



        // }
      // }
    }
  },
  apis: ['./src/**/*.ts']
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
