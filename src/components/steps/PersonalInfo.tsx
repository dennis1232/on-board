import { FormData } from "@/types";
import { Input } from "@/components/ui/Input";
import { Step } from "@/components/ui/Step";
import { forwardRef, useImperativeHandle, useState } from "react";
import * as yup from "yup";

interface PersonalInfoProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^\+?[\d\s-]{10,}$/, "Please enter a valid phone number"),
});

export type PersonalInfoRef = {
  validateForm: () => Promise<boolean>;
};

const PersonalInfo = forwardRef<PersonalInfoRef, PersonalInfoProps>(
  ({ formData, updateFormData }, ref) => {
    const [errors, setErrors] = useState<
      Partial<Record<keyof FormData, string>>
    >({});

    const validateField = async (name: keyof FormData, value: string) => {
      try {
        await (yup.reach(schema, name) as yup.Schema).validate(value);
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          setErrors((prev) => ({ ...prev, [name]: error.message }));
        }
      }
    };

    const validateForm = async (): Promise<boolean> => {
      try {
        await schema.validate(formData, { abortEarly: false });
        setErrors({});
        return true;
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const newErrors: Partial<Record<keyof FormData, string>> = {};
          error.inner.forEach((err) => {
            if (err.path) {
              newErrors[err.path as keyof FormData] = err.message;
            }
          });
          setErrors(newErrors);
        }
        return false;
      }
    };

    useImperativeHandle(ref, () => ({
      validateForm,
    }));

    const handleChange = (name: keyof FormData, value: string) => {
      updateFormData({ [name]: value });
      validateField(name, value);
    };
    return (
      <Step
        title="Personal info"
        description="Please provide your name, email address, and phone number."
      >
        <div className="space-y-6">
          <Input
            label="Name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={(e) => validateField("name", e.target.value)}
            placeholder="e.g. Stephen King"
            error={errors.name || ""}
            required
          />

          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={(e) => validateField("email", e.target.value)}
            placeholder="e.g. stephenking@lorem.com"
            error={errors.email || ""}
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            onBlur={(e) => validateField("phone", e.target.value)}
            placeholder="e.g. +1 234 567 890"
            error={errors.phone || ""}
            required
          />
        </div>
      </Step>
    );
  }
);

PersonalInfo.displayName = "PersonalInfo";

export default PersonalInfo;
