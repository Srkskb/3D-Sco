import http from "./httpService";
// import {get_access_token} from '../../utils/apiUtils';

const adminServices = {
  getCourseList: async ({ userId, id }) => {
    const access_token = "";
    const url = `https://3dsco.com/3discoapi/3dicowebservce.php?courses_list=1&user_id=${userId}&id=${id}`;
    try {
      const token = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: "PHPSESSID=pae8vgg24o777t60ue1clbj6d5",
        },
      };
      const response = await http.get(url, token);
      return response.data;
    } catch (err) {}
  },

  addBook: async (data) => {
    const access_token = "";
    const url = `https://3dsco.com/3discoapi/3dicowebservce.php`;
    try {
      const token = {
        headers: {
          //   Authorization: `Bearer ${access_token}`,
          // Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: "PHPSESSID=pae8vgg24o777t60ue1clbj6d5",
        },
      };
      const response = await http.post(url, data, token);

      return response.data;
    } catch (err) {
      console.log("err", err);
    }
  },
};

export default adminServices;
