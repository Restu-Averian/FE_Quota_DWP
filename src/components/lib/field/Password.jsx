import { Input } from "antd";
import FormItem from "./FormItem";

/**
 *
 * @param {import("./types").BaseFieldProps & import("antd/es/input").PasswordProps} param0
 * @returns {JSX.Element}
 */
const Password = ({ label, name, required, formItemObj, ...props }) => {
  return (
    <FormItem label={label} name={name} required={required} {...formItemObj}>
      <Input.Password {...props} />
    </FormItem>
  );
};
export default Password;
