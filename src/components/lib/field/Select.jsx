import { Select as SelectAntd } from "antd";
import FormItem from "./FormItem";

/**
 *
 * @param {import("./types").BaseFieldProps & import("antd").SelectProps} param0
 * @returns
 */
const Select = ({ label, name, required, formItemObj, ...props }) => {
  return (
    <FormItem label={label} name={name} required={required} {...formItemObj}>
      <SelectAntd {...props} />
    </FormItem>
  );
};
export default Select;
