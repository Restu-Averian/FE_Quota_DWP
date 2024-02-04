import { Input as InputAntd } from "antd";
import FormItem from "./FormItem";

/**
 *
 * @param {import("./types").BaseFieldProps & import("antd").InputProps} props
 * @returns
 */
const Input = ({ label, name, required, formItemObj, ...props }) => {
  return (
    <FormItem label={label} name={name} required={required} {...formItemObj}>
      <InputAntd {...props} />
    </FormItem>
  );
};
export default Input;
