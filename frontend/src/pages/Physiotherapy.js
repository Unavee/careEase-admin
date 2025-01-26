import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

const CareProviderApplicationForm = () => {
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

      {/* Form Card */}
      <div className="w-full max-w-5xl p-6 z-10">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl lg:text-3xl font-bold text-center text-primary-blue mb-6">
            Care Provider Application Form
          </h1>

          <Formik
            initialValues={{
              fullName: "",
              dateOfBirth: "",
              gender: "",
              contactNumber: "",
              email: "",
              licenseNumber: "",
              issuingAuthority: "",
              physiotherapyLicense: null,
              highestDegree: "",
              educationProof: null,
              certifications: [],
              criminalBackgroundCheck: null,
              medicalFitnessCert: null,
              resume: null,
              aboutMe: "",
              signature: null,
              declaration: false,
            }}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ setFieldValue }) => (
              <Form className="space-y-6">
                {/* Personal Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
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
                    <label className="block text-gray-700 font-medium">Date of Birth *</label>
                    <Field
                      type="date"
                      name="dateOfBirth"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none"
                    />
                    <ErrorMessage name="dateOfBirth" component="div" className="text-red-600 text-sm" />
                  </div>

                  <div>
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

                {/* Professional Details */}
                <h2 className="text-lg font-semibold mt-6">Professional Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium">License Number *</label>
                    <Field
                      type="text"
                      name="licenseNumber"
                      placeholder="License Number"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none"
                    />
                    <ErrorMessage name="licenseNumber" component="div" className="text-red-600 text-sm" />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">Issuing Authority *</label>
                    <Field
                      type="text"
                      name="issuingAuthority"
                      placeholder="Issuing Authority"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none"
                    />
                    <ErrorMessage name="issuingAuthority" component="div" className="text-red-600 text-sm" />
                  </div>
                </div>

                {/* File Uploads */}
                <h3 className="text-lg font-semibold mt-6">Upload Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium">Physiotherapy License *</label>
                    <input
                      name="physiotherapyLicense"
                      type="file"
                      onChange={(event) => setFieldValue("physiotherapyLicense", event.currentTarget.files[0])}
                      className="mt-2 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-blue focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">Proof of Education *</label>
                    <input
                      name="educationProof"
                      type="file"
                      onChange={(event) => setFieldValue("educationProof", event.currentTarget.files[0])}
                      className="mt-2 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-blue focus:outline-none"
                    />
                  </div>
                </div>

                {/* Certifications */}
                <h3 className="text-lg font-semibold mt-6">Certifications</h3>
                <div>
                  <label className="block text-gray-700 font-medium">Select Certifications *</label>
                  <Field
                    as="select"
                    name="certifications"
                    multiple
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none"
                  >
                    <option value="CPR">CPR Certification</option>
                    <option value="First Aid">First Aid</option>
                    <option value="Advanced Physiotherapy">Advanced Physiotherapy</option>
                  </Field>
                </div>

                {/* Additional Details */}
                <h3 className="text-lg font-semibold mt-6">Additional Information</h3>
                <div>
                  <label className="block text-gray-700 font-medium">About Me *</label>
                  <Field
                    as="textarea"
                    name="aboutMe"
                    placeholder="Write a brief description about yourself."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none"
                  />
                  <ErrorMessage name="aboutMe" component="div" className="text-red-600 text-sm" />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-primary-blue text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-dark transition"
                >
                  Submit Application
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CareProviderApplicationForm;
        