import { instance } from "./helper/instance";

const contactAndChat = {
  async getContact(id, setData) {
    try {
      const res = await instance.get(`user/get-all/${id}`);
      setData(res.data);
    } catch (error) {}
  },
};

export default contactAndChat;
