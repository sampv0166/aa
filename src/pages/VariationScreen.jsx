import { ColorPicker, useColor } from 'react-color-palette';
import 'react-color-palette/lib/css/styles.css';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row, Tabs } from 'react-bootstrap';
import { getvariations, updateProductVariation } from './api/variations';
import TextField from '../components/TextField';
import * as Yup from 'yup';
import './ProductVariationScreen.css';
import { getProduct } from './api/products';
import { Link } from 'react-router-dom';
import { SketchPicker } from 'react-color';
import { Tab } from 'bootstrap';

const ProductVariationScreen = ({ match, history, heading, varId }) => {
  const [productVariations, setProductVariations] = useState([]);
  const [variationId, setVariationId] = useState([]);
  const [currentProduct, setCurrentProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [formikFileArray, setFormikFileArray] = useState([]);
  const [ProductVariationList, setProductionVariationList] = useState([]);
  const [offer, setOffer] = useState({ checked: false });

  const [color, setColor] = useColor('hex', '#121212');
  const TableHead = ['id', 'name', 'image', ' ', ' '];

  const handleImageChange = (e, formik) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      // console.log('filesArray: ', filesArray);
      setSelectedFiles((prevImages) => prevImages.concat(filesArray));

      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
    setFormikFileArray([e.target.files]);

    formik.setFieldValue('images', formikFileArray);
  };

  const clear = (e, formik) => {
    e.preventDefault();
    formik.setFieldValue('variation_name_ar', '');
    formik.setFieldValue('variation_name_en', '');
    formik.setFieldValue('price', 0);
    formik.setFieldValue('offerprice', 0);
    formik.setFieldValue('stocks', '');
    formik.setFieldValue('sku', '');
    formik.setFieldValue('color_name', '');
    formik.setFieldValue('color_value', '');
    formik.setFieldValue('hasoffer', false);
    formik.setFieldValue('size_value', '');

    setFormikFileArray([]);
    setSelectedFiles([]);
    formik.setFieldValue('images', []);
    varId = '';
  };

  const deletevariation = async (id) => {
    if (window.confirm('Are you sure')) {
      //deleteProduct(id);
      console.log(id + ' user deleted');
    }
  };

  const handleRemoveImage = (e, fileToRemove, index, source) => {
    e.preventDefault();
    console.log(fileToRemove);

    source = source.filter((fileName) => fileName !== fileToRemove);

    console.log(formikFileArray[0]);
    console.log(
      formikFileArray.filter((fileName) => fileName !== fileToRemove)
    );
    setSelectedFiles(source);
  };

  const renderPhotos = (source) => {
    //.log('source: ', source);

    return source.map((photo, index) => {
      return (
        <div className="col w-100">
          <Card
            className="my-2 p-1 rounded"
            style={{ height: '180px', objectFit: 'contain' }}
          >
            <Card.Img
              style={{ height: '170px', objectFit: 'contain' }}
              src={photo}
              variant="top"
              key={photo}
            />
          </Card>
          <div className="col mx-1">
            <button
              onClick={(e) =>
                handleRemoveImage(e, source[index], index, source)
              }
              type="button"
              className="btn btn-danger w-100"
            >
              Remove
            </button>
          </div>
        </div>
      );
    });
  };

  const handleClick = (e, id) => {
    setVariationId(id);
  };
  const productId = match.params.id;

  //const varId = match.params.variationId;

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await getProduct();
      data.data.map((product) => {
        if (product.id == productId) {
          setCurrentProduct(product);
          console.log('products');
          setProducts(product.variations);
          console.log(products);
          product.variations.map((variations) => {
            if (variations.id == varId) {
              setImages();
              setSelectedFiles(variations.images);

              if (variations.hasoffer === true) {
                setOffer({ checked: true });
              } else {
                setOffer({ checked: false });
              }
              //  console.log(images);
              setProductVariations(variations);
              console.log(productVariations);
            } else if (varId === 0) {
              setSelectedFiles([]);
              setProductVariations([]);
            }
            //  console.log(variationId);
            //
            variations.images.map((variationimages) => {
              // console.log(variationimages);
            });
          });

          // console.log(product);
        }
      });
    };
    fetchProducts();
  }, [varId]);

  const handleSubmit = async (formdata) => {
    const res = await updateProductVariation(formdata);
    // history.push('/product');
  };

  const validate = Yup.object({
    name_ar: Yup.string().required('Required'),
    name_en: Yup.string().required('Required'),
    images: Yup.array().required('Required'),
    product_id: Yup.number().required('Required'),
    price: Yup.number().required('Required'),
    offerprice: Yup.number(),
    hasoffer: Yup.number(),
    stocks: Yup.number(),
    sku: Yup.string(),
    color_name: Yup.string(),
    color_value: Yup.string(),
  });

  return (
    <div>
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <div>
            <Formik
              enableReinitialize
              initialValues={{
                name_ar: productVariations.bio_ar || '',
                name_en: productVariations.bio_en || '',

                images: '',

                price: productVariations.price || '',
                offerprice: productVariations.offerprice || '',
                stocks: productVariations.stocks || '',
                sku: productVariations.sku || '',
                color_name: productVariations.color_name || '',
                color_value: productVariations.color_value || color.hex,
                hasoffer: offer,
                size_value: productVariations.size_value || '',
              }}
              validationSchema={validate}
              onSubmit={(values) => {
                let formdata = new FormData();
                formdata.append('id', values.varId);
                formdata.append('name_ar', values.name_ar);
                formdata.append('name_en', values.name_en);
                formdata.append('images', values.images);
                formdata.append('price', values.price);
                formdata.append('offerprice', values.offerprice);
                formdata.append('stocks', values.stocks);
                formdata.append('sku', values.sku);
                formdata.append('color_name', values.color_name);
                formdata.append('color_value', values.color_value);
                formdata.append('size_value', values.size_value);

                values.hasoffer === true
                  ? formdata.append('hasoffer', 1)
                  : formdata.append('hasoffer', 0);

                handleSubmit(formdata);
              }}
            >
              {(formik) => (
                <div className="my-4">
                  <Form>
                    <Tabs
                      defaultActiveKey="addphotos"
                      id="uncontrolled-tab-example"
                      className="mb-3"
                    >
                      <Tab eventKey="addphotos" title="IMAGES">
                        <div className="row g-3">
                          <div className="col-md-3 ">
                            <label
                              style={{ cursor: 'pointer' }}
                              className="text-nowrap border py-3 px-4 text-light add-photo  rounded"
                              htmlFor="file"
                            >
                              <i className="bx bx-image-add"></i>
                            </label>
                          </div>
                        </div>
                        <div className="row g-3">
                          <div className="col-md-12">
                            <div>
                              <input
                                name="images"
                                type="file"
                                id="file"
                                multiple
                                onChange={(e) => handleRemoveImage(e, formik)}
                              />

                              <div className="result">
                                {renderPhotos(selectedFiles)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Tab>
                      <Tab eventKey="details" title="DETAILS">
                        <Row>
                          <div className="my-4">
                            <div className="row g-3">
                              <div className="col-md-6">
                                <TextField
                                  label="Arabic Name"
                                  name="variation_name_ar"
                                  type="text"
                                />
                              </div>
                              <div className="col-md-6">
                                <TextField
                                  label="English Name"
                                  name="variation_name_en"
                                  type="text"
                                />
                              </div>
                            </div>

                            <div className="row g-3">
                              <div className="col-md-6">
                                <TextField
                                  className="form-control shadow-none rounded"
                                  label="Price"
                                  name="price"
                                  type="number"
                                />
                              </div>

                              <div className="col-md-6">
                                <TextField
                                  label="Offer Price"
                                  name="offerprice"
                                  type="number"
                                />
                              </div>
                            </div>

                            <div className="row g-3">
                              <div className="col-md-6">
                                <TextField
                                  label="Stock"
                                  name="stocks"
                                  type="number"
                                />
                              </div>
                              <div className="col-md-6">
                                <TextField
                                  label="SKU"
                                  name="sku"
                                  type="number"
                                />
                              </div>
                            </div>

                            <div class="form-check form-switch">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="flexSwitchCheckDefault"
                                checked={offer.checked}
                                onChange={(d) => {
                                  offer.checked === true
                                    ? (d = false)
                                    : (d = true);
                                  setOffer({ checked: d });
                                  formik.setFieldValue('hasoffer', d);
                                }}
                              />

                              <label
                                class="form-check-label"
                                for="flexSwitchCheckDefault"
                              >
                                Has Offer
                              </label>
                            </div>
                          </div>
                        </Row>
                      </Tab>

                      <Tab eventKey="choose" title="COLOR & SIZE">
                        <div className="row g-3 mx-1">
                          <div className="col-md-6">
                            <TextField
                              label="Color Name"
                              name="color_name"
                              type="text"
                            />
                          </div>

                          <div className="col-md-6">
                            <TextField
                              label="Size"
                              name="size_value"
                              type="text"
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <SketchPicker
                            color={color}
                            onChange={(updatedColor) => {
                              setColor(updatedColor.hex);
                              formik.setFieldValue(
                                'color_value',
                                updatedColor.hex
                              );
                            }}
                            width="300px"
                          />
                        </div>
                      </Tab>
                    </Tabs>
                    <div className="d-flex justify-content-around my-4">
                      <button
                        className="btn btn-outline-success mt-3 my-2 px-5 py-3 mx-2"
                        onClick={(e) => clear(e, formik)}
                      >
                        New Variation
                      </button>

                      <button
                        className="btn btn-outline-success mt-3 my-2 px-5 py-3"
                        type="submit"
                      >
                        Update Variation
                      </button>
                      <button
                        className="btn btn-outline-danger mx-2 mt-3 my-2 px-5 py-3"
                        type="submit"
                        onClick={() => deletevariation(productId)}
                      >
                        Delete Variation
                      </button>
                    </div>
                  </Form>
                </div>
              )}
            </Formik>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductVariationScreen;
