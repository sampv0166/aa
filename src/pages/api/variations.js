import axios from 'axios';

export const addVariation = async (formdata) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.success.token}`,
      },
    };

    const { data } = await axios.post(
      'https://www.khaymatapi.mvp-apps.ae/api/v2/admin/variation',
      formdata,
      config
    );
  } catch (e) {
    console.log(e);
  }
};

export const deleteVariationImage = (url) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.success.token}`,
      },
    };

    axios
      .delete(`https://www.khaymatapi.mvp-apps.ae/api/v2/admin/product`, config)
      .then((res) => {
        console.log('category deleted sucessfully');
      });
  } catch (e) {
    console.log(e);
  }
};

export const updateProductVariation = async (formdata) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.success.token}`,
      },
    };
    const { data } = await axios.post(
      `https://www.khaymatapi.mvp-apps.ae/api/v2/admin/variation`,
      formdata,
      config
    );
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};
