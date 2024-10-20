import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiPhone } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { registerCompanyAction } from "../../redux/reducers/auth/auth.action";

const SignUpcomponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector((globalState) => globalState.auth.authStatus);

  useEffect(() => {
    if (authStatus?.success === false) {
      alert(authStatus.message || "Registration failed. Please try again.");
    }

    if (authStatus?.success === true) {
      navigate("/verify");
    }
  }, [authStatus, navigate]);

  const [formData, setFormData] = useState({
    name: "Nitesh",
    phone: "9354181823",
    company_name: "NT Demo Company",
    company_email: "niteshtiwari5222@gmail.com",
    employee_size: "56",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.company_name)
      newErrors.company_name = "Company Name is required";
    if (!formData.company_email)
      newErrors.company_email = "Company Email is required";
    if (!formData.employee_size)
      newErrors.employee_size = "Employee Size is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      await dispatch(registerCompanyAction(formData));
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative p-[2px] rounded-xl">
      <div className="gradient-border bg-white w-[619px] space-y-8 p-[1px] rounded-xl">
        <div className="mx-8 my-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Sign Up</h2>
            <p className="mt-2 text-sm text-gray-600">
              Lorem Ipsum is simply dummy text
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={`w-full pl-10 px-4 py-2 border ${
                  errors.name ? "border-red-500" : "border-gray-500"
                } text-[#403a3a] bg-[#F4F4F4] rounded-md shadow-sm`}
                placeholder="Name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
            </div>

            <div className="relative">
              <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full pl-10 px-4 py-2 border ${
                  errors.phone ? "border-red-500" : "border-gray-500"
                } text-[#403a3a] bg-[#F4F4F4] rounded-md shadow-sm`}
                placeholder="Phone no."
              />
              {errors.phone && (
                <p className="text-red-500 text-xs">{errors.phone}</p>
              )}
            </div>

            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                id="company_name"
                name="company_name"
                type="text"
                value={formData.company_name}
                onChange={handleChange}
                className={`w-full pl-10 px-4 py-2 border ${
                  errors.company_name ? "border-red-500" : "border-gray-500"
                } text-[#403a3a] bg-[#F4F4F4] rounded-md shadow-sm`}
                placeholder="Company Name"
              />
              {errors.company_name && (
                <p className="text-red-500 text-xs">{errors.company_name}</p>
              )}
            </div>

            <div className="relative">
              <HiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                id="company_email"
                name="company_email"
                type="email"
                value={formData.company_email}
                onChange={handleChange}
                className={`w-full pl-10 px-4 py-2 border ${
                  errors.company_email ? "border-red-500" : "border-gray-500"
                } text-[#403a3a] bg-[#F4F4F4] rounded-md shadow-sm`}
                placeholder="Company Email"
              />
              {errors.company_email && (
                <p className="text-red-500 text-xs">{errors.company_email}</p>
              )}
            </div>

            <div className="relative">
              <HiOutlineUserGroup className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                id="employee_size"
                name="employee_size"
                type="number"
                value={formData.employee_size}
                onChange={handleChange}
                className={`w-full pl-10 px-4 py-2 border ${
                  errors.employee_size ? "border-red-500" : "border-gray-500"
                } text-[#403a3a] bg-[#F4F4F4] rounded-md shadow-sm`}
                placeholder="Employee Size"
              />
              {errors.employee_size && (
                <p className="text-red-500 text-xs">{errors.employee_size}</p>
              )}
            </div>

            <div className="flex justify-center items-center">
              <p className="text-xs">
                By clicking on proceed you will accept our{" "}
                <span className="text-[#5494f4]">Terms</span> &{" "}
                <span className="text-[#5494f4]">Conditions</span>
              </p>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full mt-4 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white ${
                  isLoading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isLoading ? "Registering..." : "Proceed"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpcomponent;
