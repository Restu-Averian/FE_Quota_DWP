import { InputNumber as InputNumberAntd } from "antd";
import FormItem from "./FormItem";

/**
 *
 * @param {import("./types").BaseFieldProps & import("antd").InputNumberProps} props
 * @returns
 */
const InputNumber = ({ label, name, required, formItemObj, ...props }) => {
  return (
    <FormItem label={label} name={name} required={required} {...formItemObj}>
      <InputNumberAntd {...props} />
    </FormItem>
  );
};
export default InputNumber;
