import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";

const NurseForm = () => {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const userId = localStorage.getItem("userId"); // Retrieve user ID from localStorage
      const formData = new FormData();

      formData.append("userId", userId);
      for (const key in values) {
        if (values[key] instanceof File || values[key] instanceof Blob) {
          formData.append(key, values[key]);
        } else {
          formData.append(key, JSON.stringify(values[key]));
        }
      }

      const response = await axios.post("http://localhost:5000/api/nurse-data", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(response.data.message || "Form submitted successfully!");
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit the form. Please try again.");
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center font-sans bg-gray-50 relative mt-24">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover min-w-full min-h-full"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Nurse Form Card */}
      <div className="w-full max-w-4xl p-6 z-10">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl lg:text-3xl font-bold text-center text-primary-blue mb-6">
            Nurse Registration Form
          </h1>

          {/* Form */}
          <Formik
            initialValues={{
              fullName: "",
              dateOfBirth: "",
              gender: "",
              contactNumber: "",
              email: "",
              nuidNumber: "",
              issuingAuthority: "",
              nursingLicense: null,
              highestDegree: "",
              educationProof: null,
              specialties: [],
              physiotherapistCert: null,
              cardiovascularIcuCert: null,
              acuteCareCert: null,
              isEmployed: "",
              resume: null,
              identityProof: null,
              criminalBackgroundCheck: null,
              medicalFitnessCert: null,
              recentPhotograph: null,
              residentialAddressProof: null,
              travelPreference: "",
              aboutMe: "",
              signature: null,
              declaration: false,
            }}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="space-y-6">
                {/* Split Form Fields into Two Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div>
                    {/* Full Name */}
                    <label className="block text-gray-700 font-medium">Full Name *</label>
                    <Field
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none"
                    />
                    <ErrorMessage name="fullName" component="div" className="text-red-600 text-sm" />
                  </div>

                  <div>
                    {/* Date of Birth */}
                    <label className="block text-gray-700 font-medium">Date of Birth *</label>
                    <Field
                      type="date"
                      name="dateOfBirth"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none"
                    />
                    <ErrorMessage name="dateOfBirth" component="div" className="text-red-600 text-sm" />
                  </div>

                  <div>
                    {/* Gender */}
                    <label className="block text-gray-700 font-medium">Gender *</label>
                    <Field
                      as="select"
                      name="gender"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Field>
                    <ErrorMessage name="gender" component="div" className="text-red-600 text-sm" />
                  </div>

                  <div>
                    {/* Contact Number */}
                    <label className="block text-gray-700 font-medium">Contact Number *</label>
                    <Field
                      type="text"
                      name="contactNumber"
                      placeholder="Contact Number"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none"
                    />
                    <ErrorMessage name="contactNumber" component="div" className="text-red-600 text-sm" />
                  </div>

                  <div>
                    {/* Email */}
                    <label className="block text-gray-700 font-medium">Email *</label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
                  </div>
                </div>

                {/* Professional Information */}
                <h2 className="text-lg font-semibold mt-6">Professional Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium">NUID Number *</label>
                    <Field
                      type="text"
                      name="nuidNumber"
                      placeholder="NUID Number"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none"
                    />
                    <ErrorMessage name="nuidNumber" component="div" className="text-red-600 text-sm" />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">Issuing Authority *</label>
                    <Field
                      as="select"
                      name="issuingAuthority"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none"
                    >
                      <option value="">Select Issuing Authority</option>
                      <option value="Authority A">Authority A</option>
                      <option value="Authority B">Authority B</option>
                    </Field>
                    <ErrorMessage name="issuingAuthority" component="div" className="text-red-600 text-sm" />
                  </div>

                  <div>
                    {/* Upload Nursing License */}
                    <label className="block text-gray-700 font-medium">Upload Nursing License *</label>
                    <input
                      name="nursingLicense"
                      type="file"
                      onChange={(event) => setFieldValue("nursingLicense", event.currentTarget.files[0])}
                      className="mt-2 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-blue focus:outline-none"
                    />
                    <ErrorMessage name="nursingLicense" component="div" className="text-red-600 text-sm" />
                  </div>

                  <div>
                    {/* Highest Degree */}
                    <label className="block text-gray-700 font-medium">Highest Degree *</label>
                    <Field
                      as="select"
                      name="highestDegree"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none"
                    >
                      <option value="">Select Degree</option>
                      <option value="Bachelor's Degree">Bachelor's Degree</option>
                      <option value="Master's Degree">Master's Degree</option>
                    </Field>
                    <ErrorMessage name="highestDegree" component="div" className="text-red-600 text-sm" />
                  </div>
                </div>

                {/* Upload Proof of Education */}
                <div>
                  <label className="block text-gray-700 font-medium">Upload Proof of Education *</label>
                  <input
                    name="educationProof"
                    type="file"
                    onChange={(event) => setFieldValue("educationProof", event.currentTarget.files[0])}
                    className="mt-2 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-blue focus:outline-none"
                  />
                  <ErrorMessage name="educationProof" component="div" className="text-red-600 text-sm" />
                </div>

                {/* Specializations */}
                <h3 className="text-lg font-semibold mt-6">Specializations</h3>
                <div>
                  <label className="block text-gray-700 font-medium">Select Specializations *</label>
                  <Field
                    as="select"
                    name="specialties"
                    multiple
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none"
                  >
                    <option value="Physiotherapist Nurse">Physiotherapist Nurse</option>
                    <option value="Cardiovascular ICU Nurse">Cardiovascular ICU Nurse</option>
                    <option value="Acute Care Nurse">Acute Care Nurse</option>
                  </Field>
                  <ErrorMessage name="specialties" component="div" className="text-red-600 text-sm" />
                </div>

                {/* Certifications */}
                <h3 className="text-lg font-semibold mt-6">Certifications</h3>

                <div>
                  <label className="block text-gray-700 font-medium">Upload Physiotherapist Certification</label>
                  <input
                    name="physiotherapistCert"
                    type="file"
                    onChange={(event) => setFieldValue("physiotherapistCert", event.currentTarget.files[0])}
                    className="mt-2 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-blue focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium">Upload Cardiovascular ICU Certification</label>
                  <input
                    name="cardiovascularIcuCert"
                    type="file"
                    onChange={(event) => setFieldValue("cardiovascularIcuCert", event.currentTarget.files[0])}
                    className="mt-2 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-blue focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium">Upload Acute Care Certification</label>
                  <input
                    name="acuteCareCert"
                    type="file"
                    onChange={(event) => setFieldValue("acuteCareCert", event.currentTarget.files[0])}
                    className="mt-2 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-blue focus:outline-none"
                  />
                </div>

                {/* Employment Status */}
                <div className="mt-6">
                  <label className="block text-gray-700 font-medium">Currently Employed?</label>
                  <Field
                    as="select"
                    name="isEmployed"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </Field>
                  <ErrorMessage name="isEmployed" component="div" className="text-red-600 text-sm" />
                </div>

                {/* Upload Resume */}
                <div>
                  <label className="block text-gray-700 font-medium">Upload Resume *</label>
                  <input
                    name="resume"
                    type="file"
                    onChange={(event) => setFieldValue("resume", event.currentTarget.files[0])}
                    className="mt-2 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-blue focus:outline-none"
                  />
                  <ErrorMessage name="resume" component="div" className="text-red-600 text-sm" />
                </div>

                {/* Identity Proof */}
                <div>
                  <label className="block text-gray-700 font-medium">Upload Identity Proof *</label>
                  <input
                    name="identityProof"
                    type="file"
                    onChange={(event) => setFieldValue("identityProof", event.currentTarget.files[0])}
                    className="mt-2 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-blue focus:outline-none"
                  />
                  <ErrorMessage name="identityProof" component="div" className="text-red-600 text-sm" />
                </div>

                {/* Criminal Background Check */}
                <div>
                  <label className="block text-gray-700 font-medium">Criminal Background Check *</label>
                  <input
                    name="criminalBackgroundCheck"
                    type="file"
                    onChange={(event) => setFieldValue("criminalBackgroundCheck", event.currentTarget.files[0])}
                    className="mt-2 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-blue focus:outline-none"
                  />
                  <ErrorMessage name="criminalBackgroundCheck" component="div" className="text-red-600 text-sm" />
                </div>

                {/* Medical Fitness Certificate */}
                <div>
                  <label className="block text-gray-700 font-medium">Upload Medical Fitness Certificate *</label>
                  <input
                    name="medicalFitnessCert"
                    type="file"
                    onChange={(event) => setFieldValue("medicalFitnessCert", event.currentTarget.files[0])}
                    className="mt-2 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-blue focus:outline-none"
                  />
                  <ErrorMessage name="medicalFitnessCert" component="div" className="text-red-600 text-sm" />
                </div>

                {/* Recent Photograph */}
                <div>
                  <label className="block text-gray-700 font-medium">Upload Recent Photograph *</label>
                  <input
                    name="recentPhotograph"
                    type="file"
                    onChange={(event) => setFieldValue("recentPhotograph", event.currentTarget.files[0])}
                    className="mt-2 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-blue focus:outline-none"
                  />
                  <ErrorMessage name="recentPhotograph" component="div" className="text-red-600 text-sm" />
                </div>

                {/* Residential Address Proof */}
                <div>
                  <label className="block text-gray-700 font-medium">Upload Residential Address Proof *</label>
                  <input
                    name="residentialAddressProof"
                    type="file"
                    onChange={(event) => setFieldValue("residentialAddressProof", event.currentTarget.files[0])}
                    className="mt-2 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-blue focus:outline-none"
                  />
                  <ErrorMessage name="residentialAddressProof" component="div" className="text-red-600 text-sm" />
                </div>

                {/* Travel Preference */}
                <div>
                  <label className="block text-gray-700 font-medium">Travel Preference *</label>
                  <Field
                    as="select"
                    name="travelPreference"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none"
                  >
                    <option value="Willing to Travel">Willing to Travel</option>
                    <option value="Not Willing to Travel">Not Willing to Travel</option>
                  </Field>
                  <ErrorMessage name="travelPreference" component="div" className="text-red-600 text-sm" />
                </div>

                {/* About Me */}
                <div>
                  <label className="block text-gray-700 font-medium">About Me</label>
                  <Field
                    as="textarea"
                    name="aboutMe"
                    placeholder="Tell us about yourself"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none"
                  />
                </div>

                {/* Signature */}
                <div>
                  <label className="block text-gray-700 font-medium">Signature *</label>
                  <input
                    name="signature"
                    type="file"
                    onChange={(event) => setFieldValue("signature", event.currentTarget.files[0])}
                    className="mt-2 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-blue focus:outline-none"
                  />
                  <ErrorMessage name="signature" component="div" className="text-red-600 text-sm" />
                </div>

                {/* Declaration */}
                <div className="mt-6">
                  <Field
                    type="checkbox"
                    name="declaration"
                    className="mr-2 leading-5"
                  />
                  <label className="inline-block text-gray-700 font-medium">I declare that all information is true and accurate.</label>
                  <ErrorMessage name="declaration" component="div" className="text-red-600 text-sm" />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="mt-6 w-full bg-blue-600 text-white p-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                >
                  Submit Form
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default NurseForm;
