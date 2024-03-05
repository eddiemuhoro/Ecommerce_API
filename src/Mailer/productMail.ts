import nodemailer from 'nodemailer';

export const productPostedEmail = async (
  userEmail: string,
  userName: string,
  productName: string,
  productImage: string
) => {
  // Create a transporter object using SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.email,
      pass: process.env.password
    }
  });

  // Define the email options
  const mailOptions = {
    from: `Usella Mail ${process.env.email}`,
    to: userEmail,
    subject: 'Product posted successfully',
    html: `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    
    <body style="display: flex; align-items: center; justify-content: center">
        <div style="width: 600px ;max-width: 800px; border: solid; border-width: 1px; border-color: grey; padding: 15px; ">
            <div style="display: flex; align-items: center;flex-direction: column;">
                <img src="https://firebasestorage.googleapis.com/v0/b/apt-rite-346310.appspot.com/o/about02-removebg-preview.png?alt=media&token=f464f698-cfe6-4940-bc24-f6737c7b1a9b"
                    alt="Usella Logo" style="width: 150px; height: 100px;">
                <h3 style="font-size:30px; margin-top: 0px;">Usella</h3>
            </div>
            <hr style="border: solid grey 0.5px; margin: 0px; margin-bottom: 10px;">
            <div>
                <h5 style="font-weight:normal; font-size: 18px;">Hi ${userName},</h5>
                <h5 style="font-weight:normal; font-size: 16px;margin-bottom: 8px; margin-top: 0px;">Thank you for trusting Usella to find your customer</h5>
            <h5 style="font-weight:normal; font-size: 16px; margin-bottom: 8pxpx; margin-top: 0px;">Your product <span
                        style="font-weight: bold;">${productName}</span>
                    has been added
                    successfully to the Usella website </h5>
    
                <h5 style="font-weight:normal; font-size: 16px;">You can now start receiving offers from our customers as
                    soon
                    as possible and you will receive a notification once the item(s) have been ordered.</h5>
    
                <div style="display: flex; align-items: center; border: solid grey 1px; ">
                    <img src= ${productImage}
                        alt="Usella Logo" style="width: 35%; height: 100px; object-fit: cover;">
                    <div style="margin-left: 15px; display:flex ; align-items:center">
                        <h5 style="font-weight:bold; margin: 0px; margin-bottom: 4px; font-size: 14px;">${productName}</h5>
                        <h5
                            style="font-weight:normal;  margin: 0px;font-size: 14px;margin-bottom: 10px ;letter-spacing: 0.4px">
                            This is an iphone product used but no scratches on the screen and it comes unlocked</h5>
                        <h5
                            style="font-weight:medium; font-family: 'Times New Roman', Times, serif; margin: 0px;font-size: 13px; letter-spacing: 1px;">
                            <span style="font-weight: bold;">KSH</span> 1342
                        </h5>
                    </div>
                </div>
                <h5 style="font-weight:normal; font-size: 16px;">If you would like to know more, please visity our <a
                        href="www.google.com">help Center</a></h5>
                <h5 style="font-weight:normal; font-size: 16px;">Please don’t forget to review Usella, which is providing
                    this awesome services! You can also encourage them through our <a
                        href="https://twitter.com/EG_Kariuki">Twitter</a> page using the #Usella
                    flag. Stay safe & stay healthy.</h5>
                <img style="width:600px"
                    src="https://firebasestorage.googleapis.com/v0/b/apt-rite-346310.appspot.com/o/unnamed.png?alt=media&token=6f0bcfeb-f69c-4441-a404-e4abb1c3616c">
                <h5 style="font-weight:normal; font-size: 16px; margin-bottom: 0px;">Happy Shopping!</a></h5>
                <h5 style="font-weight:normal; font-size: 16px; margin-top: 8px; margin-bottom: 5px;">Warm Regards,</a></h5>
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/apt-rite-346310.appspot.com/o/unnamed(2).png?alt=media&token=9514f497-0e09-467c-8e9f-58bc6d830b1e">
                <h5 style="font-weight:normal; font-size: 16px; margin-bottom: 0px;margin-top: 8px;">Usella Kenya Team</a>
                </h5>
            </div>
        </div>
    </body>
    
    </html>`
  };

  // Send the email
  try {
    const sent = await transporter.sendMail(mailOptions);
    if (!sent) {
      throw new Error('Email could not be sent');
    }

    console.log('Email sent');
  } catch (e: any) {
    throw new Error(e.message);
  }
};

