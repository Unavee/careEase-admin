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
              currentAddress: "",
              firstLanguage: "",
              secondLanguage: "",
              licenseNumber: "",
              issuingAuthority: "",
              physiotherapyLicense: null,
              highestDegree: "",
              institutionName: "",
              yearOfGraduation: "",
              educationProof: null,
              specialization: "",
              specializationProof: null,
              yearsOfExperience: "",
              resume: null,
              currentEmployment: "",
              workplaceDetails: "",
              idProof: null,
              criminalBackgroundCheck: null,
              medicalFitnessCert: null,
              recentPhotograph: null,
              liabilityInsurance: null,
              pastDisciplinaryActions: "",
              noc: null,
              residentialAddressProof: null,
              travelPreferences: "",
              signature: null,
              declaration: false,
              aboutMe: "",
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

                  <div>
                    <label className="block text-gray-700 font-medium">Current Address *</label>
                    <Field
                      type="text"
                      name="currentAddress"
                      placeholder="State, District, City"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none"
                    />
                    <ErrorMessage name="currentAddress" component="div" className="text-red-600 text-sm" />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">1st Language *</label>
                    <Field
                      type="text"
                      name="firstLanguage"
                      placeholder="1st Language"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none"
                    />
                    <ErrorMessage name="firstLanguage" component="div" className="text-red-600 text-sm" />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">2nd Language</label>
                    <Field
                      type="text"
                      name="secondLanguage"
                      placeholder="2nd Language"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none"
                    />
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

                  <div>
                    <label className="block text-gray-700 font-medium">Highest Degree *</label>
                    <Field
                      type="text"
                      name="highestDegree"
                      placeholder="Highest Degree"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">Institution Name *</label>
                    <Field
                      type="text"
                      name="institutionName"
                      placeholder="Institution Name"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">Year of Graduation *</label>
                    <Field
                      type="number"
                      name="yearOfGraduation"
                      placeholder="Year of Graduation"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">Specialization</label>
                    <Field
                      type="text"
                      name="specialization"
                      placeholder="Specialization (if any)"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">Total Years of Experience *</label>
                    <Field
                      type="number"
                      name="yearsOfExperience"
                      placeholder="Years of Experience"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">Are you currently employed? *</label>
                    <Field
                      as="select"
                      name="currentEmployment"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none"
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Field>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">Workplace Details</label>
                    <Field
                      type="text"
                      name="workplaceDetails"
                      placeholder="If Yes, specify workplace details"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none"
                    />
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

                  <div>
                    <label className="block text-gray-700 font-medium">Specialization Proof (if applicable)</label>
                    <input
                      name="specializationProof"
                      type="file"
                      onChange={(event) => setFieldValue("specializationProof", event.currentTarget.files[0])}
                      className="mt-2 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-blue focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">Resume *</label>
                    <input
                      name="resume"
                      type="file"
                      onChange={(event) => setFieldValue("resume", event.currentTarget.files[0])}
                      className="mt-2 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-blue focus:outline-none"
                    />
                  </div>
                </div>

                {/* Supporting Documents */}
                <h3 className="text-lg font-semibold mt-6">Supporting Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium">Criminal Background Check *</label>
                    <input
                      name="criminalBackgroundCheck"
                      type="file"
                      onChange={(event) => setFieldValue("criminalBackgroundCheck", event.currentTarget.files[0])}
                      className="mt-2 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-blue focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">Medical Fitness Certificate *</label>
                    <input
                      name="medicalFitnessCert"
                      type="file"
                      onChange={(event) => setFieldValue("medicalFitnessCert", event.currentTarget.files[0])}
                      className="mt-2 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-blue focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">Liability Insurance *</label>
                    <input
                      name="liabilityInsurance"
                      type="file"
                      onChange={(event) => setFieldValue("liabilityInsurance", event.currentTarget.files[0])}
                      className="mt-2 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-blue focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">Residential Address Proof *</label>
                    <input
                      name="residentialAddressProof"
                      type="file"
                      onChange={(event) => setFieldValue("residentialAddressProof", event.currentTarget.files[0])}
                      className="mt-2 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-blue focus:outline-none"
                    />
                  </div>
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
                </div>

                {/* Declaration */}
                <div className="flex items-center space-x-2">
                  <Field
                    type="checkbox"
                    name="declaration"
                    className="w-5 h-5 text-primary-blue border-gray-300 rounded focus:ring-primary-blue focus:outline-none"
                  />
                  <label className="text-gray-700 font-medium">
                    I declare that the information provided is true to the best of my knowledge.
                  </label>
                </div>

                {/* Submit */}
                <div className="mt-6 text-center">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-primary-blue text-white rounded-lg focus:outline-none hover:bg-primary-blue-dark"
                  >
                    Submit Application
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CareProviderApplicationForm;
