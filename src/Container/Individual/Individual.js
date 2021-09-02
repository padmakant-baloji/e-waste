import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import AddressForm from "../../Components/AddressForm/AddressForm";
import Form1 from "../../Components/Form1/Form1";
import Menu from "../../Components/SideMenu/SideMenu";
import WasteForm from "../../Components/WasteForm/WasteForm";

const Individual = () => {
  const [form, setForm] = useState({
    category: {},
    subCategory: {},
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleAutoComplete = (name, newValue) => {
    setForm({
      ...form,
      [name]: newValue,
    });
  };

  const handleNext = () => {
    const config = {
      method: "post",
      url: "http://localhost:5001/request",
      headers: {
        "Content-Type": "application/json",
      },
      data: { ...form, source: "individual" },
    };

    axios(config)
      .then((response) => {
        if (response?.data?.status === 200) {
          toast.success("Form submitted Successfully");
          setForm({});
        }
      })
      .catch((err) => {
        toast.error("Something went wrong!!");
      });
  };

  const getBase64 = (file) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
      setForm({
        ...form,
        image: reader.result,
      });
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const handleFile = (e) => {
    getBase64(e.target.files[0]);
  };
  return (
    <Menu>
      <Form1
        handleChange={handleChange}
        handleAutoComplete={handleAutoComplete}
        form={form}
        source="individual"
      />
      <AddressForm
        handleChange={handleChange}
        handleAutoComplete={handleAutoComplete}
        form={form}
      />
      <WasteForm
        handleChange={handleChange}
        handleAutoComplete={handleAutoComplete}
        handleNext={handleNext}
        form={form}
        handleFile={handleFile}
      />
    </Menu>
  );
};
export default Individual;