// verify email
export const verifyEmail = async (
  userEmail: string,
  userName: string,
  code: string
) => {
  // Create a transporter object using SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.email,
      pass: process.env.password
    }
  });

  // Define the email options
  const mailOptions = {
    from: `Usella  ${process.env.email}`,
    to: userEmail,
    subject: 'Verify your Usella Account',
    html: `<!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
      
          <style>
              #myButton {
                  background-color: orange;
                  height: 50px;
                  width: 140px;
                  border: none;
                  border-radius: 20px;
                  color: white;
              }
      
              #myButton.loading {
                  background-color: grey;
                  color: black;
                  cursor: wait;
              }
      
              #myButton.verified {
                  background-color: green;
                  color: white;
                  cursor: default;
              }
      
              #myButton.failed {
                  background-color: red;
                  color: white;
                  cursor: default;
              }
          </style>
      
          
      </head>
      
      <body style="display: flex; align-items: center; justify-content: center">
          <div style="width: 600px ;max-width: 800px; border: solid; border-width: 1px; border-color: grey; padding: 15px; ">
              <div style="display: flex; align-items: center;flex-direction: column;">
                  <img src="https://firebasestorage.googleapis.com/v0/b/apt-rite-346310.appspot.com/o/about02-removebg-preview.png?alt=media&token=f464f698-cfe6-4940-bc24-f6737c7b1a9b"
                      alt="Usella Logo" style="width: 150px; height: 100px;">
              </div>
              <hr style="border: solid grey 0.5px; margin: 0px; margin-bottom: 10px;">
              <div>
                  <h5 style="font-weight:normal; font-size: 18px;">Hi ${userName},</h5>
                  <h5 style="font-weight:normal; font-size: 16px;margin-bottom: 8px; margin-top: 0px;">Thank you for creating
                      an account with <span style="font-size: 20px;font-weight: bold;">Usella</span></h5>
                  
                      <h5 style="font-weight:normal; font-size: 16px; margin-bottom: 8pxpx;">Your verification code is: <span style="font-weight: bold">${code}</span></h5>
                  <h5 style="font-weight:normal; font-size: 16px;">If you would like to know more, please visity our <a
                          href="www.google.com">help Center</a></h5>
      
                  <h5 style="font-weight:normal; font-size: 16px;">Please don’t forget to review Usella, which is providing
                      this awesome services! You can also encourage them through our <a
                          href="https://twitter.com/EG_Kariuki">Twitter</a> page using the #Usella
                      flag. Stay safe & stay healthy.</h5>
                  <img style="width:600px"
                      src="https://firebasestorage.googleapis.com/v0/b/apt-rite-346310.appspot.com/o/unnamed.png?alt=media&token=6f0bcfeb-f69c-4441-a404-e4abb1c3616c">
                  <h5 style="font-weight:normal; font-size: 16px; margin-bottom: 0px;">Happy Shopping!</a></h5>
                  <h5 style="font-weight:normal; font-size: 16px; margin-top: 8px; margin-bottom: 5px;">Warm Regards,</a></h5>
                  <img
                      src="https://firebasestorage.googleapis.com/v0/b/apt-rite-346310.appspot.com/o/unnamed(2).png?alt=media&token=9514f497-0e09-467c-8e9f-58bc6d830b1e">
                  <h5 style="font-weight:normal; font-size: 16px; margin-bottom: 0px;margin-top: 8px;">Usella Kenya Team</a>
                  </h5>
      
              </div>
      
      
          </div>
        
      
      
      
      </body>
      
      </html>`
  };

  // Send the email
  try {
    const sent = await transporter.sendMail(mailOptions);
    if (!sent) {
      throw new Error('Email could not be sent');
    }

    console.log('Email sent');
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const orderCreatedEmail = async (
  buyerEmail: string,
  orderNumber: string,
  buyerName: string,
  productName: string,
  productPrice: number,
  productDescription: string,
  productImage: string
) => {
  // Create a transporter object using SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.email,
      pass: process.env.password
    }
  });

  // Define the email options
  const mailOptions = {
    from: `Usella  ${process.env.email}`,
    to: buyerEmail,
    subject: `Your User Order ${orderNumber} has been created`,
    html: `<!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
              integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
          <!-- FontAwesome 4.7.0 CDN -->
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"
              integrity="sha512-5A8nwdMOWrSz20fDsjczgUidUBR8liPYU+WymTZP1lmY9G6Oc7HlZv156XqnsgNUzTyMefFTcsFH/tnJE/+xBg=="
              crossorigin="anonymous" referrerpolicy="no-referrer" />
      
          <style>
          .card {
            z-index: 0;
            background-color: #eceff1;
            padding-bottom: 10px;
            padding-top: 10px;
            margin-top: 10px;
            margin-bottom: 10px;
            border-radius: 10px;
        }
      
              .top {
                  padding-top: 0px;
                  padding-left: 13% !important;
                  padding-right: 13% !important;
              }
      
              /* Icon progressbar */
      
              #progressbar {
                  margin-bottom: 30px;
                  overflow: hidden;
                  color: #455a64;
                  padding-left: 0;
                  margin-top: 30px;
              }
      
              #progressbar li {
                  list-style-type: none;
                  font-size: 13px;
                  width: 25%;
                  float: left;
                  position: relative;
                  font-weight: 400;
              }
      
              #progressbar .step0::before {
                  font-family: FontAwesome;
                  content: '\f10c';
                  color: #fff;
              }
      
              #progressbar li::before {
                  width: 40px;
                  height: 40px;
                  line-height: 45px;
                  display: block;
                  font-size: 20px;
                  background: #c5cae9;
                  border-radius: 50%;
                  margin: auto;
                  padding: 0;
              }
      
              /* Progressbar connector */
              #progressbar li::after {
                  content: '';
                  width: 100%;
                  height: 12px;
                  background-color: #c5cae9;
                  position: absolute;
                  top: 16px;
                  left: 0;
                  z-index: -1;
              }
      
              #progressbar li:last-child::after {
                  border-top-right-radius: 10px;
                  border-bottom-right-radius: 10px;
                  position: absolute;
                  left: -50%;
              }
      
              #progressbar li:nth-child(2)::after,
              #progressbar li:nth-child(3)::after {
                  left: -50%;
              }
      
              #progressbar li:first-child::after {
                  border-top-left-radius: 10px;
                  border-bottom-right-radius: 10px;
                  position: absolute;
                  left: 50%;
              }
      
              /* Color number of the step and the connect tor before it */
      
              #progressbar li.active::before,
              #progressbar li.active::after {
                  background-color: #651fff;
              }
      
              #progressbar li.active::before {
                  font-family: FontAwesome;
                  content: '\f00c';
              }
      
              .icon {
                  width: 60px;
                  height: 60px;
                  margin-right: 15px;
              }
      
              .icon-content {
                  padding-bottom: 20px;
              }
      
              @media screen and (max-width: 992px) {
                  .icon-content {
                      width: 50%;
                  }
              }
          </style>
      
      
      
      
      </head>
      
      <body style="display: flex; align-items: center; justify-content: center">
          <div style="width: 800px ;max-width: 800px; border: solid; border-width: 1px; border-color: grey; padding: 15px; ">
              <div style="display: flex; align-items: center;flex-direction: column;">
                  <img src="https://firebasestorage.googleapis.com/v0/b/apt-rite-346310.appspot.com/o/about02-removebg-preview.png?alt=media&token=f464f698-cfe6-4940-bc24-f6737c7b1a9b"
                      alt="Usella Logo" style="width: 150px; height: 100px;">
                  <h3 style="font-size:30px; margin-top: 0px;">Usella</h3>
              </div>
              <hr style="border: solid grey 0.5px; margin: 0px; margin-bottom: 10px;">
              <div>
                  <h5 style="font-weight:normal; font-size: 18px;">Hi ${buyerName},</h5>
                  <h5 style="font-weight:normal; font-size: 16px;margin-bottom: 8px; margin-top: 0px;">Thank you for shopping
                      on Usella! Your Order <span style="font-weight: bold;">3224452</span>
                      has been added
                      successfully created</h5>
                  <div class="container px-1 px-md-4 py-5 mx-auto">
                      <div class="card">
                          <div class="row d-flex justify-content-between px-3 top">
                              <div class="d-flex">
                                  <h5>
                                      ORDER
                                      <span class="text-primary font-weight-bold">${orderNumber}</span>
                                  </h5>
                              </div>
      
                          </div>
                          <!-- Add class "active" to progress -->
                          <div class="row d-flex justify-content-center">
                              <div class="col-12">
                                  <ul id="progressbar" class="text-center">
                                      <li class="active step0"></li>
                                      <li class=" step0"></li>
                                      <li class="step0"></li>
                                      <li class="step0"></li>
                                  </ul>
                              </div>
                          </div>
                          <div class="row justify-content-between top">
                              <div class="row d-flex icon-content">
      
                                  <div class="d-flex flex-column">
                                      <p class="font-weight-bold">Order <br />Created</p>
                                  </div>
                              </div>
                              <div class="row d-flex icon-content">
      
                                  <div class="d-flex flex-column">
                                      <p class="font-weight-bold">Order <br />Confirmed</p>
                                  </div>
                              </div>
                              <div class="row d-flex icon-content">
      
                                  <div class="d-flex flex-column">
                                      <p class="font-weight-bold">Order <br />Delivered</p>
                                  </div>
                              </div>
                              <div class="row d-flex icon-content">
      
                                  <div class="d-flex flex-column">
                                      <p class="font-weight-bold">Order <br />Completed</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
      
      
      
                  <h5 style="font-weight:normal; font-size: 16px; margin-top: 0px;">We will notify you once the seller
                      confirms the order.</h5>
      
                  <div style="display: flex; align-items: center; border: solid grey 1px; ">
                      <img src=${productImage} alt="Usella Logo" style="width: 35%; height: 200px; object-fit: cover;">
                      <div>
                          <h5 style="font-weight:bold; margin: 0px; margin-bottom: 4px; font-size: 14px;">${productName}</h5>
                          <h5
                              style="font-weight:normal;  margin: 0px;font-size: 14px;margin-bottom: 10px ;letter-spacing: 0.4px">
                              ${productDescription}</h5>
                          <h5
                              style="font-weight:medium; font-family: 'Times New Roman', Times, serif; margin: 0px;font-size: 13px; letter-spacing: 1px;">
                              <span style="font-weight: bold;">KSH</span> ${productPrice}
                          </h5>
                      </div>
                  </div>
      
                  <h5 style="font-weight:normal; font-size: 16px;">If you would like to know more, please visity our <a
                          href="www.google.com">help Center</a></h5>
      
                  <h5 style="font-weight:normal; font-size: 16px;">Please don’t forget to review Usella, which is providing
                      this awesome services! You can also encourage them through our <a
                          href="https://twitter.com/EG_Kariuki">Twitter</a> page using the #Usella
                      flag. Stay safe & stay healthy.</h5>
                  <img style="width:600px"
                      src="https://firebasestorage.googleapis.com/v0/b/apt-rite-346310.appspot.com/o/unnamed.png?alt=media&token=6f0bcfeb-f69c-4441-a404-e4abb1c3616c">
                  <h5 style="font-weight:normal; font-size: 16px; margin-bottom: 0px;">Happy Shopping!</a></h5>
                  <h5 style="font-weight:normal; font-size: 16px; margin-top: 8px; margin-bottom: 5px;">Warm Regards,</a></h5>
                  <img
                      src="https://firebasestorage.googleapis.com/v0/b/apt-rite-346310.appspot.com/o/unnamed(2).png?alt=media&token=9514f497-0e09-467c-8e9f-58bc6d830b1e">
                  <h5 style="font-weight:normal; font-size: 16px; margin-bottom: 0px;margin-top: 8px;">Usella Kenya Team</a>
                  </h5>
      
              </div>
      
      
          </div>
      
      
      
      </body>
      
      </html>`
  };

  // Send the email
  try {
    const sent = await transporter.sendMail(mailOptions);
    if (!sent) {
      throw new Error('Email could not be sent');
    }

    console.log('Email sent');
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const orderConfirmEmail = async (
  sellerEmail: string,
  orderNumber: string,
  sellerName: string,
  productName: string,
  productPrice: number,
  productDescription: string,
  productImage: string
) => {
  // Create a transporter object using SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.email,
      pass: process.env.password
    }
  });

  // Define the email options
  const mailOptions = {
    from: `Usella  ${process.env.email}`,
    to: sellerEmail,
    subject: `Please confirm this order ${orderNumber}`,
    html: `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
        <!-- FontAwesome 4.7.0 CDN -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"
            integrity="sha512-5A8nwdMOWrSz20fDsjczgUidUBR8liPYU+WymTZP1lmY9G6Oc7HlZv156XqnsgNUzTyMefFTcsFH/tnJE/+xBg=="
            crossorigin="anonymous" referrerpolicy="no-referrer" />
    
    
    </head>
    
    <body style="display: flex; align-items: center; justify-content: center">
        <div style="width: 800px ;max-width: 800px; border: solid; border-width: 1px; border-color: grey; padding: 15px; ">
            <div style="display: flex; align-items: center;flex-direction: column;">
                <img src="https://firebasestorage.googleapis.com/v0/b/apt-rite-346310.appspot.com/o/about02-removebg-preview.png?alt=media&token=f464f698-cfe6-4940-bc24-f6737c7b1a9b"
                    alt="Usella Logo" style="width: 150px; height: 100px;">
                <h3 style="font-size:30px; margin-top: 0px;">Usella</h3>
            </div>
            <hr style="border: solid grey 0.5px; margin: 0px; margin-bottom: 10px;">
            <div>
                <h5 style="font-weight:normal; font-size: 18px;">Hi ${sellerName},</h5>
                <h5 style="font-weight:normal; font-size: 16px;margin-bottom: 8px; margin-top: 0px;">Thank you for using
                    on Usella! Confirm Order <span style="font-weight: bold;">3224452</span>
                    that has been created</h5>
             
                <h5 style="font-weight:normal; font-size: 16px; margin-top: 0px;">The buyer await your confirmation.</h5>
    
                <div style="display: flex; align-items: center; border: solid grey 1px; ">
                    <img src=${productImage} alt="Usella Logo" style="width: 35%; height: 200px; object-fit: cover;">
                    <div>
                        <h5 style="font-weight:bold; margin: 0px; margin-bottom: 4px; font-size: 14px;">${productName}</h5>
                        <h5
                            style="font-weight:normal;  margin: 0px;font-size: 14px;margin-bottom: 10px ;letter-spacing: 0.4px">
                            ${productDescription}</h5>
                        <h5
                            style="font-weight:medium; font-family: 'Times New Roman', Times, serif; margin: 0px;font-size: 13px; letter-spacing: 1px;">
                            <span style="font-weight: bold;">KSH</span> ${productPrice}
                        </h5>
                    </div>
                </div>
    
                <h5 style="font-weight:normal; font-size: 16px;">If you would like to know more, please visity our <a
                        href="www.google.com">help Center</a></h5>
    
                <h5 style="font-weight:normal; font-size: 16px;">Please don’t forget to review Usella, which is providing
                    this awesome services! You can also encourage them through our <a
                        href="https://twitter.com/EG_Kariuki">Twitter</a> page using the #Usella
                    flag. Stay safe & stay healthy.</h5>
                <img style="width:600px"
                    src="https://firebasestorage.googleapis.com/v0/b/apt-rite-346310.appspot.com/o/unnamed.png?alt=media&token=6f0bcfeb-f69c-4441-a404-e4abb1c3616c">
                <h5 style="font-weight:normal; font-size: 16px; margin-bottom: 0px;">Happy Shopping!</a></h5>
                <h5 style="font-weight:normal; font-size: 16px; margin-top: 8px; margin-bottom: 5px;">Warm Regards,</a></h5>
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/apt-rite-346310.appspot.com/o/unnamed(2).png?alt=media&token=9514f497-0e09-467c-8e9f-58bc6d830b1e">
                <h5 style="font-weight:normal; font-size: 16px; margin-bottom: 0px;margin-top: 8px;">Usella Kenya Team</a>
                </h5>
    
            </div>
    
    
        </div>
    
    
    
    </body>
    
    </html>`
  };

  // Send the email
  try {
    const sent = await transporter.sendMail(mailOptions);
    if (!sent) {
      throw new Error('Email could not be sent');
    }

    console.log('Email sent');
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const orderDeliveredEmail = async (
  buyerEmail: string,
  orderNumber: string,
  buyerName: string,
  productName: string,
  productPrice: number,
  productDescription: string,
  productImage: string
) => {
  // Create a transporter object using SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.email,
      pass: process.env.password
    }
  });

  // Define the email options
  const mailOptions = {
    from: `Usella  ${process.env.email}`,
    to: buyerEmail,
    subject: `Your User Order ${orderNumber} has been completed`,
    html: `<!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
              integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
          <!-- FontAwesome 4.7.0 CDN -->
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"
              integrity="sha512-5A8nwdMOWrSz20fDsjczgUidUBR8liPYU+WymTZP1lmY9G6Oc7HlZv156XqnsgNUzTyMefFTcsFH/tnJE/+xBg=="
              crossorigin="anonymous" referrerpolicy="no-referrer" />
      
      
      
      
      
      
      </head>
      
      <body style="display: flex; align-items: center; justify-content: center">
          <div style="width: 800px ;max-width: 800px; border: solid; border-width: 1px; border-color: grey; padding: 15px; ">
              <div style="display: flex; align-items: center;flex-direction: column;">
                  <img src="https://firebasestorage.googleapis.com/v0/b/apt-rite-346310.appspot.com/o/about02-removebg-preview.png?alt=media&token=f464f698-cfe6-4940-bc24-f6737c7b1a9b"
                      alt="Usella Logo" style="width: 150px; height: 100px;">
                  <h3 style="font-size:30px; margin-top: 0px;">Usella</h3>
              </div>
              <hr style="border: solid grey 0.5px; margin: 0px; margin-bottom: 10px;">
              <div>
                  <h5 style="font-weight:normal; font-size: 18px;">Hi ${buyerName},</h5>
                  <h5 style="font-weight:normal; font-size: 16px;margin-bottom: 8px; margin-top: 0px;">Thank you for shopping
                      on Usella! Your Order <span style="font-weight: bold;">3224452</span>
                      has been delivered successfully</h5>
                 
      
      
      
                  <h5 style="font-weight:normal; font-size: 16px; margin-top: 0px;">Create your next order in the <a href="https://seller-ten.vercel.app/" >Usella website</a> app
                  <div style="display: flex; align-items: center; border: solid grey 1px; margin-top: 10px; ">
                      <img src=${productImage} alt="Usella Logo" style="width: 30%; height: 100px; object-fit: cover;">
                      <div style="padding-left: 10px;">
                          <h5 style="font-weight:bold; margin: 0px; margin-bottom: 4px; font-size: 14px;">${productName}</h5>
                          <h5
                              style="font-weight:normal;  margin: 0px;font-size: 14px;margin-bottom: 10px ;letter-spacing: 0.4px">
                              ${productDescription}</h5>
                          <h5
                              style="font-weight:medium; font-family: 'Times New Roman', Times, serif; margin: 0px;font-size: 13px; letter-spacing: 1px;">
                              <span style="font-weight: bold;">KSH</span> ${productPrice}
                          </h5>
                      </div>
                  </div>
      
                  <h5 style="font-weight:normal; font-size: 16px;">If you would like to know more, please visity our <a
                          href="www.google.com">help Center</a></h5>
      
                  <h5 style="font-weight:normal; font-size: 16px;">Please don’t forget to review Usella, which is providing
                      this awesome services! You can also encourage them through our <a
                          href="https://twitter.com/EG_Kariuki">Twitter</a> page using the #Usella
                      flag. Stay safe & stay healthy.</h5>
                  <img style="width:600px"
                      src="https://firebasestorage.googleapis.com/v0/b/apt-rite-346310.appspot.com/o/unnamed.png?alt=media&token=6f0bcfeb-f69c-4441-a404-e4abb1c3616c">
                  <h5 style="font-weight:normal; font-size: 16px; margin-bottom: 0px;">Happy Shopping!</a></h5>
                  <h5 style="font-weight:normal; font-size: 16px; margin-top: 8px; margin-bottom: 5px;">Warm Regards,</a></h5>
                  <img
                      src="https://firebasestorage.googleapis.com/v0/b/apt-rite-346310.appspot.com/o/unnamed(2).png?alt=media&token=9514f497-0e09-467c-8e9f-58bc6d830b1e">
                  <h5 style="font-weight:normal; font-size: 16px; margin-bottom: 0px;margin-top: 8px;">Usella Kenya Team</a>
                  </h5>
      
              </div>
      
      
          </div>
      
      
      
      </body>
      
      </html>`
  };

  // Send the email
  try {
    const sent = await transporter.sendMail(mailOptions);
    if (!sent) {
      throw new Error('Email could not be sent');
    }

    console.log('Email sent');
  } catch (e: any) {
    throw new Error(e.message);
  }
};
