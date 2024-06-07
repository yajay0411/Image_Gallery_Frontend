// CustomFormikTextField.tsx
import React from "react";
import { useField } from "formik";
import { TextField, TextFieldProps } from "@mui/material";

interface FormikTextFieldProps {
  name: string;
}

const FormikTextField: React.FC<FormikTextFieldProps & TextFieldProps> = ({
  name,
  ...otherProps
}) => {
  const [field, meta] = useField(name);

  const errorText = meta.touched && Boolean(meta.error) ? meta.error : "";

  return (
    <TextField
      {...field}
      {...otherProps}
      error={!!errorText}
      helperText={errorText}
    />
  );
};

export default FormikTextField;
